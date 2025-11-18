import type { ReactNode } from 'react';
import type { Review } from '../../types/review';
import { ReviewComponent as ReviewComponent } from '../review-component/review-component.tsx';

type ReviewsListProps = {
  reviews: Review[];
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
