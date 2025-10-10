import { Offer } from '../../types/offer.ts';
import { HotelInfo } from '../hotel-info/hotel-info.tsx';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
}

export function OffersList({offers}: OffersListProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
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
          onMouseOver={() => setSelectedOffer(offer.id)}
          onMouseLeave={() => (setSelectedOffer(null))}
        />
      ))}
    </>
  );
}
