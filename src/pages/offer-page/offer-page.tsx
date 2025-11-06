import { PremiumLabel } from '../../components/premium-label/premium-label.tsx';
import { Good } from '../../enums/good.ts';
import { useParams } from 'react-router-dom';
import { offers } from '../../mocks/offers.ts';
import { NotFoundPage } from '../not-found-page/not-found-page.tsx';
import { ReviewForm } from '../../components/review-form/review-form.tsx';
import { HostCard } from '../../components/host-card/host-card.tsx';
import { ReactNode, useState } from 'react';
import { ReviewsList } from '../../components/reviews-list/reviews-list.tsx';
import { reviews } from '../../mocks/reviews.ts';
import { Map } from '../../components/map/map.tsx';
import { cities } from '../../mocks/cities.ts';
import { Point } from '../../types/point.ts';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { OfferDetails } from '../../types/offer-details.ts';

function mapOfferDetailsToPoint(offerDetails: OfferDetails): Point {
  return ({
    latitude: offerDetails.location.latitude,
    longitude: offerDetails.location.longitude,
    key: offerDetails.id
  });
}

export function OfferPage(): ReactNode {
  const nearbyOffers = offers.slice(0, 3);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const selectedPoint: Point | null = hoveredOfferId
    ? mapOfferDetailsToPoint(offers.find((o) => o.id === hoveredOfferId) as OfferDetails)
    : null;

  const { id } = useParams<{ id: string }>();
  const offer = offers.find((of) => of.id === id);
  if (offer === undefined) {
    return <NotFoundPage />;
  }
  const {
    title,
    rating,
    isPremium,
    bedroomsCount,
    maxAdultsCount,
    type,
    price,
    goods,
    images,
    hostInfo,
    description
  } = offer;

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
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((url) => (
                <div key={url} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={url}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <PremiumLabel />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsCount} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdultsCount} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(Object.keys(goods) as Good[])
                    .filter((am) => goods[am])
                    .map((am) => (
                      <li key={am} className="offer__inside-item">{am}</li>
                    ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <HostCard hostInfo={hostInfo} />
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{ backgroundImage: 'none' }}>
            <Map
              city={cities.Amsterdam}
              points={nearbyOffers.map<Point>((o) => ({
                latitude: o.location.latitude,
                longitude: o.location.longitude,
                key: o.id
              }))}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={nearbyOffers}
                onOfferCardHover={setHoveredOfferId}
                onOfferCardUnhover={() => setHoveredOfferId(null)}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
