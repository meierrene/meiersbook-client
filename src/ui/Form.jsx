import styles from './Form.module.css';

function Form({ children, className, id, dataId, encType, onSubmit }) {
  return (
    <form
      className={`${className} ${styles.formGroup}`}
      id={id}
      data-id={dataId}
      encType={encType}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
