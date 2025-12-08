import type { ReactNode } from 'react';

import { FavouriteCard } from '../favourite-card/favourite-card.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

type FavouritesSectionProps = {
  city: string;
  offers: OfferPreviewInfo[];
  onBookmarkClick: (offerId: string) => void;
}

export function FavouritesSection({city, offers, onBookmarkClick}: FavouritesSectionProps): ReactNode {
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
          <FavouriteCard
            offer={offer}
            key={offer.id}
            onBookmarkClick={onBookmarkClick}
          />
        ))}
      </div>
    </li>
  );
}
