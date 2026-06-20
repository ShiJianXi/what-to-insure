'use client';

import styles from './RadioGroup.module.css';

export default function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  direction = 'vertical',
  error,
  required = false,
}) {
  const handleChange = (optionValue) => {
    onChange?.(optionValue);
  };

  return (
    <div className={styles.wrapper} role="radiogroup" aria-label={label}>
      {label && (
        <span className={styles.groupLabel}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </span>
      )}

      <div
        className={
          direction === 'horizontal'
            ? styles.optionsHorizontal
            : styles.optionsVertical
        }
      >
        {options.map((opt) => (
          <label key={opt.value} className={styles.option}>
            <input
              type="radio"
              className={styles.hiddenInput}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => handleChange(opt.value)}
            />
            <span className={styles.radio}>
              <span className={styles.radioDot} />
            </span>
            <span className={styles.optionContent}>
              <span className={styles.optionLabel}>{opt.label}</span>
              {opt.description && (
                <span className={styles.optionDescription}>{opt.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <span className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
