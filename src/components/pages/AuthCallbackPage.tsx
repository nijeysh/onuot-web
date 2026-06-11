import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenStorage } from '../../lib/tokenStorage';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  code?: string;
  message?: string;
}

interface AccessTokenResponse {
  accessToken: string;
}

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const { data } = await axios.post<ApiResponse<AccessTokenResponse>>('/api/auth/refresh', {}, { withCredentials: true });
        tokenStorage.setAccessToken(data.data.accessToken);
        navigate('/', { replace: true });
      } catch {
        tokenStorage.clearAccessToken();
        setMessage('Sign in failed. Please try again.');
        window.setTimeout(() => navigate('/login', { replace: true }), 1200);
      }
    };

    void completeSignIn();
  }, [navigate]);

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-8 text-center shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[30px]">sync</span>
        </div>
        <h1 className="mt-5 text-xl font-bold text-text">Signing you in</h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{message}</p>
      </div>
    </section>
  );
};

export default AuthCallbackPage;
