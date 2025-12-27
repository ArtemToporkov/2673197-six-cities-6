import { withHistory, withStore } from '../../utils/component-mocks.tsx';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route.tsx';
import { render, screen } from '@testing-library/react';
import { makeStore, makeUserInfo } from '../../utils/mocks.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { AppRoute } from '../../enums/app-route.ts';

describe('Component: PrivateRoute', () => {
  it('should redirect to login if user is not authorized', () => {
    const privateRoute = '/private';
    const expectedText = 'public';
    const notExpectedText = 'private';
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route element={<span>{expectedText}</span>} path={AppRoute.Login} />
          <Route
            element={
              <PrivateRoute>
                <span>{notExpectedText}</span>
              </PrivateRoute>
            }
            path={privateRoute}
          />
        </Routes>,
        [privateRoute]
      ),
      makeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should display private route if user is authorized', () => {
    const privateRoute = '/private';
    const expectedText = 'private';
    const notExpectedText = 'public';
    const mockStore = makeStore();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route element={<span>{notExpectedText}</span>} path={AppRoute.Login} />
          <Route
            element={
              <PrivateRoute>
                <span>{expectedText}</span>
              </PrivateRoute>
            }
            path={privateRoute}
          />
        </Routes>,
        [privateRoute]
      ),
      {
        ...mockStore,
        user: {
          authStatus: AuthStatus.Authorized,
          info: makeUserInfo()
        }
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
