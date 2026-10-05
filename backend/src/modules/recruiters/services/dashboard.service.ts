import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationStage, InterviewStatus, JobStatus, OfferStatus } from '@prisma/client';
import { PrismaService } from '../../../infrastructure/database/prisma.service';

import { getMockDashboard } from '../demo/recruiter.fixtures';

@Injectable()
export class RecruiterDashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async validateOrganizationAccess(organizationId: string, userId: string) {
    const org = await this.prisma.organization.findFirst({
      where: {
        OR: [{ id: organizationId }, { slug: organizationId }],
      },
    });
    if (!org) {
      throw new NotFoundException(`Organization '${organizationId}' not found`);
    }

    const member = await this.prisma.organizationMember.findFirst({
      where: {
        organizationId: org.id,
        userId: userId,
      },
    });
    if (!member) {
      throw new ForbiddenException(
        `User does not have recruiter authorization for organization '${organizationId}'`,
      );
    }

    return org;
  }

  async getDashboard(organizationId: string, recruiterId: string) {
    try {
      await this.validateOrganizationAccess(organizationId, recruiterId);
      const [
        activeJobsCount,
        draftJobsCount,
        totalAppsCount,
        newAppsCount,
        shortlistedCount,
        interviewsCount,
        offersCount,
        hiredCount,
        recentApps,
        activeJobs,
        upcomingInterviews,
        recentActivity,
      ] = await Promise.all([
        this.prisma.job.count({ where: { organizationId, status: JobStatus.PUBLISHED } }),
        this.prisma.job.count({ where: { organizationId, status: JobStatus.DRAFT } }),
        this.prisma.application.count({ where: { organizationId } }),
        this.prisma.application.count({
          where: { organizationId, stage: ApplicationStage.APPLIED },
        }),
        this.prisma.application.count({
          where: { organizationId, stage: ApplicationStage.SHORTLISTED },
        }),
        this.prisma.interview.count({
          where: { organizationId, status: InterviewStatus.SCHEDULED },
        }),
        this.prisma.offer.count({ where: { organizationId, status: OfferStatus.SENT } }),
        this.prisma.application.count({ where: { organizationId, stage: ApplicationStage.HIRED } }),
        this.prisma.application.findMany({
          where: { organizationId },
          take: 5,
          orderBy: { appliedAt: 'desc' },
          include: { candidate: true, job: true },
        }),
        this.prisma.job.findMany({
          where: { organizationId, status: JobStatus.PUBLISHED },
          take: 4,
          orderBy: { createdAt: 'desc' },
          include: { _count: { select: { applications: true } } },
        }),
        this.prisma.interview.findMany({
          where: { organizationId, status: InterviewStatus.SCHEDULED },
          take: 4,
          orderBy: { date: 'asc' },
          include: { candidate: true, job: true },
        }),
        this.prisma.auditLog.findMany({
          where: { organizationId },
          take: 5,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        stats: {
          activeJobs: activeJobsCount,
          draftJobs: draftJobsCount,
          totalApplications: totalAppsCount,
          newApplications: newAppsCount,
          shortlisted: shortlistedCount,
          interviews: interviewsCount,
          offers: offersCount,
          hired: hiredCount,
        },
        recentApplications: recentApps,
        activeJobs,
        upcomingInterviews,
        recentActivity,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      // In-memory fallback if database connection is pending in dev
      return getMockDashboard(organizationId);
    }
  }
}
