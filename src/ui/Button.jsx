import styles from './Button.module.css';

const Button = ({
  children,
  onClick = null,
  isDark,
  primary,
  secondary,
  danger,
  rounded,
  disabled,
  navLink,
  full,
  type,
}) => {
  return (
    <button
      className={`
      ${styles.btn}
      ${primary && styles.btnPrimary} ${secondary && styles.btnSecondary} ${
        danger && styles.btnDanger
      } 
      ${full && styles.full}
      
      ${isDark && styles.isDark}
      ${navLink && styles.navLink}
      ${rounded && styles.rounded}

      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
