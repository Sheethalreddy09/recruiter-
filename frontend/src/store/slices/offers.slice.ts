import type { Offer } from '../../types/recruiter.types';

import type { StateCreator } from 'zustand';
import { initialOffers } from '../../demo/recruiter.fixtures';
import type { RecruiterState } from '../recruiter.types';

export const createOffersSlice: StateCreator<
  RecruiterState,
  [],
  [],
  Pick<RecruiterState, 'offers' | 'createOffer' | 'updateOfferStatus'>
> = (set, get) => ({
  offers: initialOffers,
  createOffer: (offerData) => {
    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`,
      organizationId: get().profile.organizationId,
      offerDate: new Date().toISOString().split('T')[0],
      status: 'Sent',
    };

    set((state) => ({
      offers: [newOffer, ...state.offers],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'offer',
          user: state.profile.name,
          action: 'created offer',
          target: `Offer sent to ${newOffer.candidateName}`,
          time: 'Just now',
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        ...state.activities,
      ],
    }));

    // Move stage to Offer
    get().updateApplicationStage(offerData.applicationId, 'Offer');

    return newOffer;
  },
  updateOfferStatus: (offerId, status) => {
    set((state) => {
      const off = state.offers.find((o) => o.id === offerId);
      if (off && status === 'Accepted') {
        get().updateApplicationStage(off.applicationId, 'Hired');
      }

      return {
        offers: state.offers.map((o) => (o.id === offerId ? { ...o, status } : o)),
      };
    });
  },
});
