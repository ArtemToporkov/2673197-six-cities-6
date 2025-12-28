import { describe, it, expect } from 'vitest';

import { changeUserInfo, userSlice } from './user-slice.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { logout } from '../api-actions.ts';
import { makeUserInfo } from '../../utils/mocks.ts';
import type { User } from '../../types/user.ts';

describe('User slice', () => {
  it('should change user info', () => {
    const initialState: User = {
      authStatus: AuthStatus.Unknown,
      info: null
    };
    const expectedState: User = {
      authStatus: AuthStatus.Authorized,
      info: makeUserInfo()
    };

    const result = userSlice.reducer(initialState, changeUserInfo(expectedState));

    expect(result).toEqual(expectedState);
  });

  it('should set Unauthorized on logout.fulfilled', () => {
    const initialState: User = {
      authStatus: AuthStatus.Authorized,
      info: makeUserInfo()
    };

    const result = userSlice.reducer(
      initialState,
      logout.fulfilled(undefined, 'requestId', undefined)
    );

    expect(result.authStatus).toBe(AuthStatus.Unauthorized);
    expect(result.info).toBeNull();
  });
});
