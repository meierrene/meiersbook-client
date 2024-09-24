import styles from './ButtonsNav.module.css';

function ButtonsNav({ children }) {
  return <div className={styles.buttonsNav}>{children}</div>;
}

export default ButtonsNav;
