import { useState } from 'react';
import type { ReactNode } from 'react';

import { CitiesList } from '../../components/cities-list/cities-list.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { SortingTypeMenu } from '../../components/sorting-type-menu/sorting-type-menu.tsx';
import { Header } from '../../components/header/header.tsx';
import type { Point } from '../../types/point.ts';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import { switchCity } from '../../store/cities-slice.ts';

function mapOfferPreviewInfoToPoint(offer: OfferPreviewInfo): Point {
  return ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    key: offer.id
  });
}

export function MainPage(): ReactNode {
  const dispatch = useAppDispatch();

  const currentOffers = useAppSelector((state) => state.offers.offersInCity);
  const currentCity = useAppSelector((state) => state.cities.city);
  const cities = useAppSelector((state) => state.cities.cities);

  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const selectedPoint = hoveredOfferId
    ? mapOfferPreviewInfoToPoint(currentOffers.find((o) => o.id === hoveredOfferId) as OfferPreviewInfo)
    : null;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={cities} onCityClick={(city) => dispatch(switchCity(city))}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {currentCity?.name}</b>
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
