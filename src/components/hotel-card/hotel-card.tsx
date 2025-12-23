import { generatePath, Link } from 'react-router-dom';
import { memo } from 'react';
import type { ReactNode } from 'react';

import { AppRoute } from '../../enums/app-route.ts';
import { PremiumLabel } from '../premium-label/premium-label.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import { BookmarkButton } from '../bookmark-button/bookmark-button.tsx';

type HotelInfoProps = OfferPreviewInfo & {
  onMouseOver: () => void;
  onMouseLeave: () => void;
  onBookmarkClick: (offerId: string) => void;
};

function HotelCardComponent({
  id,
  isPremium = false,
  previewImage,
  price,
  type,
  title,
  onMouseOver,
  onMouseLeave,
  isFavorite,
  onBookmarkClick
}: HotelInfoProps): ReactNode {
  return (
    <article className="cities__card place-card">
      {isPremium && <PremiumLabel />}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id: id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton active={isFavorite ?? false} onClick={() => onBookmarkClick(id)} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: id })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export const HotelCard = memo(HotelCardComponent);
