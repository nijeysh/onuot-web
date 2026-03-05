import { useState } from 'react';
import { Layout, type PageType } from './components/layout';
import { Dashboard, CalendarPage, ChatPage, OOTDPage, SettingsPage } from './components/pages';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <CalendarPage />;
      case 'chat':
        return <ChatPage />;
      case 'ootd':
        return <OOTDPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
