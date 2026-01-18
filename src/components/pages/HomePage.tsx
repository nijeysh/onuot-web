import { CurrentWeather, HourlyForecast, WeeklyForecast, WeatherDetails } from '../weather';
import type { WeatherData } from '../../types/weather';

interface HomePageProps {
  weatherData: WeatherData;
}

const HomePage = ({ weatherData }: HomePageProps) => {
  return (
    <div className="weather-container">
      <div className="weather-main">
        <CurrentWeather data={weatherData.current} />
        <WeatherDetails data={weatherData.current} />
      </div>
      <div className="weather-forecasts">
        <HourlyForecast data={weatherData.hourly} />
        <WeeklyForecast data={weatherData.daily} />
      </div>
    </div>
  );
};

export default HomePage;
