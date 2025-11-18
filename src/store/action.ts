import { createAction } from '@reduxjs/toolkit';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import type { CityWithOffers } from '../types/city-with-offers.ts';

export const switchCityWithOffers = createAction<CityWithOffers>(
  `${ActionNamespace.Offers}/switchCityWithOffers`
);

export const switchSortingType = createAction<SortingType>(
  `${ActionNamespace.Offers}/switchSortingType`
);
