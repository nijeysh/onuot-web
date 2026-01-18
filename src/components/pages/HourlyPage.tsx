import { Clock, Droplets } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import type { HourlyWeather } from '../../types/weather';

interface HourlyPageProps {
  data: HourlyWeather[];
}

const HourlyPage = ({ data }: HourlyPageProps) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <Clock size={24} />
        <h2>시간별 예보</h2>
      </div>
      <div className="hourly-detail-list">
        {data.map((hour, index) => (
          <div key={index} className="hourly-detail-item">
            <span className="hourly-detail-time">
              {index === 0 ? '지금' : hour.time}
            </span>
            <WeatherIcon condition={hour.condition} size={32} />
            <span className="hourly-detail-temp">{hour.temperature}°C</span>
            <div className="hourly-detail-info">
              <div className="hourly-detail-precip">
                <Droplets size={14} />
                <span>강수 {hour.precipProbability}%</span>
              </div>
              <div className="hourly-detail-humidity">
                <span>습도 {hour.humidity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyPage;
