import type { RecentSearchItem } from '../../types/recruiter.types';

import type { StateCreator } from 'zustand';
import { initialRecentSearches, initialSavedSearches } from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createSearchSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<
    RecruiterState,
    | 'recentSearches'
    | 'savedSearches'
    | 'addRecentSearch'
    | 'toggleSaveSearch'
    | 'deleteRecentSearch'
  >
> = (set) => ({
  recentSearches: initialRecentSearches,
  savedSearches: initialSavedSearches,
  addRecentSearch: (query, location = 'All Locations', candidatesCount = 0) => {
    if (!query || query.trim().length === 0) return;
    const cleanQuery = query.trim();
    set((state) => {
      const filtered = state.recentSearches.filter(
        (s) => s.query.toLowerCase() !== cleanQuery.toLowerCase(),
      );
      const newSearch: RecentSearchItem = {
        id: `search-${Date.now()}`,
        query: cleanQuery,
        location: location.trim() || 'All Locations',
        candidatesCount: typeof candidatesCount === 'number' ? candidatesCount : 0,
        timestamp: 'Just now',
      };
      return {
        recentSearches: [newSearch, ...filtered].slice(0, 10),
      };
    });
  },
  toggleSaveSearch: (id) => {
    set((state) => {
      const isSaved = state.savedSearches.some((s) => s.id === id);
      if (isSaved) {
        return {
          savedSearches: state.savedSearches.filter((s) => s.id !== id),
        };
      }
      const itemToSave = state.recentSearches.find((s) => s.id === id);
      if (itemToSave) {
        return {
          savedSearches: [{ ...itemToSave, isSaved: true }, ...state.savedSearches],
        };
      }
      return state;
    });
  },
  deleteRecentSearch: (id) => {
    set((state) => ({
      recentSearches: state.recentSearches.filter((s) => s.id !== id),
      savedSearches: state.savedSearches.filter((s) => s.id !== id),
    }));
  },
});
