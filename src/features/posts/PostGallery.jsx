import Card from '../../ui/Card';
import Spinner from '../../ui/Spinner';
import styles from './PostGallery.module.css';
import { usePosts } from './usePosts';

const PostGallery = () => {
  const { isLoading, postsWithUsers: posts } = usePosts();
  document.title = 'Meiersbook | All posts';

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.galleryContainer}>
      {posts
        ?.slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(post => (
          <Card post={post} key={post.id} />
        ))}
    </div>
  );
};

export default PostGallery;
