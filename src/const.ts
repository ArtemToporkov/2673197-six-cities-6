import type { RatingScore } from './types/rating-score.ts';

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const AUTH_HEADER_NAME = 'X-Token';

type RatingWithDescription = {
  rating: RatingScore;
  description: string;
}

export const RATINGS: RatingWithDescription[] = [
  { rating: 5, description: 'perfect' },
  { rating: 4, description: 'good' },
  { rating: 3, description: 'not bad' },
  { rating: 2, description: 'badly' },
  { rating: 1, description: 'terribly' },
];
