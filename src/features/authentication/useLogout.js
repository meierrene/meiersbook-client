import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const useLogout = () => {
  const { setToken, setUserId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      setToken(null);
      setUserId(null);
      navigate('/login', { replace: true });
      window.location.assign('/');
    },
  });

  return { logout, isLoading };
};
