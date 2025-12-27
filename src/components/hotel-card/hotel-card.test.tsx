import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HotelCard } from './hotel-card.tsx';
import { makeOfferPreviewInfo } from '../../utils/mocks.ts';
import { userEvent } from '@testing-library/user-event';

describe('Component: HotelCard', () => {
  it('should render correct offer data', () => {
    const offer = makeOfferPreviewInfo();

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

  it('should call onMouseOver and onMouseLeave', async () => {
    const onMouseOver = vi.fn();
    const onMouseLeave = vi.fn();
    const offer = makeOfferPreviewInfo();
    render(
      <MemoryRouter>
        <HotelCard
          offer={offer}
          onBookmarkClick={vi.fn()}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      </MemoryRouter>
    );

    await userEvent.hover(screen.getByAltText('Place image'));
    await userEvent.unhover(screen.getByAltText('Place image'));

    expect(onMouseOver).toBeCalledTimes(1);
    expect(onMouseLeave).toBeCalledTimes(1);
  });

  it('should call onBookmarkClick when bookmark button is clicked', async () => {
    const onBookmarkClick = vi.fn();
    const offer = makeOfferPreviewInfo();
    render(
      <MemoryRouter>
        <HotelCard
          offer={offer}
          onBookmarkClick={onBookmarkClick}
        />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onBookmarkClick).toBeCalledTimes(1);
    expect(onBookmarkClick).toBeCalledWith(offer.id);
  });
});
