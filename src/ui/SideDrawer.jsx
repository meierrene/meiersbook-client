import styles from './SideDrawer.module.css';
import { createPortal } from 'react-dom';

function SideDrawer({ children, onClick, isOpen }) {
  const content = (
    <aside
      className={`${styles.sideDrawer} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
    >
      {children}
    </aside>
  );

  const element = document.body;
  return createPortal(content, element);
}

export default SideDrawer;
