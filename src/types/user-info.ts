import type { Url } from './url.ts';

export type UserInfo = {
  name: string;
  avatarUrl: Url;
  isPro: boolean;
  email: string;
  token: string;
};
