import { Link, useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import {
  ASSET_URL_USERS,
  ASSET_URL_POSTS,
  TEMPLATE_PROFILE_IMAGE,
} from '../../utils/helpers';
import ButtonsNav from '../../ui/ButtonsNav';
import Heading from '../../ui/Heading';
import Image from '../../ui/Image';
import { useAuth } from '../../contexts/AuthContext';
import { usePost } from './usePost';

const Post = () => {
  const { isLoading, postWithUser, error } = usePost();
  const { userId, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (error?.message.includes('ID')) navigate('/*');

  if (isLoading) return <Spinner />;

  document.title = `Meiersbook | ${postWithUser.title}`;

  const date = new Date(postWithUser.createdAt).toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.postContainer} post-id={postWithUser.id}>
      <div className={styles.profileImage}>
        <Image
          src={
            postWithUser?.creator?.image
              ? `${ASSET_URL_USERS}/${postWithUser.creator.image}`
              : TEMPLATE_PROFILE_IMAGE
          }
          alt="profile image"
          profile
          size={{ wl: '80', hl: '80', ws: '40', hs: '40' }}
        />
        <Heading>{postWithUser.creator.name}</Heading>
      </div>

      <Image
        post
        src={`${ASSET_URL_POSTS}/${postWithUser.image}`}
        alt={postWithUser.title}
      />
      <Heading secondary>{postWithUser.title}</Heading>
      <Heading dateStamp>Created at: {date}</Heading>

      <ButtonsNav>
        <Link to="/">
          <Button secondary>Go back</Button>
        </Link>
        {isLoggedIn && userId === postWithUser.creator._id && (
          <Link to="editpost">
            <Button secondary>Modify</Button>
          </Link>
        )}
      </ButtonsNav>
    </div>
  );
};

export default Post;
