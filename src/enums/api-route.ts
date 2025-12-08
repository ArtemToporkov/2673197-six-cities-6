export enum ApiRoute {
  Offers = '/offers',
  Offer = 'offers/:id',
  NearbyOffers = 'offers/:id/nearby',
  Comments = '/comments/:id',
  Login = 'login',
  FavouriteStatus = '/favourite/:offerId/:status',
  Favourite = '/favourite'
}
