import { Link, NavLink } from 'react-router-dom';
import { tokenStorage } from '../../lib/tokenStorage';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
  badge?: number;
}

const Sidebar = () => {
  const isAuthenticated = Boolean(tokenStorage.getAccessToken());
  const menuItems: MenuItem[] = [
    { icon: 'partly_cloudy_day', label: 'Weather', path: '/' },
    { icon: 'calendar_month', label: 'Calendar', path: '/calendar' },
    { icon: 'chat', label: 'Chat', path: '/chat' },
    { icon: 'checkroom', label: 'OOTD', path: '/ootd' },
  ];

  return (
    <aside className="w-20 lg:w-64 flex flex-col justify-between bg-surface border-r border-border h-full transition-all duration-300 z-20 shrink-0">
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border-light">
          <Link
            to="/"
            className="flex items-center rounded-lg transition-colors hover:text-primary focus:outline-none"
            aria-label="Go to weather"
          >
            <span className="bg-primary/20 p-2 rounded-lg text-primary">
              <span className="material-symbols-outlined text-[28px]">cloud</span>
            </span>
            <span className="ml-3 text-xl font-bold tracking-tight hidden lg:block text-text">APPS</span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="p-4 flex flex-col items-center lg:items-start border-b border-border-light">
            <div className="flex items-center gap-3 w-full">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 ring-2 ring-surface shadow-sm"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkrvkO03WFaE-c0oiUIwrSbt-ersICX9U_U4ioac899RuYREzEdhUH52Qks-5VWPBcYV4ejbOKIh1TBkbJSo6pFDQMXFwOkIXAv7YWcUzozQQKX6a50G7gCUAWDO9Fz4786lR4wnHAr1ZCny2WaL9IHfXemeCSjy6NmPLfjTDRMLV5RCjM2-Ni9kNn6ODcc_jV5ALv-YcFaS3ZKfCzEW-K6Og7wMuEdUgUHtarnvdsnnfO7DP61eA6i3WpdtfHQ9DzkD3yNTSOTdnk")' }}
              ></div>
              <div className="flex-col hidden lg:flex">
                <h1 className="text-text text-sm font-semibold leading-tight">Sarah J.</h1>
                <p className="text-text-secondary text-xs font-medium">San Francisco, CA</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text'
                }`}
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-current' : ''}`}>
                {item.icon}
                  </span>
                  <span className={`text-sm hidden lg:block ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden lg:block">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
