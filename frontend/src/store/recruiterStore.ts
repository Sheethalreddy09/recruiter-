import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RecruiterState } from './recruiter.types';
import { createAccountSlice } from './slices/account.slice';
import { createApplicationsSlice } from './slices/applications.slice';
import { createInterviewsSlice } from './slices/interviews.slice';
import { createJobsSlice } from './slices/jobs.slice';
import { createOffersSlice } from './slices/offers.slice';
import { createSearchSlice } from './slices/search.slice';
import { createUiSlice } from './slices/ui.slice';

export const useRecruiterStore = create<RecruiterState>()(
  persist(
    (...args) => ({
      ...createUiSlice(...args),
      ...createSearchSlice(...args),
      ...createJobsSlice(...args),
      ...createApplicationsSlice(...args),
      ...createInterviewsSlice(...args),
      ...createOffersSlice(...args),
      ...createAccountSlice(...args),
    }),
    { name: 'clyptus_recruiter_store_v2' },
  ),
);
