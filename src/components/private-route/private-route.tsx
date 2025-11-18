import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

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
