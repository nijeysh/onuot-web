import { ChevronLeft, ChevronRight, Home, Map, Clock, Calendar, Settings, Info, X } from 'lucide-react';

export type PageType = 'home' | 'regional' | 'hourly' | 'weekly' | 'settings' | 'info';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isCompact?: boolean;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  page: PageType;
}

const Sidebar = ({ isOpen, onToggle, currentPage, onPageChange, isCompact = false }: SidebarProps) => {
  const menuItems: MenuItem[] = [
    { icon: <Home size={20} />, label: '홈', page: 'home' },
    { icon: <Map size={20} />, label: '지역별 날씨', page: 'regional' },
    { icon: <Clock size={20} />, label: '시간별 예보', page: 'hourly' },
    { icon: <Calendar size={20} />, label: '주간 예보', page: 'weekly' },
    { icon: <Settings size={20} />, label: '설정', page: 'settings' },
    { icon: <Info size={20} />, label: '정보', page: 'info' }
  ];

  const handleMenuClick = (e: React.MouseEvent, page: PageType) => {
    e.preventDefault();
    onPageChange(page);
  };

  const sidebarClass = isCompact
    ? `sidebar sidebar-compact ${isOpen ? 'sidebar-compact-open' : ''}`
    : `sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  return (
    <aside className={sidebarClass}>
      {isCompact ? (
        <div className="sidebar-compact-header">
          <span className="sidebar-compact-title">메뉴</span>
          <button
            className="sidebar-close"
            onClick={onToggle}
            aria-label="메뉴 닫기"
          >
            <X size={24} />
          </button>
        </div>
      ) : (
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isOpen ? '사이드바 접기' : '사이드바 펼치기'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      )}

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.page}>
              <a
                href={`#${item.page}`}
                className={`sidebar-menu-item ${currentPage === item.page ? 'active' : ''}`}
                title={item.label}
                onClick={(e) => handleMenuClick(e, item.page)}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                {(isOpen || isCompact) && <span className="sidebar-menu-label">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
