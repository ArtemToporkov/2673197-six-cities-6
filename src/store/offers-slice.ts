/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, type AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { generatePath } from 'react-router-dom';

import { SortingType } from '../enums/sorting-type.ts';
import { ActionNamespace } from '../enums/action-namespace.ts';
import { ApiRoute } from '../enums/api-route.ts';
import { loadCities, switchCity } from './cities-slice.ts';
import { FavoriteAction } from '../enums/favorite-action.ts';
import type { ServerError } from '../types/server-error.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';
import type { OfferFullInfo } from '../types/offer-full-info.ts';
import type { Comment } from '../types/comment.ts';
import type { CommentContent } from '../types/comment-content.ts';
import type { AppDispatch } from '../types/app-dispatch.ts';
import type { State } from '../types/state.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

type OffersState = {
  offer: OfferFullInfo | null;
  nearbyOffers: OfferPreviewInfo[];
  favoriteOffers: OfferPreviewInfo[];
  comments: Comment[];
  offersInCity: OfferPreviewInfo[];
  allOffers: OfferPreviewInfo[];
  currentSortingType: SortingType;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
};

const initialState: OffersState = {
  offer: null,
  comments: [],
  nearbyOffers: [],
  favoriteOffers: [],
  offersInCity: [],
  allOffers: [],
  currentSortingType: SortingType.Popular,
  isOffersLoading: true,
  isOfferLoading: true
};

function sortOffers(offersToSort: OfferPreviewInfo[], sortingType: SortingType): OfferPreviewInfo[] {
  switch (sortingType) {
    case SortingType.PriceLowToHigh:
      return offersToSort.toSorted((a, b) => a.price - b.price);
    case SortingType.PriceHighToLow:
      return offersToSort.toSorted((a, b) => b.price - a.price);
    case SortingType.TopRatedFirst:
      return offersToSort.toSorted((a, b) => b.rating - a.rating);
    case SortingType.Popular:
      return offersToSort;
  }
}

export const getOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getOffers`,
  async (_arg, { dispatch, extra: api }) => {
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
        generatePath(ApiRoute.Offer, { id })
      );
      const commentsRequest = api.get<Comment[]>(
        generatePath(ApiRoute.Comments, { id })
      );
      const nearByRequest = api.get<OfferPreviewInfo[]>(
        generatePath(ApiRoute.NearbyOffers, { id })
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

export const sendComment = createAsyncThunk<
  void,
  { comment: CommentContent; offerId: string },
  ThunkApiConfig & { rejectValue: ServerError }
>(
  `${ActionNamespace.Offers}/sendComment`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(
        generatePath(ApiRoute.Comments, { id: arg.offerId }),
        arg.comment
      );
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

export const addOfferToFavorites = createAsyncThunk<
  void,
  { offerId: string },
  ThunkApiConfig
>(
  `${ActionNamespace.Offers}/addToFavorites`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(
        generatePath(ApiRoute.FavoriteStatus, { offerId: arg.offerId, status: FavoriteAction.Add })
      );
      const offer = response.data as OfferPreviewInfo;
      dispatch(addFavorite(offer));
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

export const getFavoriteOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.Offers}/getFavoriteOffers`,
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.get(ApiRoute.Favorite);
      const favoriteOffers = response.data as OfferPreviewInfo[];
      dispatch(loadFavorites(favoriteOffers));
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

export const removeOfferFromFavorites = createAsyncThunk<
  void,
  { offerId: string },
  ThunkApiConfig
>(
  `${ActionNamespace.Offers}/addToFavorites`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(
        generatePath(ApiRoute.FavoriteStatus,{ offerId: arg.offerId, status: FavoriteAction.Remove })
      );
      const offer = response.data as OfferPreviewInfo;
      dispatch(removeFavorite(offer));
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

export const offersSlice = createSlice({
  name: ActionNamespace.Offers,
  initialState,
  reducers: {
    loadOffer(
      state,
      action: PayloadAction<{
        offer: OfferFullInfo;
        comments: Comment[];
        nearbyOffers: OfferPreviewInfo[];
      }>
    ) {
      state.offer = action.payload.offer;
      state.comments = action.payload.comments;
      state.nearbyOffers = action.payload.nearbyOffers;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    loadOffers(state, action: PayloadAction<OfferPreviewInfo[]>) {
      state.allOffers = sortOffers(action.payload, state.currentSortingType);
    },
    switchSortingType(state, action: PayloadAction<SortingType>) {
      state.currentSortingType = action.payload;
      state.offersInCity = sortOffers(state.offersInCity, action.payload);
    },
    addFavorite(state, action: PayloadAction<OfferPreviewInfo>) {
      const payload = action.payload;

      state.favoriteOffers.push(payload);

      const foundInCity = state.offersInCity.find((o) => o.id === payload.id);
      if (foundInCity) {
        foundInCity.isFavorite = true;
      }

      const foundInAll = state.allOffers.find((o) => o.id === payload.id);
      if (foundInAll) {
        foundInAll.isFavorite = true;
      }

      const foundInNearby = state.nearbyOffers.find((o) => o.id === payload.id);
      if (foundInNearby) {
        foundInNearby.isFavorite = true;
      }

      if (state.offer && state.offer.id === payload.id) {
        state.offer.isFavorite = true;
      }
    },
    removeFavorite(state, action: PayloadAction<OfferPreviewInfo>) {
      const payload = action.payload;

      state.favoriteOffers = state.favoriteOffers.filter((o) => o.id !== payload.id);

      const foundInCity = state.offersInCity.find((o) => o.id === payload.id);
      if (foundInCity) {
        foundInCity.isFavorite = false;
      }

      const foundInAll = state.allOffers.find((o) => o.id === payload.id);
      if (foundInAll) {
        foundInAll.isFavorite = false;
      }

      const foundInNearby = state.nearbyOffers.find((o) => o.id === payload.id);
      if (foundInNearby) {
        foundInNearby.isFavorite = false;
      }

      if (state.offer && state.offer.id === payload.id) {
        state.offer.isFavorite = false;
      }
    },
    loadFavorites(state, action: PayloadAction<OfferPreviewInfo[]>) {
      state.favoriteOffers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(getOffer.fulfilled, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(getOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(getOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(getOffers.fulfilled, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(switchCity, (state, action) => {
        state.offersInCity = state.allOffers.filter((o) => o.city.name === action.payload.name);
      });
  }
});

export const {
  loadOffer,
  addComment,
  loadOffers,
  switchSortingType,
  addFavorite,
  removeFavorite,
  loadFavorites
} = offersSlice.actions;
