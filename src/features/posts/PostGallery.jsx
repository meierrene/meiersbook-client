import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import styles from './PostGallery.module.css';
import Heading from '../../ui/Heading';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from './usePosts';
import Spinner from '../../ui/Spinner';

const PostGallery = () => {
  const { isLoading, postsWithUsers: posts } = usePosts();
  const { isLoggedIn } = useAuth();
  const number = posts?.length;
  document.title = 'Meiersbook | All posts';

  if (isLoading) return <Spinner />;

  return (
    <>
      {isLoggedIn && (
        <div className="front-panel">
          <Link className="btn compose-btn" to="/newpost">
            <Button secondary>New post</Button>
          </Link>
          <Heading secondary>
            {number > 0
              ? `You have ${number} post${number === 1 ? '' : 's'}:`
              : 'You have no posts! How about to create one?'}
          </Heading>
        </div>
      )}
      <div className={styles.galleryContainer}>
        {posts
          ?.slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(post => (
            <Card post={post} key={post.id} />
          ))}
      </div>
    </>
  );
};

export default PostGallery;
