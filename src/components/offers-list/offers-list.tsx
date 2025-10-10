import { Offer } from '../../types/offer.ts';
import { HotelCard } from '../hotel-info/hotel-card.tsx';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
}

export function OffersList({offers}: OffersListProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  console.log(selectedOffer);
  return (
    <>
      {offers.map((offer: Offer) => (
        <HotelCard
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
