import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import type { IconType } from 'react-icons';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface OAuthProvider {
  name: string;
  label: string;
  href: string;
  Icon: IconType;
  className: string;
}

const providers: OAuthProvider[] = [
  {
    name: 'google',
    label: 'Continue with Google',
    href: '/oauth/google',
    Icon: FcGoogle,
    className: 'border-border bg-surface text-text hover:bg-surface-hover',
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { devLogin } = useAuth();
  const [isDevLoginPending, setIsDevLoginPending] = useState(false);
  const [devLoginError, setDevLoginError] = useState<string | null>(null);

  const handleDevLogin = async () => {
    setIsDevLoginPending(true);
    setDevLoginError(null);

    const isLoggedIn = await devLogin();
    if (isLoggedIn) {
      const from = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(from, { replace: true });
      return;
    }

    setDevLoginError('Test sign-in failed. Check the API server.');
    setIsDevLoginPending(false);
  };

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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">OAuth Sign In</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight lg:text-5xl">
                One account, all weather moments.
              </h1>
              <p className="mt-4 text-sm leading-6 text-white/78 lg:text-base">
                Start with your social account and keep your calendar, chat, and OOTD flow together.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-surface p-6 sm:p-8 lg:p-10">
          <div className="w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                New users are created automatically on first social login.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {providers.map(({ name, label, href, Icon, className }) => (
                <a
                  key={name}
                  href={href}
                  className={`flex h-12 items-center justify-center gap-3 rounded-lg border px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{label}</span>
                </a>
              ))}

              {import.meta.env.DEV && (
                <button
                  type="button"
                  onClick={() => void handleDevLogin()}
                  disabled={isDevLoginPending}
                  className="flex h-12 items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface-alt px-4 text-sm font-semibold text-text transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-wait disabled:opacity-60"
                >
                  <FlaskConical className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{isDevLoginPending ? 'Signing in...' : 'Continue as Test User'}</span>
                </button>
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
                  No password is stored by APPS. Authentication is handled by the selected provider.
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
