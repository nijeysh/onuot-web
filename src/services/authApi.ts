import apiClient from '../lib/apiClient';
import { tokenStorage } from '../lib/tokenStorage';

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
  tokenStorage.clearAccessToken();
};

export const getMyProfile = async () => {
  const { data } = await apiClient.get('/members/me');
  return data;
};
