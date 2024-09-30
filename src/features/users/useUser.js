import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useAuth } from '../../contexts/AuthContext';

export const useUser = () => {
  const { token } = useAuth();
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(token),
  });
  return { isLoading, user };
};
