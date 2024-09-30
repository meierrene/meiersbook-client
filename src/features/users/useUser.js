import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useAuth } from '../../contexts/AuthContext';

export const useUser = () => {
  const { token, isLoggedIn } = useAuth();
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(token),
    enabled: isLoggedIn,
  });
  return { isLoading, user };
};
