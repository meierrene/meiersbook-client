import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import ConfirmModal from '../../ui/ConfirmModal';
import { useDeleteUser } from './useDeleteUser';
import { useState } from 'react';

function DeleteUser() {
  const { deleteUser, isDeleting } = useDeleteUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    deleteUser();
    setIsModalOpen(false);
  };

  if (isDeleting) return <Spinner />;

  return (
    <>
      <Button danger onClick={() => setIsModalOpen(true)}>
        Delete Account
      </Button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete account"
        message="Are you sure you want to delete you account? This actions cannot be undone after your confirmation. "
      />
    </>
  );
}

export default DeleteUser;