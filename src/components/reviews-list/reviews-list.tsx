import { ReactNode } from 'react';
import { Review } from '../../types/review';
import { Review as ReviewComponent } from '../review/review.tsx';

type ReviewsListProps = {
  reviews: Review[];
}

export function ReviewsList({reviews}: ReviewsListProps): ReactNode {
  return (
    <ul className="reviews__list">
      {reviews.map<ReactNode>((review) => (
        <li key={review.id}>
          <ReviewComponent
            review={review}
          />
        </li>
      ))}
    </ul>
  );
}
