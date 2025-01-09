import toast from 'react-hot-toast';
import { BASE_URL_GOOGLE } from '../../utils/helpers';
import GoogleButton from '../../ui/GoogleButton';

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const googleAuthUrl = `${BASE_URL_GOOGLE}login`;
      window.location.href = googleAuthUrl;
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      console.error('Error during Google login:', error);
    }
  };

  return <GoogleButton onClick={handleGoogleLogin} />;
}

export default GoogleLogin;
