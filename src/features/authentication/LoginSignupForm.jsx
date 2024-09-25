import { useState } from 'react';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import ButtonsNav from '../../ui/ButtonsNav';
import Button from '../../ui/Button';
import Image from '../../ui/Image';
import { TEMPLATE_PROFILE_IMAGE } from '../../utils/helpers';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For Signup form
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  // const [imageData, setImageData] = useState({});

  const [isLoginForm, setIsLoginForm] = useState(true);
  const { login, isLoading } = useLogin();

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      // setImageData(e.target.files[0]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    if (isLoginForm)
      login(
        { email, password },
        {
          onSuccess: () => {
            setEmail('');
            setPassword('');
          },
        }
      );
  };

  return (
    <>
      <Form className="front-panel form-post-data" onSubmit={handleSubmit}>
        <Heading primary> {!isLoginForm ? 'Login' : 'Signup'}</Heading>
        {!isLoginForm && (
          <FormGroup>
            <Heading>Name</Heading>
            <Input
              id="name"
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isLoading}
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
            disabled={isLoading}
          />
        </FormGroup>
        <FormGroup>
          <Heading>Password</Heading>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormGroup>
        {!isLoginForm && (
          <>
            <FormGroup>
              <Heading>Password Confirm</Heading>
              <Input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </FormGroup>
          </>
        )}
        <ButtonsNav>
          <Button level="primary">{isLoginForm ? 'Login' : 'Signup'}</Button>
        </ButtonsNav>
      </Form>
      <Button level="secondary" onClick={() => setIsLoginForm(l => !l)}>
        {!isLoginForm
          ? 'Has already an account? Login'
          : 'Do you not have an account yet? Signup'}
      </Button>
    </>
  );
}

export default LoginForm;
