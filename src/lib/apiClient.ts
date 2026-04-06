import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from './tokenStorage';

// ────────────────────────────────────────────
// 1. Axios 인스턴스 생성
// ────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: '/api', // vite proxy → http://localhost:8080/api
  timeout: 10_000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Refresh Token(HttpOnly Cookie) 자동 전송
});

// ────────────────────────────────────────────
// 2. Request Interceptor (전처리)
//    모든 요청 헤더에 Access Token 자동 주입
// ────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ────────────────────────────────────────────
// 3. Response Interceptor (후처리)
//    401: 토큰 재발급 시도 → 실패 시 로그아웃
//    그 외: 표준 에러 형식으로 변환
// ────────────────────────────────────────────

/** 토큰 재발급 중 중복 요청을 막기 위한 플래그 */
let isRefreshing = false;

/** 재발급 대기 중인 요청들을 담아두는 큐 */
let refreshSubscribers: ((token: string) => void)[] = [];

/** 재발급 성공 시 대기 중인 요청들 재실행 */
const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

/** 대기 큐에 콜백 등록 */
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
  // ✅ 응답 성공: 그대로 통과
  (response) => response,

  // ❌ 응답 실패
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 Unauthorized → Access Token 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 재발급 중이면 → 재발급 완료 후 대기 요청 재시도
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      // 재발급 시작
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Spring 토큰 재발급 엔드포인트 호출
        // Refresh Token은 HttpOnly Cookie로 자동 전송 (withCredentials: true)
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });

        const newAccessToken: string = data.accessToken;
        tokenStorage.setAccessToken(newAccessToken);
        onRefreshed(newAccessToken);

        // 원래 요청 재실행
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch {
        // Refresh Token도 만료 → 강제 로그아웃
        tokenStorage.clearAccessToken();
        refreshSubscribers = [];
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 에러는 표준 형식으로 가공해서 던짐
    return Promise.reject(normalizeError(error));
  }
);

// ────────────────────────────────────────────
// 4. 에러 정규화
// ────────────────────────────────────────────

export interface ApiError {
  status: number;
  message: string;
  code?: string; // Spring에서 내려주는 비즈니스 에러 코드 (선택)
}

const normalizeError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Spring에서 내려온 에러 응답
    const data = error.response.data as {
      message?: string;
      code?: string;
    };
    return {
      status: error.response.status,
      message: data?.message ?? '서버 오류가 발생했습니다.',
      code: data?.code,
    };
  }

  if (error.request) {
    // 요청은 갔는데 응답이 없음 (서버 다운, 네트워크 오류)
    return {
      status: 0,
      message: '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.',
    };
  }

  // 요청 설정 자체 오류
  return {
    status: -1,
    message: error.message ?? '알 수 없는 오류가 발생했습니다.',
  };
};

export default apiClient;
