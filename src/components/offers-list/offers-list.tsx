import { Offer } from '../../types/offer.ts';
import { HotelInfo } from '../hotel-info/hotel-info.tsx';

type OffersListProps = {
  offers: Offer[];
}

export function OffersList({offers}: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer: Offer) => (
        <HotelInfo
          key={offer.id}
          isPremium={offer.isPremium}
          imageSrc={offer.imageUrl}
          price={offer.price}
          hotelType={offer.hotelType}
          name={offer.name}
        />
      ))}
    </>
  );
}
