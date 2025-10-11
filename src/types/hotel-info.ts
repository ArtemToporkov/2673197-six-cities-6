import { HotelType } from '../enums/hotel-type.ts';

export type HotelInfo = {
  id: string;
  description: string;
  hotelType: HotelType;
  imageUrl: string;
  price: number;
  isPremium?: boolean;
};
