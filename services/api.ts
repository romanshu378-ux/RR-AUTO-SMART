
import { User, UserQuote, Service, Project } from '../types';

// Simulation of network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const DEFAULT_SERVICES: Service[] = [
  {
    id: 'smart-home',
    title: 'Smart Home Automation',
    description: 'Complete home control from lights and curtains to security and climate control using voice and mobile apps.',
    icon: 'fa-house-signal',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'iiot',
    title: 'Industrial IoT (IIoT)',
    description: 'Harness the power of data with smart sensors, predictive maintenance, and real-time factory monitoring.',
    icon: 'fa-industry',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'building-automation',
    title: 'Building Automation',
    description: 'Centralized control for commercial buildings to optimize HVAC, lighting, and security systems.',
    icon: 'fa-building-shield',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  }
];

export const apiService = {
  // Initialize Mock DB
  initDB: () => {
    if (!localStorage.getItem('autosmart_master_services')) {
      localStorage.setItem('autosmart_master_services', JSON.stringify(DEFAULT_SERVICES));
    }
    if (!localStorage.getItem('autosmart_db_users')) {
      localStorage.setItem('autosmart_db_users', JSON.stringify([
        { id: 'admin-01', name: 'RR Admin', email: 'admin@autosmart.com', pass: 'admin123', role: 'admin', phone: '+91 83023 13065' }
      ]));
    }
    if (!localStorage.getItem('autosmart_db_quotes')) {
      localStorage.setItem('autosmart_db_quotes', JSON.stringify([]));
    }
  },

  // AUTH
  auth: {
    login: async (email: string, pass: string) => {
      await delay(800);
      const users = JSON.parse(localStorage.getItem('autosmart_db_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.pass === pass);
      if (user) {
        const token = 'fake-jwt-token-' + Math.random();
        localStorage.setItem('autosmart_token', token);
        // Exclude password for profile storage
        const { pass: _, ...userProfile } = user;
        localStorage.setItem('autosmart_user', JSON.stringify(userProfile));
        return { token, user: userProfile };
      }
      throw new Error('Invalid credentials');
    },
    register: async (data: any) => {
      await delay(1000);
      const users = JSON.parse(localStorage.getItem('autosmart_db_users') || '[]');
      if (users.find((u: any) => u.email === data.email)) throw new Error('User already exists');
      const newUser = { ...data, id: 'USER-' + Date.now(), role: 'customer' };
      users.push(newUser);
      localStorage.setItem('autosmart_db_users', JSON.stringify(users));
      return newUser;
    },
    getProfile: async () => {
      await delay(300);
      const token = localStorage.getItem('autosmart_token');
      if (!token) return null;
      const userStr = localStorage.getItem('autosmart_user');
      return userStr ? JSON.parse(userStr) : null;
    }
  },

  // SERVICES
  services: {
    getAll: async (): Promise<Service[]> => {
      await delay(500);
      const data = localStorage.getItem('autosmart_master_services');
      return data ? JSON.parse(data) : DEFAULT_SERVICES;
    }
  },

  // QUOTES
  quotes: {
    getUserQuotes: async (userId: string): Promise<UserQuote[]> => {
      await delay(600);
      const all = JSON.parse(localStorage.getItem('autosmart_db_quotes') || '[]');
      return all.filter((q: any) => q.userId === userId);
    },
    getAll: async (): Promise<UserQuote[]> => {
      await delay(600);
      return JSON.parse(localStorage.getItem('autosmart_db_quotes') || '[]');
    },
    create: async (quoteData: Partial<UserQuote>) => {
      await delay(1000);
      const all = JSON.parse(localStorage.getItem('autosmart_db_quotes') || '[]');
      const newQuote = { 
        ...quoteData, 
        id: 'QT-' + Math.floor(Math.random() * 10000), 
        status: 'Submitted', 
        date: new Date().toLocaleDateString(),
        updates: []
      };
      all.push(newQuote);
      localStorage.setItem('autosmart_db_quotes', JSON.stringify(all));
      return newQuote;
    },
    updateStatus: async (id: string, status: string) => {
      await delay(500);
      let all = JSON.parse(localStorage.getItem('autosmart_db_quotes') || '[]');
      all = all.map((q: any) => q.id === id ? { ...q, status } : q);
      localStorage.setItem('autosmart_db_quotes', JSON.stringify(all));
      return true;
    }
  },

  // NOTIFICATIONS
  notifications: {
    getUnread: async () => {
      await delay(200);
      return Math.floor(Math.random() * 5);
    }
  }
};
