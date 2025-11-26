import { createReducer } from '@reduxjs/toolkit';

import { CityName } from '../enums/city-name.ts';
import { loadOffers, switchCity, switchCityWithOffers, switchSortingType } from './action.ts';
import { SortingType } from '../enums/sorting-type.ts';
import type { OfferDetails } from '../types/offer-details.ts';
import type { OffersState } from '../types/offers-state.ts';

const initialState: OffersState = {
  city: CityName.Paris,
  offers: [],
  currentSortingType: SortingType.Popular
};

function sortOffers(offersToSort: OfferDetails[], sortingType: SortingType): OfferDetails[] {
  switch (sortingType) {
    case SortingType.PriceLowToHigh:
      return offersToSort.toSorted((a, b) => a.price - b.price);
    case SortingType.PriceHighToLow:
      return offersToSort.toSorted((a, b) => b.price - a.price);
    case SortingType.TopRatedFirst:
      return offersToSort.toSorted((a, b) => b.rating - a.rating);
    case SortingType.Popular:
      return initialState.offers;

  }
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(switchCityWithOffers, (state, action) => ({
      ...state,
      city: action.payload.city,
      offers: sortOffers(action.payload.offers, state.currentSortingType),
    }))
    .addCase(switchCity, (state, action) => ({
      ...state,
      city: action.payload
    }))
    .addCase(switchSortingType, (state, action) => ({
      ...state,
      currentSortingType: action.payload,
      offers: sortOffers(state.offers, action.payload)
    }))
    .addCase(loadOffers, (state, action) => ({
      ...state,
      offers: sortOffers(action.payload, state.currentSortingType)
    }));
});
