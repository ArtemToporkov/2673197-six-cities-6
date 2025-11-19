import { CityWithOffers } from './city-with-offers.ts';
import { SortingType } from '../enums/sorting-type.ts';

export type OffersState = CityWithOffers & {
  currentSortingType: SortingType;
};
