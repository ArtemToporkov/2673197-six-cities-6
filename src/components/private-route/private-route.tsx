import { AuthStatus } from '../../enums/auth-status.ts';
import {Navigate} from 'react-router-dom';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
  authStatus: AuthStatus;
}

export function PrivateRoute({children, authStatus}: PrivateRouteProps): ReactNode {
  return (
    authStatus === AuthStatus.Authorized
      ? children
      : <Navigate to='/login' />
  );
}
