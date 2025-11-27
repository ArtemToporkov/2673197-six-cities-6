import type { CommentContent } from './comment-content.ts';
import type { CommentatorInfo } from './commentator-info.ts';

export type Comment = CommentContent & {
  id: string;
  user: CommentatorInfo;
  date: Date;
};
