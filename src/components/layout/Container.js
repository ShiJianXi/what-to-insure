import styles from './Container.module.css';

export default function Container({
  size = 'lg',
  children,
  className,
  ...rest
}) {
  const classNames = [
    styles.container,
    styles[size],
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
