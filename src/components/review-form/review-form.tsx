import { Review } from '../../types/review.ts';
import { ReactNode, useState } from 'react';
import { ScoreStars } from '../score-stars/score-stars.tsx';

export function ReviewForm(): ReactNode {
  const [review, setReview] = useState<Review>({ score: undefined, comment: '' });
  const minCommentLength = 50;
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ScoreStars onScoreChanged={(score) => setReview({...review, score: score})} />
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => setReview({...review, comment: e.target.value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{minCommentLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.comment.length < minCommentLength || review.score === undefined}
          onClick={() => {
            // TODO: отправить форму
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
