import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button } from '@components/ui/Button';
import SplitScreenLayout from '@components/SplitScreenLayout/SplitScreenLayout';
import { ROUTES } from '@/constants';

const StartScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push(ROUTES.MILLIONAIRE_GAME);
  };

  return (
    <SplitScreenLayout
      image={<Image src="/hand.png" alt="Millionaire" fill priority />}
      subtitle={
        <>
          Who wants to be <br /> a millionaire?
        </>
      }
      button={
        <Button type="button" onClick={handleStart} aria-label="Start the game">
          Start
        </Button>
      }
    />
  );
};

export default StartScreen;
