import type { OfferDetails } from './offer-details.ts';
import type { City } from './city.ts';

export type CityWithOffers = {
  city: City;
  offers: OfferDetails[];
};
