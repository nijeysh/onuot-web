export interface OutfitRecommendationItem {
  category: string;
  description: string;
  reason: string;
}

export interface OutfitRecommendation {
  outfits: OutfitRecommendationItem[];
  actions: OutfitRecommendationItem[];
  cautions: string[];
  reasons: string[];
}

export interface OutfitRecommendationRequest {
  temperature: number;
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  precipitationProbability?: number;
  uvIndex?: number | null;
  condition?: string;
}
