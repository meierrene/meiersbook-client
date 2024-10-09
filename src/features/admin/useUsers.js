import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiAdmin';
import { useAuth } from '../../contexts/AuthContext';

export const useUsers = show => {
  const { token } = useAuth();

  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(token),
    enabled: !!show,
  });

  return { isLoading, data, error };
};
