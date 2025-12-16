import { describe, it } from 'vitest';
import { commerce, company, datatype, image, internet, random, lorem } from 'faker';

import { makeLocation, makeCity } from '../utils.ts';
import { SortingType } from '../../enums/sorting-type.ts';
import { HotelType } from '../../enums/hotel-type.ts';
import { Good } from '../../enums/good.ts';
import {
  loadOffer,
  addComment,
  addFavorite,
  removeFavorite,
  loadFavorites,
  loadOffers,
  switchSortingType,
  offersSlice,
  type OffersState,
} from './offers-slice.ts';
import type { OfferFullInfo } from '../../types/offer-full-info.ts';
import type { RatingScore } from '../../types/rating-score.ts';
import type { OfferPreviewInfo } from '../../types/offer-preview-info.ts';
import type { Comment } from '../../types/comment.ts';

const makeComment = (initial?: Partial<Comment>): Comment => ({
  id: datatype.uuid(),
  user: {
    avatarUrl: image.avatar(),
    name: internet.userName(),
    isPro: datatype.boolean()
  },
  date: datatype.datetime().toISOString(),
  comment: lorem.sentence(51),
  rating: datatype.number({min: 1, max: 5}) as RatingScore,
  ...initial
});

const makeOfferPreviewInfo = (initial?: Partial<OfferPreviewInfo>): OfferPreviewInfo => ({
  city: makeCity(),
  id: datatype.uuid(),
  previewImage: image.imageUrl(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeLocation(),
  price: +commerce.price(),
  rating: datatype.number({min: 1, max: 5}) as RatingScore,
  title: `${company.companyName()}'s hotel`,
  type: random.arrayElement(Object.values(HotelType)),
  ...initial
});

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
  it('should load offer', () => {
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

    const result = offersSlice.reducer(initialState, loadOffer(offerToLoad));

    expect(result).toEqual(expectedState);
  });

  it('should load offers', () => {
    const initialState = makeOffersState({ allOffers: [] });
    const offersToLoad = makeOfferPreviewInfos().toSorted((a, b) => {
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
    };

    const result = offersSlice.reducer(initialState, loadOffers(offersToLoad));

    expect(result).toEqual(expectedState);
  });

  it('should add comment', () => {
    const initialState = makeOffersState({ comments: [] });
    const commentToAdd = makeComment();
    const expectedState = {
      ...initialState,
      comments: [commentToAdd],
    };

    const result = offersSlice.reducer(initialState, addComment(commentToAdd));

    expect(result).toEqual(expectedState);
  });

  it('should add favorite and mark offer as favorite', () => {
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

    const result = offersSlice.reducer(initialState, addFavorite(expectedOfferAfterAddingToFavorites));

    expect(result).toEqual(expectedState);
  });

  it('should load favorites', () => {
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

    const result = offersSlice.reducer(initialState, loadFavorites(offersToLoad));

    expect(result).toEqual(expectedState);
  });

  it('should remove favorite and mark offer as not favorite', () => {
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

    const result = offersSlice.reducer(initialState, removeFavorite(offerToRemoveFromFavorites));

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
