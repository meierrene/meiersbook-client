import { useLogout } from '../features/authentication/useLogout';
import Button from './Button';
import styles from './HeaderMenu.module.css';

function HeaderMenu() {
  const { logout, isLoading } = useLogout();

  return (
    <div className={styles.HeaderMenu}>
      <Button danger onClick={logout} disabled={isLoading}>
        Logout
      </Button>
    </div>
  );
}

export default HeaderMenu;
