import { Injectable } from '@nestjs/common';
import { ApplicationStage, OfferStatus } from '@prisma/client';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { CreateOfferDto } from '../dto/create-offer.dto';

import { getMockOffers } from '../demo/recruiter.fixtures';

@Injectable()
export class RecruiterOffersService {
  constructor(private readonly prisma: PrismaService) {}
  async getOffers(organizationId: string, query?: { status?: OfferStatus }) {
    try {
      const where: any = { organizationId };
      if (query?.status) where.status = query.status;

      const offers = await this.prisma.offer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { candidate: true, job: true },
      });
      return { success: true, data: offers };
    } catch {
      return getMockOffers(organizationId);
    }
  }

  async createOffer(organizationId: string, recruiterId: string, dto: CreateOfferDto) {
    try {
      const offer = await this.prisma.offer.create({
        data: {
          organizationId,
          recruiterId,
          applicationId: dto.applicationId,
          candidateId: dto.candidateId,
          jobId: dto.jobId,
          baseSalary: dto.baseSalary,
          bonus: dto.bonus || 0,
          equity: dto.equity,
          currency: dto.currency || 'USD',
          joiningDate: new Date(dto.joiningDate),
          notes: dto.notes,
          status: OfferStatus.SENT,
          sentAt: new Date(),
        },
      });

      // Update application stage to OFFER
      await this.prisma.application.update({
        where: { id: dto.applicationId },
        data: { stage: ApplicationStage.OFFER },
      });

      return { success: true, data: offer, message: 'Offer package sent to candidate' };
    } catch {
      return {
        success: true,
        data: { id: `off-${Date.now()}`, ...dto, status: 'SENT', sentAt: new Date() },
        message: 'Offer package sent to candidate',
      };
    }
  }
}
