import { createReducer } from '@reduxjs/toolkit';

import {
  changeUserInfo,
  getOffer,
  getOffers,
  loadCities,
  loadOffer,
  loadOffers,
  switchCity,
  switchSortingType
} from './action.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { AuthStatus } from '../enums/auth-status.ts';
import type { AppState } from '../types/app-state.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';

const initialState: AppState = {
  city: null,
  offer: null,
  comments: [],
  nearbyOffers: [],
  cities: [],
  offersInCity: [],
  allOffers: [],
  currentSortingType: SortingType.Popular,
  isOffersLoading: true,
  isOfferLoading: true,
  user: {
    authStatus: AuthStatus.Unknown,
    info: null
  }
};

function sortOffers(offersToSort: OfferPreviewInfo[], sortingType: SortingType): OfferPreviewInfo[] {
  switch (sortingType) {
    case SortingType.PriceLowToHigh:
      return offersToSort.toSorted((a, b) => a.price - b.price);
    case SortingType.PriceHighToLow:
      return offersToSort.toSorted((a, b) => b.price - a.price);
    case SortingType.TopRatedFirst:
      return offersToSort.toSorted((a, b) => b.rating - a.rating);
    case SortingType.Popular:
      return offersToSort;
  }
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(switchCity, (state, action)=> {
      state.city = action.payload;
      state.offersInCity = state.allOffers.filter((o) => o.city.name === action.payload.name);
    })
    .addCase(switchSortingType, (state, action) => {
      state.currentSortingType = action.payload;
      state.offersInCity = sortOffers(state.offersInCity, action.payload);
    })
    .addCase(loadOffers, (state, action)=> {
      state.allOffers = sortOffers(action.payload, state.currentSortingType);
    })
    .addCase(loadCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload.offer;
      state.comments = action.payload.comments;
      state.nearbyOffers = action.payload.nearbyOffers;
    })
    .addCase(getOffer.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(getOffer.fulfilled, (state) => {
      state.isOfferLoading = false;
    })
    .addCase(getOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(getOffers.fulfilled, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(changeUserInfo, (state, action) => {
      state.user = action.payload;
    });
});
