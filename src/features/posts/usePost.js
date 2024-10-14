import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../services/apiPosts';
import { useParams } from 'react-router-dom';

export const usePost = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
    retry: false,
  });
  if (!data) return { isLoading, postWithUser: {}, error };
  const post = data.data;
  return { isLoading, post, id, error };
};
