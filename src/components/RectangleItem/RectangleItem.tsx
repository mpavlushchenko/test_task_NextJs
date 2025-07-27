import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './RectangleItem.module.css';

type Size = 'md' | 'lg';

type RectangleItemProps = {
  children: ReactNode;
  onClick?: () => void;
  size?: Size;
  marker?: string;
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
  size = 'md',
  disabled,
  marker,
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

  const renderSVG = () => {
    if (size === 'lg') {
      return (
        <svg width="390" height="72" viewBox="0 0 390 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.0723 0.5H356.928C360.541 0.5 363.945 2.19845 366.117 5.08594L389.374 36L366.117 66.9141C363.945 69.8015 360.541 71.5 356.928 71.5H33.0723C29.4587 71.5 26.0553 69.8015 23.8828 66.9141L0.625 36L23.8828 5.08594C25.9875 2.28862 29.2474 0.607161 32.7344 0.504883L33.0723 0.5Z"
            fill="white"
            stroke="#D0D0D8"
          />
        </svg>
      );
    }

    return (
      <svg width="240" height="40" viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.2871 0.5H217.713C221.126 0.5 224.363 2.0158 226.548 4.6377L239.349 20L226.548 35.3623C224.363 37.9842 221.126 39.5 217.713 39.5H22.2871C18.8742 39.5 15.6371 37.9842 13.4521 35.3623L0.650391 20L13.4521 4.6377C15.6371 2.0158 18.8742 0.5 22.2871 0.5Z"
          fill="white"
          stroke="#D0D0D8"
        />
      </svg>
    );
  };

  return (
    <div className={clsx(styles.wrapper, stateClass)}>
      <div className={styles.item} onClick={() => onClick?.()}>
        {renderSVG()}
        <span className={styles.marker}>{marker}</span>
        <span className={styles.label}>{children}</span>
      </div>
    </div>
  );
};
