import { Button } from '@components/ui/Button';

const GameOver = ({ earnedAmount, handleRestart }: { earnedAmount: string; handleRestart: () => void }) => {
  return (
    <section>
      <h2>Total score:</h2>
      <p>${earnedAmount} earned</p>
      <Button type="button" onClick={handleRestart}>
        Try again
      </Button>
    </section>
  );
};

export default GameOver;
