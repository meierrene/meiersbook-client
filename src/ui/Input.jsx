import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { usePosts } from '../contexts/PostContext';
import styles from './Input.module.css';
import { useState } from 'react';

function Input({
  id,
  className,
  type = 'text',
  accept,
  name,
  onChange,
  size = 24,
}) {
  const { isDark } = usePosts();
  const [reveal, setReveal] = useState(false);
  const checkPassword = id === ('password' || 'confirmPassword');

  if (checkPassword) reveal ? (type = 'text') : (type = 'password');

  return (
    <div className={styles.container}>
      <input
        className={`${className} ${isDark ? styles.themeDark : ''}`}
        id={id}
        type={type}
        accept={accept}
        name={name}
        onChange={onChange}
      />
      {checkPassword && (
        <div className={styles.icon} onClick={() => setReveal(r => !r)}>
          {reveal ? <BsEyeSlashFill size={size} /> : <BsEyeFill size={size} />}
        </div>
      )}
    </div>
  );
}

export default Input;
