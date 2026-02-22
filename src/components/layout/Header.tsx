import ThemeToggle from '../common/ThemeToggle';

const Header = () => {
  return (
    <header className="h-20 shrink-0 px-6 lg:px-10 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 sticky top-0 border-b border-slate-100 dark:border-slate-800">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm text-sm transition-all"
            placeholder="Search city, user, or event..."
            type="text"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <kbd className="inline-flex items-center border border-slate-200 dark:border-slate-700 rounded px-2 text-xs font-sans font-medium text-slate-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <ThemeToggle />

        <button className="relative p-2 text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-primary rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        <button className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-colors">
          <span className="material-symbols-outlined text-primary">add_circle</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-nowrap">New Post</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
