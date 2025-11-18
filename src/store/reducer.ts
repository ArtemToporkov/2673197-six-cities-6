import { createReducer } from '@reduxjs/toolkit';

import { CityName } from '../enums/city-name.ts';
import { offers } from '../mocks/offers.ts';
import { switchCityWithOffers } from './action.ts';
import type { CityWithOffers } from '../types/city-with-offers.ts';

const initialState: CityWithOffers = {
  city: CityName.Amsterdam,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(switchCityWithOffers, (state, action) => ({
      ...state,
      city: action.payload.city,
      offers: action.payload.offers,
    }));
});
