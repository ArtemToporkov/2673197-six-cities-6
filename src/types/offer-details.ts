import { Amenities } from './amenities.ts';
import { City } from '../enums/city.ts';
import { HotelInfo } from './hotel-info.ts';
import { Url } from './url.ts';
import { HostInfo } from './host-info.ts';

export type OfferDetails = HotelInfo & {
  city: City;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  amenities: Amenities;
  galleryImagesUrls: readonly [Url, Url, Url, Url, Url, Url];
  hostInfo: HostInfo;
  offerDescriptions: string[];
};
