/**
 * 인증 관련 API 예시
 * - 실제 사용 시 이런 식으로 apiClient를 import해서 씁니다
 */

import apiClient from '../lib/apiClient';
import { tokenStorage } from '../lib/tokenStorage';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  // refreshToken은 HttpOnly Cookie로 Spring이 Set-Cookie 헤더로 내려줌
}

/** 로그인 */
export const login = async (credentials: LoginRequest): Promise<void> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  tokenStorage.setAccessToken(data.accessToken);
};

/** 로그아웃 */
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout'); // 서버에서 Refresh Token Cookie 삭제
  tokenStorage.clearAccessToken();
};

/** 내 정보 조회 예시 */
export const getMyProfile = async () => {
  const { data } = await apiClient.get('/users/me');
  return data;
};
