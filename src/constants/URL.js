const URL = Object.freeze({
  uploadImage: 'https://api.thecatapi.com/v1/images/upload',
  getUploadedImages: 'https://api.thecatapi.com/v1/images',
  createVote: 'https://api.thecatapi.com/v1/votes',
  getVotes: 'https://api.thecatapi.com/v1/votes',
  setFavourite: 'https://api.thecatapi.com/v1/favourites',
  getFavourite: 'https://api.thecatapi.com/v1/favourites',
  removeFavourite: 'https://api.thecatapi.com/v1/favourites/{favourite_id}'
});

export default URL;
