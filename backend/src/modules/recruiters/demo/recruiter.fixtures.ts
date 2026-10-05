// Existing fallback data. These responses do not prove database persistence.
export function getMockDashboard(organizationId: string) {
  return {
    stats: {
      activeJobs: 8,
      draftJobs: 2,
      totalApplications: 148,
      newApplications: 24,
      shortlisted: 32,
      interviews: 14,
      offers: 5,
      hired: 4,
    },
    recentApplications: [
      {
        id: 'app-01',
        candidateName: 'Alex Rivera',
        jobTitle: 'Senior Frontend Engineer',
        stage: 'INTERVIEW',
        matchScore: 95,
      },
    ],
    activeJobs: [
      {
        id: 'job-101',
        title: 'Senior Frontend Engineer (React/TypeScript)',
        department: 'Engineering',
        openings: 2,
        applicationsCount: 42,
      },
    ],
    upcomingInterviews: [
      {
        id: 'int-101',
        candidateName: 'Alex Rivera',
        roundName: 'Technical Deep Dive',
        date: '2026-09-30',
        time: '02:00 PM',
      },
    ],
    recentActivity: [
      {
        id: 'act-1',
        user: 'Sarah Jenkins',
        action: 'moved candidate to Interview',
        time: '1 hour ago',
      },
    ],
  };
}

export function getMockJobs(organizationId: string, query: any) {
  const mockList = [
    {
      id: 'job-101',
      title: 'Senior Frontend Engineer (React/TypeScript)',
      department: 'Engineering',
      location: 'San Francisco, CA',
      employmentType: 'FULL_TIME',
      status: 'PUBLISHED',
      openings: 2,
      salaryMin: 140000,
      salaryMax: 180000,
      applicationsCount: 42,
      createdAt: '2026-09-10',
    },
    {
      id: 'job-102',
      title: 'Lead Backend Developer (Node.js/NestJS)',
      department: 'Engineering',
      location: 'Austin, TX',
      employmentType: 'FULL_TIME',
      status: 'PUBLISHED',
      openings: 1,
      salaryMin: 160000,
      salaryMax: 200000,
      applicationsCount: 28,
      createdAt: '2026-09-15',
    },
  ];

  return {
    success: true,
    data: mockList,
    pagination: {
      page: query.page || 1,
      limit: query.limit || 20,
      total: mockList.length,
      totalPages: 1,
    },
  };
}

export function getMockJobById(organizationId: string, jobId: string) {
  return {
    success: true,
    data: {
      id: jobId,
      organizationId,
      title: 'Senior Frontend Engineer (React/TypeScript)',
      department: 'Engineering',
      location: 'San Francisco, CA',
      workMode: 'HYBRID',
      employmentType: 'FULL_TIME',
      status: 'PUBLISHED',
      openings: 2,
      salaryMin: 140000,
      salaryMax: 180000,
      currency: 'USD',
      summary: 'Architect scalable web frontends in React and TypeScript.',
      responsibilities: ['Build UI components', 'Optimize load times'],
      requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
      preferredSkills: ['Next.js', 'Jest'],
      qualifications: ['4+ years frontend experience'],
    },
  };
}

export function getMockCandidates(query: any) {
  const list = [
    {
      id: 'cand-01',
      name: 'Alex Rivera',
      title: 'Senior Frontend Engineer',
      email: 'alex.rivera@example.com',
      location: 'San Francisco, CA',
      experienceYears: 6,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      education: 'B.S. CS, UC Berkeley',
      matchScore: 95,
    },
    {
      id: 'cand-02',
      name: 'Marcus Chen',
      title: 'Lead Backend Engineer',
      email: 'marcus.chen@example.com',
      location: 'Austin, TX',
      experienceYears: 8,
      skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
      education: 'M.S. SE, UT Austin',
      matchScore: 92,
    },
  ];

  return {
    success: true,
    data: list,
    pagination: {
      page: query.page || 1,
      limit: query.limit || 20,
      total: list.length,
      totalPages: 1,
    },
  };
}

export function getMockCandidateById(candidateId: string) {
  return {
    success: true,
    data: {
      id: candidateId,
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      title: 'Senior Frontend Engineer',
      experienceYears: 6,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      summary: 'Experienced frontend engineer building high scale SaaS.',
      resumeUrl: 'https://storage.clyptus.com/resumes/alex-rivera.pdf',
      matchScore: 95,
    },
  };
}

export function getMockApplications(organizationId: string, query: any) {
  const list = [
    {
      id: 'app-01',
      candidateId: 'cand-01',
      jobId: 'job-101',
      candidateName: 'Alex Rivera',
      jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
      stage: 'INTERVIEW',
      matchScore: 95,
      appliedAt: '2026-09-12',
    },
    {
      id: 'app-02',
      candidateId: 'cand-02',
      jobId: 'job-102',
      candidateName: 'Marcus Chen',
      jobTitle: 'Lead Backend Developer (Node.js/NestJS)',
      stage: 'OFFER',
      matchScore: 92,
      appliedAt: '2026-09-16',
    },
  ];

  return {
    success: true,
    data: list,
    pagination: { page: 1, limit: 20, total: list.length, totalPages: 1 },
  };
}

export function getMockInterviews(organizationId: string) {
  return {
    success: true,
    data: [
      {
        id: 'int-101',
        candidateName: 'Alex Rivera',
        jobTitle: 'Senior Frontend Engineer',
        roundName: 'Technical Deep Dive',
        interviewerName: 'Michael Vance',
        date: '2026-09-30',
        startTime: '02:00 PM',
        endTime: '03:00 PM',
        type: 'VIDEO',
        status: 'SCHEDULED',
      },
    ],
  };
}

export function getMockOffers(organizationId: string) {
  return {
    success: true,
    data: [
      {
        id: 'off-101',
        candidateName: 'Marcus Chen',
        jobTitle: 'Lead Backend Developer',
        baseSalary: 185000,
        bonus: 20000,
        status: 'SENT',
        joiningDate: '2026-10-20',
      },
    ],
  };
}
