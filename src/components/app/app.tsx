import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { StatusCodes } from 'http-status-codes';

import { AppRoute } from '../../enums/app-route.ts';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page.tsx';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { MainPage } from '../../pages/main-page/main-page.tsx';
import { ErrorPage } from '../../pages/error-page/error-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { LoadingScreen } from '../loading-screen/loading-screen.tsx';
import { getFavoriteOffers, getOffers } from '../../store/offers-slice.ts';
import { AuthStatus } from '../../enums/auth-status.ts';

export function App(): ReactNode {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.user.authStatus);
  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);
  useEffect(() => {
    if (authStatus === AuthStatus.Authorized) {
      dispatch(getFavoriteOffers());
    }
  }, [authStatus, dispatch]);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);
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
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Unknown}
          element={<ErrorPage statusCode={StatusCodes.NOT_FOUND} message={'Not Found'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
