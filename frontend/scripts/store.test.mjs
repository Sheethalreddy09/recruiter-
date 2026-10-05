import assert from 'node:assert/strict';
import { after, beforeEach, test } from 'node:test';
import { createServer } from 'vite';

// Exercise real store actions and persistence without a database or browser.
const saved = new Map();
globalThis.localStorage = {
  getItem: (key) => saved.get(key) ?? null,
  setItem: (key, value) => saved.set(key, value),
  removeItem: (key) => saved.delete(key),
};
globalThis.window = { localStorage: globalThis.localStorage };
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { useRecruiterStore: store } = await vite.ssrLoadModule('/src/store/recruiterStore.ts');
const { parseSearchQuery } = await vite.ssrLoadModule(
  '/src/features/candidate-search/searchQuery.ts',
);
const initial = store.getInitialState();
beforeEach(() => {
  saved.clear();
  store.setState(initial, true);
});
after(async () => {
  await vite.close();
  delete globalThis.localStorage;
  delete globalThis.window;
});

test('job edits persist without replacing other feature data', async () => {
  const candidates = store.getState().candidates;
  const job = store.getState().createJob({ ...initial.jobs[0], title: 'Cleanup regression job' });
  store.getState().updateJob(job.id, { title: 'Updated title' });
  store.getState().updateJobStatus(job.id, 'Paused');
  await store.persist.rehydrate();
  assert.equal(store.getState().jobs.find((item) => item.id === job.id).title, 'Updated title');
  assert.equal(store.getState().jobs.find((item) => item.id === job.id).status, 'Paused');
  assert.deepEqual(store.getState().candidates, candidates);
  const persisted = JSON.parse(saved.get('clyptus_recruiter_store_v2'));
  assert.equal(persisted.state.jobs[0].title, 'Updated title');
});

test('new applications contain complete candidate details and update job counts', () => {
  const job = initial.jobs[0];
  const app = store.getState().submitCandidateApplication({
    jobId: job.id,
    candidateName: 'Test Candidate',
    candidateEmail: 'test@example.com',
  });
  const candidate = store.getState().candidates.find((item) => item.id === app.candidateId);
  for (const key of ['workHistory', 'educationList', 'projects', 'certifications']) {
    assert.deepEqual(candidate[key], []);
  }
  assert.equal(typeof candidate.avatar, 'string');
  assert.equal(
    store.getState().jobs.find((item) => item.id === job.id).applicationsCount,
    job.applicationsCount + 1,
  );
  assert.equal(store.getState().notifications[0].type, 'application');
});

test('interview scheduling and feedback update the application and notifications', () => {
  const app = initial.applications[0];
  const interview = store.getState().scheduleInterview({
    ...initial.interviews[0],
    applicationId: app.id,
    candidateId: app.candidateId,
    jobId: app.jobId,
    roundName: 'Regression interview',
  });
  assert.equal(store.getState().applications.find((item) => item.id === app.id).stage, 'Interview');
  store.getState().addInterviewFeedback(interview.id, {
    interviewerName: 'Test Recruiter',
    overallRating: 4,
    technicalRating: 4,
    communicationRating: 4,
    cultureFitRating: 4,
    recommendation: 'Proceed',
    notes: 'Test feedback',
  });
  assert.equal(
    store.getState().interviews.find((item) => item.id === interview.id).status,
    'Completed',
  );
  assert.equal(store.getState().notifications[0].type, 'feedback');
});

test('accepting an offer retains both offer status and Hired application stage', () => {
  const app = initial.applications[0];
  const offer = store.getState().createOffer({
    applicationId: app.id,
    candidateId: app.candidateId,
    jobId: app.jobId,
    candidateName: app.candidateName,
    jobTitle: app.jobTitle,
    baseSalary: 100000,
    bonus: 0,
    currency: 'USD',
    joiningDate: '2026-11-01',
  });
  assert.equal(store.getState().applications.find((item) => item.id === app.id).stage, 'Offer');
  store.getState().updateOfferStatus(offer.id, 'Accepted');
  assert.equal(store.getState().offers.find((item) => item.id === offer.id).status, 'Accepted');
  assert.equal(store.getState().applications.find((item) => item.id === app.id).stage, 'Hired');
});

test('search history deduplicates queries and preserves saved searches', () => {
  store.getState().addRecentSearch('React', 'Hyderabad', 2);
  store.getState().addRecentSearch('react', 'Hyderabad', 3);
  const recent = store.getState().recentSearches;
  assert.equal(recent.filter((item) => item.query.toLowerCase() === 'react').length, 1);
  store.getState().toggleSaveSearch(recent[0].id);
  assert.ok(store.getState().savedSearches.some((item) => item.id === recent[0].id));
});

test('URL search initialization preserves keyword matching semantics', () => {
  assert.deepEqual(
    parseSearchQuery('"React" AND TypeScript').map(({ text, isMandatory }) => ({
      text,
      isMandatory,
    })),
    [
      { text: 'react', isMandatory: true },
      { text: 'typescript', isMandatory: false },
    ],
  );
  assert.deepEqual(parseSearchQuery('  '), []);
});

test('all recruiter screens render with their existing route parameters', async () => {
  const React = await import('react');
  const { renderToString } = await import('react-dom/server');
  const { MemoryRouter, Route, Routes } = await import('react-router-dom');
  const pages = [
    ['Dashboard', 'dashboard'],
    ['Jobs', 'jobs'],
    ['CreateJob', 'jobs/create'],
    ['EditJob', 'jobs/:jobId/edit'],
    ['JobDetails', 'jobs/:jobId'],
    ['Candidates', 'candidates'],
    ['CandidateSearch', 'candidates/search'],
    ['CandidateDetails', 'candidates/:candidateId'],
    ['Applications', 'applications'],
    ['AtsPipeline', 'ats'],
    ['Interviews', 'interviews'],
    ['Offers', 'offers'],
    ['Messages', 'messages'],
    ['Tasks', 'tasks'],
    ['AiTools', 'ai-tools'],
    ['Tokens', 'tokens'],
    ['Analytics', 'analytics'],
    ['Notifications', 'notifications'],
    ['Profile', 'profile'],
    ['Settings', 'settings'],
  ];
  for (const [name, route] of pages) {
    const module = await vite.ssrLoadModule(`/src/pages/recruiter/${name}.tsx`);
    const fullPath = `/org/:organizationId/recruiter/${route}`;
    const url = fullPath
      .replace(':organizationId', 'clyptus')
      .replace(':jobId', initial.jobs[0].id)
      .replace(':candidateId', initial.candidates[0].id);
    assert.doesNotThrow(
      () =>
        renderToString(
          React.createElement(
            MemoryRouter,
            { initialEntries: [url] },
            React.createElement(
              Routes,
              null,
              React.createElement(Route, {
                path: fullPath,
                element: React.createElement(module[name]),
              }),
            ),
          ),
        ),
      `Failed screen: ${name}`,
    );
  }
});
