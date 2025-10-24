import { HotelInfo } from '../../types/hotel-info.ts';
import { PremiumLabel } from '../premium-label/premium-label.tsx';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';

type FavouriteCardProps = {
  hotelInfo: HotelInfo;
}

export function FavouriteCard({
  hotelInfo: { id, isPremium, imageUrl, price, title, type },
}: FavouriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {isPremium && <PremiumLabel />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id: id })}>
          <img
            className="place-card__image"
            src={imageUrl}
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
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
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
