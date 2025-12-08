export enum ApiRoute {
  Offers = '/offers',
  Offer = 'offers/:id',
  NearbyOffers = 'offers/:id/nearby',
  Comments = '/comments/:id',
  Login = 'login',
  FavouriteStatus = '/favorite/:offerId/:status',
  Favourite = '/favorite'
}
