import { OfferDetails } from '../../types/offer-details.ts';
import { HotelCard } from '../hotel-info/hotel-card.tsx';
import { useState } from 'react';

type OffersListProps = {
  offers: OfferDetails[];
}

export function OffersList({offers}: OffersListProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  console.log(selectedOffer);
  return (
    <>
      {offers.map((offer: OfferDetails) => (
        <HotelCard
          key={offer.id}
          {...offer}
          isPremium={offer.isPremium}
          imageUrl={offer.imageUrl}
          price={offer.price}
          hotelType={offer.hotelType}
          description={offer.description}
          onMouseOver={() => setSelectedOffer(offer.id)}
          onMouseLeave={() => (setSelectedOffer(null))}
        />
      ))}
    </>
  );
}
