import styles from './Icon.module.css';

function Icon({ children }) {
  return <div className={styles.icon}>{children}</div>;
}

export default Icon;
