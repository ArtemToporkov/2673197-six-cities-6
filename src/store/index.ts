import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer.ts';
import { createApi } from '../services/api.ts';

const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
