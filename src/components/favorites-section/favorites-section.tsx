import type { ReactNode } from 'react';

import { HotelCard } from '../hotel-card/hotel-card.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

type FavoritesSectionProps = {
  city: string;
  offers: OfferPreviewInfo[];
  onBookmarkClick: (offerId: string) => void;
}

export function FavoritesSection({city, offers, onBookmarkClick}: FavoritesSectionProps): ReactNode {
  for (const offer of offers) {
    if (offer.city.name !== city) {
      throw new Error(`City mismatch on offer: ${JSON.stringify(offer)}`);
    }
  }
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <HotelCard
            key={offer.id}
            offer={offer}
            blockClassName="favorites"
            offerPreviewImageWidth={150}
            offerPreviewImageHeight={110}
            onBookmarkClick={onBookmarkClick}
          />
        ))}
      </div>
    </li>
  );
}
