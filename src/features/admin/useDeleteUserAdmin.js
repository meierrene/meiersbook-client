import { useMutation } from '@tanstack/react-query';
import { deleteUser as deleteUserApi } from '../../services/apiAdmin';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useDeleteUserAdmin = () => {
  const { token } = useAuth();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: id => deleteUserApi(token, id),
    onSuccess: () => {
      toast.success('Your provided user account was successfully deleted');
    },
    onError: err => toast.error(err.message),
  });

  return { deleteUser, isDeleting };
};
