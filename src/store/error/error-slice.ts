import { createSlice } from '@reduxjs/toolkit';

import { ActionNamespace } from '../../enums/action-namespace.ts';
import type { ServerError } from '../../types/server-error.ts';
import { getOffer, sendComment } from '../offers/offers-slice.ts';
import { login } from '../user/user-slice.ts';

type ErrorState = ServerError | null;

const initialState: ErrorState = null;

type ErrorCaseReducers = {
  resetError: () => ErrorState;
};

export const errorSlice = createSlice<ErrorState, ErrorCaseReducers, ActionNamespace.Error>({
  name: ActionNamespace.Error,
  initialState,
  reducers: {
    resetError() {
      return null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffer.rejected, (_state, action) => {
        if (action.payload) {
          return action.payload;
        }
        return null;
      })
      .addCase(sendComment.rejected, (_state, action) => {
        if (action.payload) {
          return action.payload;
        }
        return null;
      })
      .addCase(login.rejected, (_state, action) => {
        if (action.payload) {
          return action.payload;
        }
        return null;
      });
  }
});

export const { resetError } = errorSlice.actions;


