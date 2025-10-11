import { City } from '../../enums/city.ts';
import { OfferDetails } from '../../types/offer-details.ts';
import { FavouriteCard } from '../favourite-card/favourite-card.tsx';

type FavouritesSectionProps = {
  city: City;
  offers: OfferDetails[];
}

export function FavouritesSection({city, offers}: FavouritesSectionProps): JSX.Element {
  for (const offer of offers) {
    if (offer.city !== city) {
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
            hotelInfo={{
              id: offer.id,
              hotelType: offer.hotelType,
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
