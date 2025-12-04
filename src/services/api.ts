import axios, { AxiosError, type AxiosInstance, HttpStatusCode } from 'axios';

import { store } from '../store';
import { changeUserInfo } from '../store/user-slice.ts';
import { AuthStatus } from '../enums/auth-status.ts';
import { AUTH_HEADER_NAME, AUTH_TOKEN_KEY_NAME } from '../const.ts';

const SERVER_TIMEOUT_MS = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: SERVER_TIMEOUT_MS
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (config.headers && token) {
      config.headers[AUTH_HEADER_NAME] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        store.dispatch(changeUserInfo({ authStatus: AuthStatus.Unauthorized, info: null }));
      }
      return Promise.reject(error);
    }
  );

  return api;
};
