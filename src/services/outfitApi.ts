import apiClient from '../lib/apiClient';
import type { OutfitRecommendation, OutfitRecommendationRequest } from '../types/outfit';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  code?: string;
  message?: string;
}

const compactParams = (request: OutfitRecommendationRequest) => {
  return Object.fromEntries(
    Object.entries(request).filter(([, value]) => value !== undefined && value !== null),
  );
};

export const getTodayOutfitRecommendation = async (
  request: OutfitRecommendationRequest,
): Promise<OutfitRecommendation> => {
  const { data } = await apiClient.get<ApiResponse<OutfitRecommendation>>('/outfits/recommend/today', {
    params: compactParams(request),
  });

  if (!data.success || !data.data) {
    throw new Error(data.message ?? '추천 정보를 불러오지 못했습니다.');
  }

  return data.data;
};
