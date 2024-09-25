import { createContext, useContext, useEffect, useState } from 'react';

const EXPIRATION_TIME = 1000 * 60 * 60; //1h
const storage = JSON.parse(localStorage.getItem('authData'));

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(storage ? storage.token : null);
  const [userId, setUserId] = useState(storage ? storage.userId : null);

  useEffect(() => {
    if (storage?.expiration < new Date().toISOString()) logout();
    if (token) setTimeout(logout, EXPIRATION_TIME);
    else clearTimeout();
  }, [token]);

  const login = (id, token, expirationDate) => {
    setToken(token);
    setUserId(id);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + EXPIRATION_TIME);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn: !!token, login, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
