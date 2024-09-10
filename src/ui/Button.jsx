import styles from './Button.module.css';

const Button = ({
  children,
  onClick = null,
  isDark,
  level,
  disabled,
  navLink,
}) => {
  return (
    <button
      className={`
      ${styles.btn}
      ${level === 'primary' && styles.btnPrimary} ${
        level === 'secondary' && styles.btnSecondary
      } ${level === 'delete' && styles.btnDelete} ${isDark && styles.isDark}
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
