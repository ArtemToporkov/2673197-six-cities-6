import { useState } from 'react';
import type { ReactNode } from 'react';

import { RatingStarsInput } from '../rating-stars-input/rating-stars-input.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import { resetError } from '../../store/error/error-slice.ts';
import { sendComment } from '../../store/api-actions.ts';
import type { CommentContent } from '../../types/comment-content.ts';
import type { ServerError } from '../../types/server-error.ts';
import type { RatingScore } from '../../types/rating-score.ts';

const MIN_COMMENT_LENGTH = 50;

type CommentContentState = Omit<CommentContent, 'rating'> & {
  rating: RatingScore | null;
}

export function CommentForm(): ReactNode {
  const [comment, setComment] = useState<CommentContentState>({ rating: null, comment: '' });
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.error) as ServerError | null;
  const offerId = useAppSelector((state) => state.offers.offer?.id);

  if (!offerId) {
    throw new Error('CommentForm can\'t be used without an offerId');
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(sendComment({ comment: comment as CommentContent, offerId: offerId }))
          .unwrap()
          .then(() => setComment({ rating: null, comment: '' }));
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingStarsInput onRatingChanged={(score) => {
        setComment({...comment, rating: score});
        dispatch(resetError());
      }}
      />
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => {
          setComment({...comment, comment: e.target.value});
          dispatch(resetError());
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.comment.length < MIN_COMMENT_LENGTH || !comment.rating}
        >
          Submit
        </button>
      </div>
      {error && error.errorType === ServerErrorType.ValidationError && (
        <div>
          <ul>
            {error.details.map((detail) => {
              const errorMessage = `${detail.property}: ${detail.messages.join(', ')}`;
              return <li key={errorMessage}>{errorMessage}</li>;
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
