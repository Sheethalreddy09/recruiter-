import { RecruiterAiService } from './services/ai.service';
import { RecruiterApplicationsService } from './services/applications.service';
import { RecruiterCandidatesService } from './services/candidates.service';
import { RecruiterDashboardService } from './services/dashboard.service';
import { RecruiterInterviewsService } from './services/interviews.service';
import { RecruiterJobsService } from './services/jobs.service';
import { RecruiterOffersService } from './services/offers.service';
import { RecruiterTokensService } from './services/tokens.service';
import { RecruiterWorkspaceService } from './services/workspace.service';

export const recruiterFeatureProviders = [
  RecruiterDashboardService,
  RecruiterJobsService,
  RecruiterCandidatesService,
  RecruiterApplicationsService,
  RecruiterInterviewsService,
  RecruiterOffersService,
  RecruiterWorkspaceService,
  RecruiterTokensService,
  RecruiterAiService,
];
