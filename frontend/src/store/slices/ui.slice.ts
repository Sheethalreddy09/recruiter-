import type { StateCreator } from 'zustand';
import type { RecruiterState } from '../recruiter.types';

export const createUiSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<RecruiterState, 'isGlobalSearchOpen' | 'setGlobalSearchOpen'>
> = (set) => ({
  isGlobalSearchOpen: false,
  setGlobalSearchOpen: (open) => set({ isGlobalSearchOpen: open }),
});
