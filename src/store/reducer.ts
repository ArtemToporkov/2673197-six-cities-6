import { createReducer } from '@reduxjs/toolkit';

import { CityName } from '../enums/city-name.ts';
import { offers } from '../mocks/offers.ts';
import { CityWithOffers } from '../types/city-with-offers.ts';
import { switchCityWithOffers } from './action.ts';

const initialState: CityWithOffers = {
  city: CityName.Amsterdam,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(switchCityWithOffers, (state, action) => ({
      // как я понял, здесь не получится использовать Immer, потому что в OfferDetails[] есть readonly
      ...state,
      city: action.payload.city,
      offers: action.payload.offers,
    }));
});
