import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Map } from '../../components/map/map.tsx';
import { PremiumLabel } from '../../components/premium-label/premium-label.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { ErrorPage } from '../error-page/error-page.tsx';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { AppRoute } from '../../enums/app-route.ts';
import { BookmarkButton } from '../../components/bookmark-button/bookmark-button.tsx';
import { Header } from '../../components/header/header.tsx';
import { setFavoriteStatus, getOffer } from '../../store/api-actions.ts';
import { FavoriteAction } from '../../enums/favorite-action.ts';
import { RatingStars } from '../../components/rating-stars/rating-stars.tsx';
import { OfferGallery } from '../../components/offer-gallery/offer-gallery.tsx';
import { OfferFeatures } from '../../components/offer-features/offer-features.tsx';
import { OfferInside } from '../../components/offer-inside/offer-inside.tsx';
import { OfferHost } from '../../components/offer-host/offer-host.tsx';
import { OfferReviews } from '../../components/offer-reviews/offer-reviews.tsx';
import { NearPlaces } from '../../components/near-places/near-places.tsx';
import type { Point } from '../../types/point.ts';
import type { Location } from '../../types/location.ts';

function mapToPoint(data: { location: Location; id: string }): Point {
  return ({
    latitude: data.location.latitude,
    longitude: data.location.longitude,
    key: data.id
  });
}

export function OfferPage(): ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>() as { id: string };

  const offer = useAppSelector((state) => state.offers.offer);
  const comments = useAppSelector((state) => state.offers.comments);
  const nearbyOffers = useAppSelector((state) => state.offers.nearbyOffers);
  const isOfferLoading = useAppSelector((state) => state.offers.isOfferLoading);
  const error = useAppSelector((state) => state.error);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOffer(id));
  }, [id, dispatch]);

  const mapPoints = useMemo(() => {
    const points = nearbyOffers.map(mapToPoint);
    if (offer) {
      points.push(mapToPoint(offer));
    }
    return points;
  }, [nearbyOffers, offer]);

  const selectedPoint = useMemo(() => (offer ? mapToPoint(offer) : null), [offer]);

  if (error && error.errorType === ServerErrorType.CommonError) {
    return <ErrorPage />;
  }

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <ErrorPage />;
  }

  const onBookmarkClick = (offerId: string) => {
    if (user.authStatus !== AuthStatus.Authorized) {
      navigate(AppRoute.Login);
      return;
    }

    let isFavorite = false;
    if (offerId === offer.id) {
      isFavorite = offer.isFavorite;
    } else {
      const nearbyOffer = nearbyOffers.find((o) => o.id === offerId);
      if (!nearbyOffer) {
        throw new Error('Bookmark pressed for an offer that does not exist on the page');
      }
      isFavorite = nearbyOffer.isFavorite;
    }

    dispatch(setFavoriteStatus({
      offerId,
      status: isFavorite ? FavoriteAction.Remove : FavoriteAction.Add
    }));
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images} />
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
                <RatingStars rating={offer.rating} blockClassName="offer">
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </RatingStars>
              </div>
              <OfferFeatures
                type={offer.type}
                bedrooms={offer.bedrooms}
                maxAdults={offer.maxAdults}
              />
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside goods={offer.goods} />
              <OfferHost host={offer.host} description={offer.description} />
              <OfferReviews comments={comments} />
            </div>
          </div>
          <section className="offer__map map" style={{ backgroundImage: 'none' }}>
            <Map
              city={offer.city}
              points={mapPoints}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <NearPlaces
          offers={nearbyOffers}
          onBookmarkClick={onBookmarkClick}
        />
      </main>
    </div>
  );
}
