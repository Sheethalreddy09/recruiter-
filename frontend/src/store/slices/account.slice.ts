import type { StateCreator } from 'zustand';
import {
  initialActivities,
  initialNotifications,
  initialProfile,
} from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createAccountSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<
    RecruiterState,
    | 'profile'
    | 'notifications'
    | 'activities'
    | 'markNotificationAsRead'
    | 'markAllNotificationsAsRead'
    | 'updateProfile'
  >
> = (set) => ({
  profile: initialProfile,
  notifications: initialNotifications,
  activities: initialActivities,
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },
  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },
  updateProfile: (profileUpdates) => {
    set((state) => ({
      profile: { ...state.profile, ...profileUpdates },
    }));
  },
});
