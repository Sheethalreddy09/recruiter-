import type { RecruiterState } from '../store/recruiter.types';
import { useRecruiterStore } from '../store/recruiterStore';
import type { ApplicationStage } from '../types/recruiter.types';
import { initialApplications, initialCandidates, initialJobs } from './recruiter.fixtures';

// Legacy demo integration used by the candidate-portal console examples.
export function initializeDemoPortalBridge() {
  if (typeof window !== 'undefined') {
    // Ensure candidates and applications are populated with the 4 dummy candidates
    const state = useRecruiterStore.getState();
    if (!state.candidates || state.candidates.length < 4) {
      useRecruiterStore.setState({
        candidates: initialCandidates,
        applications: initialApplications,
        jobs: initialJobs.length > 0 ? state.jobs : initialJobs,
      });
    }

    const portalApi = {
      getPublishedJobs: () =>
        useRecruiterStore.getState().jobs.filter((j) => j.status === 'Published'),
      submitCandidateApplication: (
        data: Parameters<RecruiterState['submitCandidateApplication']>[0],
      ) => useRecruiterStore.getState().submitCandidateApplication(data),
      getApplications: () => useRecruiterStore.getState().applications,
      getCandidates: () => useRecruiterStore.getState().candidates,
      updateApplicationStage: (appId: string, stage: ApplicationStage) =>
        useRecruiterStore.getState().updateApplicationStage(appId, stage),
      resetDemoCandidates: () =>
        useRecruiterStore.setState({
          candidates: initialCandidates,
          applications: initialApplications,
          jobs: initialJobs,
        }),
    };
    Object.assign(window, { ClyptusPortalAPI: portalApi });
  }
}
