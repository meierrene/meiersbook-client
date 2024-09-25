import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useLogout } from '../features/authentication/useLogout';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const { logout, isLoading } = useLogout();

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
              {!isLoggedIn ? (
                <NavLink className="nav-link link-wrapper" to="/login">
                  <Button level="primary" navLink>
                    Login
                  </Button>
                </NavLink>
              ) : (
                <Button level="delete" onClick={logout} disabled={isLoading}>
                  Logout
                </Button>
              )}
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
