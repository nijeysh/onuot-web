import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SettingsTab } from '../../types/navigation';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSettingsClick = (tab: SettingsTab) => {
    navigate(`/settings/${tab}`);
    setIsProfileOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center focus:outline-none ring-2 ring-transparent hover:ring-primary/20 rounded-full transition-all"
      >
        <div
          className="size-10 rounded-full bg-cover bg-center shadow-inner"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkrvkO03WFaE-c0oiUIwrSbt-ersICX9U_U4ioac899RuYREzEdhUH52Qks-5VWPBcYV4ejbOKIh1TBkbJSo6pFDQMXFwOkIXAv7YWcUzozQQKX6a50G7gCUAWDO9Fz4786lR4wnHAr1ZCny2WaL9IHfXemeCSjy6NmPLfjTDRMLV5RCjM2-Ni9kNn6ODcc_jV5ALv-YcFaS3ZKfCzEW-K6Og7wMuEdUgUHtarnvdsnnfO7DP61eA6i3WpdtfHQ9DzkD3yNTSOTdnk")' }}
        ></div>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-border-light mb-1">
            <p className="text-sm font-bold text-text">Sarah J.</p>
            <p className="text-xs text-text-secondary">sarah@example.com</p>
          </div>
          <button
            onClick={() => handleSettingsClick('account')}
            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            Profile & Account
          </button>
          <button
            onClick={() => handleSettingsClick('general')}
            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            General Settings
          </button>
          <button
            onClick={() => handleSettingsClick('notifications')}
            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            Notifications
          </button>
          <div className="border-t border-border-light mt-1 pt-1">
            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
