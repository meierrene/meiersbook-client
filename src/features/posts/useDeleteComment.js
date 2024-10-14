import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment as deleteCommentApi } from '../../services/apiPosts';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { token } = useAuth();

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: commentId => deleteCommentApi(id, commentId, token),
    onSuccess: () => {
      toast.success('Post comment successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: err => toast.error(err.message),
  });
  return { deleteComment, isDeleting };
};
