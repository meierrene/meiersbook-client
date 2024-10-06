import styles from './Heading.module.css';

function Heading({ children, primary, secondary, dateStamp, label }) {
  if (primary) return <h1 className={styles.primaryHeading}>{children}</h1>;
  if (secondary) return <h2 className={styles.secondaryHeading}>{children}</h2>;
  if (dateStamp) return <p className={styles.dateStamp}>{children}</p>;
  if (label) return <label className={styles.label}>{children}</label>;
  else return <p className={styles.paragraph}>{children}</p>;
}

export default Heading;
