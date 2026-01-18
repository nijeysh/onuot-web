import { useState } from 'react';
import { Layout, type PageType } from './components/layout';
import { HomePage, RegionalPage, HourlyPage, WeeklyPage, SettingsPage, InfoPage } from './components/pages';
import { getWeatherData } from './services/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(() => getWeatherData());
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleRefresh = () => {
    setWeatherData(getWeatherData());
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage weatherData={weatherData} />;
      case 'regional':
        return <RegionalPage />;
      case 'hourly':
        return <HourlyPage data={weatherData.hourly} />;
      case 'weekly':
        return <WeeklyPage data={weatherData.daily} />;
      case 'settings':
        return <SettingsPage />;
      case 'info':
        return <InfoPage />;
      default:
        return <HomePage weatherData={weatherData} />;
    }
  };

  return (
    <Layout
      city={weatherData.location.city}
      district={weatherData.location.district}
      updatedAt={weatherData.updatedAt}
      onRefresh={handleRefresh}
      isLoading={false}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
