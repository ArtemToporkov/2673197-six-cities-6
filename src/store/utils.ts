import { address, datatype } from 'faker';

import type { Location } from '../types/location.ts';
import type { City } from '../types/city.ts';

export const makeLocation = (initial?: Partial<Location>): Location => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number({ min: 1, max: 15 }),
  ...initial
});

export const makeCity = (initial?: Partial<City>): City => ({
  name: address.cityName(),
  location: makeLocation(),
  ...initial
});
