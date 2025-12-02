import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { AuthStatus } from '../../enums/auth-status.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';

type PrivateRouteProps = {
  children: ReactNode;
}

export function PrivateRoute({children}: PrivateRouteProps): ReactNode {
  const authStatus = useAppSelector((state) => state.authStatus);
  return (
    authStatus === AuthStatus.Authorized
      ? children
      : <Navigate to='/login' />
  );
}
