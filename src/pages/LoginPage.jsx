import { useNavigate } from 'react-router-dom';
import LoginSignupForm from '../features/authentication/LoginSignupForm';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return; // To prevent login flash

  return <LoginSignupForm />;
}

export default LoginPage;
