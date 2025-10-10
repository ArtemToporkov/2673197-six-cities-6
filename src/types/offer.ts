import { HotelType } from '../enums/hotel-type.ts';
import { OfferInside } from './offer-inside.ts';
import { City } from '../enums/city.ts';

export type Offer = {
  id: number;
  name: string;
  city: City;
  isPremium?: boolean;
  price: number;
  hotelType: HotelType;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  offerInside: OfferInside;
  imageUrl: string;
};
