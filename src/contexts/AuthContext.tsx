import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import apiClient from '../lib/apiClient';
import { tokenStorage } from '../lib/tokenStorage';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  code?: string;
  message?: string;
}

interface AccessTokenResponse {
  accessToken: string;
}

export interface AuthMember {
  id: number;
  email: string | null;
  nickname: string;
  profileImageUrl?: string | null;
}

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

interface AuthContextValue {
  status: AuthStatus;
  member: AuthMember | null;
  isAuthenticated: boolean;
  refreshSession: () => Promise<boolean>;
  devLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getDevLoginPath = () => ['/api', '/dev', '/auth', '/login'].join('');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [member, setMember] = useState<AuthMember | null>(null);
  const sessionRequestRef = useRef<Promise<boolean> | null>(null);

  const authenticate = useCallback(async (accessToken: string) => {
    tokenStorage.setAccessToken(accessToken);

    const profileResponse = await apiClient.get<ApiResponse<AuthMember>>('/members/me');
    setMember(profileResponse.data.data);
    setStatus('authenticated');
  }, []);

  const devLogin = useCallback(async () => {
    if (!import.meta.env.DEV) {
      return false;
    }

    try {
      const tokenResponse = await axios.post<ApiResponse<AccessTokenResponse>>(getDevLoginPath(), {}, { withCredentials: true });
      await authenticate(tokenResponse.data.data.accessToken);
      return true;
    } catch {
      tokenStorage.clearAccessToken();
      setMember(null);
      setStatus('anonymous');
      return false;
    }
  }, [authenticate]);

  const refreshSession = useCallback(() => {
    if (sessionRequestRef.current) {
      return sessionRequestRef.current;
    }

    const sessionRequest = (async () => {
      try {
        const tokenResponse = await axios.post<ApiResponse<AccessTokenResponse>>('/api/auth/refresh', {}, { withCredentials: true });
        await authenticate(tokenResponse.data.data.accessToken);
        return true;
      } catch {
        if (import.meta.env.DEV) {
          return devLogin();
        }

        tokenStorage.clearAccessToken();
        setMember(null);
        setStatus('anonymous');
        return false;
      }
    })();

    sessionRequestRef.current = sessionRequest;
    void sessionRequest.finally(() => {
      if (sessionRequestRef.current === sessionRequest) {
        sessionRequestRef.current = null;
      }
    });

    return sessionRequest;
  }, [authenticate, devLogin]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      tokenStorage.clearAccessToken();
      setMember(null);
      setStatus('anonymous');
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(() => ({
    status,
    member,
    isAuthenticated: status === 'authenticated',
    refreshSession,
    devLogin,
    logout,
  }), [devLogin, logout, member, refreshSession, status]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
