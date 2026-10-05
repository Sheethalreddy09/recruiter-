import { Injectable } from '@nestjs/common';
import { RecruiterAiService } from './services/ai.service';
import { RecruiterApplicationsService } from './services/applications.service';
import { RecruiterCandidatesService } from './services/candidates.service';
import { RecruiterDashboardService } from './services/dashboard.service';
import { RecruiterInterviewsService } from './services/interviews.service';
import { RecruiterJobsService } from './services/jobs.service';
import { RecruiterOffersService } from './services/offers.service';
import { RecruiterTokensService } from './services/tokens.service';
import { RecruiterWorkspaceService } from './services/workspace.service';

/** Stable entry point for the controller; behavior lives in feature services. */
@Injectable()
export class RecruiterService {
  constructor(
    private readonly dashboard: RecruiterDashboardService,
    private readonly jobs: RecruiterJobsService,
    private readonly candidates: RecruiterCandidatesService,
    private readonly applications: RecruiterApplicationsService,
    private readonly interviews: RecruiterInterviewsService,
    private readonly offers: RecruiterOffersService,
    private readonly workspace: RecruiterWorkspaceService,
    private readonly tokens: RecruiterTokensService,
    private readonly ai: RecruiterAiService,
  ) {}
  validateOrganizationAccess(
    ...args: Parameters<RecruiterDashboardService['validateOrganizationAccess']>
  ) {
    return this.dashboard.validateOrganizationAccess(...args);
  }

  getDashboard(...args: Parameters<RecruiterDashboardService['getDashboard']>) {
    return this.dashboard.getDashboard(...args);
  }

  getJobs(...args: Parameters<RecruiterJobsService['getJobs']>) {
    return this.jobs.getJobs(...args);
  }

  getJobById(...args: Parameters<RecruiterJobsService['getJobById']>) {
    return this.jobs.getJobById(...args);
  }

  createJob(...args: Parameters<RecruiterJobsService['createJob']>) {
    return this.jobs.createJob(...args);
  }

  updateJob(...args: Parameters<RecruiterJobsService['updateJob']>) {
    return this.jobs.updateJob(...args);
  }

  publishJob(...args: Parameters<RecruiterJobsService['publishJob']>) {
    return this.jobs.publishJob(...args);
  }

  pauseJob(...args: Parameters<RecruiterJobsService['pauseJob']>) {
    return this.jobs.pauseJob(...args);
  }

  closeJob(...args: Parameters<RecruiterJobsService['closeJob']>) {
    return this.jobs.closeJob(...args);
  }

  deleteJob(...args: Parameters<RecruiterJobsService['deleteJob']>) {
    return this.jobs.deleteJob(...args);
  }

  searchCandidates(...args: Parameters<RecruiterCandidatesService['searchCandidates']>) {
    return this.candidates.searchCandidates(...args);
  }

  getCandidateById(...args: Parameters<RecruiterCandidatesService['getCandidateById']>) {
    return this.candidates.getCandidateById(...args);
  }

  getCandidateResume(...args: Parameters<RecruiterCandidatesService['getCandidateResume']>) {
    return this.candidates.getCandidateResume(...args);
  }

  getSavedCandidates(...args: Parameters<RecruiterCandidatesService['getSavedCandidates']>) {
    return this.candidates.getSavedCandidates(...args);
  }

  saveCandidate(...args: Parameters<RecruiterCandidatesService['saveCandidate']>) {
    return this.candidates.saveCandidate(...args);
  }

  removeSavedCandidate(...args: Parameters<RecruiterCandidatesService['removeSavedCandidate']>) {
    return this.candidates.removeSavedCandidate(...args);
  }

  getApplications(...args: Parameters<RecruiterApplicationsService['getApplications']>) {
    return this.applications.getApplications(...args);
  }

  getPipeline(...args: Parameters<RecruiterApplicationsService['getPipeline']>) {
    return this.applications.getPipeline(...args);
  }

  updateApplicationStage(
    ...args: Parameters<RecruiterApplicationsService['updateApplicationStage']>
  ) {
    return this.applications.updateApplicationStage(...args);
  }

  shortlistApplication(...args: Parameters<RecruiterApplicationsService['shortlistApplication']>) {
    return this.applications.shortlistApplication(...args);
  }

  rejectApplication(...args: Parameters<RecruiterApplicationsService['rejectApplication']>) {
    return this.applications.rejectApplication(...args);
  }

  addApplicationNote(...args: Parameters<RecruiterApplicationsService['addApplicationNote']>) {
    return this.applications.addApplicationNote(...args);
  }

  getAtsPipeline(...args: Parameters<RecruiterApplicationsService['getAtsPipeline']>) {
    return this.applications.getAtsPipeline(...args);
  }

  getInterviews(...args: Parameters<RecruiterInterviewsService['getInterviews']>) {
    return this.interviews.getInterviews(...args);
  }

  scheduleInterview(...args: Parameters<RecruiterInterviewsService['scheduleInterview']>) {
    return this.interviews.scheduleInterview(...args);
  }

  addInterviewFeedback(...args: Parameters<RecruiterInterviewsService['addInterviewFeedback']>) {
    return this.interviews.addInterviewFeedback(...args);
  }

  getOffers(...args: Parameters<RecruiterOffersService['getOffers']>) {
    return this.offers.getOffers(...args);
  }

  createOffer(...args: Parameters<RecruiterOffersService['createOffer']>) {
    return this.offers.createOffer(...args);
  }

  getAnalytics(...args: Parameters<RecruiterWorkspaceService['getAnalytics']>) {
    return this.workspace.getAnalytics(...args);
  }

  getNotifications(...args: Parameters<RecruiterWorkspaceService['getNotifications']>) {
    return this.workspace.getNotifications(...args);
  }

  getProfile(...args: Parameters<RecruiterWorkspaceService['getProfile']>) {
    return this.workspace.getProfile(...args);
  }

  updateProfile(...args: Parameters<RecruiterWorkspaceService['updateProfile']>) {
    return this.workspace.updateProfile(...args);
  }

  getTasks(...args: Parameters<RecruiterWorkspaceService['getTasks']>) {
    return this.workspace.getTasks(...args);
  }

  createTask(...args: Parameters<RecruiterWorkspaceService['createTask']>) {
    return this.workspace.createTask(...args);
  }

  updateTask(...args: Parameters<RecruiterWorkspaceService['updateTask']>) {
    return this.workspace.updateTask(...args);
  }

  deleteTask(...args: Parameters<RecruiterWorkspaceService['deleteTask']>) {
    return this.workspace.deleteTask(...args);
  }

  getMessages(...args: Parameters<RecruiterWorkspaceService['getMessages']>) {
    return this.workspace.getMessages(...args);
  }

  sendMessage(...args: Parameters<RecruiterWorkspaceService['sendMessage']>) {
    return this.workspace.sendMessage(...args);
  }

  getTokens(...args: Parameters<RecruiterTokensService['getTokens']>) {
    return this.tokens.getTokens(...args);
  }

  consumeTokens(...args: Parameters<RecruiterTokensService['consumeTokens']>) {
    return this.tokens.consumeTokens(...args);
  }

  useAiResumeParser(...args: Parameters<RecruiterAiService['useAiResumeParser']>) {
    return this.ai.useAiResumeParser(...args);
  }

  useAiJobMatching(...args: Parameters<RecruiterAiService['useAiJobMatching']>) {
    return this.ai.useAiJobMatching(...args);
  }

  useAiJobDescription(...args: Parameters<RecruiterAiService['useAiJobDescription']>) {
    return this.ai.useAiJobDescription(...args);
  }

  useAiInterviewQuestions(...args: Parameters<RecruiterAiService['useAiInterviewQuestions']>) {
    return this.ai.useAiInterviewQuestions(...args);
  }
}
