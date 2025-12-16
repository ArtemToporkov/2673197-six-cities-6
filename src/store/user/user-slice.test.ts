import { describe, it, expect } from 'vitest';
import { internet, image, datatype, random } from 'faker';

import { changeUserInfo, userSlice } from './user-slice.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import type { User } from '../../types/user.ts';

describe('reducer', () => {
  it('should change user info', () => {
    const initialState: User = {
      authStatus: AuthStatus.Unknown,
      info: null
    };
    const makeToken = () =>
      `${random.alphaNumeric(10)}.${random.alphaNumeric(10)}.${random.alphaNumeric(10)}`;
    const expectedState: User = {
      authStatus: AuthStatus.Authorized,
      info: {
        name: internet.userName(),
        avatarUrl: image.avatar(),
        isPro: datatype.boolean(),
        email: internet.email(),
        token: makeToken()
      }
    };

    const result = userSlice.reducer(initialState, changeUserInfo(expectedState));

    expect(result).toEqual(expectedState);
  });
});
