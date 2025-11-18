import { createReducer } from '@reduxjs/toolkit';

import { CityName } from '../enums/city-name.ts';
import { offers } from '../mocks/offers.ts';
import { switchCityWithOffers, switchSortingType } from './action.ts';
import { SortingType } from '../enums/sorting-type.ts';
import type { OffersState } from '../types/offers-state.ts';
import { OfferDetails } from '../types/offer-details.ts';

const initialState: OffersState = {
  city: CityName.Paris,
  offers: offers,
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
    .addCase(switchSortingType, (state, action) => ({
      ...state,
      currentSortingType: action.payload,
      offers: sortOffers(state.offers, action.payload)
    }));
});
