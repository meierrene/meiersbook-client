import { Link, useHref } from 'react-router-dom';
import {
  ASSET_URL_POSTS,
  stringLimiter,
  ASSET_URL_USERS,
} from '../utils/helpers';

import { useThemes } from '../contexts/ThemeContext';
import styles from './Card.module.css';
import Image from './Image';
import Heading from './Heading';

const Card = ({ post }) => {
  const href = useHref();
  const myposts = href === '/myposts';
  const { isDark } = useThemes();

  if (!post.id) return;
  return (
    <Link
      className={styles.postLink}
      to={`../posts/${post.id}`}
      style={{ width: '100%' }}
    >
      {!myposts && (
        <div className={styles.profileImage}>
          <Image
            src={
              post?.creator?.image !== undefined
                ? `${ASSET_URL_USERS}/${post.creator.image}`
                : ''
            }
            alt="profile image"
            profile
            size={{ wl: '30', hl: '30', ws: '26', hs: '26' }}
          />
          <span>{stringLimiter(post.creator.name, 30)}</span>
        </div>
      )}

      <div className={`${styles.card} ${isDark ? styles.themeDark : ''}`}>
        <Image card src={`${ASSET_URL_POSTS}/${post.image}`} alt={post.title} />
        <Heading>{stringLimiter(post.title, 36)}</Heading>
      </div>
    </Link>
  );
};

export default Card;
