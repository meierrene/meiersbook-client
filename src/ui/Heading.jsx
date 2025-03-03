import styles from './Heading.module.css';

function Heading({
  children,
  primary,
  secondary,
  dateStamp,
  label,
  accordion,
  span,
  small,
}) {
  if (primary) return <h1 className={styles.primary}>{children}</h1>;
  if (secondary) return <h2 className={styles.secondary}>{children}</h2>;
  if (dateStamp) return <p className={styles.dateStamp}>{children}</p>;
  if (label) return <label className={styles.label}>{children}</label>;
  if (accordion) return <span className={styles.accordion}>{children}</span>;
  if (span) return <span className={styles.span}>{children}</span>;
  if (small) return <span className={styles.small}>{children}</span>;
  else return <p className={styles.paragraph}>{children}</p>;
}

export default Heading;
