import React from 'react';
import styles from './Modal.module.css';
import Button from './Button';
import Heading from './Heading';
import { useThemes } from '../contexts/ThemeContext';
import ButtonsNav from './ButtonsNav';
import Backdrop from './Backdrop';
function ConfirmModal({ title, message, isOpen, onClose, onConfirm }) {
  const { isDark } = useThemes();

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        className={`${styles.modalContent} ${isDark && styles.themeDark}`}
        onClick={e => e.stopPropagation()}
      >
        <Heading secondary>{title}</Heading>
        <Heading>{message}</Heading>
        <ButtonsNav>
          <Button secondary onClick={onClose}>
            Cancel
          </Button>
          <Button danger onClick={onConfirm}>
            Confirm
          </Button>
        </ButtonsNav>
      </div>
    </>
  );
}

export default ConfirmModal;
