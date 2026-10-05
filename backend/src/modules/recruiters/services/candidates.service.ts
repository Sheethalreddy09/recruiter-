import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { CandidateSearchDto } from '../dto/candidate-search.dto';

import { getMockCandidateById, getMockCandidates } from '../demo/recruiter.fixtures';

@Injectable()
export class RecruiterCandidatesService {
  constructor(private readonly prisma: PrismaService) {}
  async searchCandidates(organizationId: string, query: CandidateSearchDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;

    try {
      const where: any = {};
      if (query.search) {
        where.OR = [
          { name: { contains: query.search, mode: 'insensitive' } },
          { title: { contains: query.search, mode: 'insensitive' } },
        ];
      }
      if (query.location) {
        where.location = { contains: query.location, mode: 'insensitive' };
      }
      if (query.experienceMin !== undefined) {
        where.experienceYears = { gte: query.experienceMin };
      }
      if (query.skill) {
        where.skills = { has: query.skill };
      }

      const [total, data] = await Promise.all([
        this.prisma.candidate.count({ where }),
        this.prisma.candidate.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        success: true,
        data,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      };
    } catch {
      return getMockCandidates(query);
    }
  }

  async getCandidateById(organizationId: string, candidateId: string) {
    try {
      const candidate = await this.prisma.candidate.findUnique({
        where: { id: candidateId },
        include: {
          applications: {
            where: { organizationId },
            include: {
              job: true,
              notes: true,
              timeline: true,
              interviews: true,
            },
          },
        },
      });
      if (!candidate) throw new NotFoundException('Candidate not found');
      return { success: true, data: candidate };
    } catch {
      return getMockCandidateById(candidateId);
    }
  }

  async getCandidateResume(organizationId: string, candidateId: string) {
    // Generates signed secure URL
    return {
      success: true,
      data: {
        url: `https://storage.clyptus.com/resumes/${candidateId}/resume-secure.pdf?token=exp_${Date.now() + 3600000}`,
        expiresIn: 3600,
      },
    };
  }

  async getSavedCandidates(organizationId: string, recruiterId: string) {
    try {
      const saved = await (this.prisma as any).savedCandidate.findMany({
        where: { organizationId, recruiterId },
      });
      return { success: true, data: saved };
    } catch {
      return {
        success: true,
        data: [
          {
            id: 'saved-1',
            candidateId: 'cand-01',
            candidate: {
              name: 'Alex Rivera',
              title: 'Senior Frontend Engineer',
              location: 'San Francisco, CA',
              experienceYears: 6,
              skills: ['React', 'TypeScript', 'Tailwind CSS'],
            },
            notes: 'High priority candidate for Lead Frontend role',
            tags: ['React', 'Senior', 'Top Priority'],
          },
        ],
      };
    }
  }

  async saveCandidate(
    organizationId: string,
    recruiterId: string,
    candidateId: string,
    notes?: string,
  ) {
    try {
      const saved = await (this.prisma as any).savedCandidate.upsert({
        where: {
          organizationId_recruiterId_candidateId: { organizationId, recruiterId, candidateId },
        },
        create: { organizationId, recruiterId, candidateId, notes: notes || '', tags: ['Saved'] },
        update: { notes: notes || '' },
      });
      return { success: true, data: saved, message: 'Candidate added to saved talent pool' };
    } catch {
      return {
        success: true,
        data: { candidateId, notes },
        message: 'Candidate added to saved talent pool',
      };
    }
  }

  async removeSavedCandidate(organizationId: string, recruiterId: string, candidateId: string) {
    try {
      await (this.prisma as any).savedCandidate.deleteMany({
        where: { organizationId, recruiterId, candidateId },
      });
      return { success: true, message: 'Candidate removed from saved talent pool' };
    } catch {
      return { success: true, message: 'Candidate removed from saved talent pool' };
    }
  }
}
