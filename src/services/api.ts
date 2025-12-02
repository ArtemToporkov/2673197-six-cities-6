import axios, { type AxiosInstance } from 'axios';

const SERVER_TIMEOUT_MS = 5000;

export const createApi = (): AxiosInstance =>
  axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: SERVER_TIMEOUT_MS
  });
