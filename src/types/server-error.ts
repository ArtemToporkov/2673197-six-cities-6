import { ServerErrorType } from '../enums/server-error-type.ts';
import { StatusCodes } from 'http-status-codes';
import type { ValidationErrorDetail } from './validation-error-detail.ts';

export type ServerError =
  | {
      status?: StatusCodes;
      errorType: ServerErrorType.CommonError;
      message: string;
    }
  | {
      status?: StatusCodes;
      errorType: ServerErrorType.ValidationError;
      message: string;
      details: ValidationErrorDetail[];
    };
