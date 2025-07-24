import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button } from '@components/ui/Button';
import { ROUTES } from '@/constants';
import styles from './StartScreen.module.css';

const StartScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push(ROUTES.GAME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        <Image src="/hand.png" alt="Millionaire" fill />
      </div>
      <div className={styles.rightBlock}>
        <h1 className={styles.title}>
          Who wants to be <br /> a millionaire?
        </h1>
        <Button type="button" onClick={handleStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
