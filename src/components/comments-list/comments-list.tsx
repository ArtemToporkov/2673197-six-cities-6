import type { ReactNode } from 'react';

import { CommentComponent as CommentComponent } from '../comment-component/comment-component.tsx';
import type { Comment } from '../../types/comment.ts';

type ReviewsListProps = {
  comments: Comment[];
}

export function CommentsList({comments}: ReviewsListProps): ReactNode {
  return (
    <ul className="reviews__list">
      {comments.map<ReactNode>((comment) => (
        <li className="reviews__item" key={comment.id}>
          <CommentComponent
            comment={comment}
          />
        </li>
      ))}
    </ul>
  );
}
