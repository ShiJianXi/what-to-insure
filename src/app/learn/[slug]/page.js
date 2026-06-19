import styles from '../../page.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Article: ${slug}`,
    description: `Learn about ${slug.replace(/-/g, ' ')} — insurance education for Singaporeans.`,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Article: {slug}</h1>
      <p className={styles.subtitle}>
        This article is currently being written. Check back soon!
      </p>
      <span className={styles.badge}>Coming Soon</span>
    </div>
  );
}
