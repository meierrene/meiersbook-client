import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import { ASSET_URL } from '../../contexts/PostContext';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import TextArea from '../../ui/TextArea';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';

const NewEditPost = () => {
  const { currentPost, createPost, editPost, isLoading } = usePosts();
  const [previewImage, setPreviewImage] = useState(
    currentPost.image ? currentPost.image : null
  );
  const [imageData, setImageData] = useState(
    currentPost.id ? currentPost.image : {}
  );
  const [title, setTitle] = useState(currentPost.id ? currentPost.title : '');

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImageData(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    console.log(imageData);
    e.preventDefault();
    if (!imageData) return;
    const form = new FormData();
    form.append('image', imageData);
    form.append('title', title);
    if (currentPost.id) await editPost(currentPost.id, form);
    else await createPost(form);

    window.location.assign('/');
  };

  document.title = `Meiersbook | ${currentPost.id ? 'Edit' : 'New'} post`;

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1 className="primary-heading">
        {currentPost.id ? 'Update' : 'New'} Post
      </h1>
      <Form
        className="front-panel form-post-data"
        id={currentPost.id ? 'edit' : 'new'}
        dataId={currentPost.id ? currentPost.id : ''}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <div className="image-preview">
            {previewImage && (
              <img
                src={
                  currentPost.image === previewImage
                    ? `${ASSET_URL}/${currentPost.image}`
                    : previewImage
                }
                alt="preview"
              />
            )}
          </div>
          <Input
            id="image"
            className="btn"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChangeImage}
          />
        </FormGroup>
        <FormGroup>
          <label className="title-heading">Description</label>
          <TextArea
            className="title-heading form-control"
            name="title"
            autoFocus={true}
            value={title}
            onChange={e => setTitle(e.target.value)}
          >
            {currentPost.id ? currentPost.title : ''}
          </TextArea>
        </FormGroup>
        <div className="buttons-nav">
          <Link to="/">
            <Button level="secondary">Go back</Button>
          </Link>
          <Button level="primary" disabled={!imageData.name && !currentPost.id}>
            {currentPost.id ? 'Update' : 'Publish'}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewEditPost;
