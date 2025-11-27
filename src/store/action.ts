import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../enums/api-route.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';
import type { City } from '../types/city.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const loadOffers = createAction<OfferPreviewInfo[]>(
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

export const switchOffersLoadingStatus = createAction<boolean>(
  `${ActionNamespace.Offers}/switchOffersLoadingStatus`
);

export const getOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(switchOffersLoadingStatus(true));
    const response = await api.get<OfferPreviewInfo[]>(ApiRoute.Offers);
    const cities = response.data
      .map((o) => o.city)
      .filter((city, index, self) =>
        index === self.findIndex((c) => c.name === city.name)
      );
    dispatch(loadCities(cities));
    dispatch(loadOffers(response.data));
    dispatch(switchCity(cities[0]));
    dispatch(switchOffersLoadingStatus(false));
  }
);
