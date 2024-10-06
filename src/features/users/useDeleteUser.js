import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteUser as deleteUserApi } from '../../services/apiUser';
import { logout } from '../../services/apiAuth';

export const useDeleteUser = () => {
  const navigate = useNavigate();
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
