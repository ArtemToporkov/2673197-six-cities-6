import { SortingType } from '../enums/sorting-type.ts';
import type { City } from './city.ts';
import type { OfferPreviewInfo } from './offer-preview-info.ts';

export type OffersState = {
  city?: City;
  offers: OfferPreviewInfo[];
  cities: City[];
  currentSortingType: SortingType;
  isOffersLoading: boolean;
};
