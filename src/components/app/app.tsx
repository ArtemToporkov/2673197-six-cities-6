import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';

import { AppRoute } from '../../enums/app-route.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page.tsx';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { MainPage } from '../../pages/main-page/main-page.tsx';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';

export function App(): ReactNode {
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
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Unknown} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
