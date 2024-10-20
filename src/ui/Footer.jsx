import { Link } from 'react-router-dom';
import { useThemes } from '../contexts/ThemeContext';
import styles from './Footer.module.css';
import Heading from './Heading';

function Footer() {
  const { isDark } = useThemes();

  return (
    <footer className={`${styles.footer} ${isDark && styles.themeDark}`}>
      <Heading small>
        Copyright &copy;{new Date().getFullYear()} Made by René Meier &#128900;{' '}
        <Link
          to="https://portfolio.renemeier.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Me
        </Link>
      </Heading>
    </footer>
  );
}

export default Footer;
