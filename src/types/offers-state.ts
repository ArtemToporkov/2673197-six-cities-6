import { CityWithOffers } from './city-with-offers.ts';
import type { SortingType } from './sorting-type.ts';

export type OffersState = CityWithOffers & {
  sortingTypes: SortingType[];
  currentSortingType: SortingType;
};
