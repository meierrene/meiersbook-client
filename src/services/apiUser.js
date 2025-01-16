import { BASE_URL_USERS } from '../utils/helpers';

export const updateUser = async (userData, token) => {
  try {
    const res = await fetch(`${BASE_URL_USERS}updateMe`, {
      method: 'PATCH',
      body: userData,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating user', error.message);
    throw error;
  }
};

export const deleteUser = async token => {
  try {
    await fetch(`${BASE_URL_USERS}deleteMe`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('auth-data');
  } catch (error) {
    console.error('Error deleting user', error.message);
    throw error;
  }
};

export const getCurrentUser = async token => {
  try {
    const res = await fetch(`${BASE_URL_USERS}me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error get user', error.message);
    throw error;
  }
};

export const getUserById = async id => {
  try {
    const res = await fetch(`${BASE_URL_USERS}find/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error get user provided ID', error.message);
    throw error;
  }
};
