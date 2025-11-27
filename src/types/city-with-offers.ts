import type { City } from './city.ts';
import type { OfferPreviewInfo } from './offer-preview-info.ts';

export type CityWithOffers = {
  city: City;
  offers: OfferPreviewInfo[];
};
