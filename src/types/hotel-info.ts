import { HotelType } from '../enums/hotel-type.ts';

export type HotelInfo = {
  description: string;
  isPremium?: boolean;
  imageUrl: string;
  price: number;
  hotelType: HotelType;
};
