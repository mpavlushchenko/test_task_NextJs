import { ReactNode } from 'react';

import styles from './RectangleItem.module.css';
import clsx from 'clsx';

type RectangleItemItemProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  isActive?: boolean;
  isPassed?: boolean;
};

export const RectangleItem = ({ children, onClick, className, isActive, isPassed }: RectangleItemItemProps) => {
  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.active]: isActive,
        [styles.passed]: isPassed,
      })}
    >
      <div className={clsx(styles.item, className)} onClick={() => onClick?.()}>
        {children}
      </div>
    </div>
  );
};
