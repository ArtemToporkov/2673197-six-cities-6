import { createReducer } from '@reduxjs/toolkit';

import { CityName } from '../enums/city-name.ts';
import { offers } from '../mocks/offers.ts';
import { switchCityWithOffers, switchSortingType } from './action.ts';
import { sortingTypes } from '../mocks/sorting-types.ts';
import type { OffersState } from '../types/offers-state.ts';

const initialState: OffersState = {
  city: CityName.Paris,
  offers: offers,
  sortingTypes: sortingTypes,
  currentSortingType: sortingTypes[0]
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(switchCityWithOffers, (state, action) => ({
      ...state,
      city: action.payload.city,
      offers: action.payload.offers,
    }))
    .addCase(switchSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    });
});
