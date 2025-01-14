import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import {
  stringLimiter,
  ASSET_URL_USERS,
  checkURL,
  TEMPLATE_PROFILE_IMAGE,
} from '../utils/helpers';
import Heading from './Heading';
import Image from './Image';
import styles from './ProfileHeader.module.css';
import Icon from './Icon';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToggleLikePost } from '../features/posts/useToggleLikePost';
import { useHref } from 'react-router-dom';
import Spinner from './Spinner';

function ProfileHeader({ post }) {
  const { userId } = useAuth();
  const isLiked = !!post.likes.find(id => id === userId);
  const [like, setLike] = useState(isLiked);
  const { toggleLikePost, isLoading } = useToggleLikePost(isLiked, post.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const href = useHref();
  const myposts = href === '/myposts';
  const postGallery = href === '/';
  const [validUrl, setValidUrl] = useState('');

  useEffect(() => {
    if (!post?.creator?.image) {
      setValidUrl(TEMPLATE_PROFILE_IMAGE);
      return;
    }
    const url = post.creator.image.startsWith('http')
      ? post.creator.image
      : `${ASSET_URL_USERS}/${post.creator.image}`;
    const validateUrl = async () => {
      const isValid = await checkURL(url);
      setValidUrl(isValid ? url : TEMPLATE_PROFILE_IMAGE);
    };
    validateUrl();
    setLike(isLiked);
  }, [post.creator.image, isLiked]);

  const handleToggleLike = e => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikePost(post.id);
  };

  const handleOpenModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.cardHeaderContainer} ${myposts && styles.toEnd}`}
      >
        {!myposts && (
          <div className={styles.profileImage}>
            <Image
              src={validUrl}
              alt="profile image"
              profile
              size={{ wl: '30', hl: '30', ws: '26', hs: '26' }}
              onClick={handleOpenModal}
            />
            <Heading span>
              {stringLimiter(
                post.creator.name,
                myposts || postGallery ? 30 : 40
              )}
            </Heading>
          </div>
        )}
        {(myposts || postGallery) && (
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <Icon>
                <FaRegComment style={{ color: 'var(--main-color-default)' }} />
              </Icon>
              <Heading span>{post.comments.length}</Heading>
            </div>
            {isLoading ? (
              <Spinner mini />
            ) : (
              <div className={styles.icon} onClick={handleToggleLike}>
                <Icon>
                  {like ? (
                    <FaHeart style={{ color: 'var(--main-color-default)' }} />
                  ) : (
                    <FaRegHeart
                      style={{ color: 'var(--main-color-default)' }}
                    />
                  )}
                </Icon>
                <Heading span>{post.likes.length}</Heading>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} nomargin>
        <Image
          src={validUrl}
          alt="profile image"
          post
          onClick={handleOpenModal}
        />
      </Modal>
    </>
  );
}

export default ProfileHeader;
