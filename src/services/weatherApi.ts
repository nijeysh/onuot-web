import type { WeatherData, WeatherCondition, HourlyWeather, DailyWeather } from '../types/weather';

// 샘플 날씨 데이터 생성
export const getWeatherData = (): WeatherData => {
  const now = new Date();

  // 현재 시간을 기준으로 24시간 데이터 생성
  const hourlyData: HourlyWeather[] = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now);
    hour.setHours(now.getHours() + i);
    const hourNum = hour.getHours();

    // 시간대별 온도 변화 (낮에 높고 밤에 낮음)
    const baseTemp = 18;
    const tempVariation = hourNum >= 6 && hourNum <= 18
      ? Math.sin((hourNum - 6) / 12 * Math.PI) * 8
      : -3;

    return {
      time: `${hourNum.toString().padStart(2, '0')}:00`,
      temperature: Math.round(baseTemp + tempVariation),
      condition: i < 6 ? 'clear' : i < 12 ? 'partly-cloudy' : i < 18 ? 'cloudy' : 'clear',
      precipProbability: i >= 12 && i <= 15 ? 30 : 10,
      humidity: Math.round(50 + Math.random() * 20)
    };
  });

  // 7일 예보 데이터 생성
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weeklyConditions: WeatherCondition[] = ['clear', 'partly-cloudy', 'cloudy', 'rain', 'partly-cloudy', 'clear', 'clear'];

  const dailyData: DailyWeather[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      dayOfWeek: i === 0 ? '오늘' : i === 1 ? '내일' : dayNames[date.getDay()],
      minTemp: 12 + Math.floor(i / 2),
      maxTemp: 22 + Math.floor(i / 3),
      condition: weeklyConditions[i],
      precipProbability: i === 3 ? 80 : i === 2 ? 40 : 10
    };
  });

  return {
    location: {
      latitude: 37.5636,
      longitude: 126.9976,
      city: '서울특별시',
      district: '중구'
    },
    current: {
      temperature: 22,
      feelsLike: 24,
      humidity: 55,
      windSpeed: 2.5,
      condition: 'partly-cloudy',
      description: '구름 조금',
      pm10: 45,
      pm25: 25,
      uvIndex: 6
    },
    hourly: hourlyData,
    daily: dailyData,
    updatedAt: now.toISOString()
  };
};
