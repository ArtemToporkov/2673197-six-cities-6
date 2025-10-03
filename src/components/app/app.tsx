import { MainPage } from '../../pages/main-page/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page.tsx';
import { OfferPage } from '../../pages/offer-page/offer-page.tsx';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { AuthStatus } from '../../enums/auth-status.ts';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page.tsx';

type AppProps = {
  placesCount: number;
}

export function App({placesCount}: AppProps): JSX.Element {
  // return <MainPage placesCount={placesCount} />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage placesCount={placesCount} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/offer/:id' element={<OfferPage />} />
      </Routes>
      <Routes>
        <Route
          path='/favourites'
          element={
            <PrivateRoute authStatus={AuthStatus.NotAuthorized}>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
