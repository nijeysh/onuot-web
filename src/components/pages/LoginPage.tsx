import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { devLogin, isAuthenticated, status } = useAuth();
  const [isDevLoginPending, setIsDevLoginPending] = useState(false);
  const [devLoginError, setDevLoginError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const handleDevLogin = async () => {
    setIsDevLoginPending(true);
    setDevLoginError(null);

    const isLoggedIn = await devLogin();
    if (isLoggedIn) {
      navigate(from, { replace: true });
      return;
    }

    setDevLoginError('Test user sign-in failed. Check the API server.');
    setIsDevLoginPending(false);
  };

  const isLoading = status === 'loading' || isDevLoginPending;

  return (
    <section className="min-h-[calc(100vh-8rem)] py-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-surface shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[260px] bg-[#123047] p-8 text-white lg:min-h-[520px] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(61,184,245,0.45),transparent_32%),linear-gradient(135deg,#123047_0%,#1d5b75_48%,#f1b45b_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-white/15 p-2 backdrop-blur">
                <span className="material-symbols-outlined text-[28px]">cloud</span>
              </span>
              <span className="text-xl font-bold">APPS</span>
            </div>

            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Development Access</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight lg:text-5xl">
                Keep building with the test user.
              </h1>
              <p className="mt-4 text-sm leading-6 text-white/78 lg:text-base">
                The local app signs in as Test User so product screens stay available while login is paused.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-surface p-6 sm:p-8 lg:p-10">
          <div className="w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text">Test user mode</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Local development uses test@onuot.local until the real login flow is ready.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {import.meta.env.DEV ? (
                <button
                  type="button"
                  onClick={() => void handleDevLogin()}
                  disabled={isLoading}
                  className="flex h-12 items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface-alt px-4 text-sm font-semibold text-text transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-wait disabled:opacity-60"
                >
                  <FlaskConical className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{isLoading ? 'Signing in...' : 'Continue as Test User'}</span>
                </button>
              ) : (
                <div className="rounded-lg border border-border bg-surface-alt p-4 text-sm leading-6 text-text-secondary">
                  Login is paused while the product screens are being built.
                </div>
              )}
            </div>

            {devLoginError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {devLoginError}
              </p>
            )}

            <div className="mt-8 rounded-lg border border-border bg-surface-alt p-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[22px] text-primary">verified_user</span>
                <p className="text-sm leading-6 text-text-secondary">
                  This temporary flow is only for local development and can be replaced later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
