import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { likePost as likePostApi } from '../../services/apiPosts';
import { unlikePost as unlikePostApi } from '../../services/apiPosts';

export const useToggleLikePost = isLiked => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutate: toggleLikePost, isPending: isLoading } = useMutation({
    mutationFn: id =>
      isLiked ? unlikePostApi(id, token) : likePostApi(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: ['posts'] });
    },
  });

  return { toggleLikePost, isLoading };
};
