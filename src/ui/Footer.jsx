import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Copyright &copy;</span>
      <span>{new Date().getFullYear()} Made by René Meier</span>
    </footer>
  );
}

export default Footer;
