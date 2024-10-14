import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useThemes } from '../contexts/ThemeContext';
import styles from './Input.module.css';
import Button from './Button';

function Input({
  id,
  type = 'text',
  accept,
  name,
  onChange,
  placeholder,
  size = 24,
  autoComplete,
  value,
  className,
  hasIcon,
  onClick,
  children,
}) {
  const { isDark } = useThemes();
  const [reveal, setReveal] = useState(false);
  const isPassword = id.toLowerCase().includes('password');
  const inputType = isPassword && reveal ? 'text' : type;

  return (
    <div
      className={`${className} ${styles.container} ${
        isDark ? styles.themeDark : ''
      }`}
    >
      <input
        className={isDark && styles.themeDark}
        id={id}
        type={inputType}
        accept={accept}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete || 'off'}
      />
      {hasIcon && (
        <Button input className={styles.inputButton} onClick={onClick}>
          {children}
        </Button>
      )}
      {isPassword && (
        <div className={styles.icon} onClick={() => setReveal(r => !r)}>
          {reveal ? <BsEyeSlashFill size={size} /> : <BsEyeFill size={size} />}
        </div>
      )}
    </div>
  );
}

export default Input;
