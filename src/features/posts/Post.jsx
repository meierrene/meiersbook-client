import { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Accordion from '../../ui/Accordion';
import Button from '../../ui/Button';
import ButtonsNav from '../../ui/ButtonsNav';
import Heading from '../../ui/Heading';
import ConfirmModal from '../../ui/ConfirmModal';
import Icon from '../../ui/Icon';
import Image from '../../ui/Image';
import Input from '../../ui/Input';
import ProfileHeader from '../../ui/ProfileHeader';
import Spinner from '../../ui/Spinner';
import {
  ASSET_URL_POSTS,
  ASSET_URL_USERS,
  TEMPLATE_PROFILE_IMAGE,
  getCountedWord,
  stringLimiter,
} from '../../utils/helpers';
import styles from './Post.module.css';
import { usePost } from './usePost';
import { useCreateComment } from './useCreateComment';
import { useDeleteComment } from './useDeleteComment';
import { useEditComment } from './useEditComment';

const Post = () => {
  const { createComment, isCreating } = useCreateComment();
  const { deleteComment, isDeleting } = useDeleteComment();
  const { editComment: editCommentFn, isEditing } = useEditComment();
  const { isLoading, post, error } = usePost();
  const { userId, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(null);

  const loading = isLoading || isCreating || isDeleting || isEditing;

  if (error?.message.includes('ID')) navigate('/*');

  const handleSendNewComment = () => {
    createComment({ text: newComment });
    setNewComment('');
  };

  const handleEditComment = id => {
    editCommentFn({ commentId: id, commentData: { text: editComment } });
    setIsEditingMode(null);
  };

  const handleDeleteComment = id => {
    deleteComment(id);
    setCommentToDelete(null);
  };

  if (loading) return <Spinner />;

  document.title = `Meiersbook | ${post.title}`;

  const date = new Date(post.createdAt).toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  return (
    <>
      <div className={styles.postContainer} post-id={post.id}>
        <ProfileHeader post={post} />
        <Image post src={`${ASSET_URL_POSTS}/${post.image}`} alt={post.title} />
        <Heading secondary>{post.title}</Heading>
        <Heading dateStamp>Created at: {date}</Heading>
        <Accordion title={getCountedWord(post.likes, 'Like')}>
          {post.likes.map(l => (
            <div key={l._id} className={styles.likeBoxContainer}>
              <Image
                profile
                size={{ wl: '30', hl: '30', ws: '26', hs: '26' }}
                src={`${ASSET_URL_USERS}/${l.image}` || TEMPLATE_PROFILE_IMAGE}
              />
              <Heading>{stringLimiter(l.name, 30)}</Heading>
            </div>
          ))}
        </Accordion>
        <Accordion title={getCountedWord(post.comments, 'Comment')}>
          <ButtonsNav>
            <Input
              id="newcomment"
              className={styles.commentInput}
              placeholder="New comment here..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              hasIcon={newComment ? true : false}
            >
              <Icon onClick={handleSendNewComment} disabled>
                <FaPlus />
              </Icon>
            </Input>
          </ButtonsNav>
          {post.comments.map(c => (
            <div key={c._id} className={styles.commentBoxContainer}>
              <Image
                profile
                size={{ wl: '30', hl: '30', ws: '26', hs: '26' }}
                src={
                  `${ASSET_URL_USERS}/${c.user.image}` || TEMPLATE_PROFILE_IMAGE
                }
              />
              <div className={styles.commentBox}>
                <Heading span>{stringLimiter(c.user.name, 30)}</Heading>
                {isEditingMode === c._id ? (
                  <Input
                    id="editcomment"
                    className={styles.commentInput}
                    value={editComment}
                    placeholder="Edit your comment here..."
                    onChange={e => setEditComment(e.target.value)}
                    hasIcon={editComment ? true : false}
                  >
                    <Icon onClick={() => handleEditComment(c._id)}>
                      <FaEdit />
                    </Icon>
                  </Input>
                ) : (
                  <Heading span>{c.text}</Heading>
                )}
                {c.edited && <Heading dateStamp>Comment edited</Heading>}
              </div>
              <div className={styles.icons}>
                <Icon
                  onClick={() => {
                    if (isEditingMode === c._id) {
                      setIsEditingMode(null);
                      setEditComment('');
                    } else {
                      setIsEditingMode(c._id);
                      setEditComment(c.text);
                    }
                  }}
                >
                  <FaEdit />
                </Icon>
                <Icon onClick={() => setCommentToDelete(c._id)}>
                  <FaTrashAlt />
                </Icon>
              </div>
              <ConfirmModal
                isOpen={commentToDelete === c._id}
                onClose={() => setCommentToDelete(false)}
                onConfirm={() => handleDeleteComment(c._id)}
                title="Delete comment"
                message="Are you sure you want to delete this comment?"
              />
            </div>
          ))}
        </Accordion>
        <ButtonsNav>
          <Link to="/">
            <Button secondary>Go back</Button>
          </Link>
          {isLoggedIn && userId === post.creator._id && (
            <Link to="editpost">
              <Button secondary>Modify</Button>
            </Link>
          )}
        </ButtonsNav>
      </div>
    </>
  );
};

export default Post;
