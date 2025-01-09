import { EXPIRATION_TIME } from '../utils/helpers';
import { BASE_URL_GOOGLE } from '../utils/helpers';

export const oAuth = async token => {
  const res = await fetch(`${BASE_URL_GOOGLE}callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: token }),
  });
  const data = await res.json();
  const tokenExpirationDate = new Date(new Date().getTime() + EXPIRATION_TIME);
  if (data.status === 'success') {
    localStorage.setItem(
      'auth-data',
      JSON.stringify({
        userId: data.data.id,
        token: data.token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    return data;
  } else {
    throw new Error(data.message);
  }
};
