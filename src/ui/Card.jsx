import { Link } from 'react-router-dom';
import { useThemes } from '../contexts/ThemeContext';
import { stringLimiter } from '../utils/helpers';
import { useCheckPicture } from '../utils/useCheckPicture';
import styles from './Card.module.css';
import Heading from './Heading';
import Image from './Image';
import ProfileHeader from './ProfileHeader';

const Card = ({ post }) => {
  const { isDark } = useThemes();
  const validUrl = useCheckPicture(post?.thumbnail);

  if (!post.id) return null;

  return (
    <Link
      className={`${styles.postLink} ${isDark ? styles.themeDark : ''}`}
      to={`../posts/${post.id}`}
      style={{ width: '100%' }}
    >
      <ProfileHeader post={post} />
      <div className={styles.card}>
        <Image card src={validUrl} alt={post.title} />
        <Heading>{stringLimiter(post.title, 35)}</Heading>
      </div>
    </Link>
  );
};

export default Card;
