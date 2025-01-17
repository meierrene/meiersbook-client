import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useUser } from '../features/users/useUser';
import styles from './Header.module.css';
import Button from './Button';
import Image from './Image';
import { stringLimiter } from '../utils/helpers';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import HeaderMenu from './HeaderMenu';
import { useThemes } from '../contexts/ThemeContext';
import MenuPanel from './MenuPanel';
import { useCheckPicture } from '../utils/useCheckPicture';

const Header = ({ children }) => {
  const { isDark } = useThemes();
  const { isLoggedIn } = useAuth();
  const { user } = useUser();
  const [isOpened, setIsOpened] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const validUrl = useCheckPicture(user?.image, true);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSideDrawer = () => !isLargeScreen && setIsOpened(open => !open);
  const closeSideDrawer = () => setIsOpened(false);

  return (
    <>
      <header className={`${styles.header} ${isDark ? styles.themeDark : ''}`}>
        <nav className={styles.navbar}>
          <Link className={styles.logo} to="/">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={`/icon-color${isDark ? '-dark' : ''}.svg`}
                alt="MeiersBook logo"
                size={{ hl: '32', hs: '32' }}
              />
              <Image
                src={`/text-color${isDark ? '-dark' : ''}.svg`}
                alt="MeiersBook logo"
                size={{ hl: '32', hs: '32' }}
              />
            </span>
          </Link>
          <div className={styles.navbarItems}>
            {isLoggedIn && (
              <div className={styles.profileImage}>
                <Image
                  onClick={toggleSideDrawer}
                  src={validUrl}
                  alt="profile image"
                  profile
                  size={{ wl: '40', hl: '40', ws: '36.25', hs: '36.25' }}
                />
                <span>{!!user?.name && stringLimiter(user.name, 45)}</span>
              </div>
            )}

            {!isLoggedIn ? (
              <NavLink className="nav-link link-wrapper" to="/login">
                <Button primary navLink>
                  Login
                </Button>
              </NavLink>
            ) : (
              isLargeScreen && <HeaderMenu />
            )}
          </div>
        </nav>
      </header>
      {isOpened && <Backdrop onClick={closeSideDrawer} />}
      <SideDrawer isOpen={isOpened} onClick={closeSideDrawer}>
        <HeaderMenu />
      </SideDrawer>
      {isLoggedIn && <MenuPanel />}
      <div className={styles.mainPage}>{children}</div>
    </>
  );
};

export default Header;
