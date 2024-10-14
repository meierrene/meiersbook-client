import { Link } from 'react-router-dom';
import { ASSET_URL_POSTS, stringLimiter } from '../utils/helpers';
import { useThemes } from '../contexts/ThemeContext';
import styles from './Card.module.css';
import Heading from './Heading';
import Image from './Image';
import ProfileHeader from './ProfileHeader';

const Card = ({ post }) => {
  const { isDark } = useThemes();

  if (!post.id) return;

  return (
    <Link
      className={`${styles.postLink}  ${isDark ? styles.themeDark : ''}`}
      to={`../posts/${post.id}`}
      style={{ width: '100%' }}
    >
      <ProfileHeader post={post} />
      <div className={styles.card}>
        <Image card src={`${ASSET_URL_POSTS}/${post.image}`} alt={post.title} />
        <Heading>{stringLimiter(post.title, 35)}</Heading>
      </div>
    </Link>
  );
};

export default Card;
