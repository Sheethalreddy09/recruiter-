export interface MessageItem {
  id: string;
  sender: 'recruiter' | 'candidate';
  senderName: string;
  content: string;
  time: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: MessageItem[];
}
