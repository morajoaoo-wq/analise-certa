import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<UserRole, User> = {
  master: {
    id: '1',
    email: 'master@urbanplan.gov',
    name: 'Admin Master',
    role: 'master',
    created_at: new Date().toISOString(),
  },
  admin: {
    id: '2',
    email: 'secretario@florianopolis.gov',
    name: 'João Silva',
    role: 'admin',
    empresa_id: 'emp-1',
    created_at: new Date().toISOString(),
  },
  user: {
    id: '3',
    email: 'analista@florianopolis.gov',
    name: 'Maria Santos',
    role: 'user',
    empresa_id: 'emp-1',
    created_at: new Date().toISOString(),
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('urbanplan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any credentials and default to analyst role
    const user = demoUsers.user;
    setUser(user);
    localStorage.setItem('urbanplan_user', JSON.stringify(user));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urbanplan_user');
  };

  const setDemoRole = (role: UserRole) => {
    const user = demoUsers[role];
    setUser(user);
    localStorage.setItem('urbanplan_user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
