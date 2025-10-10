import { HotelType } from '../enums/hotel-type.ts';
import { Amenities } from './amenities.ts';
import { City } from '../enums/city.ts';

export type OfferDetails = {
  id: number;
  name: string;
  city: City;
  isPremium?: boolean;
  price: number;
  hotelType: HotelType;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  offerInside: Amenities;
  imageUrl: string;
};
