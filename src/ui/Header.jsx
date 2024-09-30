import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useLogout } from '../features/authentication/useLogout';
import { useRef } from 'react';
import { ASSET_URL_USERS, TEMPLATE_PROFILE_IMAGE } from '../utils/helpers';
import Image from './Image';
import { useUser } from '../features/users/useUser';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const { logout, isLoading } = useLogout();
  const navbarRef = useRef(null);
  const { user } = useUser();

  const handleCollapse = () => {
    const navbar = navbarRef.current;
    if (navbar) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.navbar} navbar navbar-expand-lg container-fluid`}
        data-bs-theme="dark"
      >
        <Link className={`navbar-brand ${styles.logo}`} to="/">
          📖 MeiersBook
        </Link>

        {isLoggedIn && (
          <div className={styles.profileImage}>
            <Image
              src={
                user?.data.image
                  ? `${ASSET_URL_USERS}/${user?.data.image}`
                  : TEMPLATE_PROFILE_IMAGE
              }
              alt="profile image"
              profile
              size={{ wl: '40', hl: '40', ws: '36.25', hs: '36.25' }}
            />
            <span>{user?.data.name.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        )}

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
          ref={navbarRef}
        >
          <ul className={`${styles.navbarNav} navbar-nav`}>
            <li className="nav-item ">
              {!isLoggedIn ? (
                <NavLink
                  className="nav-link link-wrapper"
                  to="/login"
                  onClick={handleCollapse}
                >
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
              <ThemeToggler onClick={handleCollapse} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
