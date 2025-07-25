import Image from 'next/image';

import { Button } from '@components/ui/Button';
import SplitScreenLayout from '@components/SplitScreenLayout/SplitScreenLayout';

const GameOver = ({ earnedAmount, handleRestart }: { earnedAmount: string; handleRestart: () => void }) => {
  return (
    <SplitScreenLayout
      image={<Image src="/hand.png" alt="Millionaire" fill priority />}
      title="Total score:"
      subtitle={`$${earnedAmount} earned`}
      button={
        <Button type="button" onClick={handleRestart}>
          Try again
        </Button>
      }
    />
  );
};

export default GameOver;
