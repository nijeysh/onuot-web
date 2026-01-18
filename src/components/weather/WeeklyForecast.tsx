import { Droplets } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import type { DailyWeather } from '../../types/weather';

interface WeeklyForecastProps {
  data: DailyWeather[];
}

const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  return (
    <div className="weekly-forecast">
      <h3 className="section-title">주간 예보</h3>
      <div className="weekly-forecast-list">
        {data.map((day, index) => (
          <div key={index} className="weekly-forecast-item">
            <span className="weekly-day">{day.dayOfWeek}</span>
            <div className="weekly-icon">
              <WeatherIcon condition={day.condition} size={32} />
            </div>
            <div className="weekly-precip">
              <Droplets size={14} />
              <span>{day.precipProbability}%</span>
            </div>
            <div className="weekly-temps">
              <span className="weekly-temp-min">{day.minTemp}°</span>
              <div className="weekly-temp-bar">
                <div
                  className="weekly-temp-range"
                  style={{
                    left: `${((day.minTemp + 10) / 50) * 100}%`,
                    right: `${100 - ((day.maxTemp + 10) / 50) * 100}%`
                  }}
                />
              </div>
              <span className="weekly-temp-max">{day.maxTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
