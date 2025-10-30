﻿import { OfferDetails } from '../../types/offer-details.ts';
import { HotelCard } from '../hotel-card/hotel-card.tsx';
import { ReactNode } from 'react';

type OffersListProps = {
  offers: OfferDetails[];
  onOfferCardHover: (hoveredOfferId: string) => void;
  onOfferCardUnhover: () => void;
}

export function OffersList({offers, onOfferCardHover, onOfferCardUnhover}: OffersListProps): ReactNode {
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
          onMouseOver={() => onOfferCardHover(offer.id)}
          onMouseLeave={() => onOfferCardUnhover()}
        />
      ))}
    </>
  );
}
