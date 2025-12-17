import { ReactNode } from 'react';
import classNames from 'classnames';

import { FavoritesSection } from '../../components/favorites-section/favorites-section.tsx';
import { AuthStatus } from '../../enums/auth-status.ts';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { setFavoriteStatus } from '../../store/api-actions.ts';
import { Header } from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { Footer } from '../../components/footer/footer.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import { FavoriteAction } from '../../enums/favorite-action.ts';

function groupOffersByCityName(offers: OfferPreviewInfo[]): Record<string, OfferPreviewInfo[]> {
  return offers.reduce((acc, item) => {
    const cityName = item.city.name;
    (acc[cityName] ||= []).push(item);
    return acc;
  }, {} as Record<string, OfferPreviewInfo[]>);
}

function getFavoritesSections(
  offersByCityName: Record<string, OfferPreviewInfo[]>,
  onBookmarkClick: (offerId: string) => void
): ReactNode[] {
  const sections: ReactNode[] = [];
  for (const [cityName, cityOffers] of Object.entries(offersByCityName)) {
    sections.push(
      <FavoritesSection
        key={cityName}
        city={cityName}
        offers={cityOffers}
        onBookmarkClick={onBookmarkClick}
      />
    );
  }
  return sections;
}

export function FavoritesPage(): ReactNode {
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);
  const authStatus = useAppSelector((state) => state.user.authStatus);
  const dispatch = useAppDispatch();
  if (authStatus !== AuthStatus.Authorized) {
    return <Navigate to={AppRoute.Login} />;
  }
  const offersByCity = groupOffersByCityName(favoriteOffers);
  const onBookmarkClick = (offerId: string) => {
    dispatch(setFavoriteStatus({ offerId, status: FavoriteAction.Remove }));
  };
  const sections = getFavoritesSections(offersByCity, onBookmarkClick);
  const isEmpty = favoriteOffers.length === 0;
  return (
    <div className="page">
      <Header />
      <main
        className={classNames(
          'page__main',
          'page__main--favorites',
          { 'page__main--favorites-empty': isEmpty }
        )}
      >
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {sections}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
