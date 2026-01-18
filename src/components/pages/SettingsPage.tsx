import { Settings, Moon, Sun, Bell, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-container">
      <div className="page-header">
        <Settings size={24} />
        <h2>설정</h2>
      </div>
      <div className="settings-list">
        <div className="settings-item">
          <div className="settings-item-info">
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            <div className="settings-item-text">
              <span className="settings-item-label">다크 모드</span>
              <span className="settings-item-desc">어두운 테마를 사용합니다</span>
            </div>
          </div>
          <button
            className={`settings-toggle ${theme === 'dark' ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            <span className="settings-toggle-slider" />
          </button>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <Bell size={20} />
            <div className="settings-item-text">
              <span className="settings-item-label">날씨 알림</span>
              <span className="settings-item-desc">기상 특보 알림을 받습니다</span>
            </div>
          </div>
          <button className="settings-toggle">
            <span className="settings-toggle-slider" />
          </button>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <MapPin size={20} />
            <div className="settings-item-text">
              <span className="settings-item-label">위치 서비스</span>
              <span className="settings-item-desc">현재 위치 기반 날씨 정보</span>
            </div>
          </div>
          <button className="settings-toggle active">
            <span className="settings-toggle-slider" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
