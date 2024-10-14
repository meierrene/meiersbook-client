import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { editComment as editCommentApi } from '../../services/apiPosts';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useEditComment = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { token } = useAuth();

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: ({ commentId, commentData }) =>
      editCommentApi(id, commentId, commentData, token),
    onSuccess: () => {
      toast.success('Post comment successfully edited');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: err => toast.error(err.message),
  });
  return { editComment, isEditing };
};
