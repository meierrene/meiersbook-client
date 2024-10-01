import { useState } from 'react';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import ButtonsNav from '../../ui/ButtonsNav';
import Button from '../../ui/Button';
import Image from '../../ui/Image';
import { imageChecker, TEMPLATE_PROFILE_IMAGE } from '../../utils/helpers';
import { useLogin } from './useLogin';
import { useImage } from '../../utils/useImage';
import { useSignup } from './useSignup';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For Signup form
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { login, isLoading: loadingLogin } = useLogin();
  const { signup, isLoading: loadingSignin } = useSignup();
  const { previewImage, imageData, handleChangeImage } =
    useImage('default-user.jpg');

  const isLoading = loadingLogin || loadingSignin;

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
    else {
      if (!name || !passwordConfirm || !imageChecker(imageData)) return;
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      form.append('password', password);
      form.append('passwordConfirm', passwordConfirm);
      form.append('image', imageData);

      signup(form, {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');
        },
      });
    }
  };
  return (
    <>
      <Form className="front-panel form-post-data" onSubmit={handleSubmit}>
        <Heading primary> {isLoginForm ? 'Login' : 'Signup'}</Heading>
        {!isLoginForm && (
          <FormGroup>
            <Heading>Name</Heading>
            <Input
              id="name"
              type="name"
              placeholder="name"
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
            placeholder="email"
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
                required={true}
              />
            </FormGroup>
          </>
        )}
        <ButtonsNav>
          <Button primary>{isLoginForm ? 'Login' : 'Signup'}</Button>
        </ButtonsNav>
      </Form>
      <ButtonsNav>
        <Button secondary full onClick={() => setIsLoginForm(l => !l)}>
          {!isLoginForm
            ? 'Has already an account? Login'
            : 'Do you not have an account yet? Signup'}
        </Button>
      </ButtonsNav>
    </>
  );
}

export default LoginForm;
