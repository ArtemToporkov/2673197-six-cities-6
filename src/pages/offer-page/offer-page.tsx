import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HostCard } from '../../components/host-card/host-card.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersList } from '../../components/offers-list/offers-list.tsx';
import { PremiumLabel } from '../../components/premium-label/premium-label.tsx';
import { CommentForm } from '../../components/comment-form/comment-form.tsx';
import { CommentsList } from '../../components/comments-list/comments-list.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { addOfferToFavourites, getOffer } from '../../store/offers-slice.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { ErrorPage } from '../error-page/error-page.tsx';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { AppRoute } from '../../enums/app-route.ts';
import { BookmarkButton } from '../../components/bookmark-button/bookmark-button.tsx';
import { Header } from '../../components/header/header.tsx';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import type { Point } from '../../types/point.ts';

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

  const navigate = useNavigate();

  const offer = useAppSelector((state) => state.offers.offer);
  const currentCity = useAppSelector((state) => state.cities.city);
  const comments = useAppSelector((state) => state.offers.comments);
  const nearbyOffers = useAppSelector((state) => state.offers.nearbyOffers);
  const isOfferLoading = useAppSelector((state) => state.offers.isOfferLoading);
  const error = useAppSelector((state) => state.error);
  const user = useAppSelector((state) => state.user);

  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const hoveredOffer = nearbyOffers.find((o) => o.id === hoveredOfferId);

  const selectedPoint: Point | null = useMemo(() => {
    if (!hoveredOfferId || !hoveredOffer) {
      return null;
    }
    return mapOfferPreviewInfoToPoint(hoveredOffer);
  }, [hoveredOfferId, hoveredOffer]);

  if (error && error.errorType === ServerErrorType.CommonError) {
    return <ErrorPage />;
  }

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    throw new Error('If offer is not loading, it can\'t be undefined or null');
  }

  const onBookmarkClick = (offerId: string) => {
    if (user.authStatus === AuthStatus.Authorized) {
      dispatch(addOfferToFavourites({ offerId }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <div className="page">
      <Header />
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
              {offer.isPremium && <PremiumLabel blockClassName='offer' />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <BookmarkButton
                  active={offer.isFavorite ?? false}
                  onClick={() => onBookmarkClick(offer.id)}
                  blockClassName='offer'
                  width={31}
                  height={33}
                />
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
                {user.authStatus === AuthStatus.Authorized && <CommentForm/>}
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
                onBookmarkClick={onBookmarkClick}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
