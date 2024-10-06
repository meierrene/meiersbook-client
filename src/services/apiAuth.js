import { EXPIRATION_TIME } from '../utils/helpers';
import { BASE_URL_USERS } from '../utils/helpers';

export const login = async loginData => {
  const res = await fetch(`${BASE_URL_USERS}login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });
  const data = await res.json();
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
  await fetch(`${BASE_URL_USERS}logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem('auth-data');
};

export const signup = async signupData => {
  try {
    const res = await fetch(`${BASE_URL_USERS}signup`, {
      method: 'POST',
      body: signupData,
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error when signing up', error.message);
    throw error;
  }
};

export const updatePassword = async (userData, token) => {
  try {
    if (userData.passwordCurrent === userData.password)
      throw new Error('The same password.');

    const res = await fetch(`${BASE_URL_USERS}updateMyPassword`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating user's password", error.message);
    throw error;
  }
};
