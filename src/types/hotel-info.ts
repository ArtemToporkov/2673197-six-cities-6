import { HotelType } from '../enums/hotel-type.ts';
import { Url } from './url.ts';

export type HotelInfo = {
  id: string;
  description: string;
  hotelType: HotelType;
  imageUrl: Url;
  price: number;
  isPremium?: boolean;
};
