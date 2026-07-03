'use client';

import styles from './Marquee.module.css';

const words = ['Excellence', 'Character', 'Innovation', 'Community', 'Faith', 'Leadership', 'Integrity', 'Purpose'];

export default function Marquee() {
  const content = words.map((w) => `${w} ·`).join(' ');
  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        <span className={styles.text}>{content}&nbsp;</span>
        <span className={styles.text} aria-hidden="true">{content}&nbsp;</span>
      </div>
    </div>
  );
}
