import { address, commerce, company, datatype, image, internet, lorem, random } from 'faker';

import { HotelType } from '../enums/hotel-type.ts';
import type { Location } from '../types/location.ts';
import type { City } from '../types/city.ts';
import type { Comment } from '../types/comment.ts';
import type { RatingScore } from '../types/rating-score.ts';
import type { OfferPreviewInfo } from '../types/offer-preview-info.ts';

export const makeComment = (initial?: Partial<Comment>): Comment => ({
  id: datatype.uuid(),
  user: {
    avatarUrl: image.avatar(),
    name: internet.userName(),
    isPro: datatype.boolean()
  },
  date: datatype.datetime().toISOString(),
  comment: lorem.sentence(51),
  rating: datatype.number({min: 1, max: 5}) as RatingScore,
  ...initial
});

export const makeLocation = (initial?: Partial<Location>): Location => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number({ min: 1, max: 15 }),
  ...initial
});

export const makeCity = (initial?: Partial<City>): City => ({
  name: address.cityName(),
  location: makeLocation(),
  ...initial
});

export const makeOfferPreviewInfo = (initial?: Partial<OfferPreviewInfo>): OfferPreviewInfo => ({
  city: makeCity(),
  id: datatype.uuid(),
  previewImage: image.imageUrl(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeLocation(),
  price: +commerce.price(),
  rating: datatype.number({min: 1, max: 5}) as RatingScore,
  title: `${company.companyName()}'s hotel`,
  type: random.arrayElement(Object.values(HotelType)),
  ...initial
});
