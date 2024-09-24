import { usePosts } from '../contexts/PostContext';
import styles from './Form.module.css';

function Form({ children, id, dataId, encType, onSubmit }) {
  const { isDark } = usePosts();

  return (
    <div className={`${styles.container} ${isDark ? styles.themeDark : ''}`}>
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
