import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

export const useLogin = () => {
  const { setToken, setUserId } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: user => {
      setToken(user.token);
      setUserId(user.data.user._id);
      queryClient.setQueriesData(['user'], user.data.user);
      navigate('/', { replace: true });
      window.location.assign('/');
    },
    onError: () => toast.error('Provided email or password are incorrect'),
  });

  return { login, isLoading };
};
