import styles from './FormGroup.module.css';

function FormGroup({ children }) {
  return <div className={styles.formGroup}>{children}</div>;
}

export default FormGroup;
