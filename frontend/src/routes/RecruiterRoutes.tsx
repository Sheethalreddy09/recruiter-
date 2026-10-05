import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RecruiterLayout } from '../layouts/recruiter/RecruiterLayout';
import { RecruiterLogin } from '../pages/auth/RecruiterLogin';

const Dashboard = lazy(() =>
  import('../pages/recruiter/Dashboard').then((module) => ({ default: module.Dashboard })),
);
const Jobs = lazy(() =>
  import('../pages/recruiter/Jobs').then((module) => ({ default: module.Jobs })),
);
const CreateJob = lazy(() =>
  import('../pages/recruiter/CreateJob').then((module) => ({ default: module.CreateJob })),
);
const JobDetails = lazy(() =>
  import('../pages/recruiter/JobDetails').then((module) => ({ default: module.JobDetails })),
);
const EditJob = lazy(() =>
  import('../pages/recruiter/EditJob').then((module) => ({ default: module.EditJob })),
);
const Candidates = lazy(() =>
  import('../pages/recruiter/Candidates').then((module) => ({ default: module.Candidates })),
);
const CandidateSearch = lazy(() =>
  import('../pages/recruiter/CandidateSearch').then((module) => ({
    default: module.CandidateSearch,
  })),
);
const CandidateDetails = lazy(() =>
  import('../pages/recruiter/CandidateDetails').then((module) => ({
    default: module.CandidateDetails,
  })),
);
const Applications = lazy(() =>
  import('../pages/recruiter/Applications').then((module) => ({ default: module.Applications })),
);
const AtsPipeline = lazy(() =>
  import('../pages/recruiter/AtsPipeline').then((module) => ({ default: module.AtsPipeline })),
);
const Interviews = lazy(() =>
  import('../pages/recruiter/Interviews').then((module) => ({ default: module.Interviews })),
);
const Offers = lazy(() =>
  import('../pages/recruiter/Offers').then((module) => ({ default: module.Offers })),
);
const Messages = lazy(() =>
  import('../pages/recruiter/Messages').then((module) => ({ default: module.Messages })),
);
const Tasks = lazy(() =>
  import('../pages/recruiter/Tasks').then((module) => ({ default: module.Tasks })),
);
const AiTools = lazy(() =>
  import('../pages/recruiter/AiTools').then((module) => ({ default: module.AiTools })),
);
const Tokens = lazy(() =>
  import('../pages/recruiter/Tokens').then((module) => ({ default: module.Tokens })),
);
const Analytics = lazy(() =>
  import('../pages/recruiter/Analytics').then((module) => ({ default: module.Analytics })),
);
const Notifications = lazy(() =>
  import('../pages/recruiter/Notifications').then((module) => ({ default: module.Notifications })),
);
const Profile = lazy(() =>
  import('../pages/recruiter/Profile').then((module) => ({ default: module.Profile })),
);
const Settings = lazy(() =>
  import('../pages/recruiter/Settings').then((module) => ({ default: module.Settings })),
);

export function RecruiterRoutes() {
  return (
    <Suspense
      fallback={
        <div role="status" className="p-8 text-center text-slate-500">
          Loading page…
        </div>
      }
    >
      <Routes>
        {/* Recruiter Login Routes */}
        <Route path="/" element={<RecruiterLogin />} />
        <Route path="/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />

        {/* Recruiter workspace routes (demo authentication) */}
        <Route path="/org/:organizationId/recruiter" element={<RecruiterLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/:jobId" element={<JobDetails />} />
          <Route path="jobs/:jobId/edit" element={<EditJob />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="candidates/search" element={<CandidateSearch />} />
          <Route path="candidates/:candidateId" element={<CandidateDetails />} />
          <Route path="applications" element={<Applications />} />
          <Route path="ats" element={<AtsPipeline />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="offers" element={<Offers />} />
          <Route path="messages" element={<Messages />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="ai-tools" element={<AiTools />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
