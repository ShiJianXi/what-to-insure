import styles from '../page.module.css';

export const metadata = {
  title: 'Your Recommendations',
  description:
    'View your personalized insurance recommendations based on your life situation in Singapore.',
};

export default function ResultsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Recommendations</h1>
      <p className={styles.subtitle}>
        Personalized insurance coverage recommendations tailored to your needs.
      </p>
      <span className={styles.badge}>Coming Soon</span>
    </div>
  );
}
