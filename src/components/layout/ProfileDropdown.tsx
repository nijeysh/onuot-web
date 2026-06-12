import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SettingsTab } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { member, logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center focus:outline-none ring-2 ring-transparent hover:ring-primary/20 rounded-full transition-all"
      >
        {member?.profileImageUrl ? (
          <div
            className="size-10 rounded-full bg-cover bg-center shadow-inner"
            style={{ backgroundImage: `url("${member.profileImageUrl}")` }}
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary shadow-inner">
            <span className="material-symbols-outlined text-[22px]">person</span>
          </div>
        )}
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-border-light mb-1">
            <p className="text-sm font-bold text-text">{member?.nickname ?? 'Member'}</p>
            <p className="text-xs text-text-secondary">{member?.email ?? 'Signed in'}</p>
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
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
            >
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
