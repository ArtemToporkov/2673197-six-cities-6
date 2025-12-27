import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';

import { ErrorPage } from './error-page.tsx';
import { withStore } from '../../utils/component-mocks.tsx';
import { makeStore } from '../../utils/mocks.ts';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import type { ServerError } from '../../types/server-error.ts';

describe('Component: ErrorPage', () => {
  it('should render default error message when no props or state provided', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
      makeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
    expect(screen.getByText(/Go to main page/i)).toBeInTheDocument();
  });

  it('should render error message from props', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <ErrorPage statusCode={StatusCodes.NOT_FOUND} message="Page Not Found" />
      </MemoryRouter>,
      makeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should render error message from store if props are missing', () => {
    const storeError: ServerError = {
      status: StatusCodes.BAD_REQUEST,
      message: 'Bad Request',
      errorType: ServerErrorType.CommonError
    };
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
      makeStore({ error: storeError })
    );

    render(withStoreComponent);

    expect(screen.getByText('400')).toBeInTheDocument();
    expect(screen.getByText('Bad Request')).toBeInTheDocument();
  });
});
