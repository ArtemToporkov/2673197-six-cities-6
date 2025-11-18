import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../enums/app-route.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page.tsx';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { MainPage } from '../../pages/main-page/main-page.tsx';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { OfferDetails } from '../../types/offer-details.ts';
import { PrivateRoute } from '../private-route/private-route.tsx';

type AppProps = {
  offers: OfferDetails[];
}

export function App({offers}: AppProps): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute authStatus={AuthStatus.Authorized}>
              <FavouritesPage favouriteOffers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Unknown} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
