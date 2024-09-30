import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
import styles from './Modal.module.css';

function ModalOverlay({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) {
  const content = (
    <div className={`${className} ${styles.modal}`} style={style}>
      <header className={`${styles.modalHeader} ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        <div className={`${styles.modalContent} ${contentClass}`}>
          {children}
        </div>
        <footer className={`${styles.modalFooter} ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(content, document.body);
}

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </>
  );
}

export default Modal;
