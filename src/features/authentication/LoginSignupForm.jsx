import { useState } from 'react';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import ButtonsNav from '../../ui/ButtonsNav';
import Button from '../../ui/Button';
import Image from '../../ui/Image';
import { TEMPLATE_PROFILE_IMAGE } from '../../contexts/PostContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  // For Signup form
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // For the image
  const [previewImage, setPreviewImage] = useState(null);
  // const [imageData, setImageData] = useState({});

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      // setImageData(e.target.files[0]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <Form className="front-panel form-post-data" onSubmit={handleSubmit}>
        <Heading primary> {!isLogin ? 'Login' : 'Signup'}</Heading>
        {isLogin && (
          <FormGroup>
            <Heading>Name</Heading>
            <Input
              id="name"
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={false}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Heading>Email</Heading>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={false}
          />
        </FormGroup>
        <FormGroup>
          <Heading>Password</Heading>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={false}
          />
        </FormGroup>
        {isLogin && (
          <>
            <FormGroup>
              <Heading>Password Confirm</Heading>
              <Input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                disabled={false}
              />
            </FormGroup>
            <FormGroup>
              <Heading>Profile picture</Heading>
              <Image
                src={previewImage || TEMPLATE_PROFILE_IMAGE}
                alt="preview"
                profile
                preview
              />
              <Input
                id="image"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChangeImage}
              />
            </FormGroup>
          </>
        )}
        <ButtonsNav>
          <Button level="secondary" onClick={() => setIsLogin(l => !l)}>
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Button level="primary">{!isLogin ? 'Login' : 'Signup'}</Button>
        </ButtonsNav>
      </Form>
    </>
  );
}

export default LoginForm;
