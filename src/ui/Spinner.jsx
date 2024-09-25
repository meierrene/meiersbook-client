import { useThemes } from '../contexts/ThemeContext';
import styles from './Spinner.module.css';

const Spinner = () => {
  const { isDark } = useThemes();

  return (
    <div
      className={`${styles.spinnerContainer} ${isDark ? styles.themeDark : ''}`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
