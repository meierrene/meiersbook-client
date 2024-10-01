import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ASSET_URL_POSTS } from '../../utils/helpers';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import TextArea from '../../ui/TextArea';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import ButtonsNav from '../../ui/ButtonsNav';
import Heading from '../../ui/Heading';
import Image from '../../ui/Image';
import { useImage } from '../../utils/useImage';
import { usePost } from './usePost';
import { useCreatePost } from './useCreatePost';
import { useEditPost } from './useEditPost';
import { useDeletePost } from './useDeletePost';

const NewEditPost = () => {
  const { createPost, isCreating } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const { isLoading, postWithUser } = usePost();
  const { deletePost, isDeleting } = useDeletePost();
  const navigate = useNavigate();
  const [title, setTitle] = useState(
    postWithUser?.id ? postWithUser.title : ''
  );

  const { previewImage, imageData, handleChangeImage } = useImage(
    postWithUser.image,
    postWithUser.id
  );

  const loading = isCreating || isEditing || isLoading || isDeleting;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!imageData) return;
    const form = new FormData();
    form.append('image', imageData);
    form.append('title', title);
    if (postWithUser.id) editPost(form);
    else createPost(form);
  };

  const handleDelete = async () => {
    deletePost();
    navigate('/');
  };

  document.title = `Meiersbook | ${postWithUser?.id ? 'Edit' : 'New'} post`;

  if (loading) return <Spinner />;

  return (
    <>
      <Heading primary>{postWithUser?.id ? 'Update' : 'New'} Post</Heading>

      <Form
        className="front-panel form-post-data"
        id={postWithUser?.id ? 'edit' : 'new'}
        dataId={postWithUser?.id ? postWithUser.id : ''}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          {previewImage && (
            <Image
              preview
              src={
                postWithUser.image === previewImage
                  ? `${ASSET_URL_POSTS}/${postWithUser.image}`
                  : previewImage
              }
              alt="preview"
            />
          )}
          <Input
            id="image"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChangeImage}
          />
        </FormGroup>
        <FormGroup>
          <Heading>Description</Heading>
          <TextArea
            name="title"
            autoFocus={true}
            value={title}
            onChange={e => setTitle(e.target.value)}
          >
            {postWithUser?.id ? postWithUser.title : ''}
          </TextArea>
        </FormGroup>
        <ButtonsNav>
          <Link to="/">
            <Button secondary>Go back</Button>
          </Link>
          <Button primary disabled={!imageData.name && !postWithUser.id}>
            {postWithUser?.id ? 'Update' : 'Publish'}
          </Button>
          {postWithUser?.id && (
            <Button danger onClick={handleDelete}>
              Delete post
            </Button>
          )}
        </ButtonsNav>
      </Form>
    </>
  );
};

export default NewEditPost;
