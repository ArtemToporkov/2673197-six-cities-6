import { describe, it, expect } from 'vitest';

import { citiesSlice, loadCities, switchCity } from './cities-slice.ts';
import { makeCity } from '../../utils.ts';

describe('Cities slice', () => {
  const initialState = {
    city: null,
    cities: []
  };

  it('should load cities', () => {
    const expectedCities = [makeCity(), makeCity()];

    const result = citiesSlice.reducer(initialState, loadCities(expectedCities));

    expect(result.cities).toEqual(expectedCities);
  });

  it('should switch city', () => {
    const expectedCity = makeCity();

    const result = citiesSlice.reducer(initialState, switchCity(expectedCity));

    expect(result.city).toEqual(expectedCity);
  });
});
