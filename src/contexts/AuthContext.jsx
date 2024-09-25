import { createContext, useContext, useState } from 'react';

const storage = JSON.parse(localStorage.getItem('auth-data'));

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(storage ? storage.token : null);
  const [userId, setUserId] = useState(storage ? storage.userId : null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn: !!storage?.token,
        userId,
        setUserId,
      }}
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
