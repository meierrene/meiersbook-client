export const BASE_URL_POSTS = `${import.meta.env.VITE_API_URL}/posts/`;
export const BASE_URL_USERS = `${import.meta.env.VITE_API_URL}/users/`;
export const ASSET_URL_POSTS = `${
  import.meta.env.VITE_ASSET_URL
}/uploads/postsImages`;
export const ASSET_URL_USERS = `${
  import.meta.env.VITE_ASSET_URL
}/uploads/userImages`;
export const TEMPLATE_PROFILE_IMAGE = './default-user.jpg';
export const ERROR_IMAGE = '/404-error.png';
export const NO_IMAGE = '/no-image.png';
export const EXPIRATION_TIME = 1000 * 60 * 60; //1h

export const imageChecker = image =>
  image instanceof File && image.size > 0 && image.name.trim() !== '';

export const stringLimiter = (string, limit) =>
  string.length > limit ? string.slice(0, limit - 2) + '...' : string;
