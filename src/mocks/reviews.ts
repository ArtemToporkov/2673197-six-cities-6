import { Review } from '../types/review.ts';

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    date: new Date(2021, 2, 1),
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. ' +
      'The building is green and from 18th century.',
    score: 4
  },
  {
    id: '2',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    date: new Date(2021, 1, 21),
    comment: 'Not very good, Maxim Borovik\'s one is better.',
    score: 2
  }
];
