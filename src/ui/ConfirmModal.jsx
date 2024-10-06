import React from 'react';
import styles from './Modal.module.css';
import Button from './Button';
import Heading from './Heading';
import { useThemes } from '../contexts/ThemeContext';

function ConfirmModal({ title, message, isOpen, onClose, onConfirm }) {
  const { isDark } = useThemes();

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isDark ? styles.themeDark : ''}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <Heading secondary>{title}</Heading>
        <Heading>{message}</Heading>
        <div className={styles.actions}>
          <Button secondary onClick={onClose}>
            Cancel
          </Button>
          <Button danger onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
