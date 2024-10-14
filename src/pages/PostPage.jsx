import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Post from '../features/posts/Post';
import { usePost } from '../features/posts/usePost';

const PostPage = () => {
  const { pathname } = useLocation();
  const { post, id } = usePost();
  const navigate = useNavigate();

  return (
    <>
      {post?.id === id
        ? !pathname.includes('editpost') && <Post />
        : navigate('/')}
      <Outlet />
    </>
  );
};

export default PostPage;
