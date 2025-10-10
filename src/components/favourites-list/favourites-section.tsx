import { City } from '../../enums/city.ts';
import { Offer } from '../../types/offer.ts';
import { FavouriteCard } from '../favourite-card/favourite-card.tsx';

type FavouritesSectionProps = {
  city: City;
  offers: Offer[];
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
              hotelType: offer.hotelType,
              name: offer.name,
              price: offer.price,
              isPremium: offer.isPremium,
              imageSrc: offer.imageUrl,
            }}
            key={offer.id}
          />
        ))}
      </div>
    </li>
  );
}
