import styles from '../page.module.css';

export const metadata = {
  title: 'Insurance Questionnaire',
  description:
    'Answer a few simple questions about your life situation to get personalized insurance recommendations for Singapore.',
};

export default function QuestionnairePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Insurance Questionnaire</h1>
      <p className={styles.subtitle}>
        Answer a few questions to get personalized insurance recommendations.
      </p>
      <span className={styles.badge}>Coming Soon</span>
    </div>
  );
}
