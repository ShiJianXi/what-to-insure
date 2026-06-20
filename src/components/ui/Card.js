import styles from './Card.module.css';

const paddingMap = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

export default function Card({
  variant = 'elevated',
  hoverable = false,
  padding = 'md',
  children,
  className,
  ...rest
}) {
  const classNames = [
    styles.card,
    styles[variant],
    hoverable && styles.hoverable,
    paddingMap[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
