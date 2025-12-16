import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, type AxiosInstance } from 'axios';

import { ActionNamespace } from '../../enums/action-namespace.ts';
import { ApiRoute } from '../../enums/api-route.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { AUTH_TOKEN_KEY_NAME } from '../../const.ts';
import type { User } from '../../types/user.ts';
import type { UserInfo } from '../../types/user-info.ts';
import type { AppDispatch } from '../../types/app-dispatch.ts';
import type { State } from '../../types/state.ts';
import type { ServerError } from '../../types/server-error.ts';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

type LoginPayload = {
  email: string;
  password: string;
};

const initialState: User = {
  authStatus: AuthStatus.Unknown,
  info: null
};

export const userSlice = createSlice<User, {
  changeUserInfo: (state: User, action: PayloadAction<User>) => void;
    }, ActionNamespace.User>({
      name: ActionNamespace.User,
      initialState,
      reducers: {
        changeUserInfo(state, action: PayloadAction<User>) {
          state.authStatus = action.payload.authStatus;
          state.info = action.payload.info;
          localStorage.setItem(AUTH_TOKEN_KEY_NAME, action.payload.info?.token ?? '');
        }
      }
    });

export const { changeUserInfo } = userSlice.actions;

export const checkAuthStatus = createAsyncThunk<void, undefined, ThunkApiConfig>(
  `${ActionNamespace.User}/checkAuthStatus`,
  async (_arg, { dispatch, extra: api }) => {
    const response = await api.get(ApiRoute.Login);
    const userInfo = response.data as UserInfo;
    const user: User = {
      authStatus: AuthStatus.Authorized,
      info: userInfo
    };
    dispatch(changeUserInfo(user));
  }
);

export const login = createAsyncThunk<void, LoginPayload, ThunkApiConfig & { rejectValue: ServerError }>(
  `${ActionNamespace.User}/login`,
  async (arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(ApiRoute.Login, { email: arg.email, password: arg.password });
      const userInfo = response.data as UserInfo;
      const user: User = {
        authStatus: AuthStatus.Authorized,
        info: userInfo
      };
      dispatch(changeUserInfo(user));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
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


