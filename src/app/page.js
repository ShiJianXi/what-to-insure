import styles from './page.module.css';

export const metadata = {
  title: 'WhatToInsure — Free Insurance Advice for Singaporeans',
  description:
    'Get free, unbiased, personalized insurance recommendations tailored to your life situation.',
};

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>WhatToInsure — Home</h1>
      <p className={styles.subtitle}>
        Free, unbiased, personalized insurance advice for Singaporeans.
      </p>
      <span className={styles.badge}>Coming Soon</span>
    </div>
  );
}
