import type {
  ActivityItem,
  Application,
  ApplicationStage,
  Candidate,
  Interview,
  InterviewFeedback,
  InterviewStatus,
  Job,
  JobStatus,
  NotificationItem,
  Offer,
  OfferStatus,
  RecentSearchItem,
  RecruiterProfile,
} from '../types/recruiter.types';

export interface RecruiterState {
  profile: RecruiterProfile;
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  interviews: Interview[];
  offers: Offer[];
  notifications: NotificationItem[];
  activities: ActivityItem[];
  recentSearches: RecentSearchItem[];
  savedSearches: RecentSearchItem[];
  isGlobalSearchOpen: boolean;

  // Actions
  setGlobalSearchOpen: (open: boolean) => void;

  // Search Actions
  addRecentSearch: (query: string, location?: string, candidatesCount?: number) => void;
  toggleSaveSearch: (id: string) => void;
  deleteRecentSearch: (id: string) => void;

  // Job Actions
  createJob: (
    jobData: Omit<
      Job,
      | 'id'
      | 'organizationId'
      | 'postedDate'
      | 'applicationsCount'
      | 'shortlistedCount'
      | 'viewsCount'
    >,
  ) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  deleteJob: (jobId: string) => void;

  // Application & Candidate Actions
  submitCandidateApplication: (data: {
    jobId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone?: string;
    candidateTitle?: string;
    candidateLocation?: string;
    candidateExperienceYears?: number;
    candidateSkills?: string[];
    resumeUrl?: string;
    summary?: string;
  }) => Application;
  updateApplicationStage: (applicationId: string, newStage: ApplicationStage) => void;
  addRecruiterNote: (applicationId: string, noteContent: string) => void;
  shortlistCandidate: (candidateId: string, jobId?: string) => void;
  rejectCandidate: (applicationId: string) => void;

  // Interview Actions
  scheduleInterview: (
    interviewData: Omit<Interview, 'id' | 'organizationId' | 'status'>,
  ) => Interview;
  updateInterviewStatus: (interviewId: string, status: InterviewStatus) => void;
  addInterviewFeedback: (
    interviewId: string,
    feedback: Omit<InterviewFeedback, 'id' | 'interviewId' | 'submittedAt'>,
  ) => void;

  // Offer Actions
  createOffer: (offerData: Omit<Offer, 'id' | 'organizationId' | 'offerDate' | 'status'>) => Offer;
  updateOfferStatus: (offerId: string, status: OfferStatus) => void;

  // Notifications & Settings Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateProfile: (profileUpdates: Partial<RecruiterProfile>) => void;
  seedDemoApplications: () => void;
}
