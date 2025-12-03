import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';

import { AppRoute } from '../../enums/app-route.ts';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page.tsx';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { MainPage } from '../../pages/main-page/main-page.tsx';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { getOffers } from '../../store/action.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { LoadingScreen } from '../loading-screen/loading-screen.tsx';

export function App(): ReactNode {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  if (isOffersLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Unknown} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
