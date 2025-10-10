import { HotelType } from '../enums/hotel-type.ts';
import { Amenity } from '../enums/amenity.ts';
import { OfferDetails } from '../types/offer-details.ts';
import { City } from '../enums/city.ts';

export const offers: OfferDetails[] = [
  {
    id: 1,
    imageUrl: 'img/apartment-01.jpg',
    description: 'Beautiful & luxurious apartment at great location',
    city: City.Amsterdam,
    isPremium: true,
    price: 120,
    hotelType: HotelType.Apartment,
    rating: 4.8,
    bedroomsCount: 3,
    maxAdultsCount: 4,
    amenities: {
      [Amenity.WiFi]: true,
      [Amenity.WashingMachine]: true,
      [Amenity.Towels]: true,
      [Amenity.Heating]: true,
      [Amenity.CoffeeMachine]: true,
      [Amenity.BabySeat]: true,
      [Amenity.Kitchen]: true,
      [Amenity.Dishwasher]: true,
      [Amenity.CableTV]: true,
      [Amenity.Fridge]: true
    }
  },
  {
    id: 2,
    imageUrl: 'img/room.jpg',
    description: 'Wood and stone place',
    city: City.Amsterdam,
    price: 80,
    hotelType: HotelType.Room,
    rating: 3.2,
    bedroomsCount: 1,
    maxAdultsCount: 1,
    amenities: {
      [Amenity.Towels]: true,
      [Amenity.Kitchen]: true,
      [Amenity.Dishwasher]: true,
    }
  },
  {
    id: 3,
    imageUrl: 'img/apartment-02.jpg',
    description: 'Canal View Prinsengracht',
    city: City.Amsterdam,
    price: 132,
    hotelType: HotelType.Apartment,
    rating: 4.1,
    bedroomsCount: 2,
    maxAdultsCount: 2,
    amenities: {
      [Amenity.WiFi]: true,
      [Amenity.Towels]: true,
      [Amenity.Kitchen]: true,
    }
  },
  {
    id: 4,
    description: 'Nice, cozy, warm big bed apartment',
    city: City.Cologne,
    imageUrl: 'img/apartment-03.jpg',
    price: 180,
    hotelType: HotelType.Apartment,
    rating: 4.9,
    bedroomsCount: 3,
    maxAdultsCount: 6,
    amenities: {
      [Amenity.WiFi]: true,
      [Amenity.Towels]: true,
      [Amenity.Kitchen]: true,
      [Amenity.Dishwasher]: true,
      [Amenity.CableTV]: true,
      [Amenity.Fridge]: true
    }
  }
];
