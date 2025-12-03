import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ReactNode } from 'react';

import { HostCard } from '../../components/host-card/host-card.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { PremiumLabel } from '../../components/premium-label/premium-label.tsx';
import { CommentForm } from '../../components/comment-form/comment-form.tsx';
import { CommentsList } from '../../components/comments-list/comments-list.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { getOffer } from '../../store/action.ts';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import type { Point } from '../../types/point.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { NotFoundPage } from '../not-found-page/not-found-page.tsx';

function mapOfferPreviewInfoToPoint(offerDetails: OfferPreviewInfo): Point {
  return ({
    latitude: offerDetails.location.latitude,
    longitude: offerDetails.location.longitude,
    key: offerDetails.id
  });
}

export function OfferPage(): ReactNode {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>() as { id: string };
  useEffect(() => {
    dispatch(getOffer(id));
  }, [id, dispatch]);

  const offer = useAppSelector((state) => state.offer);
  const currentCity = useAppSelector((state) => state.city);
  const comments = useAppSelector((state) => state.comments);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const error = useAppSelector((state) => state.error);

  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const hoveredOffer = nearbyOffers.find((o) => o.id === hoveredOfferId);

  const selectedPoint: Point | null = hoveredOfferId && hoveredOffer
    ? mapOfferPreviewInfoToPoint(hoveredOffer)
    : null;

  if (error) {
    return <NotFoundPage message={error.message} />;
  }

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    throw new Error('If offer is not loading, it can\'t be undefined or null');
  }

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
              {offer.images.map((url) => (
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
              {offer.isPremium && <PremiumLabel />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
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
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods
                    .map((g) => (
                      <li key={g} className="offer__inside-item">{g}</li>
                    ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <HostCard hostInfo={offer.host}/>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{comments.length}</span>
                </h2>
                <CommentsList comments={comments} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{ backgroundImage: 'none' }}>
            <Map
              city={currentCity}
              points={nearbyOffers.map<Point>(mapOfferPreviewInfoToPoint)}
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
