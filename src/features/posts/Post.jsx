import { Link } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { ASSET_URL } from '../../contexts/PostContext';
import ButtonsNav from '../../ui/ButtonsNav';
import Heading from '../../ui/Heading';
import Image from '../../ui/Image';

const Post = () => {
  const { currentPost, isLoading } = usePosts();

  if (isLoading) return <Spinner />;
  // if (currentPost === undefined && !isLoading) return navigate('*');
  if (!currentPost.id) return;

  document.title = `Meiersbook | ${currentPost.title}`;

  return (
    <div className="post-container" post-id={currentPost.id}>
      <Image
        post
        src={`${ASSET_URL}/${currentPost.image}`}
        alt={currentPost.title}
      />
      <Heading secondary>{currentPost.title}</Heading>
      <ButtonsNav>
        <Link to="/">
          <Button level="secondary">Go back</Button>
        </Link>
        <Link to="editpost">
          <Button level="secondary">Modify</Button>
        </Link>
      </ButtonsNav>
    </div>
  );
};

export default Post;
