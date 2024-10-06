import { useState } from 'react';
import Button from '../../ui/Button';
import ButtonsNav from '../../ui/ButtonsNav';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import Image from '../../ui/Image';
import Input from '../../ui/Input';
import { ASSET_URL_USERS } from '../../utils/helpers';
import { useImage } from '../../utils/useImage';
import { useUpdateUser } from './useUpdateUser';
import Spinner from '../../ui/Spinner';

function UpdateUser({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const { updateProfile, isUpdating } = useUpdateUser();
  const { previewImage, imageData, handleChangeImage } = useImage(
    user.image,
    user._id
  );

  const changedImage = !!previewImage.includes('blob');
  const isModified = user.name !== name || user.email !== email || changedImage;
  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !imageData) return;
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('image', imageData);
    updateProfile(form);
  };

  if (isUpdating) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Heading label>Name</Heading>
        <Input
          id="name"
          type="name"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Heading label>Email</Heading>
        <Input
          id="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Heading label>Profile picture</Heading>
        <Image
          src={changedImage ? previewImage : `${ASSET_URL_USERS}/${user.image}`}
          alt="profile picture"
          profile
          preview
        />
        <Input
          id="image"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChangeImage}
          required={true}
        />
      </FormGroup>
      <ButtonsNav>
        <Button primary disabled={!isModified}>
          Update
        </Button>
      </ButtonsNav>
    </Form>
  );
}

export default UpdateUser;
