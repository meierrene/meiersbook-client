import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Post from '../components/Post';
import { usePosts } from '../contexts/PostContext';
import { useEffect } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const { currentPost, getPost } = usePosts();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <>
      {currentPost ? !pathname.includes('editpost') && <Post /> : navigate('/')}
      <Outlet />
    </>
  );
};

export default PostPage;
