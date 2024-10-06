import { useMutation } from '@tanstack/react-query';
import { updatePassword as updatePasswordApi } from '../../services/apiAuth';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLogout } from './useLogout';

export const useUpdatePassword = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: ({ passwordCurrent, password, passwordConfirm }) =>
      updatePasswordApi({ passwordCurrent, password, passwordConfirm }, token),
    onSuccess: () => {
      toast.success('Your password was successfully updated');
      navigate('/', { replace: true });
      logout();
    },
    onError: err => {
      let errorMessage = err.message;
      if (errorMessage.includes('same'))
        errorMessage = 'This new password must not be the same as the current.';
      else if (errorMessage.includes('shorter'))
        errorMessage = 'The password must have a minimun of 8 characters.';
      else if (errorMessage.includes('passwordConfirm'))
        errorMessage = 'The confirmation of you password does not match.';
      else errorMessage = 'Could not signup. Please try again later.';
      toast.error(errorMessage);
    },
  });

  return { updatePassword, isUpdating };
};
