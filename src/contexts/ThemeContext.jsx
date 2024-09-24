import { createContext, useContext, useEffect, useState } from 'react';

export const BASE_URL = `${import.meta.env.VITE_API_URL}/posts/`;
export const ASSET_URL = `${
  import.meta.env.VITE_ASSET_URL
}/uploads/postsImages`;

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('isDark')?.toLowerCase?.() === 'true'
      ? true
      : localStorage.getItem('isDark')?.toLowerCase?.() === 'false'
      ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add('theme-dark')
      : document.documentElement.classList.remove('theme-dark');
  }, [isDark]);

  const toggleTheme = () => {
    localStorage.setItem('isDark', !isDark);
    setIsDark(d => !d);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemes = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error(
      'This custom hook is not available from the parent component'
    );
  return context;
};

export { ThemeProvider, useThemes };
