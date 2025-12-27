import type { ReactNode } from 'react';

import { CommentsList } from '../comments-list/comments-list.tsx';
import { CommentForm } from '../comment-form/comment-form.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import type { Comment } from '../../types/comment.ts';

type OfferReviewsProps = {
  comments: Comment[];
}

export function OfferReviews({ comments }: OfferReviewsProps): ReactNode {
  const authStatus = useAppSelector((state) => state.user.authStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <CommentsList comments={comments} />
      {authStatus === AuthStatus.Authorized && <CommentForm />}
    </section>
  );
}
