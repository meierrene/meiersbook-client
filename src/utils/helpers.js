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
export const STRINGLIMITER = 45;

export const imageChecker = image =>
  image instanceof File &&
  image.size > 0 &&
  image.name.trim() !== '' &&
  image.type.startsWith('image/');

export const stringLimiter = (string, limit = STRINGLIMITER) =>
  string.length > limit ? string.slice(0, limit - 2) + '...' : string;

export const getCountedWord = (array, word) =>
  array.length === 1 ? `${array.length} ${word}` : `${array.length} ${word}s`;

const urlCache = new Map();
export const checkURL = async url => {
  if (url.includes('googleusercontent.com')) return true;
  if (urlCache.has(url)) return urlCache.get(url);
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const isValid = response.ok;
    urlCache.set(url, isValid);
    return isValid;
  } catch (error) {
    console.error('URL check failed:', error.message);
    return false;
  }
};

export const profileImage = async image => {
  if (!image) return TEMPLATE_PROFILE_IMAGE;
  const url = image.startsWith('http') ? image : `${ASSET_URL_USERS}/${image}`;
  const isValid = await checkURL(url);
  const finalVal = (await isValid) ? url : TEMPLATE_PROFILE_IMAGE;
  console.log(finalVal);
  return finalVal;
};

export const getRetifiedError = async res => {
  const rawError = await res.text();
  const errorText = rawError.match(/<pre>(.*?)<br>/)[1];
  throw new Error(errorText);
};
