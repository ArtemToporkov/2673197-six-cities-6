import type { ReactNode } from 'react';

import type { Url } from '../../types/url.ts';

type OfferGalleryProps = {
  images: Url[];
}

export function OfferGallery({ images }: OfferGalleryProps): ReactNode {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((url) => (
          <div key={url} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={url}
              alt="Photo studio"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
