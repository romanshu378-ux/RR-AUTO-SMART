
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export type QuoteStatus = 'Submitted' | 'In Review' | 'Approved' | 'In Progress' | 'Completed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
}

export interface UserQuote {
  id: string;
  userId: string;
  serviceType: string;
  description: string;
  status: QuoteStatus;
  date: string;
  updates: { date: string; message: string }[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
