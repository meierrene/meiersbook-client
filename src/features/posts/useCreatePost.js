import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost as createPostApi } from '../../services/apiPosts';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: newData => createPostApi(newData, token),
    onSuccess: () => {
      toast.success('New post successfully created');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: err => toast.error(err.message),
  });

  return { createPost, isCreating };
};
