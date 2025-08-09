import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface WriterUser {
  writer_id: string;
  username: string;
  email: string;
  full_name?: string;
  role: string;
}

interface UseWriterAuthReturn {
  user: WriterUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export function useWriterAuth(): UseWriterAuthReturn {
  const [user, setUser] = useState<WriterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      // Check authentication by calling a protected endpoint
      const response = await fetch('/api/writer/dashboard', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.writer);
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/writer/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.writer);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        // Handle detailed error messages from API
        const errorMessage = data.details || data.error || 'Login failed';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout API to invalidate session
      await fetch('/api/writer/auth', {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      router.push('/writer');
    }
  }, [router]);

  // Check authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
} 