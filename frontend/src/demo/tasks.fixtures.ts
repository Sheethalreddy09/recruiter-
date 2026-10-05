import type { Task } from '../features/tasks/tasks.types';

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Screen 12 new applicants for Lead Frontend position',
    description: 'Review portfolio links and 5+ years React/TypeScript background',
    dueDate: '2026-09-28',
    priority: 'HIGH',
    status: 'TODO',
    relatedJob: 'Senior Frontend Engineer (React/TypeScript)',
  },
  {
    id: 'task-2',
    title: 'Submit technical interview scorecard for Alex Rivera',
    description: 'Evaluate system design and code quality from yesterday round',
    dueDate: '2026-09-28',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    relatedCandidate: 'Alex Rivera',
  },
  {
    id: 'task-3',
    title: 'Prepare final compensation package for Marcus Chen',
    description: 'Coordinate with VP Engineering on equity allocation and base salary',
    dueDate: '2026-09-30',
    priority: 'HIGH',
    status: 'TODO',
    relatedCandidate: 'Marcus Chen',
  },
  {
    id: 'task-4',
    title: 'Reference check follow up with previous VP Engineering',
    description: 'Call references provided for senior DevOps candidate',
    dueDate: '2026-09-25',
    priority: 'MEDIUM',
    status: 'OVERDUE',
    relatedCandidate: 'Elena Rostova',
  },
  {
    id: 'task-5',
    title: 'Publish updated JD for Lead Platform Architect',
    description: 'Incorporate new Kubernetes and microservices qualifications',
    dueDate: '2026-09-26',
    priority: 'LOW',
    status: 'COMPLETED',
    relatedJob: 'Lead Platform Architect',
  },
];
