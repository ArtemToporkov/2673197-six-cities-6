import { render, screen } from '@testing-library/react';

import { LoadingScreen } from './loading-screen.tsx';

describe('Component: Loading screen', () => {
  describe('rendering', () => {
    it('should display loading screen', () => {
      render(<LoadingScreen />);

      const loadingScreen = screen.getByRole('status', { 'name': /loading/i });
      expect(loadingScreen).toBeInTheDocument();
    });
  });
});
