import { useMutation, useQueryClient } from '@tanstack/react-query';
import { oAuth } from '../../services/apiGoogle';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useGoogle = () => {
  const { setToken, setUserId } = useAuth();
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: oAuthLogin, isPending: isLoading } = useMutation({
    mutationFn: token => oAuth(token),
    onSuccess: user => {
      toast.success('Login successful');
      setToken(user.token);
      setUserId(user.data.id);
      queryclient.invalidateQueries(['users', user.data.user]);
      navigate('/', { replace: true });
      window.location.assign('/');
    },
  });

  return { oAuthLogin, isLoading };
};
