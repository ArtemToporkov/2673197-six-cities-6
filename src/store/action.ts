import { createAction } from '@reduxjs/toolkit';

import type { CityWithOffers } from '../types/city-with-offers.ts';

export const switchCityWithOffers = createAction<CityWithOffers>(
  'offers/switchCityWithOffers'
);
