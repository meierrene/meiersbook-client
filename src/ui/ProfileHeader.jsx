import { useEffect, useState } from 'react';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useHref } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToggleLikePost } from '../features/posts/useToggleLikePost';
import { stringLimiter } from '../utils/helpers';
import { useCheckPicture } from '../utils/useCheckPicture';
import Heading from './Heading';
import Icon from './Icon';
import Image from './Image';
import Modal from './Modal';
import styles from './ProfileHeader.module.css';
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

  const validUrl = useCheckPicture(post?.creator?.image, true);

  useEffect(() => setLike(isLiked), [isLiked]);

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
