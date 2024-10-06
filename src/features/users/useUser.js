import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiUser';
import { useAuth } from '../../contexts/AuthContext';

export const useUser = () => {
  const { token, isLoggedIn } = useAuth();
  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(token),
    enabled: isLoggedIn,
  });
  if (!data) return { isLoading, user: {}, error };
  const { data: user } = data;

  return { isLoading, user, error };
};
