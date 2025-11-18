import type { CityName } from '../enums/city-name.ts';
import type { Location } from './location.ts';

export type City = {
  name: CityName;
  location: Location;
};
