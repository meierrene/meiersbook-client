import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { usePosts } from '../../contexts/PostContext';
import { useEffect } from 'react';
import styles from './PostGallery.module.css';

const PostGallery = () => {
  const { data, deselectPost } = usePosts();
  const number = data?.length;
  document.title = 'Meiersbook | All posts';

  // To prevent load undefined posts when clicking in
  useEffect(() => {
    deselectPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="front-panel">
        <Link className="btn compose-btn" to="/newpost">
          <Button level="secondary">New post</Button>
        </Link>
        <h1 className="primary-heading">
          {number > 0
            ? `You have ${number} post${number === 1 ? '' : 's'}:`
            : 'You have no posts! How about to create one?'}
        </h1>
      </div>
      <div className={styles.galleryContainer}>
        {data
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
