import { CityName } from '../enums/city-name.ts';
import { OfferDetails } from './offer-details.ts';

export type CityWithOffers = {
  city: CityName;
  offers: OfferDetails[];
};
