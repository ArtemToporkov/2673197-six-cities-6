import { describe, it, expect } from 'vitest';

import { citiesSlice, switchCity } from './cities-slice.ts';
import { makeCity, makeOfferPreviewInfo } from '../../utils/mocks.ts';
import { getOffers } from '../api-actions.ts';

describe('Cities slice', () => {
  const initialState = {
    city: null,
    cities: []
  };

  it('should load cities and pick the first one on getOffers.fulfilled', () => {
    const paris = makeCity({ name: 'Paris' });
    const amsterdam = makeCity({ name: 'Amsterdam' });
    const expectedCities = [paris, amsterdam];
    const offers = [makeOfferPreviewInfo({ city: paris }), makeOfferPreviewInfo({ city: amsterdam })];

    const result = citiesSlice.reducer(
      initialState,
      getOffers.fulfilled(offers, 'requestId', undefined)
    );

    expect(result.cities).toEqual(expectedCities);
    expect(result.city).toEqual(paris);
  });

  it('should switch city', () => {
    const expectedCity = makeCity();

    const result = citiesSlice.reducer(initialState, switchCity(expectedCity));

    expect(result.city).toEqual(expectedCity);
  });
});
