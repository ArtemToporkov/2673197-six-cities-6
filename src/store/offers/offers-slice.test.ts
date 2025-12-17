import { describe, it } from 'vitest';
import { commerce, datatype, image, internet, random } from 'faker';

import { makeCity, makeComment, makeOfferPreviewInfo } from '../../utils/mocks.ts';
import { SortingType } from '../../enums/sorting-type.ts';
import { Good } from '../../enums/good.ts';
import { getFavoriteOffers, getOffer, getOffers, sendComment, setFavoriteStatus } from '../api-actions.ts';
import { offersSlice, type OffersState, switchSortingType, } from './offers-slice.ts';
import { FavoriteAction } from '../../enums/favorite-action.ts';
import type { OfferFullInfo } from '../../types/offer-full-info.ts';

const makeOfferPreviewInfos = () => Array.from({ length: datatype.number({ min: 3, max: 6 }) }, () =>
  makeOfferPreviewInfo());

const makeOfferFullInfo = (initial?: Partial<OfferFullInfo>): OfferFullInfo => {
  const previewInfo = makeOfferPreviewInfo();
  const { previewImage: _, ...rest } = previewInfo;
  return ({
    bedrooms: datatype.number({min: 1, max: 3}),
    description: commerce.productDescription(),
    goods: random.arrayElements(Object.values(Good)),
    host: {
      name: internet.userName(),
      avatarUrl: image.avatar(),
      isPro: datatype.boolean()
    },
    images: Array.from({length: 6}, () => image.imageUrl()),
    maxAdults: datatype.number({min: 1, max: 10}),
    ...rest,
    ...initial
  });
};

const makeOffersState = (initial?: Partial<OffersState>): OffersState => ({
  allOffers: Array.from({ length: 5 }, () => makeOfferPreviewInfo()),
  comments: Array.from({ length: 5 }, () => makeComment()),
  currentSortingType: SortingType.Popular,
  favoriteOffers: makeOfferPreviewInfos().map((o) => {
    o.isFavorite = true;
    return o;
  }),
  isOfferLoading: false,
  isOffersLoading: false,
  nearbyOffers: makeOfferPreviewInfos(),
  offer: makeOfferFullInfo(),
  offersInCity: makeOfferPreviewInfos(),
  ...initial
});

describe('Offers slice', () => {
  it('should load offer on getOffer.fulfilled', () => {
    const initialState = makeOffersState({ offer: null, nearbyOffers: [], comments: [] });
    const offerToLoad = {
      offer: makeOfferFullInfo(),
      comments: Array.from({ length: 5 }, () => makeComment()),
      nearbyOffers: makeOfferPreviewInfos(),
    };
    const expectedState = {
      ...initialState,
      offer: offerToLoad.offer,
      nearbyOffers: offerToLoad.nearbyOffers,
      comments: offerToLoad.comments
    };

    const result = offersSlice.reducer(
      initialState,
      getOffer.fulfilled(offerToLoad, 'requestId', offerToLoad.offer.id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should load offers on getOffers.fulfilled', () => {
    const initialState = makeOffersState({ allOffers: [], offersInCity: [] });
    const city = makeCity();
    const offersToLoad = makeOfferPreviewInfos()
      .map((o) => {
        o.city = city;
        return o;
      })
      .toSorted((a, b) => {
        switch (initialState.currentSortingType) {
          case SortingType.PriceLowToHigh:
            return a.price - b.price;
          case SortingType.PriceHighToLow:
            return b.price - a.price;
          case SortingType.TopRatedFirst:
            return b.rating - a.rating;
          case SortingType.Popular:
            return 0;
        }
      });
    const expectedState = {
      ...initialState,
      allOffers: offersToLoad,
      offersInCity: offersToLoad,
    };

    const result = offersSlice.reducer(
      initialState,
      getOffers.fulfilled(offersToLoad, 'requestId', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should add comment on sendComment.fulfilled', () => {
    const initialState = makeOffersState({ comments: [] });
    const commentToAdd = makeComment();
    const expectedState = {
      ...initialState,
      comments: [commentToAdd],
    };

    const result = offersSlice.reducer(
      initialState,
      sendComment.fulfilled(
        commentToAdd,
        'requestId',
        { comment: { comment: commentToAdd.comment, rating: commentToAdd.rating }, offerId: datatype.uuid() }
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should add favorite and mark offer as favorite on setFavoriteStatus.fulfilled', () => {
    const offerToAddToFavorites = makeOfferPreviewInfo({ isFavorite: false });
    const initialState = makeOffersState({
      favoriteOffers: [],
      allOffers: [offerToAddToFavorites],
      offersInCity: [offerToAddToFavorites],
      nearbyOffers: [offerToAddToFavorites]
    });
    const expectedOfferAfterAddingToFavorites = {
      ...offerToAddToFavorites,
      isFavorite: true,
    };
    const expectedState = {
      ...initialState,
      favoriteOffers: [expectedOfferAfterAddingToFavorites],
      allOffers: [expectedOfferAfterAddingToFavorites],
      offersInCity: [expectedOfferAfterAddingToFavorites],
      nearbyOffers: [expectedOfferAfterAddingToFavorites]
    };

    const result = offersSlice.reducer(
      initialState,
      setFavoriteStatus.fulfilled(
        expectedOfferAfterAddingToFavorites,
        'requestId',
        { offerId: expectedOfferAfterAddingToFavorites.id, status: FavoriteAction.Add }
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should load favorites on getFavoriteOffers.fulfilled', () => {
    const offersToLoad = makeOfferPreviewInfos()
      .map((o) => {
        o.isFavorite = true;
        return o;
      });
    const initialState = makeOffersState({
      favoriteOffers: []
    });
    const expectedState = {
      ...initialState,
      favoriteOffers: offersToLoad,
    };

    const result = offersSlice.reducer(
      initialState,
      getFavoriteOffers.fulfilled(offersToLoad, 'requestId', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should remove favorite and mark offer as not favorite on setFavoriteStatus.fulfilled', () => {
    const offerToRemoveFromFavorites = makeOfferPreviewInfo({ isFavorite: true });
    const initialState = makeOffersState({
      favoriteOffers: [offerToRemoveFromFavorites],
      allOffers: [offerToRemoveFromFavorites],
      offersInCity: [offerToRemoveFromFavorites]
    });
    const expectedOfferAfterRemovingFromFavorites = {
      ...offerToRemoveFromFavorites,
      isFavorite: false,
    };
    const expectedState = {
      ...initialState,
      favoriteOffers: [],
      allOffers: [expectedOfferAfterRemovingFromFavorites],
      offersInCity: [expectedOfferAfterRemovingFromFavorites]
    };

    const result = offersSlice.reducer(
      initialState,
      setFavoriteStatus.fulfilled(
        expectedOfferAfterRemovingFromFavorites,
        'requestId',
        { offerId: expectedOfferAfterRemovingFromFavorites.id, status: FavoriteAction.Remove }
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should switch sorting type and sort offers in city', () => {
    const city = makeCity();
    const offers = makeOfferPreviewInfos()
      .map((o) => {
        o.city = city;
        return o;
      })
      .toSorted((a, b) => a.price - b.price);
    const initialState = makeOffersState({
      currentSortingType: SortingType.PriceLowToHigh,
      offersInCity: offers
    });
    const expectedSortingType = SortingType.TopRatedFirst;
    const expectedState = {
      ...initialState,
      offersInCity: offers.toSorted((a, b) => b.rating - a.rating),
      currentSortingType: expectedSortingType,
    };

    const result = offersSlice.reducer(initialState, switchSortingType(expectedSortingType));

    expect(result).toEqual(expectedState);
  });
});
