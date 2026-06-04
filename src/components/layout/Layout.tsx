import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigation } from '../../contexts/NavigationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentPage } = useNavigation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDashboard = currentPage === 'dashboard';

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const storageKey = `weather-app-scroll-${currentPage}`;
    const storedScrollTop = Number(window.sessionStorage.getItem(storageKey) ?? 0);

    const restoreScroll = () => {
      container.scrollTop = storedScrollTop;
    };

    restoreScroll();
    const frameId = window.requestAnimationFrame(restoreScroll);
    const timeoutId = window.setTimeout(restoreScroll, 500);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [currentPage]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    window.sessionStorage.setItem(`weather-app-scroll-${currentPage}`, String(container.scrollTop));
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden font-display ${!isDashboard ? 'bg-bg' : 'bg-transparent text-white'}`}>
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
