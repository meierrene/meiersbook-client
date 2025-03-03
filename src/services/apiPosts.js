import {
  BASE_URL_POSTS,
  BASE_URL_USERS,
  getRetifiedError,
} from '../utils/helpers';

export const getPosts = async () => {
  try {
    const resPosts = await fetch(BASE_URL_POSTS);
    if (!resPosts.ok) throw new Error('Could not get posts');
    const dataPosts = await resPosts.json();
    const usersId = dataPosts.data.map(data => data.creator);
    const uniqueUsersId = [...new Set(usersId)];
    const resUsers = await Promise.all(
      uniqueUsersId.map(id => fetch(`${BASE_URL_USERS}find/${id}`))
    );
    for (let res of resUsers) {
      if (!res.ok)
        throw new Error(
          `Could not fetch user with ID: ${res.url.split('/').pop()}`
        );
    }
    const dataUsers = await Promise.all(resUsers.map(res => res.json()));
    return { dataPosts, dataUsers };
  } catch (error) {
    console.error('Error fetching posts or users:', error.message);
    throw error;
  }
};

export const getPost = async id => {
  try {
    const resPost = await fetch(`${BASE_URL_POSTS}${id}`);
    if (!resPost.ok) throw new Error('Could not get post with specified ID');
    const data = await resPost.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error.message);
    throw error;
  }
};

export const createPost = async (newData, token) => {
  try {
    const res = await fetch(BASE_URL_POSTS, {
      method: 'POST',
      body: newData,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) getRetifiedError(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
};

export const editPost = async (id, postData, token) => {
  try {
    const res = await fetch(`${BASE_URL_POSTS}${id}`, {
      method: 'PATCH',
      body: postData,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) getRetifiedError(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error editing post:', error.message);
    throw error;
  }
};

export const deletePost = async (id, token) => {
  try {
    await fetch(`${BASE_URL_POSTS}${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    throw error;
  }
};

export const likePost = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL_POSTS}${id}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) getRetifiedError(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error to like the post:', error.message);
    throw error;
  }
};

export const unlikePost = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL_POSTS}${id}/unlike`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) getRetifiedError(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error to unlike the post:', error.message);
    throw error;
  }
};

export const createComment = async (id, commentData, token) => {
  try {
    const res = await fetch(`${BASE_URL_POSTS}${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) getRetifiedError(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating comment:', error.message);
    throw error;
  }
};

export const editComment = async (id, commentId, commentData, token) => {
  try {
    const res = await fetch(`${BASE_URL_POSTS}${id}/comment/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error editing comment:', error.message);
    throw error;
  }
};

export const deleteComment = async (id, commentId, token) => {
  try {
    await fetch(`${BASE_URL_POSTS}${id}/comment/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    throw error;
  }
};
