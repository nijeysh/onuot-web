import WeatherIcon, { getWeatherLabel } from '../common/WeatherIcon';
import type { CurrentWeather as CurrentWeatherType } from '../../types/weather';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <div className="current-weather">
      <div className="current-weather-main">
        <WeatherIcon condition={data.condition} size={80} className="current-weather-icon" />
        <div className="current-weather-temp">
          <span className="temperature">{data.temperature}</span>
          <span className="temperature-unit">°C</span>
        </div>
      </div>
      <p className="current-weather-description">{data.description}</p>
      <p className="current-weather-condition">{getWeatherLabel(data.condition)}</p>
      <div className="current-weather-feels">
        체감 온도 <strong>{data.feelsLike}°C</strong>
      </div>
    </div>
  );
};

export default CurrentWeather;
