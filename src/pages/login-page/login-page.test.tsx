import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/component-mocks.tsx';
import { MemoryRouter } from 'react-router-dom';
import { internet } from 'faker';
import { userEvent } from '@testing-library/user-event';

import { LoginPage } from './login-page.tsx';
import { makeStore } from '../../utils/mocks.ts';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginPage />, makeStore());
    const withMemoryRouterComponent = <MemoryRouter>{withStoreComponent}</MemoryRouter>;

    render(withMemoryRouterComponent);

    expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render correctly when user entered email and password', async () => {
    const { withStoreComponent } = withStore(<LoginPage />, makeStore());
    const withMemoryRouterComponent = <MemoryRouter>{withStoreComponent}</MemoryRouter>;
    const expectedEmail = internet.email();
    const expectedPassword = internet.password();

    render(withMemoryRouterComponent);
    await userEvent.type(
      screen.getByRole('textbox', { name: /e-mail/i }),
      expectedEmail
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      expectedPassword
    );

    expect(screen.getByDisplayValue(expectedEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPassword)).toBeInTheDocument();
  });
});

