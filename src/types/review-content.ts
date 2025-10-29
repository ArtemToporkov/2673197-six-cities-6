import { RatingScore } from './rating-score.ts';

export type ReviewContent = {
  comment: string;
  score?: RatingScore;
};
