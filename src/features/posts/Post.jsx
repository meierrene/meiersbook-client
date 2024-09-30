import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { ASSET_URL_POSTS } from '../../utils/helpers';
import ButtonsNav from '../../ui/ButtonsNav';
import Heading from '../../ui/Heading';
import Image from '../../ui/Image';
import { useAuth } from '../../contexts/AuthContext';

const Post = () => {
  const { currentPost, isLoading } = usePosts();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!currentPost) {
    navigate('/');
    return null; // Prevent rendering the rest of the component
  }

  if (isLoading) return <Spinner />;

  document.title = `Meiersbook | ${currentPost.title}`;

  const date = new Date(currentPost.createdAt).toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="post-container" post-id={currentPost.id}>
      <Image
        post
        src={`${ASSET_URL_POSTS}/${currentPost.image}`}
        alt={currentPost.title}
      />
      <Heading secondary>{currentPost.title}</Heading>
      <Heading dateStamp>Created at: {date}</Heading>

      <ButtonsNav>
        <Link to="/">
          <Button level="secondary">Go back</Button>
        </Link>
        {isLoggedIn && (
          <Link to="editpost">
            <Button level="secondary">Modify</Button>
          </Link>
        )}
      </ButtonsNav>
    </div>
  );
};

export default Post;
