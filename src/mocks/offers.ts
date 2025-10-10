import {HotelType} from '../enums/hotel-type.ts';
import {OfferInsideItem} from '../enums/offer-inside-item.ts';
import {Offer} from '../types/offer.ts';

export const offers: Offer[] = [
  {
    id: 1,
    name: 'Beautiful & luxurious apartment at great location',
    isPremium: true,
    price: 120,
    hotelType: HotelType.Apartment,
    rating: 4.8,
    bedroomsCount: 3,
    maxAdultsCount: 4,
    offerInside: {
      [OfferInsideItem.WiFi]: true,
      [OfferInsideItem.WashingMachine]: true,
      [OfferInsideItem.Towels]: true,
      [OfferInsideItem.Heating]: true,
      [OfferInsideItem.CoffeeMachine]: true,
      [OfferInsideItem.BabySeat]: true,
      [OfferInsideItem.Kitchen]: true,
      [OfferInsideItem.Dishwasher]: true,
      [OfferInsideItem.CableTV]: true,
      [OfferInsideItem.Fridge]: true
    }
  },
  {
    id: 2,
    name: 'Wood and stone place',
    price: 80,
    hotelType: HotelType.Room,
    rating: 3.2,
    bedroomsCount: 1,
    maxAdultsCount: 1,
    offerInside: {
      [OfferInsideItem.Towels]: true,
      [OfferInsideItem.Kitchen]: true,
      [OfferInsideItem.Dishwasher]: true,
    }
  },
  {
    id: 3,
    name: 'Canal View Prinsengracht',
    price: 132,
    hotelType: HotelType.Apartment,
    rating: 4.1,
    bedroomsCount: 2,
    maxAdultsCount: 2,
    offerInside: {
      [OfferInsideItem.WiFi]: true,
      [OfferInsideItem.Towels]: true,
      [OfferInsideItem.Kitchen]: true,
    }
  },
  {
    id: 4,
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    hotelType: HotelType.Apartment,
    rating: 4.9,
    bedroomsCount: 3,
    maxAdultsCount: 6,
    offerInside: {
      [OfferInsideItem.WiFi]: true,
      [OfferInsideItem.Towels]: true,
      [OfferInsideItem.Kitchen]: true,
      [OfferInsideItem.Dishwasher]: true,
      [OfferInsideItem.CableTV]: true,
      [OfferInsideItem.Fridge]: true
    }
  }
];
