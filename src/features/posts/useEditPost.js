import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost as editPostApi } from '../../services/apiPosts';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const { mutate: editPost, isPending: isEditing } = useMutation({
    mutationFn: postData => editPostApi(id, postData, token),
    enabled: !!id,
    onSuccess: () => {
      toast.success('Post successfully edited');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: err => toast.error(err.message),
  });

  return { editPost, isEditing };
};
