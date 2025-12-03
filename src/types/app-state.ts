import { SortingType } from '../enums/sorting-type.ts';
import type { City } from './city.ts';
import type { OfferPreviewInfo } from './offer-preview-info.ts';
import type { OfferFullInfo } from './offer-full-info.ts';
import type { Comment } from './comment.ts';
import type { User } from './user.ts';
import type { ServerError } from './server-error.ts';

export type AppState = {
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
  user: User;
  error: ServerError | null;
};
