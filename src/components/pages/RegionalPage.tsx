import { MapPin, Thermometer } from 'lucide-react';
import WeatherIcon from '../common/WeatherIcon';
import type { WeatherCondition } from '../../types/weather';

interface RegionWeather {
  name: string;
  temperature: number;
  condition: WeatherCondition;
}

const RegionalPage = () => {
  const regions: RegionWeather[] = [
    { name: '서울', temperature: 22, condition: 'partly-cloudy' },
    { name: '인천', temperature: 21, condition: 'cloudy' },
    { name: '수원', temperature: 23, condition: 'clear' },
    { name: '대전', temperature: 24, condition: 'clear' },
    { name: '대구', temperature: 26, condition: 'clear' },
    { name: '부산', temperature: 23, condition: 'partly-cloudy' },
    { name: '광주', temperature: 25, condition: 'partly-cloudy' },
    { name: '울산', temperature: 24, condition: 'cloudy' },
    { name: '제주', temperature: 22, condition: 'rain' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <MapPin size={24} />
        <h2>지역별 날씨</h2>
      </div>
      <div className="regional-grid">
        {regions.map((region) => (
          <div key={region.name} className="regional-card">
            <h3 className="regional-name">{region.name}</h3>
            <WeatherIcon condition={region.condition} size={40} />
            <div className="regional-temp">
              <Thermometer size={16} />
              <span>{region.temperature}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalPage;
