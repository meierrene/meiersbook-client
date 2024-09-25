import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

function ProtectedRoute() {
  const navigate = useNavigate();
  const isLoggedIn = true;

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}

export default ProtectedRoute;
