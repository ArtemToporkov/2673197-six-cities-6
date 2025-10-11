import { Score } from './score.ts';

export type Review = {
  comment: string;
  score?: Score;
};
