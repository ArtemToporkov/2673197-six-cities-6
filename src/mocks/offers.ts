import { HotelType } from '../enums/hotel-type.ts';
import { Good } from '../enums/good.ts';
import { OfferDetails } from '../types/offer-details.ts';
import { HostStatus } from '../enums/host-status.ts';
import { cities } from './cities.ts';

export const offers: OfferDetails[] = [
  {
    id: '1',
    imageUrl: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious apartment at great location',
    city: cities.Amsterdam,
    location: cities.Amsterdam.location,
    price: 120,
    type: HotelType.Apartment,
    rating: 4.8,
    bedroomsCount: 3,
    maxAdultsCount: 4,
    goods: {
      [Good.WiFi]: true,
      [Good.WashingMachine]: true,
      [Good.Towels]: true,
      [Good.Heating]: true,
      [Good.CoffeeMachine]: true,
      [Good.BabySeat]: true,
      [Good.Kitchen]: true,
      [Good.Dishwasher]: true,
      [Good.CableTV]: true,
      [Good.Fridge]: true
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    hostInfo: {
      name: 'Angelina',
      status: HostStatus.Pro,
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the\n' +
      'unique lightness of Amsterdam. The building is green and from\n' +
      '18th century.',
    isPremium: true,
    isFavourite: true,
  },
  {
    id: '2',
    imageUrl: 'img/room.jpg',
    title: 'Wood and stone place',
    city: cities.Amsterdam,
    location: cities.Amsterdam.location,
    price: 80,
    type: HotelType.Room,
    rating: 3.2,
    bedroomsCount: 1,
    maxAdultsCount: 1,
    goods: {
      [Good.Towels]: true,
      [Good.Kitchen]: true,
      [Good.Dishwasher]: true,
    },
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    hostInfo: {
      name: 'Maxim',
      status: HostStatus.Pro,
      avatarUrl: 'img/avatar-max.jpg'
    },
    description: 'Insane crazy house with ghosts and penguins.',
    isFavourite: true
  },
  {
    id: '3',
    imageUrl: 'img/apartment-02.jpg',
    title: 'Canal View Prinsengracht',
    city: cities.Amsterdam,
    location: cities.Amsterdam.location,
    price: 132,
    type: HotelType.Apartment,
    rating: 4.1,
    bedroomsCount: 2,
    maxAdultsCount: 2,
    goods: {
      [Good.WiFi]: true,
      [Good.Towels]: true,
      [Good.Kitchen]: true,
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/studio-01.jpg',
    ],
    hostInfo: {
      name: 'Angelina',
      status: HostStatus.Default,
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    description: 'Some description and description and cute quiet smart bla bla bla. ' +
      'Some description and description and cute quiet smart bla bla bla.'
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    city: cities.Cologne,
    location: cities.Cologne.location,
    imageUrl: 'img/apartment-03.jpg',
    price: 180,
    type: HotelType.Apartment,
    rating: 4.9,
    bedroomsCount: 3,
    maxAdultsCount: 6,
    goods: {
      [Good.WiFi]: true,
      [Good.Towels]: true,
      [Good.Kitchen]: true,
      [Good.Dishwasher]: true,
      [Good.CableTV]: true,
      [Good.Fridge]: true
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
    ],
    hostInfo: {
      name: 'Maxim',
      status: HostStatus.Pro,
      avatarUrl: 'img/avatar-max.jpg'
    },
    description: 'Some description and description and description.',
    isFavourite: true
  }
];
