import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './RectangleItem.module.css';

type Size = 'md' | 'lg';

type RectangleItemProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: Size;
  disabled?: boolean;
  isActive?: boolean;
  isPassed?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
};

export const RectangleItem = ({
  children,
  onClick,
  className,
  size = 'md',
  disabled,
  isActive,
  isPassed,
  isSelected,
  isCorrect,
  isWrong,
}: RectangleItemProps) => {
  const stateClass = clsx({
    [styles.active]: isActive,
    [styles.passed]: isPassed,
    [styles.selected]: isSelected,
    [styles.correct]: isCorrect,
    [styles.wrong]: isWrong,
    [styles.disabled]: disabled,
  });

  return (
    <div className={clsx(styles.wrapper, stateClass)}>
      <div className={clsx(styles.item, styles[size], className)} onClick={() => onClick?.()}>
        <div className={styles.rectangle}>{children}</div>
      </div>
    </div>
  );
};
