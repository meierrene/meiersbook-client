import { useState } from 'react';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormGroup from '../../ui/FormGroup';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className="front-panel form-post-data">
      <FormGroup>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={false}
        />
      </FormGroup>
      <FormGroup>
        <Input
          id="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={false}
        />
      </FormGroup>
    </Form>
  );
}

export default LoginForm;
