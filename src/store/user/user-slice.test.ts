import { describe, it, expect } from 'vitest';

import { changeUserInfo, userSlice } from './user-slice.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import type { User } from '../../types/user.ts';
import { makeUserInfo } from '../../utils/mocks.ts';

describe('reducer', () => {
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
});
