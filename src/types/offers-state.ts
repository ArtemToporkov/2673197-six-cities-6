import { SortingType } from '../enums/sorting-type.ts';
import type { CityWithOffers } from './city-with-offers.ts';
import type { City } from './city.ts';

export type OffersState = CityWithOffers & {
  cities: City[];
  currentSortingType: SortingType;
};
