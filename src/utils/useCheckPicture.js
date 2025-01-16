import { useEffect, useState } from 'react';
import {
  checkURL,
  ASSET_URL_USERS,
  TEMPLATE_PROFILE_IMAGE,
  NO_IMAGE,
  ASSET_URL_POSTS,
} from './helpers';

export const useCheckPicture = (image, isProfile = false) => {
  const [validUrl, setValidUrl] = useState('');
  const asset = isProfile ? ASSET_URL_USERS : ASSET_URL_POSTS;
  const fallback = isProfile ? TEMPLATE_PROFILE_IMAGE : NO_IMAGE;
  useEffect(() => {
    if (!image) {
      setValidUrl(fallback);
      return;
    }
    const url = image.startsWith('http') ? image : `${asset}/${image}`;
    if (url.includes('googleusercontent.com')) {
      setValidUrl(url);
      return;
    }
    const validateUrl = async () => {
      const isURLValid = await checkURL(url);
      setValidUrl(isURLValid ? url : fallback);
    };
    validateUrl();
  }, [asset, fallback, image]);

  return validUrl;
};
