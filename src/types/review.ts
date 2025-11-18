import type { ReviewContent } from './review-content.ts';
import type { ReviewerInfo } from './reviewer-info.ts';

export type Review = ReviewContent & {
  id: string;
  user: ReviewerInfo;
  date: Date;
};
