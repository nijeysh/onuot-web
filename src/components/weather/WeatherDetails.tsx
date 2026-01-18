import { Droplets, Wind, Thermometer, Sun } from 'lucide-react';
import { WiDust } from 'react-icons/wi';
import type { CurrentWeather } from '../../types/weather';
import { getAirQualityGrade, getAirQualityLabel } from '../../types/weather';

interface WeatherDetailsProps {
  data: CurrentWeather;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const pm10Grade = getAirQualityGrade(data.pm10);
  const pm25Grade = getAirQualityGrade(data.pm25);

  const detailItems = [
    {
      icon: <Droplets size={24} />,
      label: '습도',
      value: `${data.humidity}%`,
      color: '#42A5F5'
    },
    {
      icon: <Wind size={24} />,
      label: '풍속',
      value: `${data.windSpeed}m/s`,
      color: '#78909C'
    },
    {
      icon: <Thermometer size={24} />,
      label: '체감온도',
      value: `${data.feelsLike}°C`,
      color: '#EF5350'
    },
    {
      icon: <Sun size={24} />,
      label: '자외선',
      value: data.uvIndex <= 2 ? '낮음' : data.uvIndex <= 5 ? '보통' : data.uvIndex <= 7 ? '높음' : '매우높음',
      color: '#FFB300'
    },
    {
      icon: <WiDust size={28} />,
      label: '미세먼지',
      value: getAirQualityLabel(pm10Grade),
      subValue: `${data.pm10}㎍/㎥`,
      color: pm10Grade === 'good' ? '#4CAF50' : pm10Grade === 'moderate' ? '#FFB300' : '#EF5350'
    },
    {
      icon: <WiDust size={28} />,
      label: '초미세먼지',
      value: getAirQualityLabel(pm25Grade),
      subValue: `${data.pm25}㎍/㎥`,
      color: pm25Grade === 'good' ? '#4CAF50' : pm25Grade === 'moderate' ? '#FFB300' : '#EF5350'
    }
  ];

  return (
    <div className="weather-details">
      <h3 className="section-title">상세 정보</h3>
      <div className="weather-details-grid">
        {detailItems.map((item, index) => (
          <div key={index} className="weather-detail-item">
            <div className="detail-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="detail-content">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
              {item.subValue && (
                <span className="detail-subvalue">{item.subValue}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
