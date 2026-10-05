import type { Job } from '../../types/recruiter.types';

import type { StateCreator } from 'zustand';
import { initialJobs } from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createJobsSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<RecruiterState, 'jobs' | 'createJob' | 'updateJob' | 'updateJobStatus' | 'deleteJob'>
> = (set, get) => ({
  jobs: initialJobs,
  createJob: (jobData) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      organizationId: get().profile.organizationId,
      postedDate: new Date().toISOString().split('T')[0],
      applicationsCount: 0,
      shortlistedCount: 0,
      viewsCount: 1,
    };

    set((state) => ({
      jobs: [newJob, ...state.jobs],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'job',
          user: state.profile.name,
          action: 'created job',
          target: newJob.title,
          time: 'Just now',
          badgeColor: 'bg-emerald-100 text-emerald-800',
        },
        ...state.activities,
      ],
    }));

    return newJob;
  },
  updateJob: (jobId, updates) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, ...updates } : j)),
    }));
  },
  updateJobStatus: (jobId, status) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, status } : j)),
    }));
  },
  deleteJob: (jobId) => {
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== jobId),
    }));
  },
});
