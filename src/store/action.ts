import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../enums/api-route.ts';
import type { CityWithOffers } from '../types/city-with-offers.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';
import type { OfferDetails } from '../types/offer-details.ts';
import { CityName } from '../enums/city-name.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const loadOffers = createAction<OfferDetails[]>(
  `${ActionNamespace.Offers}/loadOffers`
);

export const switchCityWithOffers = createAction<CityWithOffers>(
  `${ActionNamespace.Offers}/switchCityWithOffers`
);

export const switchSortingType = createAction<SortingType>(
  `${ActionNamespace.Offers}/switchSortingType`
);

export const switchCity = createAction<CityName>(
  `${ActionNamespace.Cities}/switchCity`
);

export const getOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<OfferDetails[]>(ApiRoute.Offers);
    dispatch(loadOffers(response.data));
  }
);
