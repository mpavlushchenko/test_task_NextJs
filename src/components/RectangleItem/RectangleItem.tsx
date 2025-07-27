import { ReactNode } from 'react';

import styles from './RectangleItem.module.css';
import clsx from 'clsx';

type Size = 'md' | 'lg';
type RectangleItemItemProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
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
  disabled,
  size = 'md',
  className,
  isActive,
  isPassed,
  isSelected,
  isCorrect,
  isWrong,
}: RectangleItemItemProps) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.disabled]: disabled,
        [styles.active]: isActive,
        [styles.passed]: isPassed,
        [styles.selected]: isSelected,
        [styles.correct]: isCorrect,
        [styles.wrong]: isWrong,
      })}
    >
      <div className={clsx(styles.item, styles[size], className)} onClick={() => onClick?.()}>
        {children}
      </div>
    </div>
  );
};
