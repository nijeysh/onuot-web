import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, CloudSun } from 'lucide-react';
import type { WeatherCondition } from '../../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ condition, size = 24, className = '' }: WeatherIconProps) => {
  const iconProps = { size, className };

  const icons: Record<WeatherCondition, React.ReactNode> = {
    'clear': <Sun {...iconProps} color="#FFB300" />,
    'cloudy': <Cloud {...iconProps} color="#90A4AE" />,
    'partly-cloudy': <CloudSun {...iconProps} color="#FFA726" />,
    'rain': <CloudRain {...iconProps} color="#42A5F5" />,
    'snow': <CloudSnow {...iconProps} color="#90CAF9" />,
    'thunderstorm': <CloudLightning {...iconProps} color="#7E57C2" />,
    'fog': <CloudFog {...iconProps} color="#B0BEC5" />,
    'drizzle': <CloudDrizzle {...iconProps} color="#4FC3F7" />
  };

  return <>{icons[condition] || <Cloud {...iconProps} />}</>;
};

export const getWeatherLabel = (condition: WeatherCondition): string => {
  const labels: Record<WeatherCondition, string> = {
    'clear': '맑음',
    'cloudy': '흐림',
    'partly-cloudy': '구름조금',
    'rain': '비',
    'snow': '눈',
    'thunderstorm': '뇌우',
    'fog': '안개',
    'drizzle': '이슬비'
  };
  return labels[condition] || '알 수 없음';
};

export default WeatherIcon;
