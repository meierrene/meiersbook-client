import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { updateUser as updateUserApi } from '../../services/apiUser';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: userData => updateUserApi(userData, token),
    onSuccess: () => {
      toast.success('Your account was successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.refetchQueries({ queryKey: ['user'] });
    },
    onError: err => {
      if (err.message.includes('E11000'))
        toast.error(
          'Another user is using this email. Please use another email.'
        );
      else
        toast.error('Unable to update your account. Please try again later.');
    },
  });

  return { updateProfile, isUpdating };
};
