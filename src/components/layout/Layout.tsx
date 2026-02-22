import Sidebar from './Sidebar';
import Header from './Header';
import type { PageType } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
