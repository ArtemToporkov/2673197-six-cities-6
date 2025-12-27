import { render, screen } from '@testing-library/react';

import { OfferInside } from './offer-inside.tsx';
import { Good } from '../../enums/good.ts';

describe('Component: OfferInside', () => {
  it('should render goods list', () => {
    const goods = [Good.WiFi, Good.Heating, Good.Kitchen];

    render(<OfferInside goods={goods} />);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    goods.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
