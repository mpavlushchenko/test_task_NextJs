import clsx from 'clsx';

import { useBurgerMenu } from '@components/BurgerMenuContext';

import styles from './BurgerButton.module.css';

export const BurgerButton = () => {
  const { isOpen, toggle } = useBurgerMenu();

  return (
    <button
      type="button"
      className={clsx(styles.burger, { [styles.open]: isOpen })}
      onClick={toggle}
      aria-label="Toggle menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};
