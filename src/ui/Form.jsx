import { useThemes } from '../contexts/ThemeContext';
import styles from './Form.module.css';

function Form({ children, id, dataId, encType, onSubmit, className }) {
  const { isDark } = useThemes();

  return (
    <div
      className={`${className} ${styles.container} ${
        isDark ? styles.themeDark : ''
      }`}
    >
      <form
        className={styles.form}
        id={id}
        data-id={dataId}
        encType={encType}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
