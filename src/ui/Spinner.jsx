import { useThemes } from '../contexts/ThemeContext';
import styles from './Spinner.module.css';
import { BiLoaderAlt } from 'react-icons/bi';

const Spinner = ({ mini }) => {
  const { isDark } = useThemes();

  return (
    <div
      className={`${styles.spinnerContainer} ${isDark && styles.themeDark}  ${
        mini && styles.mini
      }`}
    >
      {mini ? <BiLoaderAlt /> : <div className={styles.spinner}></div>}
    </div>
  );
};

export default Spinner;
