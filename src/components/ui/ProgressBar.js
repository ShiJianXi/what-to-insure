'use client';

import styles from './ProgressBar.module.css';

export default function ProgressBar({
  currentStep,
  totalSteps,
  labels,
  onStepClick,
}) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.container} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {/* Connecting lines */}
      <div className={styles.lines}>
        {steps.slice(0, -1).map((step) => (
          <div
            key={`line-${step}`}
            className={`${styles.line} ${
              step < currentStep ? styles.lineCompleted : styles.lineFuture
            }`}
          />
        ))}
      </div>

      {/* Step circles */}
      {steps.map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        const isFuture = step > currentStep;
        const isClickable = isCompleted && onStepClick;

        return (
          <div
            key={step}
            className={`${styles.step} ${isClickable ? styles.stepClickable : ''}`}
            onClick={isClickable ? () => onStepClick(step) : undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={
              isClickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onStepClick(step);
                    }
                  }
                : undefined
            }
            aria-label={
              isClickable
                ? `Go back to step ${step}${labels?.[step - 1] ? `: ${labels[step - 1]}` : ''}`
                : undefined
            }
          >
            <div
              className={`${styles.circle} ${
                isCompleted
                  ? styles.circleCompleted
                  : isCurrent
                  ? styles.circleCurrent
                  : styles.circleFuture
              }`}
            >
              {isCompleted ? (
                <span className={styles.checkmark} aria-hidden="true">✓</span>
              ) : isCurrent ? (
                <span className={styles.innerDot} />
              ) : (
                step
              )}
            </div>

            {labels && labels[step - 1] && (
              <span
                className={`${styles.label} ${
                  isCompleted
                    ? styles.labelCompleted
                    : isCurrent
                    ? styles.labelCurrent
                    : ''
                }`}
              >
                {labels[step - 1]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
