/**
 * Token 관리 유틸리티
 * - Access Token: 메모리(변수)에 저장 → XSS 안전
 * - Refresh Token: HttpOnly Cookie로 관리 (Spring에서 Set-Cookie)
 */

let accessToken: string | null = null;

export const tokenStorage = {
  /** Access Token 저장 (메모리) */
  setAccessToken: (token: string) => {
    accessToken = token;
  },

  /** Access Token 읽기 */
  getAccessToken: (): string | null => {
    return accessToken;
  },

  /** Access Token 삭제 (로그아웃 시) */
  clearAccessToken: () => {
    accessToken = null;
  },
};
