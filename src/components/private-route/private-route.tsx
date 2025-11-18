import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthStatus } from '../../enums/auth-status.ts';

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
