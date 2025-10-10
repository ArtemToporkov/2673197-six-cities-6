import { HotelType } from '../enums/hotel-type.ts';

export type HotelInfo = {
  isPremium?: boolean;
  imageSrc: string;
  price: number;
  hotelType: HotelType;
  name: string;
};
