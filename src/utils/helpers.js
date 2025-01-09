const SUPABASE_STORAGE_URL =
  'https://vwkxqxlkljxqxxbfqflv.supabase.co/storage/v1/object/public/';

export const BASE_URL_POSTS = `${import.meta.env.VITE_API_URL}/posts/`;
export const BASE_URL_USERS = `${import.meta.env.VITE_API_URL}/users/`;
export const BASE_URL_GOOGLE = `${import.meta.env.VITE_API_URL}/auth/google/`;
export const ASSET_URL_POSTS = `${SUPABASE_STORAGE_URL}post-images${
  import.meta.env.VITE_ENV !== 'production' ? '-dev' : ''
}`;
export const ASSET_URL_USERS = `${SUPABASE_STORAGE_URL}user-images${
  import.meta.env.VITE_ENV !== 'production' ? '-dev' : ''
}`;
export const TEMPLATE_PROFILE_IMAGE = '/default-user.jpg';
export const ERROR_IMAGE = '/404-error.png';
export const NO_IMAGE = '/no-image.png';
export const EXPIRATION_TIME = 1000 * 60 * 60; //1h

export const imageChecker = image =>
  image instanceof File &&
  image.size > 0 &&
  image.name.trim() !== '' &&
  image.type.startsWith('image/');

export const stringLimiter = (string, limit) =>
  string.length > limit ? string.slice(0, limit - 2) + '...' : string;

export const getCountedWord = (array, word) =>
  array.length === 1 ? `${array.length} ${word}` : `${array.length} ${word}s`;

export const checkURL = async url => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok ? true : false;
  } catch {
    return false;
  }
};

export const getRetifiedError = async res => {
  const rawError = await res.text();
  const errorText = rawError.match(/<pre>(.*?)<br>/)[1];
  throw new Error(errorText);
};
