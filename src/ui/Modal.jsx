import { useEffect } from 'react';
import styles from './Modal.module.css';
import Backdrop from './Backdrop';
import { useThemes } from '../contexts/ThemeContext';

function Modal({ children, isOpen, onClose, noMargin }) {
  const { isDark } = useThemes();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        className={`${styles.modalContent} ${isDark && styles.themeDark} ${
          noMargin && styles.noMargin
        }`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </>
  );
}

export default Modal;
