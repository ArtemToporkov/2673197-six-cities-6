import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../enums/api-route.ts';
import { generatePath } from 'react-router-dom';
import { Comment } from '../types/comment.ts';
import { AuthStatus } from '../enums/auth-status.ts';
import { AUTH_HEADER_NAME, AUTH_TOKEN_KEY_NAME } from '../const.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';
import type { City } from '../types/city.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';
import type { OfferFullInfo } from '../types/offer-full-info.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const changeAuthStatus = createAction<AuthStatus>(
  `${ActionNamespace.User}/changeAuthStatus`
);

export const loadOffer = createAction<{
  offer: OfferFullInfo;
  comments: Comment[];
  nearbyOffers: OfferPreviewInfo[];
}>(
  `${ActionNamespace.Offers}/loadOffer`
);

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

export const getOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<OfferPreviewInfo[]>(ApiRoute.Offers);
    const cities = response.data
      .map((o) => o.city)
      .filter((city, index, self) =>
        index === self.findIndex((c) => c.name === city.name)
      );
    dispatch(loadCities(cities));
    dispatch(loadOffers(response.data));
    dispatch(switchCity(cities[0]));
  }
);

export const getOffer = createAsyncThunk<void, string, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffer`,
  async (id, { dispatch, extra: api }) => {
    const offerRequest = api.get<OfferFullInfo>(
      generatePath(ApiRoute.Offer, { id })
    );
    const commentsRequest = api.get<Comment[]>(
      generatePath(ApiRoute.Comments, { id })
    );
    const nearByRequest = api.get<OfferPreviewInfo[]>(
      generatePath(ApiRoute.NearByOffers, { id })
    );

    const [offerResponse, commentsResponse, nearByResponse] = await Promise.all(
      [offerRequest, commentsRequest, nearByRequest]
    );

    dispatch(loadOffer({
      offer: offerResponse.data,
      comments: commentsResponse.data,
      nearbyOffers: nearByResponse.data
    }));
  }
);

export const login = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.User}/login`,
  async (_arg, { dispatch, extra: api }) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
    await api.get(ApiRoute.Login, {
      headers: {
        [AUTH_HEADER_NAME]: token
      }
    });
    dispatch(changeAuthStatus(AuthStatus.Authorized));
  }
);
