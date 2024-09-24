import { useThemes } from '../contexts/ThemeContext';
import styles from './TextArea.module.css';

function TextArea({
  children,
  className,
  type = 'text',
  name,
  rows = '6',
  autoFocus,
  value,
  onChange,
}) {
  const { isDark } = useThemes();
  return (
    <textarea
      className={`${className} ${isDark ? styles.themeDark : ''}`}
      type={type}
      name={name}
      rows={rows}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
    >
      {children}
    </textarea>
  );
}

export default TextArea;
