import { SEOUL_COORDS } from './weatherApi';

export type LocationSource = 'browser' | 'fallback';

export interface WeatherCoordinates {
  latitude: number;
  longitude: number;
  source: LocationSource;
  accuracy?: number;
  fallbackReason?: string;
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 600000,
};

const fallbackCoordinates = (fallbackReason: string): WeatherCoordinates => ({
  latitude: SEOUL_COORDS.latitude,
  longitude: SEOUL_COORDS.longitude,
  source: 'fallback',
  fallbackReason,
});

const getGeolocationErrorMessage = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return '위치 권한이 없어 서울 종로구 기준 날씨를 불러옵니다.';
    case error.POSITION_UNAVAILABLE:
      return '현재 위치를 확인할 수 없어 서울 종로구 기준 날씨를 불러옵니다.';
    case error.TIMEOUT:
      return '위치 확인 시간이 초과되어 서울 종로구 기준 날씨를 불러옵니다.';
    default:
      return '위치 정보를 사용할 수 없어 서울 종로구 기준 날씨를 불러옵니다.';
  }
};

export const getCurrentWeatherCoordinates = (): Promise<WeatherCoordinates> => {
  if (!navigator.geolocation) {
    return Promise.resolve(fallbackCoordinates('브라우저가 위치 정보를 지원하지 않아 서울 종로구 기준 날씨를 불러옵니다.'));
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          source: 'browser',
        });
      },
      (error) => resolve(fallbackCoordinates(getGeolocationErrorMessage(error))),
      GEOLOCATION_OPTIONS,
    );
  });
};
