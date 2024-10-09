import styles from './List.module.css';

function List({ children }) {
  return <li className={styles.item}>{children}</li>;
}

export default List;
