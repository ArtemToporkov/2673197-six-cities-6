import type { ReactNode } from 'react';

import { OffersList } from '../offers-list/offers-list.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

type NearPlacesProps = {
  offers: OfferPreviewInfo[];
  onOfferCardHover: (id: string) => void;
  onOfferCardUnhover: () => void;
  onBookmarkClick: (id: string) => void;
}

export function NearPlaces({ offers, onOfferCardHover, onOfferCardUnhover, onBookmarkClick }: NearPlacesProps): ReactNode {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          <OffersList
            offers={offers}
            onOfferCardHover={onOfferCardHover}
            onOfferCardUnhover={onOfferCardUnhover}
            onBookmarkClick={onBookmarkClick}
          />
        </div>
      </section>
    </div>
  );
}
