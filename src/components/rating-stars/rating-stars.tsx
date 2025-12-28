import type { PropsWithChildren, ReactNode } from 'react';

import type { RatingScore } from '../../types/rating-score.ts';

type RatingStarsProps = PropsWithChildren<{
  rating: RatingScore;
  blockClassName?: 'offer' | 'reviews' | 'place-card';
}>

export function RatingStars({ rating, children, blockClassName = 'place-card' }: RatingStarsProps): ReactNode {
  const clampedRating = Math.min(5, Math.max(0, rating));
  const roundedRating = Math.round(clampedRating);
  return (
    <div className={`${blockClassName}__rating rating`}>
      <div className={`${blockClassName}__stars rating__stars`}>
        <span style={{ width: `${roundedRating * 20}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}
