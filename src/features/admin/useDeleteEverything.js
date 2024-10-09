import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { deleteEverything as deleteEverythingApi } from '../../services/apiAdmin';
import toast from 'react-hot-toast';

export const useDeleteEverything = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: deleteEverything, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteEverythingApi(token),
    onSuccess: () => {
      toast.success('Everything was successfully deleted!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: ['posts'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteEverything, isDeleting };
};
