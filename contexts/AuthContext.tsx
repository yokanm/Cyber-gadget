'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './ToastContext';


export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

// Define the stored user type (includes password)
interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { success, error } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser) as User);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Simulate API call (replace with your actual API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials (replace with actual authentication)
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
      const foundUser = storedUsers.find(
        (storedUser: StoredUser) => storedUser.email === email && storedUser.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: foundUser.avatar,
        phone: foundUser.phone,
        createdAt: foundUser.createdAt,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      success('Welcome back, ' + userData.name + '!');
      router.push('/');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
      const existingUser = storedUsers.find((storedUser: StoredUser) => storedUser.email === email);

      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Create new user
      const newStoredUser: StoredUser = {
        id: 'user_' + Date.now(),
        email,
        password, // In production, this should be hashed on the backend
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        createdAt: new Date().toISOString(),
      };

      storedUsers.push(newStoredUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      const userData: User = {
        id: newStoredUser.id,
        email: newStoredUser.email,
        name: newStoredUser.name,
        avatar: newStoredUser.avatar,
        createdAt: newStoredUser.createdAt,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      success('Account created successfully!');
      router.push('/');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    success('Logged out successfully');
    router.push('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!user) throw new Error('No user logged in');

      const updatedUser: User = { ...user, ...data };

      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update in users array
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
      const userIndex = storedUsers.findIndex((storedUser: StoredUser) => storedUser.id === user.id);
      
      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...data };
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }

      setUser(updatedUser);
      success('Profile updated successfully!');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
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