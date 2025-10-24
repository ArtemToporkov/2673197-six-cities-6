import { RatingScore } from './rating-score.ts';

export type Review = {
  comment: string;
  score?: RatingScore;
};
