import { AuthStatus } from '../enums/auth-status.ts';
import type { UserInfo } from './user-info.ts';

export type User =
  | {
      authStatus: AuthStatus.Unknown | AuthStatus.Unauthorized;
      info: null;
    }
  | {
      authStatus: AuthStatus.Authorized;
      info: UserInfo;
    };
