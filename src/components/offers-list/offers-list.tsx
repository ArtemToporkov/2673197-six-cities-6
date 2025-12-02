import type { ReactNode } from 'react';

import { HotelCard } from '../hotel-card/hotel-card.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

type OffersListProps = {
  offers: OfferPreviewInfo[];
  onOfferCardHover: (hoveredOfferId: string) => void;
  onOfferCardUnhover: () => void;
}

export function OffersList({offers, onOfferCardHover, onOfferCardUnhover}: OffersListProps): ReactNode {
  return (
    <>
      {offers.map((offer: OfferPreviewInfo) => (
        <HotelCard
          key={offer.id}
          {...offer}
          isPremium={offer.isPremium}
          previewImage={offer.previewImage}
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
