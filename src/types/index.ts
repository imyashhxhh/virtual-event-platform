export type UserRole = 'admin' | 'speaker' | 'attendee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  organizer: User;
  sessions: Session[];
  attendees: User[];
  price: number;
  location: string;
  tags: string[];
  isPublished: boolean;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  speaker: User;
  startTime: string;
  endTime: string;
  event: Event;
  attendees: User[];
  streamUrl?: string;
  recordingUrl?: string;
  materials?: string[];
  room?: string;
  isLive: boolean;
}

export interface Question {
  id: string;
  content: string;
  askedBy: User;
  session: Session;
  timestamp: string;
  isAnswered: boolean;
  answer?: string;
  upvotes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  session: Session;
  creator: User;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: User;
  session: Session;
  timestamp: string;
}

export interface Ticket {
  id: string;
  type: 'general' | 'vip' | 'speaker';
  price: number;
  event: Event;
  owner: User;
  purchaseDate: string;
  qrCode: string;
}