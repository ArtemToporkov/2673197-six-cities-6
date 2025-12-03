import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ActionNamespace } from '../enums/action-namespace.ts';
import { SortingType } from '../enums/sorting-type.ts';
import { ApiRoute } from '../enums/api-route.ts';
import { generatePath } from 'react-router-dom';
import { AuthStatus } from '../enums/auth-status.ts';
import { ServerError } from '../types/server-error.ts';
import type { Comment } from '../types/comment.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';
import type { City } from '../types/city.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';
import type { OfferFullInfo } from '../types/offer-full-info.ts';
import type { User } from '../types/user.ts';
import type { UserInfo } from '../types/user-info.ts';
import type { CommentContent } from '../types/comment-content.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const resetError = createAction(
  `${ActionNamespace.Error}/resetError`
);

export const changeUserInfo = createAction<User>(
  `${ActionNamespace.User}/changeUserInfo`
);

export const loadOffer = createAction<{
  offer: OfferFullInfo;
  comments: Comment[];
  nearbyOffers: OfferPreviewInfo[];
}>(
  `${ActionNamespace.Offers}/loadOffer`
);

export const addComment = createAction<Comment>(
  `${ActionNamespace.Offers}/addComment`
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

export const getOffer = createAsyncThunk<void, string,
  ThunkApiConfig & { rejectValue: ServerError }
>(
  `${ActionNamespace.Offers}/getOffer`,
  async (id, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const offerRequest = api.get<OfferFullInfo>(
        generatePath(ApiRoute.Offer, {id})
      );
      const commentsRequest = api.get<Comment[]>(
        generatePath(ApiRoute.Comments, {id})
      );
      const nearByRequest = api.get<OfferPreviewInfo[]>(
        generatePath(ApiRoute.NearByOffers, {id})
      );

      const [offerResponse, commentsResponse, nearByResponse] = await Promise.all(
        [offerRequest, commentsRequest, nearByRequest]
      );

      dispatch(loadOffer({
        offer: offerResponse.data,
        comments: commentsResponse.data,
        nearbyOffers: nearByResponse.data
      }));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCodes.NOT_FOUND) {
        let errorInfo = error.response.data as ServerError;
        errorInfo = {
          ...errorInfo,
          status: error.response.status
        };
        return rejectWithValue(errorInfo);
      }
      throw error;
    }
  }
);

export const checkAuthStatus = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.User}/checkAuthStatus`,
  async (_arg, { dispatch, extra: api }) => {
    const response = await api.get(ApiRoute.Login);
    const userInfo = response.data as UserInfo;
    const user: User = {
      authStatus: AuthStatus.Authorized,
      info: userInfo,
    };
    dispatch(changeUserInfo(user));
  }
);

export const login = createAsyncThunk<void, { email: string; password: string }, ThunkApiConfig>(
  `${ActionNamespace.User}/login`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(ApiRoute.Login, {email: arg.email, password: arg.password});
      const userInfo = response.data as UserInfo;
      const user: User = {
        authStatus: AuthStatus.Authorized,
        info: userInfo,
      };
      dispatch(changeUserInfo(user));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCodes.BAD_REQUEST) {
        let errorInfo = error.response.data as ServerError;
        errorInfo = {
          ...errorInfo,
          status: error.response.status
        };
        return rejectWithValue(errorInfo);
      }
      throw error;
    }
  }
);

export const sendComment = createAsyncThunk<void, CommentContent & { offerId: string },
  ThunkApiConfig & { rejectValue: ServerError }
>(
  `${ActionNamespace.Offers}/sendComment`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(generatePath(ApiRoute.Comments, {id: arg.offerId}), arg);
      dispatch(addComment(response.data as Comment));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        let errorInfo = error.response.data as ServerError;
        errorInfo = {
          ...errorInfo,
          status: error.response.status
        };
        return rejectWithValue(errorInfo);
      }
      throw error;
    }
  }
);
