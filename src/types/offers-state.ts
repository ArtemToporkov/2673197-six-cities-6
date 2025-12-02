import { SortingType } from '../enums/sorting-type.ts';
import type { City } from './city.ts';
import type { OfferPreviewInfo } from './offer-preview-info.ts';
import type { OfferFullInfo } from './offer-full-info.ts';
import type { Comment } from './comment.ts';

export type OffersState = {
  city: City | null;
  offer: OfferFullInfo | null;
  nearbyOffers: OfferPreviewInfo[];
  comments: Comment[];
  offersInCity: OfferPreviewInfo[];
  allOffers: OfferPreviewInfo[];
  cities: City[];
  currentSortingType: SortingType;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
};
