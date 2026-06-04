import ThemeToggle from '../common/ThemeToggle';
import ProfileDropdown from './ProfileDropdown';
import { tokenStorage } from '../../lib/tokenStorage';

const Header = () => {
  const isAuthenticated = Boolean(tokenStorage.getAccessToken());

  return (
    <header className="h-20 shrink-0 px-6 lg:px-10 flex items-center justify-between bg-surface/80 backdrop-blur-md z-30 sticky top-0 border-b border-border-light">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-muted">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-input-bg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm text-sm transition-all"
            placeholder="Search city, user, or event..."
            type="text"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <kbd className="inline-flex items-center border border-border rounded px-2 text-xs font-sans font-medium text-text-muted">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <ThemeToggle />

        {isAuthenticated && (
          <button className="relative p-2 text-text-secondary hover:bg-surface-hover hover:text-primary rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>
        )}

        {isAuthenticated && (
          <button className="hidden sm:flex items-center gap-2 bg-surface px-3 py-2 rounded-full shadow-sm border border-border-light hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            <span className="text-sm font-semibold text-text-secondary text-nowrap">New Post</span>
          </button>
        )}

        {isAuthenticated && <ProfileDropdown />}
      </div>
    </header>
  );
};

export default Header;
