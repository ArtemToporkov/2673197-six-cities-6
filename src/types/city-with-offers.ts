import type { CityName } from '../enums/city-name.ts';
import type { OfferDetails } from './offer-details.ts';

export type CityWithOffers = {
  city: CityName;
  offers: OfferDetails[];
};
