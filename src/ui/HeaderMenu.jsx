import { useLogout } from '../features/authentication/useLogout';
import Button from './Button';
import ThemeToggler from './ThemeToggler';
import styles from './HeaderMenu.module.css';

function HeaderMenu() {
  const { logout, isLoading } = useLogout();

  return (
    <div className={styles.HeaderMenu}>
      <Button danger onClick={logout} disabled={isLoading}>
        Logout
      </Button>
      <ThemeToggler />
    </div>
  );
}

export default HeaderMenu;
