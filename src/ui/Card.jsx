import { Link } from 'react-router-dom';
import {
  ASSET_URL_POSTS,
  stringLimiter,
  TEMPLATE_PROFILE_IMAGE,
} from '../utils/helpers';

import { useThemes } from '../contexts/ThemeContext';
import styles from './Card.module.css';
import Image from './Image';

const Card = ({ post }) => {
  const { isDark } = useThemes();

  if (!post.id) return;
  const str = 'User Profile To be Implemented in the Card';
  return (
    <Link className={styles.postLink} to={post.id}>
      <div className={styles.profileImage}>
        <Image
          src={TEMPLATE_PROFILE_IMAGE}
          alt="profile image"
          profile
          size={{ wl: '30', hl: '30', ws: '26', hs: '26' }}
        />
        <span>{stringLimiter(str, 30)}</span>
      </div>

      <div className={`${styles.card} ${isDark ? styles.themeDark : ''}`}>
        <div className={styles.cardImage}>
          {post.image ? (
            <img src={`${ASSET_URL_POSTS}/${post.image}`} alt={post.title} />
          ) : (
            <p>Error to load photo in this post</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
