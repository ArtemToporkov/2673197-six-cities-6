import { configureStore } from '@reduxjs/toolkit';

import { offersSlice } from './offers/offers-slice.ts';
import { citiesSlice } from './cities/cities-slice.ts';
import { userSlice } from './user/user-slice.ts';
import { errorSlice } from './error/error-slice.ts';
import { createApi } from '../services/api.ts';

const api = createApi();

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
    cities: citiesSlice.reducer,
    user: userSlice.reducer,
    error: errorSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
