import { Bell, Lock, User, Globe } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { SettingsTab } from '../../types/navigation';
import { SETTINGS_TABS } from '../../types/navigation';
import { GeneralTab, AccountTab, NotificationsTab, PrivacyTab } from './settings';

const settingsTabs = Object.values(SETTINGS_TABS) as SettingsTab[];

const isSettingsTab = (value: string | undefined): value is SettingsTab => {
  return settingsTabs.includes(value as SettingsTab);
};

const SettingsPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = isSettingsTab(tab) ? tab : SETTINGS_TABS.GENERAL;

  useEffect(() => {
    if (!isSettingsTab(tab)) {
      navigate(`/settings/${SETTINGS_TABS.GENERAL}`, { replace: true });
    }
  }, [navigate, tab]);

  const onTabChange = (nextTab: SettingsTab) => {
    navigate(`/settings/${nextTab}`);
  };

  const menuItems = [
    { id: SETTINGS_TABS.GENERAL, label: 'General', icon: Globe, desc: 'Language, theme, units' },
    { id: SETTINGS_TABS.ACCOUNT, label: 'Account', icon: User, desc: 'Profile, security, payment' },
    { id: SETTINGS_TABS.NOTIFICATIONS, label: 'Notifications', icon: Bell, desc: 'Alerts, email settings' },
    { id: SETTINGS_TABS.PRIVACY, label: 'Privacy', icon: Lock, desc: 'Data sharing, visibility' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case SETTINGS_TABS.GENERAL:
        return <GeneralTab />;
      case SETTINGS_TABS.ACCOUNT:
        return <AccountTab />;
      case SETTINGS_TABS.NOTIFICATIONS:
        return <NotificationsTab />;
      case SETTINGS_TABS.PRIVACY:
        return <PrivacyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-8 py-4">
      {/* Settings Menu Column */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div>
          <h2 className="text-3xl font-black text-text tracking-tight">Settings</h2>
          <p className="text-sm text-text-secondary font-medium mt-1">Manage your dashboard preferences</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${activeTab === item.id
                ? 'bg-surface shadow-lg shadow-primary/5 border border-primary/10'
                : 'hover:bg-surface-hover border border-transparent'
                }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${activeTab === item.id ? 'bg-primary text-white' : 'bg-surface text-text-muted group-hover:text-text'}`}>
                <item.icon size={20} />
              </div>
              <div>
                <span className={`block text-sm font-bold ${activeTab === item.id ? 'text-primary' : 'text-text'}`}>
                  {item.label}
                </span>
                <span className="text-xs text-text-secondary font-medium mt-0.5 leading-tight">
                  {item.desc}
                </span>
              </div>
            </button>
          ))}
        </nav>

        {/* Info Card / Storage */}
        <div className="p-6 bg-surface border border-border-light rounded-[32px] space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Storage</span>
            <span className="text-xs font-bold text-text">7.5 GB / 10 GB</span>
          </div>
          <div className="h-1.5 w-full bg-border-light rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%] rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]"></div>
          </div>
          <p className="text-[10px] text-text-secondary font-medium leading-relaxed">
            You've used 75% of your available storage. Upgrading gives you unlimited forecast history.
          </p>
          <button className="w-full py-2 bg-text text-bg text-[11px] font-black rounded-xl hover:opacity-90 transition-opacity">
            UPGRADE NOW
          </button>
        </div>
      </div>

      {/* Settings Content Column */}
      <div className="flex-1 bg-surface/40 backdrop-blur-sm border border-border-light rounded-[40px] p-6 lg:p-10">
        <header className="mb-10 pb-6 border-b border-border-light">
          <h2 className="text-2xl font-black text-text capitalize">{activeTab} Settings</h2>
          <p className="text-sm text-text-secondary font-medium mt-1">
            {activeTab === SETTINGS_TABS.GENERAL && 'Adjust your language, appearance, and regional formatting.'}
            {activeTab === SETTINGS_TABS.ACCOUNT && 'Update your personal information and account security.'}
            {activeTab === SETTINGS_TABS.NOTIFICATIONS && 'Configure how and when you want to be notified.'}
            {activeTab === SETTINGS_TABS.PRIVACY && 'Manage your data privacy and application permissions.'}
          </p>
        </header>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
