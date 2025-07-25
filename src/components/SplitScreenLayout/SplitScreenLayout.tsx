import { ReactNode } from 'react';

import styles from './SplitScreenLayout.module.css';

type Props = {
  image: ReactNode;
  button: ReactNode;
  title?: ReactNode;
  subtitle: ReactNode;
};

const SplitScreenLayout = ({ image, title, subtitle, button }: Props) => (
  <section className={styles.container}>
    <div className={styles.leftBlock}>{image}</div>
    <div className={styles.rightBlock}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {button}
    </div>
  </section>
);

export default SplitScreenLayout;
