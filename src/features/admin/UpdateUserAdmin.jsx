import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import { useUserById } from '../users/useUserById';
import { ASSET_URL_USERS, TEMPLATE_PROFILE_IMAGE } from '../../utils/helpers';

import { useImage } from '../../utils/useImage';
import Image from '../../ui/Image';
import ButtonsNav from '../../ui/ButtonsNav';
import { useUpdateUserAdmin } from './useUpdateUserAdmin';
import Spinner from '../../ui/Spinner';

function UpdateUserAdmin() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { updateUser, isUpdating } = useUpdateUserAdmin();
  const { isLoading, user } = useUserById(id);
  const { previewImage, imageData, handleChangeImage, changedImage } = useImage(
    user?.data.image,
    user?.data._id
  );

  const userdata = user?.data || '';
  const loading = isUpdating || isLoading;

  useEffect(() => {
    if (userdata) {
      setName(userdata.name);
      setEmail(userdata.email);
    }
  }, [userdata]);

  const isModified =
    userdata.name !== name || userdata.email !== email || changedImage;

  const handleUpdateUser = e => {
    e.preventDefault();
    if (!name || !email || !imageData) return;
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('image', imageData);
    updateUser({ id, form });
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Form>
        <FormGroup>
          <Heading label>User ID</Heading>
          <Input
            id="id"
            type="text"
            placeholder="User ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </FormGroup>
      </Form>

      <Form onSubmit={handleUpdateUser}>
        <FormGroup>
          <Heading label>Name</Heading>
          <Input
            id="username"
            type="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Heading label>Email</Heading>
          <Input
            id="useremail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Heading label>Profile picture</Heading>
          <Image
            src={
              userdata
                ? changedImage
                  ? previewImage
                  : `${ASSET_URL_USERS}/${userdata.image}`
                : TEMPLATE_PROFILE_IMAGE
            }
            alt="preview"
            profile
            preview
          />
          <Input
            id="userimage"
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
    </>
  );
}

export default UpdateUserAdmin;
