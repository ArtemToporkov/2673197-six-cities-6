import type { ReactNode } from 'react';

import { FavouriteCard } from '../favourite-card/favourite-card.tsx';
import type { CityName } from '../../enums/city-name.ts';
import type { OfferDetails } from '../../types/offer-details.ts';

type FavouritesSectionProps = {
  cityName: CityName;
  offers: OfferDetails[];
}

export function FavouritesSection({cityName, offers}: FavouritesSectionProps): ReactNode {
  for (const offer of offers) {
    if (offer.city.name !== cityName) {
      throw new Error(`City mismatch on offer: ${JSON.stringify(offer)}`);
    }
  }
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavouriteCard
            hotelInfo={{
              id: offer.id,
              type: offer.type,
              title: offer.title,
              description: offer.description,
              price: offer.price,
              isPremium: offer.isPremium,
              imageUrl: offer.imageUrl,
            }}
            key={offer.id}
          />
        ))}
      </div>
    </li>
  );
}
