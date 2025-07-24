// import Image from 'next/image';
import { useRouter } from 'next/router';

// import handImage from '@/assets/hand.png';
import { Button } from '@components/ui/Button';
import styles from './StartScreen.module.scss';

const StartScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/GameScreen');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        {/*<Image src={handImage} alt="Millionaire" fill priority />*/}
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
