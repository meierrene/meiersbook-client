import { Link } from 'react-router-dom';
import { ASSET_URL } from '../utils/helpers';

import { useThemes } from '../contexts/ThemeContext';
import styles from './Card.module.css';
import Heading from './Heading';

const Card = ({ post }) => {
  const { isDark } = useThemes();

  const date = new Date(post.createdAt).toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  if (!post.id) return;

  return (
    <Link className="post-link" to={post.id}>
      <div className={`${styles.card} ${isDark ? styles.themeDark : ''}`}>
        <div className={styles.cardImage}>
          {post.image ? (
            <img src={`${ASSET_URL}/${post.image}`} alt={post.title} />
          ) : (
            <p>Error to load photo in this post</p>
          )}
        </div>
        <Heading>{post.title}</Heading>
        <p className="date-created">Created at: {date}</p>
      </div>
    </Link>
  );
};

export default Card;
