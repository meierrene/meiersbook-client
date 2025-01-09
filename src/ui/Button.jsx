import styles from './Button.module.css';

const Button = ({
  className,
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
  input,
}) => {
  return (
    <button
      className={`
      ${className} 
      ${styles.btn}
      ${primary && styles.btnPrimary}
      ${secondary && styles.btnSecondary}
      ${danger && styles.btnDanger} 
      ${full && styles.full}
      ${isDark && styles.isDark}
      ${navLink && styles.navLink}
      ${rounded && styles.rounded}
      ${input && styles.input}
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
