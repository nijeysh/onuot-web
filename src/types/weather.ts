// 날씨 상태 타입
export type WeatherCondition =
  | 'sunny'
  | 'partly_cloudy'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'foggy'
  | 'cyclone';

// 현재 날씨 데이터
export interface CurrentWeather {
  temperature: number;        // 현재 온도 (°C)
  feelsLike: number;          // 체감 온도 (°C)
  humidity: number;           // 습도 (%)
  windSpeed: number;          // 풍속 (m/s)
  condition: WeatherCondition;
  description: string;        // 날씨 설명
  pm10?: number | null;       // 미세먼지 (μg/m³)
  pm25?: number | null;       // 초미세먼지 (μg/m³)
  uvIndex?: number | null;    // 자외선 지수
}

// 시간별 날씨 데이터
export interface HourlyWeather {
  time: string;               // 시간 (HH:00)
  temperature: number;
  condition: WeatherCondition;
  description: string;
  precipitation: number;
  precipProbability: number;  // 강수 확률 (%)
  humidity: number;
  windSpeed: number;
}

// 일별 날씨 데이터
export interface DailyWeather {
  date: string;               // 날짜 (YYYY-MM-DD)
  dayOfWeek: string;          // 요일
  minTemp: number;            // 최저 기온
  maxTemp: number;            // 최고 기온
  condition: WeatherCondition;
  description: string;
  precipitation: number;
  precipProbability: number;  // 강수 확률 (%)
}

// 위치 정보
export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
}

// 전체 날씨 데이터
export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather[];    // 24시간 데이터
  daily: DailyWeather[];      // 7일 데이터
  updatedAt: string;          // 업데이트 시간
}

// 미세먼지 등급
export type AirQualityGrade = 'good' | 'moderate' | 'unhealthy' | 'veryUnhealthy';

export const getAirQualityGrade = (pm10: number): AirQualityGrade => {
  if (pm10 <= 30) return 'good';
  if (pm10 <= 80) return 'moderate';
  if (pm10 <= 150) return 'unhealthy';
  return 'veryUnhealthy';
};

export const getAirQualityLabel = (grade: AirQualityGrade): string => {
  const labels: Record<AirQualityGrade, string> = {
    good: '좋음',
    moderate: '보통',
    unhealthy: '나쁨',
    veryUnhealthy: '매우나쁨'
  };
  return labels[grade];
};
