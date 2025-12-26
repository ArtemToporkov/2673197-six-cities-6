import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Footer } from './footer.tsx';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoElement = screen.getByAltText(/6 cities logo/i);
    const linkElement = screen.getByRole('link');

    expect(logoElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
