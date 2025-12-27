import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import { OfferFeatures } from './offer-features.tsx';
import { HotelType } from '../../enums/hotel-type.ts';

describe('Component: OfferFeatures', () => {
  it('should render correctly', () => {
    const type = HotelType.Apartment;
    const bedrooms = datatype.number({ min: 1, max: 5 });
    const maxAdults = datatype.number({ min: 1, max: 6 });

    render(
      <OfferFeatures
        type={type}
        bedrooms={bedrooms}
        maxAdults={maxAdults}
      />
    );

    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${bedrooms} Bedrooms`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Max ${maxAdults} adults`, 'i'))).toBeInTheDocument();
  });
});
