import { AuthErrorType } from '../enums/auth-error-type.ts';
import type { AuthErrorDetail } from './auth-error-detail.ts';

export type AuthError = {
  errorType: AuthErrorType;
  message: string;
  details: AuthErrorDetail[];
};
