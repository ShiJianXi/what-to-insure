import Link from 'next/link';
import Container from './Container';
import styles from './Footer.module.css';

function ShieldIcon() {
  return (
    <svg
      className={styles.footerLogoIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/questionnaire', label: 'Get Advice' },
  { href: '/learn', label: 'Learn' },
];

const LEARN_LINKS = [
  { href: '/learn', label: 'Insurance Basics' },
  { href: '/learn', label: 'Common Traps' },
  { href: '/learn', label: 'SG Schemes' },
];

const LEGAL_LINKS = [
  { href: '#', label: 'Disclaimer' },
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <Container>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <div className={styles.footerLogo}>
                <ShieldIcon />
                WhatToInsure
              </div>
              <p className={styles.tagline}>
                Free, unbiased insurance advice for Singaporeans. No sales pitch. No hidden agenda.
              </p>
            </div>

            {/* Navigation Column */}
            <div className={styles.linkColumn}>
              <span className={styles.columnHeading}>Navigation</span>
              <div className={styles.linkList}>
                {NAVIGATION_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Learn Column */}
            <div className={styles.linkColumn}>
              <span className={styles.columnHeading}>Learn</span>
              <div className={styles.linkList}>
                {LEARN_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Column */}
            <div className={styles.linkColumn}>
              <span className={styles.columnHeading}>Legal</span>
              <div className={styles.linkList}>
                {LEGAL_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Separator */}
      <Container>
        <hr className={styles.separator} />
      </Container>

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        <Container>
          <p className={styles.disclaimerText}>
            <span className={styles.disclaimerIcon} aria-hidden="true">⚠️</span>
            <strong>Disclaimer:</strong> WhatToInsure provides general informational guidance only.
            It is not a substitute for professional financial advice. The information presented does
            not constitute a recommendation to purchase any specific insurance product. Always
            consult a licensed financial advisor for personalized advice tailored to your situation.
          </p>
        </Container>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <Container>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} WhatToInsure. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
