import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesPage } from './favorites-page.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore, makeOfferPreviewInfo, makeCity, makeUserInfo } from '../../utils/mocks.ts';
import { AuthStatus } from '../../enums/auth-status.ts';

describe('Component: FavoritesPage', () => {
  it('should render empty state when no favorite offers', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
      makeStore({
        user: { authStatus: AuthStatus.Authorized, info: makeUserInfo() },
        offers: { ...makeStore().offers, favoriteOffers: [] }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render favorite offers grouped by city', () => {
    const city1 = makeCity({ name: 'Paris' });
    const city2 = makeCity({ name: 'Cologne' });
    const offer1 = makeOfferPreviewInfo({ city: city1, isFavorite: true });
    const offer2 = makeOfferPreviewInfo({ city: city2, isFavorite: true });

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
      makeStore({
        user: { authStatus: AuthStatus.Authorized, info: makeUserInfo() },
        offers: { ...makeStore().offers, favoriteOffers: [offer1, offer2] }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(city1.name)).toBeInTheDocument();
    expect(screen.getByText(city2.name)).toBeInTheDocument();
    expect(screen.getByText(offer1.title)).toBeInTheDocument();
    expect(screen.getByText(offer2.title)).toBeInTheDocument();
  });
});
