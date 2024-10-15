import { Link } from 'react-router-dom';
import {
  ASSET_URL_POSTS,
  NO_IMAGE,
  checkURL,
  stringLimiter,
} from '../utils/helpers';
import { useThemes } from '../contexts/ThemeContext';
import styles from './Card.module.css';
import Heading from './Heading';
import Image from './Image';
import ProfileHeader from './ProfileHeader';
import { useState, useEffect } from 'react';

const Card = ({ post }) => {
  const { isDark } = useThemes();
  const [validUrl, setValidUrl] = useState('');

  useEffect(() => {
    const url = `${ASSET_URL_POSTS}/${post.thumbnail}`;
    const validateUrl = async () => {
      const isValid = await checkURL(url);
      setValidUrl(isValid ? url : NO_IMAGE);
    };
    validateUrl();
  }, [post.thumbnail]);

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
