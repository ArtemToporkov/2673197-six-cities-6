import { OfferDetails } from '../../types/offer-details.ts';
import { HotelCard } from '../hotel-card/hotel-card.tsx';
import { ReactNode, useState } from 'react';

type OffersListProps = {
  offers: OfferDetails[];
  onOfferCardHover: (hoveredOfferId: string) => void;
  onOfferCardUnhover: () => void;
}

export function OffersList({offers, onOfferCardHover, onOfferCardUnhover}: OffersListProps): ReactNode {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  return (
    <>
      {offers.map((offer: OfferDetails) => (
        <HotelCard
          key={offer.id}
          {...offer}
          isPremium={offer.isPremium}
          imageUrl={offer.imageUrl}
          price={offer.price}
          type={offer.type}
          title={offer.title}
          onMouseOver={() => {
            setSelectedOffer(offer.id);
            onOfferCardHover(offer.id);
          }}
          onMouseLeave={() => {
            setSelectedOffer(null);
            onOfferCardUnhover();
          }}
        />
      ))}
    </>
  );
}
