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
import Icon from './Icon';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToggleLikePost } from '../features/posts/useToggleLikePost';

const Card = ({ post }) => {
  const { userId } = useAuth();
  const href = useHref();
  const { isDark } = useThemes();

  const isLiked = !!post.likes.find(id => id === userId);

  const [like, setLike] = useState(isLiked);
  const { toggleLikePost } = useToggleLikePost(isLiked);
  const myposts = href === '/myposts';

  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);

  const handleToggleLike = e => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikePost(post.id);
  };

  if (!post.id) return;
  return (
    <Link
      className={`${styles.postLink}  ${isDark ? styles.themeDark : ''}`}
      to={`../posts/${post.id}`}
      style={{ width: '100%' }}
    >
      {!myposts && (
        <div className={styles.imageLikeContainer}>
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
            <Heading span>{stringLimiter(post.creator.name, 20)}</Heading>
          </div>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <Icon>
                <FaRegComment style={{ color: 'var(--main-color-default)' }} />
              </Icon>
              <Heading span>{post.comments.length}</Heading>
            </div>
            <div className={styles.icon} onClick={handleToggleLike}>
              <Icon>
                {like ? (
                  <FaHeart style={{ color: 'var(--main-color-default)' }} />
                ) : (
                  <FaRegHeart style={{ color: 'var(--main-color-default)' }} />
                )}
              </Icon>
              <Heading span>{post.likes.length}</Heading>
            </div>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <Image card src={`${ASSET_URL_POSTS}/${post.image}`} alt={post.title} />
        <Heading>{stringLimiter(post.title, 35)}</Heading>
      </div>
    </Link>
  );
};

export default Card;
