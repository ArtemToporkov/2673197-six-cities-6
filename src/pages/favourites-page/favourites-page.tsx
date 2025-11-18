import { ReactNode } from 'react';

import { FavouritesSection } from '../../components/favourites-section/favourites-section.tsx';
import { CityName } from '../../enums/city-name.ts';
import { OfferDetails } from '../../types/offer-details.ts';

type FavouritesPageProps = {
  favouriteOffers: OfferDetails[];
}

function groupOffersByCityName(offers: OfferDetails[]): Record<CityName, OfferDetails[]> {
  return offers.reduce((acc, item) => {
    if (item.isFavourite) {
      const cityName = item.city.name;
      (acc[cityName] ||= []).push(item);
    }
    return acc;
  }, {} as Record<CityName, OfferDetails[]>);
}

function getFavouritesSections(offersByCityName: Record<CityName, OfferDetails[]>): ReactNode[] {
  const sections: ReactNode[] = [];
  for (const [cityName, cityOffers] of Object.entries(offersByCityName) as [CityName, OfferDetails[]][]) {
    sections.push(
      <FavouritesSection
        key={cityName}
        cityName={cityName}
        offers={cityOffers}
      />
    );
  }
  return sections;
}

export function FavouritesPage({favouriteOffers}: FavouritesPageProps): ReactNode {
  const offersByCity = groupOffersByCityName(favouriteOffers);
  const sections = getFavouritesSections(offersByCity);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
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
