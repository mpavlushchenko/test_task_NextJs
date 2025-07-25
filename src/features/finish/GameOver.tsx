import Image from 'next/image';

import { Button } from '@components/ui/Button';

import styles from './GameOver.module.css';

const GameOver = ({ earnedAmount, handleRestart }: { earnedAmount: string; handleRestart: () => void }) => {
  return (
    <section className={styles.container}>
      <div className={styles.leftBlock}>
        <Image src="/hand.png" alt="Millionaire" fill priority />
      </div>
      <div className={styles.rightBlock}>
        <h2 className={styles.title}>Total score:</h2>
        <p className={styles.subtitle}>${earnedAmount} earned</p>
        <Button type="button" onClick={handleRestart}>
          Try again
        </Button>
      </div>
    </section>
  );
};

export default GameOver;
