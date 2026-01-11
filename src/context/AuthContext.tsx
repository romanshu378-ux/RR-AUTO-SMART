
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { apiService } from '../services/api';

interface AuthContextType extends AuthState {
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await apiService.auth.getProfile();
        if (user) setAuth({ user, isAuthenticated: true });
      } catch (e) {
        console.log('No active session');
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const { user } = await apiService.auth.login(email, pass);
      localStorage.setItem('autosmart_user', JSON.stringify(user));
      setAuth({ user, isAuthenticated: true });
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, pass: string) => {
    try {
      await apiService.auth.register({ name, email, phone, pass });
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('autosmart_user');
    localStorage.removeItem('autosmart_token');
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
