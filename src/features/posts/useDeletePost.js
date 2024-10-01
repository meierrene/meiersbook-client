import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost as deletePostApi } from '../../services/apiPosts';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePostApi(id, token),
    enabled: !!id,
    onSuccess: () => {
      toast.success('Post successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: err => toast.error(err.message),
  });

  return { deletePost, isDeleting };
};
