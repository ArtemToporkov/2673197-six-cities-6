import { Amenities } from './amenities.ts';
import { City } from '../enums/city.ts';
import { HotelInfo } from './hotel-info.ts';

export type OfferDetails = HotelInfo & {
  city: City;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  amenities: Amenities;
  galleryImagesUrls: readonly [string, string, string, string, string, string];
};
