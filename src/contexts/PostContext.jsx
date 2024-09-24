import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export const BASE_URL = `${import.meta.env.VITE_API_URL}/posts/`;
export const ASSET_URL = `${
  import.meta.env.VITE_ASSET_URL
}/uploads/postsImages`;
export const TEMPLATE_PROFILE_IMAGE = './imgs/default-user.jpg';

const initalState = {
  status: '',
  data: null,
  currentPost: {},
  message: '',
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'posts/loaded':
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        data: action.payload.data,
      };
    case 'post/loaded':
      return { ...state, isLoading: false, currentPost: action.payload.data };
    case 'post/created':
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      };
    case 'post/edited':
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: state.data.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case 'post/deleted':
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(post => post.id !== action.payload),
      };
    case 'deselected':
      return { ...state, currentPost: {} };
    case 'rejected':
      return {
        ...state,
        status: action.payload.status,
        message: action.payload,
        isLoading: false,
      };
    default:
      throw new Error('Invalid action');
  }
};

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [{ status, data, currentPost, message, isLoading }, dispatch] =
    useReducer(reducer, initalState);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) return dispatch({ type: 'error', payload: res });
        const data = await res.json();
        dispatch({ type: 'posts/loaded', payload: data });
      } catch {
        dispatch({
          type: 'error',
          payload: 'There was en error loading posts.',
        });
      }
    };
    fetchPosts();
  }, []);

  const getPost = useCallback(
    async id => {
      if (id === currentPost.id) return;
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL + id);
        const data = await res.json();
        dispatch({ type: 'post/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was en error loading post.',
        });
      }
    },
    [currentPost.id]
  );

  const createPost = async newPost => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: newPost,
      });
      const data = await res.json();
      dispatch({ type: 'post/created', payload: data });
    } catch {}
  };

  const editPost = async (id, post) => {
    console.log(post);
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL + id, {
        method: 'PATCH',
        body: post,
      });
      const data = await res.json();
      dispatch({ type: 'post/edited', payload: data });
    } catch {}
  };

  const deletePost = async id => {
    dispatch({ type: 'loading' });
    try {
      await fetch(BASE_URL + id, { method: 'DELETE' });
      dispatch({ type: 'post/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was en error deleting post.',
      });
    }
  };

  const deselectPost = () => dispatch({ type: 'deselected' });

  return (
    <PostContext.Provider
      value={{
        status,
        data,
        currentPost,
        message,
        isLoading,
        createPost,
        getPost,
        editPost,
        deletePost,
        deselectPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error(
      'This custom hook is not available from the parent component'
    );
  return context;
};

export { PostProvider, usePosts };
