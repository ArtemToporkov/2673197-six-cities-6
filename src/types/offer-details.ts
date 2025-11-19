import type { Goods } from './goods.ts';
import type { HotelInfo } from './hotel-info.ts';
import type { Url } from './url.ts';
import type { HostInfo } from './host-info.ts';
import type { City } from './city.ts';
import type { Location } from './location.ts';

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
