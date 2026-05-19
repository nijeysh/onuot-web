import apiClient from '../lib/apiClient';
import type { WeatherCondition } from '../components/common/WeatherIcon';

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

interface BackendCalendarWeatherDay {
  date: string;
  condition: BackendCondition;
  minTemp: number | null;
  maxTemp: number | null;
  precipitation: number | null;
  precipitationProbability: number | null;
}

interface BackendCalendarWeatherResponse {
  year: number;
  month: number;
  days: BackendCalendarWeatherDay[];
}

export interface CalendarWeatherDay {
  date: string;
  condition: WeatherCondition | null;
  minTemp: number | null;
  maxTemp: number | null;
  precipitation: number | null;
  precipitationProbability: number | null;
}

export interface CalendarWeatherData {
  year: number;
  month: number;
  days: CalendarWeatherDay[];
}

const toWeatherCondition = (condition: BackendCondition): WeatherCondition | null => {
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
      return null;
  }
};

const normalizeCalendarWeather = (data: BackendCalendarWeatherResponse): CalendarWeatherData => ({
  year: data.year,
  month: data.month,
  days: data.days.map((day) => ({
    date: day.date,
    condition: toWeatherCondition(day.condition),
    minTemp: day.minTemp,
    maxTemp: day.maxTemp,
    precipitation: day.precipitation,
    precipitationProbability: day.precipitationProbability,
  })),
});

export const getCalendarWeather = async (
  year: number,
  month: number,
  latitude: number,
  longitude: number,
): Promise<CalendarWeatherData> => {
  const { data } = await apiClient.get<ApiResponse<BackendCalendarWeatherResponse>>('/calendar/weather', {
    params: { year, month, latitude, longitude },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message ?? 'Unable to load calendar weather.');
  }

  return normalizeCalendarWeather(data.data);
};
