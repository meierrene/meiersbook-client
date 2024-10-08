import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './Accordion.module.css';
import { useState } from 'react';
import Heading from './Heading';
import Icon from './Icon';

function Accordion({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeading}
        onClick={() => setIsOpen(o => !o)}
      >
        <Heading accordion>{title}</Heading>
        <Icon>{isOpen ? <FaChevronDown /> : <FaChevronUp />}</Icon>
      </div>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.active : ''}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
