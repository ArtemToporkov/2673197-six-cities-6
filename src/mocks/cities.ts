import type { City } from '../types/city.ts';
import { CityName } from '../enums/city-name.ts';

export const cities = Object.freeze({
  Amsterdam: {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.3740,
      longitude: 4.8897,
      zoom: 12
    }
  },
  Cologne: {
    name: CityName.Cologne,
    location: {
      latitude: 10.1,
      longitude: 10.1,
      zoom: 12
    }
  }
}) as Readonly<Record<CityName, City>>;
