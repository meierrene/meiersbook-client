import { useState } from 'react';
import { useUserById } from '../users/useUserById';
import ConfirmModal from '../../ui/ConfirmModal';
import FormGroup from '../../ui/FormGroup';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import ButtonsNav from '../../ui/ButtonsNav';
import { useDeleteUserAdmin } from './useDeleteUserAdmin';

function DeleteUserAdmin() {
  const [id, setId] = useState('');
  const { isLoading, user } = useUserById(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteUser, isDeleting } = useDeleteUserAdmin();

  const userdata = user?.data || '';

  const loading = isLoading || isDeleting;

  const handleDelete = e => {
    e.preventDefault();
    setIsModalOpen(false);
    deleteUser(id);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Form>
        <FormGroup>
          <Heading label>User ID</Heading>
          <Input
            id="idDelete"
            type="text"
            placeholder="User ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </FormGroup>
      </Form>
      {userdata && (
        <Form
          onSubmit={e => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          <Heading secondary>User found!</Heading>
          <Heading>{`${userdata.name} - ${userdata.email}`}</Heading>
          <ButtonsNav>
            <Button danger>Delete {userdata.name}'s account</Button>
          </ButtonsNav>
        </Form>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete account"
        message={`Are you sure you want to delete the ${userdata.name}'s account? This actions cannot be undone after your confirmation. `}
      />
    </>
  );
}

export default DeleteUserAdmin;
