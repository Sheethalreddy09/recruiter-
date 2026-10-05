import type {
  ActivityItem,
  Application,
  Candidate,
  Interview,
  Job,
  NotificationItem,
  Offer,
  RecentSearchItem,
  RecruiterProfile,
} from '../types/recruiter.types';

// Mock Profile
export const initialProfile: RecruiterProfile = {
  id: 'rec_01',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@clyptus.com',
  phone: '+1 (555) 234-5678',
  title: 'Senior Technical Recruiter',
  avatar:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  organizationId: 'clyptus',
  organizationName: 'Clyptus',
  role: 'Senior Recruiter',
  joinedDate: '2023-03-15',
  department: 'Talent Acquisition & Technical Hiring',
  location: 'San Francisco, CA',
  bio: 'Experienced Technical Recruiter specializing in scaling high-growth engineering teams across React, Node.js, AI, and Cloud Infrastructure.',
  timezone: 'Pacific Time (US & Canada) (PST/PDT)',
};

// Initial State (Clean, Empty Collections)
// Initial State (1 Working Dummy Candidate Profile & Requisition for testing)
export const initialJobs: Job[] = [
  {
    id: 'job-01',
    organizationId: 'clyptus',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: 'Senior',
    salaryMin: 140000,
    salaryMax: 185000,
    currency: 'USD',
    status: 'Published',
    postedDate: '2026-09-24',
    deadline: '2026-10-31',
    openings: 2,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary:
      'Join Clyptus engineering team to scale AI-driven recruitment portal workflows and high-performance Web applications.',
    responsibilities: [
      'Architect and deliver responsive React 19 and TypeScript web applications.',
      'Collaborate with product managers and UX designers on frontend UI systems.',
      'Optimize API performance and component lifecycle rendering.',
    ],
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    preferredSkills: ['Next.js', 'GraphQL', 'Zustand', 'Docker'],
    qualifications: [
      'B.S. or M.S. in Computer Science or related technical discipline.',
      '5+ years of professional full-stack development experience.',
    ],
    interviewProcess: [
      '1. Recruiter HR Screen (30 mins)',
      '2. Technical Coding Assessment (60 mins)',
      '3. System Architecture & Onsite (90 mins)',
      '4. Executive Leadership Chat',
    ],
    screeningQuestions: [
      {
        id: 'q1',
        question: 'How many years of commercial React & TypeScript experience do you have?',
        required: true,
      },
      { id: 'q2', question: 'What is your notice period / availability?', required: true },
    ],
    applicationsCount: 4,
    shortlistedCount: 3,
    viewsCount: 248,
  },
];

export const initialCandidates: Candidate[] = [
  {
    id: 'cand-01',
    organizationId: 'clyptus',
    name: 'Alex Morgan',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Full Stack Engineer',
    email: 'alex.morgan@clyptus.dev',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
    education: 'B.S. Computer Science, Stanford University (2018)',
    currentCompany: 'Vanguard Tech Solutions',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 94,
    overallRating: 4.8,
    availability: 'Immediate (2 weeks notice)',
    appliedJobsCount: 1,
    summary:
      'Accomplished Full Stack Software Engineer with 6+ years building real-time micro-frontends, high-concurrency Node.js microservices, and slick developer tools.',
    workHistory: [
      {
        company: 'Vanguard Tech Solutions',
        role: 'Senior Full Stack Engineer',
        duration: '2021 - Present',
        description:
          'Led a team of 4 engineers building enterprise SaaS dashboards using React, TypeScript, and GraphQL. Improved page render performance by 42%.',
      },
      {
        company: 'Apex Digital Labs',
        role: 'Frontend Developer',
        duration: '2018 - 2021',
        description:
          'Developed scalable UI component libraries, customer portals, and optimized state management pipelines.',
      },
    ],
    educationList: [
      {
        degree: 'B.S. Computer Science',
        institution: 'Stanford University',
        year: '2014 - 2018',
      },
    ],
    projects: [
      {
        title: 'Open Source UI Design Tokens Engine',
        description: 'Created an open-source design token transpiler with over 2.4k GitHub stars.',
        link: 'https://github.com/example/tokens-engine',
      },
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Meta Senior Front-End Developer Specialization',
    ],
  },
  {
    id: 'cand-02',
    organizationId: 'clyptus',
    name: 'Priya Sharma',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Frontend Developer',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    experienceYears: 5,
    skills: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'GraphQL', 'Jest'],
    education: 'B.Tech Computer Science, UT Austin (2019)',
    currentCompany: 'CloudScale Inc.',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 89,
    overallRating: 4.6,
    availability: 'Immediate (1 week notice)',
    appliedJobsCount: 1,
    summary:
      'Senior Frontend Engineer with expertise in building responsive single-page applications, UI design systems, and automated test suites.',
    workHistory: [
      {
        company: 'CloudScale Inc.',
        role: 'Senior Frontend Developer',
        duration: '2022 - Present',
        description:
          'Built customer analytics dashboards with React and Tailwind CSS. Implemented end-to-end testing with Cypress.',
      },
    ],
    educationList: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'UT Austin',
        year: '2015 - 2019',
      },
    ],
    projects: [
      {
        title: 'React Micro-Frontend Starter Kit',
        description:
          'Modular boilerplate for quick micro-frontend deployment with Module Federation.',
        link: 'https://github.com/example/react-mfe-starter',
      },
    ],
    certifications: ['Certified Web Developer (W3C)'],
  },
  {
    id: 'cand-03',
    organizationId: 'clyptus',
    name: 'David Miller',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Lead Backend Engineer',
    email: 'david.miller@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    experienceYears: 8,
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'TypeScript', 'Redis'],
    education: 'M.S. Software Engineering, University of Washington (2017)',
    currentCompany: 'DataPulse Systems',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 92,
    overallRating: 4.9,
    availability: '1 Month notice',
    appliedJobsCount: 1,
    summary:
      'Seasoned Backend Systems Architect specializing in microservice design, relational databases, distributed caching, and cloud infrastructure.',
    workHistory: [
      {
        company: 'DataPulse Systems',
        role: 'Lead Backend Engineer',
        duration: '2020 - Present',
        description:
          'Architected scalable event-driven backend services serving 2M+ active daily API requests.',
      },
    ],
    educationList: [
      {
        degree: 'M.S. Software Engineering',
        institution: 'University of Washington',
        year: '2015 - 2017',
      },
    ],
    projects: [
      {
        title: 'Distributed Rate-Limiting Middleware',
        description: 'Redis-backed token bucket algorithm for Express and Fastify endpoints.',
        link: 'https://github.com/example/rate-limiter',
      },
    ],
    certifications: ['AWS Certified DevOps Engineer - Professional'],
  },
  {
    id: 'cand-04',
    organizationId: 'clyptus',
    name: 'Rajesh Kumar',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    title: 'Full Stack Developer',
    email: 'rajesh.kumar@example.com',
    phone: '+1 (555) 567-8901',
    location: 'New York, NY',
    experienceYears: 4,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'CSS3'],
    education: 'B.S. Information Technology, NYU (2020)',
    currentCompany: 'InnovateX Solutions',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 84,
    overallRating: 4.4,
    availability: '2 Weeks notice',
    appliedJobsCount: 1,
    summary:
      'Enthusiastic Full Stack Developer passionate about clean code, intuitive UI component development, and RESTful API integrations.',
    workHistory: [
      {
        company: 'InnovateX Solutions',
        role: 'Full Stack Developer',
        duration: '2021 - Present',
        description:
          'Developed client features across Node.js services and React frontend web interfaces.',
      },
    ],
    educationList: [
      {
        degree: 'B.S. Information Technology',
        institution: 'NYU',
        year: '2016 - 2020',
      },
    ],
    projects: [
      {
        title: 'Realtime Kanban Board App',
        description: 'Drag-and-drop workflow tracking tool using Socket.io and React.',
        link: 'https://github.com/example/kanban-react',
      },
    ],
    certifications: ['MongoDB Certified Developer'],
  },
];

export const initialApplications: Application[] = [
  {
    id: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Alex Morgan',
    candidateAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.morgan@clyptus.dev',
    candidatePhone: '+1 (555) 234-8901',
    candidateTitle: 'Senior Full Stack Engineer',
    candidateLocation: 'San Francisco, CA',
    candidateExperienceYears: 6,
    candidateSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-25',
    stage: 'Interview',
    matchScore: 94,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-1',
        authorName: 'Sarah Jenkins',
        authorAvatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content:
          'Strong technical background with 6 years experience in React & TypeScript. Passed initial HR screening with high marks.',
        createdAt: '2026-09-26 10:30 AM',
      },
    ],
    timeline: [
      {
        id: 'tl-1',
        stage: 'Applied',
        date: '2026-09-25',
        description: 'Application submitted online',
        updatedBy: 'Alex Morgan',
      },
      {
        id: 'tl-2',
        stage: 'Screening',
        date: '2026-09-26',
        description: 'Passed HR Screening',
        updatedBy: 'Sarah Jenkins',
      },
      {
        id: 'tl-3',
        stage: 'Shortlisted',
        date: '2026-09-27',
        description: 'Moved to Shortlisted pool',
        updatedBy: 'Sarah Jenkins',
      },
      {
        id: 'tl-4',
        stage: 'Interview',
        date: '2026-09-28',
        description: 'Technical Deep Dive Interview Scheduled',
        updatedBy: 'Sarah Jenkins',
      },
    ],
  },
  {
    id: 'app-02',
    candidateId: 'cand-02',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Priya Sharma',
    candidateAvatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'priya.sharma@example.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateTitle: 'Senior Frontend Developer',
    candidateLocation: 'Austin, TX',
    candidateExperienceYears: 5,
    candidateSkills: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'GraphQL'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-27',
    stage: 'Screening',
    matchScore: 89,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-2',
        authorName: 'Sarah Jenkins',
        authorAvatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content:
          'Solid frontend background. Reviewing code samples and scheduling recruiter screening call.',
        createdAt: '2026-09-28 02:15 PM',
      },
    ],
    timeline: [
      {
        id: 'tl-21',
        stage: 'Applied',
        date: '2026-09-27',
        description: 'Application submitted via portal',
        updatedBy: 'Priya Sharma',
      },
      {
        id: 'tl-22',
        stage: 'Screening',
        date: '2026-09-28',
        description: 'Initial HR review in progress',
        updatedBy: 'Sarah Jenkins',
      },
    ],
  },
  {
    id: 'app-03',
    candidateId: 'cand-03',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'David Miller',
    candidateAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'david.miller@example.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateTitle: 'Lead Backend Engineer',
    candidateLocation: 'Seattle, WA',
    candidateExperienceYears: 8,
    candidateSkills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-20',
    stage: 'Offer',
    matchScore: 92,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-3',
        authorName: 'Sarah Jenkins',
        authorAvatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content:
          'Passed system architecture round with top score. Executive team approved official job offer.',
        createdAt: '2026-09-29 11:00 AM',
      },
    ],
    timeline: [
      {
        id: 'tl-31',
        stage: 'Applied',
        date: '2026-09-20',
        description: 'Application received',
        updatedBy: 'David Miller',
      },
      {
        id: 'tl-32',
        stage: 'Screening',
        date: '2026-09-21',
        description: 'Screening complete',
        updatedBy: 'Sarah Jenkins',
      },
      {
        id: 'tl-33',
        stage: 'Interview',
        date: '2026-09-24',
        description: 'Architecture Onsite completed',
        updatedBy: 'Sarah Jenkins',
      },
      {
        id: 'tl-34',
        stage: 'Offer',
        date: '2026-09-29',
        description: 'Formal Offer Letter issued',
        updatedBy: 'Sarah Jenkins',
      },
    ],
  },
  {
    id: 'app-04',
    candidateId: 'cand-04',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Rajesh Kumar',
    candidateAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'rajesh.kumar@example.com',
    candidatePhone: '+1 (555) 567-8901',
    candidateTitle: 'Full Stack Developer',
    candidateLocation: 'New York, NY',
    candidateExperienceYears: 4,
    candidateSkills: ['React', 'Node.js', 'Express', 'MongoDB'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-30',
    stage: 'Applied',
    matchScore: 84,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [],
    timeline: [
      {
        id: 'tl-41',
        stage: 'Applied',
        date: '2026-09-30',
        description: 'Application submitted',
        updatedBy: 'Rajesh Kumar',
      },
    ],
  },
];

export const initialInterviews: Interview[] = [
  {
    id: 'int-01',
    applicationId: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Alex Morgan',
    candidateAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.morgan@clyptus.dev',
    jobTitle: 'Senior Full Stack Engineer',
    roundName: 'Technical Coding & System Architecture',
    interviewerName: 'Sarah Jenkins',
    interviewerEmail: 'sarah.jenkins@clyptus.com',
    date: '2026-10-02',
    time: '02:00 PM',
    type: 'Video',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    notes: 'Focus on React 19 Hooks, Zustand state management, and API design.',
  },
];

export const initialOffers: Offer[] = [];
export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'New Candidate Applied',
    message: 'Alex Morgan applied for Senior Full Stack Engineer (94% Match)',
    type: 'application',
    timestamp: '2 hours ago',
    read: false,
    link: '/candidates/cand-01',
  },
];
export const initialActivities: ActivityItem[] = [
  {
    id: 'act-01',
    type: 'interview',
    user: 'Sarah Jenkins',
    action: 'scheduled interview',
    target: 'Alex Morgan (Technical Coding)',
    time: 'Yesterday',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
];

export const initialRecentSearches: RecentSearchItem[] = [
  {
    id: '1',
    query: '"React 19" AND "TypeScript" AND "Full Stack"',
    location: 'San Francisco, CA',
    candidatesCount: 24,
    timestamp: '1 hour ago',
  },
  {
    id: '2',
    query: '("Node.js" OR "Python") AND ("PostgreSQL" OR "System Design")',
    location: 'Remote',
    candidatesCount: 18,
    timestamp: '3 hours ago',
  },
  {
    id: '3',
    query: '"Senior Frontend Engineer" AND ("Tailwind CSS" OR "Zustand")',
    location: 'Austin, TX',
    candidatesCount: 12,
    timestamp: 'Yesterday',
  },
];

export const initialSavedSearches: RecentSearchItem[] = [
  {
    id: 's1',
    query: 'Lead Software Architect AND ("Cloud" OR "AWS")',
    location: 'San Francisco, CA',
    candidatesCount: 8,
    timestamp: '2 days ago',
    isSaved: true,
  },
  {
    id: 's2',
    query: 'Data Engineer AND ("Python" OR "Spark")',
    location: 'Remote',
    candidatesCount: 15,
    timestamp: '3 days ago',
    isSaved: true,
  },
];
