import styles from './Button.module.css';

const Button = ({ children, onClick = null, isDark, level, disabled }) => {
  return (
    <button
      className={`
      ${styles.btn}
      ${level === 'primary' && styles.btnPrimary} ${
        level === 'secondary' && styles.btnSecondary
      } ${level === 'delete' && styles.btnDelete} ${isDark && styles.isDark}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
