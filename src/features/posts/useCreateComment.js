import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { createComment as createCommentApi } from '../../services/apiPosts';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { token } = useAuth();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: commentData => createCommentApi(id, commentData, token),
    onSuccess: () => {
      toast.success('New post comment successfully created');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: err => toast.error(err.message),
  });
  return { createComment, isCreating };
};
