import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { CitiesList } from '../../components/cities-list/cities-list.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { cities } from '../../mocks/cities.ts';
import { offers } from '../../mocks/offers.ts';
import { CityName } from '../../enums/city-name.ts';
import { switchCityWithOffers } from '../../store/action.ts';
import { store } from '../../store';
import type { OfferDetails } from '../../types/offer-details.ts';
import type { Point } from '../../types/point.ts';

function mapOfferDetailsToPoint(offerDetails: OfferDetails): Point {
  return ({
    latitude: offerDetails.location.latitude,
    longitude: offerDetails.location.longitude,
    key: offerDetails.id
  });
}

const onCityClick = async (city: CityName) => {
  // TODO: заменить на запрос к серверу
  await new Promise((resolve) => setTimeout(resolve, 100));
  store.dispatch(switchCityWithOffers({
    city: city,
    offers: city === CityName.Amsterdam ? offers : []
  }));
};

export function MainPage(): ReactNode {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // TODO: заменить на запрос к серверу
    dispatch(switchCityWithOffers({city: CityName.Paris, offers: []}));
  });
  const currentOffers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const selectedPoint = hoveredOfferId
    ? mapOfferDetailsToPoint(currentOffers.find((o) => o.id === hoveredOfferId) as OfferDetails)
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
          <CitiesList cities={Object.values(CityName)} onCityClick={onCityClick}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
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
                  city={cities.Amsterdam}
                  points={currentOffers.map<Point>((o) => mapOfferDetailsToPoint(o))}
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
