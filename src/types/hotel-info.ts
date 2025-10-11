import { HotelType } from '../enums/hotel-type.ts';
import { Url } from './url.ts';

export type HotelInfo = {
  id: string;
  title: string;
  description: string;
  type: HotelType;
  imageUrl: Url;
  price: number;
  isPremium?: boolean;
  ifFavourite?: boolean;
};
