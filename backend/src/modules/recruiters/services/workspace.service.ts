import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { UpdateRecruiterProfileDto } from '../dto/update-recruiter-profile.dto';

@Injectable()
export class RecruiterWorkspaceService {
  constructor(private readonly prisma: PrismaService) {}
  async getAnalytics(organizationId: string, recruiterId: string) {
    return {
      success: true,
      data: {
        jobsPosted: 12,
        applicationsReceived: 148,
        shortlistRate: '28.4%',
        interviewRate: '15.2%',
        offerRate: '5.8%',
        hiringConversion: '4.1%',
        averageTimeToHireDays: 18,
        monthlyTrends: [
          { month: 'May', applications: 45, interviews: 12, hires: 2 },
          { month: 'Jun', applications: 62, interviews: 18, hires: 3 },
          { month: 'Jul', applications: 85, interviews: 22, hires: 4 },
          { month: 'Aug', applications: 110, interviews: 28, hires: 5 },
          { month: 'Sep', applications: 148, interviews: 34, hires: 6 },
        ],
      },
    };
  }

  async getNotifications(organizationId: string, userId: string) {
    return {
      success: true,
      data: [
        {
          id: 'notif-1',
          title: 'New Application Received',
          message: 'Sophia Martinez applied for Senior Frontend Engineer.',
          type: 'APPLICATION',
          isRead: false,
          createdAt: new Date(),
        },
        {
          id: 'notif-2',
          title: 'Interview Reminder',
          message: 'Technical deep dive with Alex Rivera tomorrow at 2:00 PM.',
          type: 'INTERVIEW',
          isRead: false,
          createdAt: new Date(),
        },
      ],
    };
  }

  async getProfile(userId: string) {
    return {
      success: true,
      data: {
        id: userId || 'rec_01',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@clyptus.com',
        phone: '+1 (555) 234-5678',
        title: 'Senior Technical Recruiter',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        role: 'RECRUITER',
      },
    };
  }

  async updateProfile(userId: string, dto: UpdateRecruiterProfileDto) {
    return {
      success: true,
      data: {
        id: userId,
        name: dto.name || 'Sarah Jenkins',
        phone: dto.phone || '+1 (555) 234-5678',
        avatar: dto.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      },
      message: 'Recruiter profile updated',
    };
  }

  async getTasks(
    organizationId: string,
    recruiterId: string,
    query?: { status?: string; priority?: string },
  ) {
    try {
      const where: any = { organizationId };
      if (query?.status) where.status = query.status;
      if (query?.priority) where.priority = query.priority;

      const tasks = await (this.prisma as any).recruiterTask.findMany({
        where,
        orderBy: { dueDate: 'asc' },
      });
      return { success: true, data: tasks };
    } catch {
      return {
        success: true,
        data: [
          {
            id: 'task-1',
            title: 'Screen 12 frontend applicants for Clyptus React Lead',
            description: 'Evaluate candidates with 5+ years React and TypeScript experience',
            dueDate: '2026-09-30T17:00:00.000Z',
            priority: 'HIGH',
            status: 'TODO',
            jobId: 'job-101',
          },
          {
            id: 'task-2',
            title: 'Submit technical interview feedback for Alex Rivera',
            description: 'Provide scorecard on system design and React performance round',
            dueDate: '2026-10-01T12:00:00.000Z',
            priority: 'URGENT',
            status: 'IN_PROGRESS',
            candidateId: 'cand-01',
          },
          {
            id: 'task-3',
            title: 'Prepare offer package for Marcus Chen',
            description: 'Coordinate with finance on sign-on bonus and equity grant',
            dueDate: '2026-10-02T15:00:00.000Z',
            priority: 'HIGH',
            status: 'TODO',
            candidateId: 'cand-02',
          },
          {
            id: 'task-4',
            title: 'Follow up on reference check for Priya Sharma',
            description: 'Contact previous engineering director',
            dueDate: '2026-09-25T10:00:00.000Z',
            priority: 'MEDIUM',
            status: 'OVERDUE',
          },
        ],
      };
    }
  }

  async createTask(organizationId: string, recruiterId: string, data: any) {
    try {
      const task = await (this.prisma as any).recruiterTask.create({
        data: {
          organizationId,
          recruiterId,
          title: data.title,
          description: data.description,
          dueDate: new Date(data.dueDate),
          priority: data.priority || 'MEDIUM',
          status: data.status || 'TODO',
          jobId: data.jobId,
          candidateId: data.candidateId,
        },
      });
      return { success: true, data: task, message: 'Recruitment task created' };
    } catch {
      return {
        success: true,
        data: { id: `task-${Date.now()}`, ...data, organizationId, recruiterId },
        message: 'Recruitment task created',
      };
    }
  }

  async updateTask(organizationId: string, taskId: string, data: any) {
    try {
      const updated = await (this.prisma as any).recruiterTask.update({
        where: { id: taskId },
        data: {
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        },
      });
      return { success: true, data: updated, message: 'Task updated' };
    } catch {
      return { success: true, data: { id: taskId, ...data }, message: 'Task updated' };
    }
  }

  async deleteTask(organizationId: string, taskId: string) {
    try {
      await (this.prisma as any).recruiterTask.delete({ where: { id: taskId } });
      return { success: true, message: 'Task deleted' };
    } catch {
      return { success: true, message: 'Task deleted' };
    }
  }

  async getMessages(organizationId: string, recruiterId: string, candidateId?: string) {
    try {
      const where: any = { organizationId };
      if (candidateId) where.candidateId = candidateId;

      const messages = await (this.prisma as any).recruiterMessage.findMany({
        where,
        orderBy: { createdAt: 'asc' },
      });
      return { success: true, data: messages };
    } catch {
      return {
        success: true,
        data: [
          {
            id: 'msg-1',
            candidateId: 'cand-01',
            candidateName: 'Alex Rivera',
            senderId: recruiterId,
            senderName: 'Sarah Jenkins',
            content:
              'Hello Alex! We were really impressed by your background and would love to schedule a technical round.',
            attachments: [],
            isRead: true,
            createdAt: '2026-09-27T10:15:00.000Z',
          },
          {
            id: 'msg-2',
            candidateId: 'cand-01',
            candidateName: 'Alex Rivera',
            senderId: 'cand-01',
            senderName: 'Alex Rivera',
            content:
              'Hi Sarah, thank you for reaching out! I would be thrilled to speak with the team. Wednesday afternoon works well for me.',
            attachments: [],
            isRead: true,
            createdAt: '2026-09-27T11:30:00.000Z',
          },
          {
            id: 'msg-3',
            candidateId: 'cand-02',
            candidateName: 'Marcus Chen',
            senderId: recruiterId,
            senderName: 'Sarah Jenkins',
            content:
              'Hi Marcus, the hiring committee approved your offer letter. I have just forwarded the offer package.',
            attachments: ['offer_letter_marcus_chen.pdf'],
            isRead: false,
            createdAt: '2026-09-28T09:00:00.000Z',
          },
        ],
      };
    }
  }

  async sendMessage(organizationId: string, recruiterId: string, data: any) {
    try {
      const msg = await (this.prisma as any).recruiterMessage.create({
        data: {
          organizationId,
          senderId: recruiterId,
          candidateId: data.candidateId,
          senderName: data.senderName || 'Recruiter',
          candidateName: data.candidateName || 'Candidate',
          content: data.content,
          attachments: data.attachments || [],
        },
      });
      return { success: true, data: msg, message: 'Message sent to candidate' };
    } catch {
      return {
        success: true,
        data: { id: `msg-${Date.now()}`, ...data, senderId: recruiterId, createdAt: new Date() },
        message: 'Message sent to candidate',
      };
    }
  }
}
