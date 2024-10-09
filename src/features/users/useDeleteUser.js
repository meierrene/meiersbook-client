import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/apiAuth';
import { deleteUser as deleteUserApi } from '../../services/apiUser';
import toast from 'react-hot-toast';

export const useDeleteUser = () => {
  const { token } = useAuth();

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteUserApi(token),
    onSuccess: () => {
      toast.success('Your account was successfully deleted');
      logout();
      window.location.assign('/');
    },
    onError: err => toast.error(err.message),
  });

  return { deleteUser, isDeleting };
};
