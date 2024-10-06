import UpdateUserPassword from '../features/authentication/UpdateUserPassword';
import DeleteUser from '../features/users/DeleteUser';
import UpdateUser from '../features/users/UpdateUser';
import { useUser } from '../features/users/useUser';
import Accordion from '../ui/Accordion';
import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import ThemeToggler from '../ui/ThemeToggler';

function SettingsPage() {
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading primary>Settings</Heading>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Heading label>Theme: </Heading>
        <ThemeToggler />
      </div>
      {!!user._id && (
        <>
          <Accordion title="Update your account">
            <UpdateUser user={user} />
          </Accordion>

          <Accordion title="Update your password">
            <UpdateUserPassword user={user} />
          </Accordion>

          <DeleteUser />
        </>
      )}
      {user.role === 'admin' && (
        <>
          <Heading primary>Admin Settings</Heading>
          <Accordion title="Users management"></Accordion>
        </>
      )}
    </>
  );
}

export default SettingsPage;
