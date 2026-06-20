'use client';

import { useMemo } from 'react';
import styles from './Slider.module.css';

export default function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showValue = true,
  valueFormatter,
  minLabel,
  maxLabel,
  id,
  ...rest
}) {
  const sliderId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : 'slider');

  const displayValue = useMemo(() => {
    if (valueFormatter) return valueFormatter(value);
    return value;
  }, [value, valueFormatter]);

  // Calculate fill percentage for the gradient background
  const fillPercent = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelRow}>
        {label && (
          <label className={styles.label} htmlFor={sliderId}>
            {label}
          </label>
        )}
        {showValue && (
          <span className={styles.valueDisplay} aria-live="polite">
            {displayValue}
          </span>
        )}
      </div>

      <div className={styles.sliderContainer}>
        <input
          id={sliderId}
          type="range"
          className={styles.slider}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            background: `linear-gradient(90deg, var(--color-primary-500) 0%, var(--color-primary-600) ${fillPercent}%, var(--color-gray-200) ${fillPercent}%)`,
          }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={typeof displayValue === 'string' ? displayValue : undefined}
          {...rest}
        />
      </div>

      {(minLabel || maxLabel) && (
        <div className={styles.rangeLabels}>
          <span className={styles.rangeLabel}>{minLabel}</span>
          <span className={styles.rangeLabel}>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
