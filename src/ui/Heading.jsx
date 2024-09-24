import styles from './Heading.module.css';

function Heading({ children, primary, secondary }) {
  if (primary) return <h1 className={styles.primaryHeading}>{children}</h1>;
  if (secondary) return <h2 className={styles.secondaryHeading}>{children}</h2>;
  else return <p className={styles.paragraph}>{children}</p>;
}

export default Heading;
