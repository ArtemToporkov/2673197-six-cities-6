import { HotelInfo } from '../../types/hotel-info.ts';
import { PremiumLabel } from '../premium-label/premium-label.tsx';

type FavouriteCardProps = {
  hotelInfo: HotelInfo;
}

export function FavouriteCard({
  hotelInfo: { isPremium, imageUrl, price, description, hotelType },
}: FavouriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {isPremium && <PremiumLabel />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={imageUrl}
            width={150}
            height={110}
            alt="Place image"
          />
        </a>
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
          <a href="#">{description}</a>
        </h2>
        <p className="place-card__type">{hotelType}</p>
      </div>
    </article>
  );
}
