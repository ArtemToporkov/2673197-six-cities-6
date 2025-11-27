import type { RatingScore } from './rating-score.ts';

export type CommentContent = {
  comment: string;
  rating: RatingScore | null;
};
