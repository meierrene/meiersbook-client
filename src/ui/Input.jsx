import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { usePosts } from '../contexts/PostContext';
import styles from './Input.module.css';
import { useState } from 'react';

function Input({
  id,
  type = 'text',
  accept,
  name,
  onChange,
  size = 24,
  autoComplete,
}) {
  const { isDark } = usePosts();
  const [reveal, setReveal] = useState(false);
  const isPassword = id === 'password' || id === 'passwordConfirm';
  const inputType = isPassword && reveal ? 'text' : type;

  return (
    <div className={`${styles.container} ${isDark ? styles.themeDark : ''}`}>
      <input
        className={isDark ? styles.themeDark : ''}
        id={id}
        type={inputType}
        accept={accept}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete || 'off'}
      />
      {isPassword && (
        <div className={styles.icon} onClick={() => setReveal(r => !r)}>
          {reveal ? <BsEyeSlashFill size={size} /> : <BsEyeFill size={size} />}
        </div>
      )}
    </div>
  );
}

export default Input;
