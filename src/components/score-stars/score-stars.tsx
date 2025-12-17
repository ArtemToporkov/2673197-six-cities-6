import { Fragment } from 'react';
import type { ReactNode } from 'react';

import { RATINGS } from '../../const.ts';
import type { RatingScore } from '../../types/rating-score.ts';

type ScoreStarsProps = {
  onScoreChanged: (score: RatingScore) => void;
}

export function ScoreStars({ onScoreChanged }: ScoreStarsProps): ReactNode {
  return (
    <div className="reviews__rating-form form__rating">
      {RATINGS.map(({score, description}) => (
        <Fragment key={score}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={score}
            id={`${score}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${score}-stars`}
            className="reviews__rating-label form__rating-label"
            title={description}
            aria-label={description}
          >
            <svg className="form__star-image" width="37" height="33" onClick={() => onScoreChanged(score)}>
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}
