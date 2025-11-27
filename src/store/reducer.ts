import { createReducer } from '@reduxjs/toolkit';

import { loadCities, loadOffers, switchCity, switchOffersLoadingStatus, switchSortingType } from './action.ts';
import { SortingType } from '../enums/sorting-type.ts';
import type { OffersState } from '../types/offers-state.ts';
import { OfferPreviewInfo } from '../types/offer-preview-info.ts';

const initialState: OffersState = {
  city: null,
  cities: [],
  offers: [],
  currentSortingType: SortingType.Popular,
  isOffersLoading: true
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
    .addCase(switchCity, (state, action) => ({
      ...state,
      city: action.payload,
      offers: state.offers.filter((o) => o.city.name === action.payload.name)
    }))
    .addCase(switchSortingType, (state, action) => ({
      ...state,
      currentSortingType: action.payload,
      offers: sortOffers(state.offers, action.payload)
    }))
    .addCase(loadOffers, (state, action) => ({
      ...state,
      offers: sortOffers(action.payload, state.currentSortingType)
    }))
    .addCase(loadCities, (state, action) => ({
      ...state,
      cities: action.payload
    }))
    .addCase(switchOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
