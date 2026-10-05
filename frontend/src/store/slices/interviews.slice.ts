import type { Interview, InterviewFeedback, InterviewStatus } from '../../types/recruiter.types';

import type { StateCreator } from 'zustand';
import { initialInterviews } from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createInterviewsSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<
    RecruiterState,
    'interviews' | 'scheduleInterview' | 'updateInterviewStatus' | 'addInterviewFeedback'
  >
> = (set, get) => ({
  interviews: initialInterviews,
  scheduleInterview: (interviewData) => {
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`,
      organizationId: get().profile.organizationId,
      status: 'Scheduled',
    };

    set((state) => ({
      interviews: [newInterview, ...state.interviews],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Interview Scheduled',
          message: `${newInterview.roundName} with ${newInterview.candidateName} scheduled for ${newInterview.date}.`,
          type: 'interview',
          timestamp: 'Just now',
          read: false,
          link: '/interviews',
        },
        ...state.notifications,
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'interview',
          user: state.profile.name,
          action: 'scheduled interview',
          target: `${newInterview.candidateName} (${newInterview.roundName})`,
          time: 'Just now',
          badgeColor: 'bg-indigo-100 text-indigo-800',
        },
        ...state.activities,
      ],
    }));

    // Update application stage to Interview if not already
    get().updateApplicationStage(interviewData.applicationId, 'Interview');

    return newInterview;
  },
  updateInterviewStatus: (interviewId, status) => {
    set((state) => ({
      interviews: state.interviews.map((i) => (i.id === interviewId ? { ...i, status } : i)),
    }));
  },
  addInterviewFeedback: (interviewId, feedback) => {
    set((state) => {
      const fullFeedback: InterviewFeedback = {
        ...feedback,
        id: `fb-${Date.now()}`,
        interviewId,
        submittedAt: new Date().toLocaleString(),
      };

      const updatedInterviews = state.interviews.map((i) =>
        i.id === interviewId
          ? { ...i, status: 'Completed' as InterviewStatus, feedback: fullFeedback }
          : i,
      );

      return {
        interviews: updatedInterviews,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Interview Feedback Submitted',
            message: `Feedback recorded with recommendation: ${feedback.recommendation}`,
            type: 'feedback',
            timestamp: 'Just now',
            read: false,
            link: '/interviews',
          },
          ...state.notifications,
        ],
      };
    });
  },
});
