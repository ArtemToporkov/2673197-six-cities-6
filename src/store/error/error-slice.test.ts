import { describe, it, expect } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import { errorSlice, resetError } from './error-slice.ts';
import { ServerError } from '../../types/server-error.ts';

describe('Error slice', () => {
  it('should reset error', () => {
    const initialState: ServerError | null = {
      status: StatusCodes.NOT_FOUND,
      errorType: ServerErrorType.CommonError,
      message: 'resource not found'
    };

    const result = errorSlice.reducer(initialState, resetError());

    expect(result).toBeNull();
  });
});
