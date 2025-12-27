import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeOfferPreviewInfo, makeStore, makeUserInfo } from '../../utils/mocks.ts';
import { AuthStatus } from '../../enums/auth-status.ts';

describe('Component: Header', () => {
  it('should render "Sign in" when user is not authorized', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      makeStore({ user: { authStatus: AuthStatus.Unauthorized, info: null } })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render user email and "Sign out" when user is authorized', () => {
    const userInfo = makeUserInfo();
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      makeStore({
        user: { authStatus: AuthStatus.Authorized, info: userInfo },
        offers: { ...makeStore().offers, favoriteOffers: [] }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(userInfo.email)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render favorites count', () => {
    const userInfo = makeUserInfo();
    const favoriteOffers = Array.from({ length: 3 }, () =>
      makeOfferPreviewInfo({isFavorite: true}));
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      makeStore({
        user: { authStatus: AuthStatus.Authorized, info: userInfo },
        offers: { ...makeStore().offers, favoriteOffers }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(favoriteOffers.length.toString())).toBeInTheDocument();
  });
});
