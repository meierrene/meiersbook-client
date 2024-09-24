import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
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
            <li className="nav-item ">
              <NavLink className="btn nav-link link-wrapper" to="/login">
                <Button level="primary" navLink>
                  Login
                </Button>
              </NavLink>
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