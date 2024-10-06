import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import UpdateUser from '../features/users/UpdateUser';
import { useUser } from '../features/users/useUser';
import Spinner from '../ui/Spinner';
import ThemeToggler from '../ui/ThemeToggler';
import UpdateUserPassword from '../features/authentication/UpdateUserPassword';

function SettingsPage() {
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Heading primary>Settings</Heading>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Heading label>Theme: </Heading>
        <ThemeToggler />
      </div>
      {!!user._id && (
        <>
          <UpdateUser user={user} />
          <UpdateUserPassword user={user} />
        </>
      )}
    </div>
  );
}

export default SettingsPage;
