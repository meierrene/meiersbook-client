export const BASE_URL = `${import.meta.env.VITE_API_URL}/posts/`;
export const ASSET_URL = `${
  import.meta.env.VITE_ASSET_URL
}/uploads/postsImages`;
export const TEMPLATE_PROFILE_IMAGE = './default-user.jpg';
export const ERROR_IMAGE = '/404-error.png';
export const EXPIRATION_TIME = 1000 * 60 * 60; //1h

export const imageChecker = image =>
  image instanceof File && image.size > 0 && image.name.trim() !== '';
