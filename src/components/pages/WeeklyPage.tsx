import { Calendar, Droplets } from 'lucide-react';
import WeatherIcon, { getWeatherLabel } from '../common/WeatherIcon';
import type { DailyWeather } from '../../types/weather';

interface WeeklyPageProps {
  data: DailyWeather[];
}

const WeeklyPage = ({ data }: WeeklyPageProps) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <Calendar size={24} />
        <h2>주간 예보</h2>
      </div>
      <div className="weekly-detail-list">
        {data.map((day, index) => (
          <div key={index} className="weekly-detail-item">
            <div className="weekly-detail-date">
              <span className="weekly-detail-day">{day.dayOfWeek}</span>
              <span className="weekly-detail-full-date">{day.date}</span>
            </div>
            <div className="weekly-detail-weather">
              <WeatherIcon condition={day.condition} size={40} />
              <span className="weekly-detail-condition">
                {getWeatherLabel(day.condition)}
              </span>
            </div>
            <div className="weekly-detail-temps">
              <span className="weekly-detail-max">{day.maxTemp}°</span>
              <span className="weekly-detail-min">{day.minTemp}°</span>
            </div>
            <div className="weekly-detail-precip">
              <Droplets size={16} />
              <span>{day.precipProbability}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPage;
