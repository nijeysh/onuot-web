import apiClient from '../lib/apiClient';
import type { WeatherCondition, WeatherData } from '../types/weather';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  code?: string;
  message?: string;
}

type BackendCondition =
  | 'CLEAR'
  | 'PARTLY_CLOUDY'
  | 'CLOUDY'
  | 'OVERCAST'
  | 'RAIN'
  | 'HEAVY_RAIN'
  | 'SNOW'
  | 'SLEET'
  | 'FOG'
  | 'THUNDERSTORM'
  | 'UNKNOWN'
  | string
  | null;

interface BackendWeatherData {
  location: WeatherData['location'] | null;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    condition: BackendCondition;
    description: string | null;
    pm10: number | null;
    pm25: number | null;
    uvIndex: number | null;
  } | null;
  hourly: Array<{
    time: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: BackendCondition;
    description: string | null;
    precipitation: number;
    precipitationProbability: number;
  }>;
  daily: Array<{
    date: string;
    minTemp: number;
    maxTemp: number;
    condition: BackendCondition;
    description: string | null;
    precipitation: number;
    precipitationProbability: number;
  }>;
  updatedAt: string | null;
}

const DEFAULT_LOCATION = {
  latitude: 37.5735,
  longitude: 126.9788,
  city: '서울특별시',
  district: '종로구',
};

export const SEOUL_COORDS = {
  latitude: DEFAULT_LOCATION.latitude,
  longitude: DEFAULT_LOCATION.longitude,
};

const toWeatherCondition = (condition: BackendCondition): WeatherCondition => {
  switch (condition) {
    case 'CLEAR':
      return 'sunny';
    case 'PARTLY_CLOUDY':
      return 'partly_cloudy';
    case 'CLOUDY':
    case 'OVERCAST':
      return 'cloudy';
    case 'RAIN':
    case 'HEAVY_RAIN':
    case 'SLEET':
      return 'rainy';
    case 'SNOW':
      return 'snowy';
    case 'THUNDERSTORM':
      return 'stormy';
    case 'FOG':
      return 'foggy';
    default:
      return 'cloudy';
  }
};

const formatHour = (time: string) => {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return time;
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const getDayOfWeek = (dateText: string, index: number) => {
  if (index === 0) return '오늘';
  if (index === 1) return '내일';

  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText;
  return date.toLocaleDateString('ko-KR', { weekday: 'short' });
};

const normalizeWeatherData = (data: BackendWeatherData): WeatherData => ({
  location: data.location ?? DEFAULT_LOCATION,
  current: {
    temperature: data.current?.temperature ?? 0,
    feelsLike: data.current?.feelsLike ?? data.current?.temperature ?? 0,
    humidity: data.current?.humidity ?? 0,
    windSpeed: data.current?.windSpeed ?? 0,
    condition: toWeatherCondition(data.current?.condition ?? null),
    description: data.current?.description ?? '날씨 정보 없음',
    pm10: data.current?.pm10 ?? null,
    pm25: data.current?.pm25 ?? null,
    uvIndex: data.current?.uvIndex ?? null,
  },
  hourly: data.hourly.map((item) => ({
    time: formatHour(item.time),
    temperature: item.temperature,
    condition: toWeatherCondition(item.condition),
    description: item.description ?? '',
    precipitation: item.precipitation,
    precipProbability: item.precipitationProbability,
    humidity: item.humidity,
    windSpeed: item.windSpeed,
  })),
  daily: data.daily.map((item, index) => ({
    date: item.date,
    dayOfWeek: getDayOfWeek(item.date, index),
    minTemp: item.minTemp,
    maxTemp: item.maxTemp,
    condition: toWeatherCondition(item.condition),
    description: item.description ?? '',
    precipitation: item.precipitation,
    precipProbability: item.precipitationProbability,
  })),
  updatedAt: data.updatedAt ?? new Date().toISOString(),
});

export const getWeatherData = async (
  latitude = SEOUL_COORDS.latitude,
  longitude = SEOUL_COORDS.longitude,
): Promise<WeatherData> => {
  const { data } = await apiClient.get<ApiResponse<BackendWeatherData>>('/weather', {
    params: { latitude, longitude },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message ?? '날씨 정보를 불러오지 못했습니다.');
  }

  return normalizeWeatherData(data.data);
};
