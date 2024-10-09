import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { updateUser as updateUserApi } from '../../services/apiAdmin';
import toast from 'react-hot-toast';

export const useUpdateUserAdmin = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, form: userdata }) => updateUserApi(token, id, userdata),
    onSuccess: () => {
      toast.success('Your provided user was successfully updated');
      queryClient.invalidateQueries({ queryKey: ['userById'] });
      queryClient.refetchQueries({ queryKey: ['userById'] });
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

  return { updateUser, isUpdating };
};
