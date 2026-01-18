import { MapPin, RefreshCw, Menu } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

interface HeaderProps {
  city: string;
  district: string;
  onRefresh: () => void;
  isLoading: boolean;
  onMenuToggle: () => void;
  isCompact?: boolean;
}

const Header = ({ city, district, onRefresh, isLoading, onMenuToggle, isCompact = false }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        {isCompact && (
          <button
            className="menu-button"
            onClick={onMenuToggle}
            aria-label="메뉴 열기"
          >
            <Menu size={24} />
          </button>
        )}
        <h1 className="header-title">날씨</h1>
        {!isCompact && (
          <div className="header-location">
            <MapPin size={16} />
            <span>{city} {district}</span>
          </div>
        )}
      </div>
      <div className="header-right">
        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={isLoading}
          title="새로고침"
        >
          <RefreshCw size={20} className={isLoading ? 'spinning' : ''} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
