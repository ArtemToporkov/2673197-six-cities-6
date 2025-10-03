import { AuthStatus } from '../../enums/auth-status.ts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  authStatus: AuthStatus;
}

export function PrivateRoute({children, authStatus}: PrivateRouteProps): JSX.Element {
  return (
    authStatus === AuthStatus.Authorized
      ? children
      : <Navigate to='/login' />
  );
}
