import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigation } from '../../contexts/NavigationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentPage } = useNavigation();
  const isDashboard = currentPage === 'dashboard';

  return (
    <div className={`flex h-screen w-full overflow-hidden font-display ${!isDashboard ? 'bg-bg' : 'bg-transparent text-white'}`}>
      <Sidebar />
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
