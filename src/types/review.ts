import { ReviewContent } from './review-content.ts';
import { ReviewerInfo } from './reviewer-info.ts';

export type Review = ReviewContent & {
  id: string;
  user: ReviewerInfo;
  date: Date;
};
