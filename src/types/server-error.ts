import { ServerErrorType } from '../enums/server-error-type.ts';
import type { ServerErrorDetail } from './server-error-detail.ts';

export type ServerError = {
  errorType: ServerErrorType;
  message: string;
  details?: ServerErrorDetail[];
};
