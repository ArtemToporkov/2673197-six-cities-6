import { render, screen } from '@testing-library/react';

import { PremiumLabel } from './premium-label.tsx';

describe('Component: Premium label', () => {
  describe('rendering', () => {
    it('should display "Premium" text', () => {
      render(<PremiumLabel />);

      const premiumText = screen.getByText(/premium/i);
      expect(premiumText).toBeInTheDocument();
    });
  });
});
