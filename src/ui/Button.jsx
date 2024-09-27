import styles from './Button.module.css';

const Button = ({
  children,
  onClick = null,
  isDark,
  level,
  primary,
  secondary,
  danger,
  disabled,
  navLink,
  full,
}) => {
  return (
    <button
      className={`
      ${styles.btn}
      ${level === 'primary' && styles.btnPrimary} ${
        level === 'secondary' && styles.btnSecondary
      } ${level === 'delete' && styles.btnDanger} 
      ${full && styles.full}
      
      ${isDark && styles.isDark}
      ${navLink && styles.navLink}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
