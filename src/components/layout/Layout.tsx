import { useState, useEffect, type ReactNode } from 'react';
import Header from './Header';
import Sidebar, { type PageType } from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  city: string;
  district: string;
  updatedAt: string;
  onRefresh: () => void;
  isLoading: boolean;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const COMPACT_BREAKPOINT = 768;

const Layout = ({
  children,
  city,
  district,
  updatedAt,
  onRefresh,
  isLoading,
  currentPage,
  onPageChange
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkCompact = () => {
      const compact = window.innerWidth < COMPACT_BREAKPOINT;
      setIsCompact(compact);
      if (compact) {
        setSidebarOpen(false);
      }
    };

    checkCompact();
    window.addEventListener('resize', checkCompact);
    return () => window.removeEventListener('resize', checkCompact);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handlePageChange = (page: PageType) => {
    onPageChange(page);
    if (isCompact) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Compact 모드 오버레이 */}
      {isCompact && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCompact={isCompact}
      />
      <div className={`main-wrapper ${!isCompact && sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <Header
          city={city}
          district={district}
          onRefresh={onRefresh}
          isLoading={isLoading}
          onMenuToggle={toggleSidebar}
          isCompact={isCompact}
        />
        <main className="main-content">
          {children}
        </main>
        <Footer updatedAt={updatedAt} />
      </div>
    </div>
  );
};

export default Layout;
