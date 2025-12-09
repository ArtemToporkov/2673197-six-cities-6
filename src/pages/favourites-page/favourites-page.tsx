import { ReactNode } from 'react';

import { FavouritesSection } from '../../components/favourites-section/favourites-section.tsx';
import { AuthStatus } from '../../enums/auth-status.ts';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { removeOfferFromFavourites } from '../../store/offers-slice.ts';
import { Header } from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

function groupOffersByCityName(offers: OfferPreviewInfo[]): Record<string, OfferPreviewInfo[]> {
  return offers.reduce((acc, item) => {
    const cityName = item.city.name;
    (acc[cityName] ||= []).push(item);
    return acc;
  }, {} as Record<string, OfferPreviewInfo[]>);
}

function getFavouritesSections(
  offersByCityName: Record<string, OfferPreviewInfo[]>,
  onBookmarkClick: (offerId: string) => void
): ReactNode[] {
  const sections: ReactNode[] = [];
  for (const [cityName, cityOffers] of Object.entries(offersByCityName)) {
    sections.push(
      <FavouritesSection
        key={cityName}
        city={cityName}
        offers={cityOffers}
        onBookmarkClick={onBookmarkClick}
      />
    );
  }
  return sections;
}

export function FavouritesPage(): ReactNode {
  const favouriteOffers = useAppSelector((state) => state.offers.favouriteOffers);
  const authStatus = useAppSelector((state) => state.user.authStatus);
  const dispatch = useAppDispatch();
  if (authStatus !== AuthStatus.Authorized) {
    return <Navigate to={AppRoute.Login} />;
  }
  const offersByCity = groupOffersByCityName(favouriteOffers);
  const onBookmarkClick = (offerId: string) => {
    dispatch(removeOfferFromFavourites({offerId}));
  };
  const sections = getFavouritesSections(offersByCity, onBookmarkClick);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {sections}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}
