'use client';

import { useId } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({
  content,
  position = 'top',
  children,
  maxWidth = '280px',
}) {
  const tooltipId = useId();

  if (!content) return children;

  return (
    <span
      className={styles.trigger}
      aria-describedby={tooltipId}
    >
      {children}
      <span
        id={tooltipId}
        className={`${styles.tooltip} ${styles[position]}`}
        role="tooltip"
        style={{ maxWidth }}
      >
        {content}
      </span>
    </span>
  );
}
