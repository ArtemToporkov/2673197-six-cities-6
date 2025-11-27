import { SortingType } from '../enums/sorting-type.ts';
import type { City } from './city.ts';
import type { OfferPreviewInfo } from './offer-preview-info.ts';

export type OffersState = {
  city: City | null;
  offersInCity: OfferPreviewInfo[];
  allOffers: OfferPreviewInfo[];
  cities: City[];
  currentSortingType: SortingType;
  isOffersLoading: boolean;
};
