import { useState } from 'react';
import type { ReactNode } from 'react';

import { CitiesList } from '../../components/cities-list/cities-list.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { SortingTypeMenu } from '../../components/sorting-type-menu/sorting-type-menu.tsx';
import { switchCity } from '../../store/action.ts';
import type { Point } from '../../types/point.ts';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';

function mapOfferPreviewInfoToPoint(offer: OfferPreviewInfo): Point {
  return ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    key: offer.id
  });
}

export function MainPage(): ReactNode {
  const dispatch = useAppDispatch();

  const currentOffers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const cities = useAppSelector((state) => state.cities);

  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const selectedPoint = hoveredOfferId
    ? mapOfferPreviewInfoToPoint(currentOffers.find((o) => o.id === hoveredOfferId) as OfferPreviewInfo)
    : null;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={cities} onCityClick={(city) => dispatch(switchCity(city))}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
              <SortingTypeMenu />
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={currentOffers}
                  onOfferCardHover={setHoveredOfferId}
                  onOfferCardUnhover={() => setHoveredOfferId(null)}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" style={{backgroundImage: 'none'}}>
                <Map
                  city={currentCity}
                  points={currentOffers.map<Point>(mapOfferPreviewInfoToPoint)}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
