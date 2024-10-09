import UpdateUserPassword from '../features/authentication/UpdateUserPassword';
import DeleteUser from '../features/users/DeleteUser';
import UpdateUser from '../features/users/UpdateUser';
import AllUsersListAdmin from '../features/admin/AllUsersListAdmin';
import { useUser } from '../features/users/useUser';
import Accordion from '../ui/Accordion';
import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import ThemeToggler from '../ui/ThemeToggler';
import UpdateUserAdmin from '../features/admin/UpdateUserAdmin';
import DeleteUserAdmin from '../features/admin/DeleteUserAdmin';
import DeleteEverythingAdmin from '../features/admin/DeleteEverythingAdmin';

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
          <Accordion title="Remove your account">
            <DeleteUser />
          </Accordion>
        </>
      )}
      {user.role === 'admin' && (
        <>
          <hr />
          <Heading primary>Admin Settings</Heading>
          <Accordion title="Get all users">
            <AllUsersListAdmin />
          </Accordion>
          <Accordion title="Edit User">
            <UpdateUserAdmin />
          </Accordion>
          <Accordion title="Delete User">
            <DeleteUserAdmin />
          </Accordion>
          <Accordion title="⚠ Delete every post ⚠">
            <DeleteEverythingAdmin />
          </Accordion>
        </>
      )}
    </>
  );
}

export default SettingsPage;
