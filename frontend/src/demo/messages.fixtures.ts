import type { Conversation } from '../features/messages/messages.types';

export function createInitialConversations(profile: { name: string }): Conversation[] {
  return [
    {
      id: 'conv-1',
      candidateId: 'cand-01',
      candidateName: 'Alex Rivera',
      candidateTitle: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      lastMessage: 'Hi Sarah, Wednesday afternoon works perfectly for me!',
      lastTime: '11:30 AM',
      unread: false,
      messages: [
        {
          id: 'm1',
          sender: 'recruiter',
          senderName: profile.name,
          content:
            'Hello Alex! We were really impressed by your background in React performance and would love to schedule a technical round.',
          time: '10:15 AM',
        },
        {
          id: 'm2',
          sender: 'candidate',
          senderName: 'Alex Rivera',
          content:
            'Hi Sarah, thank you for reaching out! I would be thrilled to speak with the engineering team. Wednesday afternoon works perfectly for me!',
          time: '11:30 AM',
        },
      ],
    },
    {
      id: 'conv-2',
      candidateId: 'cand-02',
      candidateName: 'Marcus Chen',
      candidateTitle: 'Lead Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      lastMessage: 'The offer package looks very competitive. Reviewing the details.',
      lastTime: 'Yesterday',
      unread: true,
      messages: [
        {
          id: 'm3',
          sender: 'recruiter',
          senderName: profile.name,
          content:
            'Hi Marcus, the hiring committee has approved your offer letter! I have attached the compensation and benefits package.',
          time: 'Yesterday, 3:00 PM',
          attachments: ['clyptus_offer_package_marcus.pdf'],
        },
        {
          id: 'm4',
          sender: 'candidate',
          senderName: 'Marcus Chen',
          content:
            'The offer package looks very competitive. Reviewing the details with my family and will get back to you shortly.',
          time: 'Yesterday, 4:45 PM',
        },
      ],
    },
    {
      id: 'conv-3',
      candidateId: 'cand-03',
      candidateName: 'Elena Rostova',
      candidateTitle: 'Staff DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      lastMessage: 'Looking forward to our screening call.',
      lastTime: 'Sep 26',
      unread: false,
      messages: [
        {
          id: 'm5',
          sender: 'recruiter',
          senderName: profile.name,
          content: 'Hi Elena, confirming our preliminary screening call for Monday at 10 AM PST.',
          time: 'Sep 26, 2:10 PM',
        },
        {
          id: 'm6',
          sender: 'candidate',
          senderName: 'Elena Rostova',
          content: 'Confirmed! Looking forward to our screening call.',
          time: 'Sep 26, 2:30 PM',
        },
      ],
    },
  ];
}
