import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { status, isAuthenticated } = useAuth();

  if (status === 'loading') {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
        <div className="rounded-lg border border-border bg-surface px-6 py-4 text-sm font-semibold text-text-secondary shadow-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
