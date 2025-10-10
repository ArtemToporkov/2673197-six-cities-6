import { HotelType } from '../enums/hotel-type.ts';
import { OfferInside } from './offer-inside.ts';

export type Offer = {
  id: number;
  name: string;
  isPremium?: boolean;
  price: number;
  hotelType: HotelType;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  offerInside: OfferInside;
};
