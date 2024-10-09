import { useQuery } from '@tanstack/react-query';
import { getUserById as getUserByIdApi } from '../../services/apiUser';

export const useUserById = id => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['userById'],
    queryFn: () => getUserByIdApi(id),
    enabled: id.length === 24,
    retry: false,
  });

  return { isLoading, user };
};
