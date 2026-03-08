export type PageType = 'dashboard' | 'calendar' | 'chat' | 'ootd' | 'settings';

interface MenuItem {
  icon: string;
  label: string;
  page: PageType;
  badge?: number;
}

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const menuItems: MenuItem[] = [
    { icon: 'grid_view', label: 'Dashboard', page: 'dashboard' },
    { icon: 'calendar_month', label: 'Calendar', page: 'calendar' },
    { icon: 'forum', label: 'Chat', page: 'chat', badge: 3 },
    { icon: 'checkroom', label: 'OOTD', page: 'ootd' },
    { icon: 'settings', label: 'Settings', page: 'settings' },
  ];

  return (
    <aside className="w-20 lg:w-64 flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full transition-all duration-300 z-20 shrink-0">
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined text-[28px]">cloud</span>
          </div>
          <span className="ml-3 text-xl font-bold tracking-tight hidden lg:block text-slate-800 dark:text-slate-100">APPS</span>
        </div>

        {/* User Profile (Compact) */}
        <div className="p-4 flex flex-col items-center lg:items-start border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 w-full">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 ring-2 ring-white dark:ring-slate-700 shadow-sm"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkrvkO03WFaE-c0oiUIwrSbt-ersICX9U_U4ioac899RuYREzEdhUH52Qks-5VWPBcYV4ejbOKIh1TBkbJSo6pFDQMXFwOkIXAv7YWcUzozQQKX6a50G7gCUAWDO9Fz4786lR4wnHAr1ZCny2WaL9IHfXemeCSjy6NmPLfjTDRMLV5RCjM2-Ni9kNn6ODcc_jV5ALv-YcFaS3ZKfCzEW-K6Og7wMuEdUgUHtarnvdsnnfO7DP61eA6i3WpdtfHQ9DzkD3yNTSOTdnk")' }}
            ></div>
            <div className="flex-col hidden lg:flex">
              <h1 className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-tight">Sarah J.</h1>
              <p className="text-slate-500 text-xs font-medium">San Francisco, CA</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${currentPage === item.page
                ? 'bg-primary/10 text-primary'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentPage === item.page ? 'fill-current' : ''}`}>
                {item.icon}
              </span>
              <span className={`text-sm hidden lg:block ${currentPage === item.page ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden lg:block">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
