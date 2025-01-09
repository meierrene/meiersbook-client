import { useThemes } from '../contexts/ThemeContext';
import styles from './GoogleButton.module.css';

function GoogleButton({ onClick }) {
  const { isDark } = useThemes();

  return (
    <div className={styles.spacing}>
      <button
        onClick={onClick}
        className={`${styles.google} ${isDark ? styles.dark : ''}`}
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default GoogleButton;
