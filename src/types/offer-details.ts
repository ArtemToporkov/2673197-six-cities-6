import { Amenities } from './amenities.ts';
import { City } from '../enums/city.ts';
import { HotelInfo } from './hotel-info.ts';

export type OfferDetails = HotelInfo & {
  id: number;
  city: City;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  amenities: Amenities;
};
