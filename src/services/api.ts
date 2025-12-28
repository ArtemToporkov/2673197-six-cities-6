import axios, { type AxiosInstance } from 'axios';

import { AUTH_HEADER_NAME } from '../const.ts';
import { getToken } from './token.ts';

const SERVER_TIMEOUT_MS = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: SERVER_TIMEOUT_MS
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (config.headers && token) {
      config.headers[AUTH_HEADER_NAME] = token;
    }
    return config;
  });

  return api;
};
