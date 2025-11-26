import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../enums/api-route.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';
import type { OfferDetails } from '../types/offer-details.ts';
import { City } from '../types/city.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const loadOffers = createAction<OfferDetails[]>(
  `${ActionNamespace.Offers}/loadOffers`
);

export const loadCities = createAction<City[]>(
  `${ActionNamespace.Cities}/loadCities`
);

export const switchSortingType = createAction<SortingType>(
  `${ActionNamespace.Offers}/switchSortingType`
);

export const switchCity = createAction<City>(
  `${ActionNamespace.Cities}/switchCity`
);

export const getOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<OfferDetails[]>(ApiRoute.Offers);
    const cities = response.data
      .map((o) => o.city)
      .filter((city, index, self) =>
        index === self.findIndex((c) => c.name === city.name)
      );
    dispatch(loadCities(cities));
    dispatch(loadOffers(response.data));
  }
);
