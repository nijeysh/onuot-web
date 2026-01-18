import { Droplets } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import type { HourlyWeather } from '../../types/weather';

interface HourlyForecastProps {
  data: HourlyWeather[];
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  return (
    <div className="hourly-forecast">
      <h3 className="section-title">시간별 예보</h3>
      <div className="hourly-forecast-grid">
        {data.map((hour, index) => (
          <div key={index} className="hourly-forecast-item">
            <span className="hourly-time">{index === 0 ? '지금' : hour.time}</span>
            <WeatherIcon condition={hour.condition} size={28} />
            <span className="hourly-temp">{hour.temperature}°</span>
            <div className="hourly-precip">
              <Droplets size={12} />
              <span>{hour.precipProbability}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
