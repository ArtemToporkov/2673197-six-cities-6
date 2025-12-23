import { generatePath, Link } from 'react-router-dom';
import type { ReactNode } from 'react';

import { AppRoute } from '../../enums/app-route.ts';
import { PremiumLabel } from '../premium-label/premium-label.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import { BookmarkButton } from '../bookmark-button/bookmark-button.tsx';

type FavoriteCardProps = {
  offer: OfferPreviewInfo;
  onBookmarkClick: (offerId: string) => void;
}

export function FavoriteCard({
  offer: { id, isPremium, previewImage, price, title, type },
  onBookmarkClick
}: FavoriteCardProps): ReactNode {
  return (
    <article className="favorites__card place-card">
      {isPremium && <PremiumLabel />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id: id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>
          <BookmarkButton active onClick={() => onBookmarkClick(id)}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '100%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: id })}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
