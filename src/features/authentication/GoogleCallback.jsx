import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGoogle } from './useGoogle';

function GoogleCallback() {
  const navigate = useNavigate();
  const { oAuthLogin, isLoading } = useGoogle();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        toast.error('No authorization code provided');
        navigate('/login'); // Redirect to login if no code is found
        return;
      }
      oAuthLogin(code);
    };

    handleGoogleCallback();
  }, [navigate, oAuthLogin]);

  return isLoading && <div>Processing Google login...</div>;
}

export default GoogleCallback;
