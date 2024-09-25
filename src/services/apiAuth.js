import { EXPIRATION_TIME } from '../utils/helpers';

export const login = async loginData => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });

  const data = await res.json();
  console.log(data);

  const tokenExpirationDate = new Date(new Date().getTime() + EXPIRATION_TIME);
  localStorage.setItem(
    'auth-data',
    JSON.stringify({
      userId: data.data.user._id,
      token: data.token,
      expiration: tokenExpirationDate.toISOString(),
    })
  );
  return data;
};

export const logout = async token => {
  await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem('auth-data');
};

export const signup = async () => {};
