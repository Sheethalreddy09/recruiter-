export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  relatedJob?: string;
  relatedCandidate?: string;
}
