import { createAction } from '@reduxjs/toolkit';

import { SortingType } from '../types/sorting-type.ts';
import { ActionNamespace } from '../enums/action-namespace.ts';
import type { CityWithOffers } from '../types/city-with-offers.ts';

export const switchCityWithOffers = createAction<CityWithOffers>(
  `${ActionNamespace.Offers}/switchCityWithOffers`
);

export const switchSortingType = createAction<SortingType>(
  `${ActionNamespace.Offers}/switchSortingType`
);
