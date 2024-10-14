import { BASE_URL_USERS } from '../utils/helpers';

export const getAllUsers = async token => {
  try {
    const res = await fetch(BASE_URL_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error to get users information', error.message);
    throw error;
  }
};

export const updateUser = async (token, id, userData) => {
  try {
    const res = await fetch(`${BASE_URL_USERS}${id}`, {
      method: 'PATCH',
      body: userData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    return res.ok;
  } catch (error) {
    console.error('Error to update user', error.message);
    throw error;
  }
};

export const deleteUser = async (token, id) => {
  try {
    const res = await fetch(`${BASE_URL_USERS}${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorTextRaw = await res.text();
      const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
      throw new Error(errorText);
    }
    return res.ok;
  } catch (error) {
    console.error('Error to delete user', error.message);
    throw error;
  }
};

export const deleteEverything = async token => {
  console.log('EVERYTHING DELETED!!!');
  try {
    // const res = await fetch(`${BASE_URL_USERS}delete-everything`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (!res.ok) {
    //   const errorTextRaw = await res.text();
    //   const errorText = errorTextRaw.match(/<pre>(.*?)<br>/)[1];
    //   throw new Error(errorText);
    // }
    // return res.ok;
  } catch (error) {
    console.error('Error to delete everything', error.message);
    throw error;
  }
};
