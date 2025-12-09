import type { HotelType } from '../enums/hotel-type.ts';
import type { Url } from './url.ts';
import type { City } from './city.ts';
import type { RatingScore } from './rating-score.ts';
import type { Location } from './location.ts';

export type OfferPreviewInfo = {
  id: string;
  title: string;
  type: HotelType;
  price: number;
  city: City;
  location: Location;
  isPremium: boolean;
  rating: RatingScore;
  previewImage: Url;
  isFavorite?: boolean;
};
