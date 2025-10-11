import { Fragment } from 'react';
import { Score } from '../../types/score.ts';

type RatingWithDescription = {
  score: Score;
  description: string;
}

type ScoreStarsProps = {
  onScoreChanged: (score: Score) => void;
}

export function ScoreStars({ onScoreChanged }: ScoreStarsProps): JSX.Element {
  const ratings = [
    {score: 5, description: 'perfect'},
    {score: 4, description: 'good'},
    {score: 3, description: 'not bad'},
    {score: 2, description: 'badly'},
    {score: 1, description: 'terribly'},
  ] as RatingWithDescription[];
  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map(({score, description}) => (
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
