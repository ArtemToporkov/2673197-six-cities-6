import { MainPage } from '../../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { AuthStatus } from '../../enums/auth-status.ts';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page.tsx';
import { AppRoute } from '../../enums/app-route.ts';

type AppProps = {
  placesCount: number;
}

export function App({placesCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage placesCount={placesCount} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
      </Routes>
      <Routes>
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute authStatus={AuthStatus.NotAuthorized}>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Routes>
        <Route path={AppRoute.Unknown} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
