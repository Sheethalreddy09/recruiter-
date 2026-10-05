import type { Application, Candidate, Job } from '../../types/recruiter.types';

import type { StateCreator } from 'zustand';
import { initialApplications, initialCandidates } from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createApplicationsSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<
    RecruiterState,
    | 'candidates'
    | 'applications'
    | 'submitCandidateApplication'
    | 'updateApplicationStage'
    | 'addRecruiterNote'
    | 'shortlistCandidate'
    | 'rejectCandidate'
    | 'seedDemoApplications'
  >
> = (set, get) => ({
  candidates: initialCandidates,
  applications: initialApplications,
  submitCandidateApplication: (data) => {
    const job = get().jobs.find((j) => j.id === data.jobId);
    const candidateId = `cand-${Date.now()}`;
    const newCandidate: Candidate = {
      id: candidateId,
      avatar: '',
      workHistory: [],
      educationList: [],
      projects: [],
      certifications: [],
      organizationId: get().profile.organizationId,
      name: data.candidateName,
      email: data.candidateEmail,
      phone: data.candidatePhone || '+1 (555) 000-0000',
      title: data.candidateTitle || job?.title || 'Job Applicant',
      location: data.candidateLocation || 'Remote',
      experienceYears: data.candidateExperienceYears || 3,
      skills: data.candidateSkills || job?.requiredSkills || ['JavaScript', 'React'],
      education: 'Bachelor Degree',
      currentCompany: 'Candidate Applicant',
      resumeUrl:
        data.resumeUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      matchScore: Math.floor(Math.random() * 15) + 84,
      overallRating: 4.5,
      availability: 'Immediate',
      appliedJobsCount: 1,
      summary:
        data.summary || `Applicant for ${job?.title || 'position'} via Clyptus Candidate Portal.`,
    };

    const newApp: Application = {
      id: `app-${Date.now()}`,
      candidateId,
      jobId: data.jobId,
      organizationId: get().profile.organizationId,
      candidateName: data.candidateName,
      candidateAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      candidateEmail: data.candidateEmail,
      candidatePhone: data.candidatePhone || '+1 (555) 000-0000',
      candidateTitle: data.candidateTitle || job?.title || 'Job Applicant',
      candidateLocation: data.candidateLocation || 'Remote',
      candidateExperienceYears: data.candidateExperienceYears || 3,
      candidateSkills: data.candidateSkills || job?.requiredSkills || ['JavaScript', 'React'],
      jobTitle: job?.title || 'Position',
      department: job?.department || 'Engineering',
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Applied',
      matchScore: newCandidate.matchScore,
      resumeUrl: newCandidate.resumeUrl,
      notes: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          stage: 'Applied',
          date: new Date().toISOString().split('T')[0],
          description: 'Application submitted via Clyptus Candidate Portal',
          updatedBy: data.candidateName,
        },
      ],
    };

    set((state) => ({
      candidates: [newCandidate, ...state.candidates],
      applications: [newApp, ...state.applications],
      jobs: state.jobs.map((j) =>
        j.id === data.jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j,
      ),
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'New Application Received',
          message: `${data.candidateName} applied for ${job?.title || 'position'} (${newCandidate.matchScore}% Match)`,
          type: 'application',
          timestamp: 'Just now',
          read: false,
          link: `/applications`,
        },
        ...state.notifications,
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'application',
          user: data.candidateName,
          action: 'applied for job',
          target: job?.title || 'position',
          time: 'Just now',
          badgeColor: 'bg-blue-100 text-blue-800',
        },
        ...state.activities,
      ],
    }));

    return newApp;
  },
  updateApplicationStage: (applicationId, newStage) => {
    set((state) => {
      const app = state.applications.find((a) => a.id === applicationId);
      if (!app) return state;

      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          stage: newStage,
          date: new Date().toISOString().split('T')[0],
          description: `Moved stage to ${newStage}`,
          updatedBy: state.profile.name,
        },
      ];

      const updatedApps = state.applications.map((a) =>
        a.id === applicationId ? { ...a, stage: newStage, timeline: updatedTimeline } : a,
      );

      return {
        applications: updatedApps,
        activities: [
          {
            id: `act-${Date.now()}`,
            type: 'stage',
            user: state.profile.name,
            action: 'updated stage',
            target: `${app.candidateName} moved to ${newStage}`,
            time: 'Just now',
            badgeColor: 'bg-blue-100 text-blue-800',
          },
          ...state.activities,
        ],
      };
    });
  },
  addRecruiterNote: (applicationId, noteContent) => {
    set((state) => {
      const app = state.applications.find((a) => a.id === applicationId);
      if (!app) return state;

      const newNote = {
        id: `note-${Date.now()}`,
        authorName: state.profile.name,
        authorAvatar: state.profile.avatar,
        content: noteContent,
        createdAt: new Date().toLocaleString(),
      };

      return {
        applications: state.applications.map((a) =>
          a.id === applicationId ? { ...a, notes: [newNote, ...a.notes] } : a,
        ),
      };
    });
  },
  shortlistCandidate: (candidateId, jobId) => {
    set((state) => {
      const cand = state.candidates.find((c) => c.id === candidateId);
      const app = state.applications.find(
        (a) => a.candidateId === candidateId && (!jobId || a.jobId === jobId),
      );

      if (app) {
        get().updateApplicationStage(app.id, 'Shortlisted');
      }

      return {
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Candidate Shortlisted',
            message: `${cand?.name || 'Candidate'} was moved to Shortlisted.`,
            type: 'stage',
            timestamp: 'Just now',
            read: false,
            link: '/applications',
          },
          ...state.notifications,
        ],
      };
    });
  },
  rejectCandidate: (applicationId) => {
    get().updateApplicationStage(applicationId, 'Rejected');
  },
  seedDemoApplications: () => {
    const demoJobs: Job[] = [
      {
        id: 'job-demo-1',
        organizationId: 'clyptus',
        title: 'Senior React Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        employmentType: 'Full-time',
        workMode: 'Remote',
        experienceLevel: 'Senior',
        salaryMin: 140000,
        salaryMax: 180000,
        currency: 'USD',
        status: 'Published',
        postedDate: '2026-09-20',
        deadline: '2026-10-30',
        openings: 2,
        assignedRecruiterId: 'rec_01',
        assignedRecruiterName: 'Sarah Jenkins',
        summary: 'Build scalable front-end Web apps using React and TypeScript.',
        responsibilities: ['Architect UI components', 'Optimize state management'],
        requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
        preferredSkills: ['Next.js', 'Zustand'],
        qualifications: ['BS in Computer Science or equivalent'],
        interviewProcess: ['HR Screening', 'Technical Assessment', 'System Design'],
        screeningQuestions: [],
        applicationsCount: 4,
        shortlistedCount: 2,
        viewsCount: 142,
      },
    ];

    const demoApps: Application[] = [
      {
        id: 'app-demo-1',
        candidateId: 'cand-1',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Alex Morgan',
        candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        candidateEmail: 'alex.morgan@gmail.com',
        candidatePhone: '+1 (555) 123-4567',
        candidateTitle: 'Full Stack Engineer',
        candidateLocation: 'Austin, TX',
        candidateExperienceYears: 5,
        candidateSkills: ['React', 'TypeScript', 'Node.js'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-22',
        stage: 'Applied',
        matchScore: 92,
        resumeUrl: 'https://example.com/resume.pdf',
        notes: [],
        timeline: [
          {
            id: 'tl-1',
            stage: 'Applied',
            date: '2026-09-22',
            description: 'Application submitted',
            updatedBy: 'System',
          },
        ],
      },
      {
        id: 'app-demo-2',
        candidateId: 'cand-2',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'David Chen',
        candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        candidateEmail: 'david.chen@tech.io',
        candidatePhone: '+1 (555) 987-6543',
        candidateTitle: 'Senior Frontend Developer',
        candidateLocation: 'Seattle, WA',
        candidateExperienceYears: 7,
        candidateSkills: ['React', 'Redux', 'System Design'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-21',
        stage: 'Screening',
        matchScore: 95,
        resumeUrl: 'https://example.com/resume2.pdf',
        notes: [],
        timeline: [
          {
            id: 'tl-2',
            stage: 'Screening',
            date: '2026-09-23',
            description: 'Screening initiated',
            updatedBy: 'Sarah Jenkins',
          },
        ],
      },
      {
        id: 'app-demo-3',
        candidateId: 'cand-3',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Sophia Martinez',
        candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        candidateEmail: 'sophia.m@designcode.com',
        candidatePhone: '+1 (555) 456-7890',
        candidateTitle: 'UI Engineer',
        candidateLocation: 'San Francisco, CA',
        candidateExperienceYears: 4,
        candidateSkills: ['React', 'Tailwind', 'Figma'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-19',
        stage: 'Shortlisted',
        matchScore: 88,
        resumeUrl: 'https://example.com/resume3.pdf',
        notes: [],
        timeline: [
          {
            id: 'tl-3',
            stage: 'Shortlisted',
            date: '2026-09-24',
            description: 'Shortlisted for interview',
            updatedBy: 'Sarah Jenkins',
          },
        ],
      },
      {
        id: 'app-demo-4',
        candidateId: 'cand-4',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Marcus Vance',
        candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        candidateEmail: 'marcus.v@cloud.net',
        candidatePhone: '+1 (555) 321-7654',
        candidateTitle: 'Lead Web Engineer',
        candidateLocation: 'Remote',
        candidateExperienceYears: 8,
        candidateSkills: ['React', 'TypeScript', 'GraphQL'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-18',
        stage: 'Interview',
        matchScore: 96,
        resumeUrl: 'https://example.com/resume4.pdf',
        notes: [],
        timeline: [
          {
            id: 'tl-4',
            stage: 'Interview',
            date: '2026-09-25',
            description: 'Technical Interview scheduled',
            updatedBy: 'Sarah Jenkins',
          },
        ],
      },
    ];

    set((state) => ({
      jobs: state.jobs.length === 0 ? demoJobs : state.jobs,
      applications: demoApps,
    }));
  },
});
