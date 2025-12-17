import type { RatingScore } from './types/rating-score.ts';

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const AUTH_HEADER_NAME = 'X-Token';

type RatingWithDescription = {
  score: RatingScore;
  description: string;
}

export const RATINGS: RatingWithDescription[] = [
  { score: 5, description: 'perfect' },
  { score: 4, description: 'good' },
  { score: 3, description: 'not bad' },
  { score: 2, description: 'badly' },
  { score: 1, description: 'terribly' },
];
