import styles from './Icon.module.css';

function Icon({ children, onClick }) {
  return (
    <div className={styles.icon} onClick={onClick}>
      {children}
    </div>
  );
}

export default Icon;
