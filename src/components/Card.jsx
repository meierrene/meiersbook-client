import { Link } from 'react-router-dom';
import { ASSET_URL } from '../contexts/PostContext';

const Card = ({ post }) => {
  const date = new Date(post.createdAt).toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  if (!post.id) return;

  return (
    <Link className="post-link" to={post.id}>
      <div className="card">
        <div className="card-image">
          {post.image ? (
            <img src={`${ASSET_URL}/${post.image}`} alt={post.title} />
          ) : (
            <p>Error to load photo in this post</p>
          )}
        </div>
        <h1 className="title-heading">{post.title}</h1>
        <p className="date-created">Created at: {date}</p>
      </div>
    </Link>
  );
};

export default Card;
