import type { HotelType } from '../enums/hotel-type.ts';
import type { Url } from './url.ts';

export type HotelInfo = {
  id: string;
  title: string;
  description: string;
  type: HotelType;
  imageUrl: Url;
  price: number;
  isPremium?: boolean;
  isFavourite?: boolean;
};
