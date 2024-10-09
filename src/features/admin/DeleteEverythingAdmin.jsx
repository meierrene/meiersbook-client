import { useState } from 'react';
import Button from '../../ui/Button';
import ButtonsNav from '../../ui/ButtonsNav';
import ConfirmModal from '../../ui/ConfirmModal';
import { useDeleteEverything } from './useDeleteEverything';
import Spinner from '../../ui/Spinner';

function DeleteEverythingAdmin() {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const { deleteEverything, isDeleting } = useDeleteEverything();

  const handleDeleteEverything = () => {
    setIsSecondModalOpen(false);
    deleteEverything();
  };

  if (isDeleting) <Spinner />;

  return (
    <>
      <ButtonsNav>
        <Button danger onClick={() => setIsFirstModalOpen(true)}>
          ⚠ Delete everything!!! Use with Caution! ⚠
        </Button>
      </ButtonsNav>

      <ConfirmModal
        isOpen={isFirstModalOpen}
        onClose={() => setIsFirstModalOpen(false)}
        onConfirm={() => {
          setIsFirstModalOpen(false);
          setIsSecondModalOpen(true);
        }}
        title="Delete Everything"
        message="Are you sure you want to delete EVERYTHING? This action cannot be undone."
      />
      <ConfirmModal
        isOpen={isSecondModalOpen}
        onClose={() => setIsSecondModalOpen(false)}
        onConfirm={handleDeleteEverything}
        title="Are You Really Sure?"
        message="REALLY??? REALLY??? Last chance to change your mind! Are you absolutely sure?"
      />
    </>
  );
}

export default DeleteEverythingAdmin;
