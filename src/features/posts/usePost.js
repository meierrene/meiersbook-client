import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../services/apiPosts';
import { useParams } from 'react-router-dom';

export const usePost = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
  if (!data) return { isLoading, postWithUser: {}, error };
  const { dataPost, dataUser } = data;
  const postWithUser = { ...dataPost.data, creator: dataUser.data };

  return { isLoading, postWithUser, id, error };
};
