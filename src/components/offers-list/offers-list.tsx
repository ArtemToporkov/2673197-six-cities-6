import { memo, useCallback } from 'react';
import type { ReactNode } from 'react';

import { HotelCard } from '../hotel-card/hotel-card.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

type OffersListProps = {
  offers: OfferPreviewInfo[];
  onOfferCardHover: (hoveredOfferId: string) => void;
  onOfferCardUnhover: () => void;
  onBookmarkClick: (offerId: string) => void;
}

function OffersListComponent({offers, onOfferCardHover, onOfferCardUnhover, onBookmarkClick}: OffersListProps): ReactNode {
  const handleCardUnhover = useCallback(() => onOfferCardUnhover(), [onOfferCardUnhover]);

  return (
    <>
      {offers.map((offer: OfferPreviewInfo) => {
        const handleCardHover = () => onOfferCardHover(offer.id);
        return (
          <HotelCard
            key={offer.id}
            {...offer}
            isPremium={offer.isPremium}
            previewImage={offer.previewImage}
            price={offer.price}
            type={offer.type}
            title={offer.title}
            onMouseOver={handleCardHover}
            onMouseLeave={handleCardUnhover}
            onBookmarkClick={onBookmarkClick}
          />
        );
      })}
    </>
  );
}

export const OffersList = memo(OffersListComponent);
