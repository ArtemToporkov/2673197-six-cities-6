import { CityName } from '../enums/city-name.ts';
import { Location } from './location.ts';

export type City = {
  name: CityName;
  location: Location;
};
