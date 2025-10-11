import { Goods } from './goods.ts';
import { HotelInfo } from './hotel-info.ts';
import { Url } from './url.ts';
import { HostInfo } from './host-info.ts';
import { City } from './city.ts';
import { Location } from './location.ts';

export type OfferDetails = HotelInfo & {
  city: City;
  location: Location;
  rating: number;
  bedroomsCount: number;
  maxAdultsCount: number;
  goods: Goods;
  images: readonly [Url, Url, Url, Url, Url, Url];
  hostInfo: HostInfo;
};
