import styles from '../page.module.css';

export const metadata = {
  title: 'Learn About Insurance',
  description:
    'Educational articles about insurance in Singapore — MediShield Life, term life, critical illness, and more.',
};

export default function LearnPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Learn About Insurance</h1>
      <p className={styles.subtitle}>
        Educational resources to help you understand insurance in Singapore.
      </p>
      <span className={styles.badge}>Coming Soon</span>
    </div>
  );
}
