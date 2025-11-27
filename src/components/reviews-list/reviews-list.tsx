import type { ReactNode } from 'react';

import { ReviewComponent as ReviewComponent } from '../review-component/review-component.tsx';
import type { Comment } from '../../types/comment.ts';

type ReviewsListProps = {
  reviews: Comment[];
}

export function ReviewsList({reviews}: ReviewsListProps): ReactNode {
  return (
    <ul className="reviews__list">
      {reviews.map<ReactNode>((review) => (
        <li className="reviews__item" key={review.id}>
          <ReviewComponent
            review={review}
          />
        </li>
      ))}
    </ul>
  );
}
