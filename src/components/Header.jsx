import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import Button from './Button';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav
        className={`${styles.navbar} navbar navbar-expand-lg container-fluid`}
        data-bs-theme="dark"
      >
        <Link className={`navbar-brand ${styles.logo}`} to="/">
          📖 MeiersBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${styles.navbarNavId}`}
          id="navbarNav"
        >
          <ul className={`${styles.navbarNav} navbar-nav`}>
            <li className="nav-item">
              <Link className="nav-link" id="contact" to="/">
                <Button level="secondary">About me</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="about" to="/">
                <Button level="secondary">Contact me</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn" to="/">
                <Button level="primary">Login</Button>
              </Link>
            </li>
            <li className="nav-item">
              <ThemeToggler />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
