import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HotelCard } from './hotel-card.tsx';
import { makeOfferPreviewInfo } from '../../utils/mocks.ts';

describe('Component: HotelCard', () => {
  const offer = makeOfferPreviewInfo();

  it('should render correct offer data', () => {
    render(
      <MemoryRouter>
        <HotelCard
          offer={offer}
          onBookmarkClick={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`€${offer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
    expect(screen.getByAltText(/Place image/i)).toHaveAttribute('src', offer.previewImage);
  });

  it('should render Premium label if offer is premium', () => {
    const premiumOffer = makeOfferPreviewInfo({ isPremium: true });

    render(
      <MemoryRouter>
        <HotelCard
          offer={premiumOffer}
          onBookmarkClick={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
