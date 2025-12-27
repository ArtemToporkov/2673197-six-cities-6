import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { FavoritesSection } from './favorites-section.tsx';
import { makeCity, makeOfferPreviewInfo } from '../../utils/mocks.ts';

describe('Component: FavoritesSection', () => {
  it('should render city name and offers for that city', () => {
    const city = makeCity({ name: 'Paris' });
    const offers = [
      makeOfferPreviewInfo({ city }),
      makeOfferPreviewInfo({ city })
    ];

    render(
      <MemoryRouter>
        <FavoritesSection
          city={city.name}
          offers={offers}
          onBookmarkClick={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(city.name)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(offers.length);
  });
});
