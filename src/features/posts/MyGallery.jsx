import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import { useUser } from '../users/useUser';
import styles from './PostGallery.module.css';

function MyGallery() {
  const { isLoading, user } = useUser();
  document.title = 'Meiersbook | My posts';
  const posts = user?.posts || [];
  const number = posts?.length;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading secondary>
        {number > 0
          ? `You have ${number} post${number === 1 ? '' : 's'}:`
          : 'You have no posts! How about to create one?'}
      </Heading>

      <div className={styles.galleryContainer}>
        {posts
          ?.slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(post => {
            return <Card post={post} key={post.id} />;
          })}
      </div>
    </>
  );
}

export default MyGallery;
