import { useState } from 'react';
import Button from '../../ui/Button';
import ButtonsNav from '../../ui/ButtonsNav';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import { useUpdatePassword } from './useUpdatePassword';
import Spinner from '../../ui/Spinner';

function UpdateUserPassword() {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { updatePassword, isUpdating } = useUpdatePassword();
  const notInBlank = !!passwordCurrent && !!password && !!passwordConfirm;

  const handleSubmit = e => {
    e.preventDefault();
    if (!notInBlank) return;
    updatePassword({ passwordCurrent, password, passwordConfirm });
  };

  if (isUpdating) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Heading label>Current password</Heading>
        <Input
          id="oldpassword"
          type="password"
          value={passwordCurrent}
          placeholder="Current Password"
          onChange={e => setPasswordCurrent(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Heading label>New password</Heading>
        <Input
          id="newpassword"
          type="password"
          value={password}
          placeholder="New password"
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Heading label>Confirm new password </Heading>
        <Input
          id="newpasswordconfirm"
          type="password"
          value={passwordConfirm}
          placeholder="Confirm new password"
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </FormGroup>
      <ButtonsNav>
        <Button primary disabled={!notInBlank}>
          Submit new password
        </Button>
      </ButtonsNav>
    </Form>
  );
}

export default UpdateUserPassword;
