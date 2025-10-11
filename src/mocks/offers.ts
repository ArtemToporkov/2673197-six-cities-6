import { HotelType } from '../enums/hotel-type.ts';
import { Amenity } from '../enums/amenity.ts';
import { OfferDetails } from '../types/offer-details.ts';
import { City } from '../enums/city.ts';
import { HostStatus } from '../enums/host-status.ts';

export const offers: OfferDetails[] = [
  {
    id: '1',
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
    },
    galleryImagesUrls: [
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
    offerDescriptions: [
      'A quiet cozy and picturesque that hides behind a a river by the\n' +
      'unique lightness of Amsterdam. The building is green and from\n' +
      '18th century.',
      'An independent House, strategically located between Rembrand\n' +
      'Square and National Opera, but where the bustle of the city\n' +
      'comes to rest in this alley flowery and colorful.'
    ]
  },
  {
    id: '2',
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
    },
    galleryImagesUrls: [
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
    offerDescriptions: [
      'Insane crazy house with ghosts and penguins.'
    ]
  },
  {
    id: '3',
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
    },
    galleryImagesUrls: [
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
    offerDescriptions: [
      'Some description and description and cute quiet smart bla bla bla. ' +
      'Some description and description and cute quiet smart bla bla bla.',
      'Some description and description and cute quiet smart bla bla bla.'
    ]
  },
  {
    id: '4',
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
    },
    galleryImagesUrls: [
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
    offerDescriptions: [
      'Some description and description and description.'
    ]
  }
];
