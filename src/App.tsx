import Layout from './components/layout/Layout';
import { Dashboard, CalendarPage, ChatPage, OOTDPage, SettingsPage } from './components/pages';
import { PAGE_TYPES } from './types/navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case PAGE_TYPES.DASHBOARD:
        return <Dashboard />;
      case PAGE_TYPES.CALENDAR:
        return <CalendarPage />;
      case PAGE_TYPES.CHAT:
        return <ChatPage />;
      case PAGE_TYPES.OOTD:
        return <OOTDPage />;
      case PAGE_TYPES.SETTINGS:
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
