import { useState } from 'react';
import clsx from 'clsx';

import { Answer, Question } from '@features/millionaire-game/types';
import { RectangleItem } from '@components/RectangleItem/RectangleItem';
import { BurgerButton } from '@components/BurgerButton/BurgerButton';
import { useBurgerMenu } from '@components/BurgerMenuContext';
import { delay } from '@/utils';

import GameOver from './components/GameOver';
import styles from './GameScreen.module.css';

type GameState = {
  questionIndex: number;
  selectedAnswer: Answer | null;
  answerStatus: 'correct' | 'wrong' | null;
  gameOver: boolean;
};

const initialGameState: GameState = {
  questionIndex: 0,
  selectedAnswer: null,
  answerStatus: null,
  gameOver: false,
};

const GameScreen = ({ questions }: { questions: Question[] }) => {
  const [gameState, setGameState] = useState(initialGameState);
  const { isOpen: isBurgerMenuOpen } = useBurgerMenu();

  const currentQuestion = questions.at(gameState.questionIndex);
  const amountsReversed = questions.map((q) => ({ id: q.id, amount: q.amount })).reverse();

  const handleAnswerClick = async (answer: Answer) => {
    const { selectedAnswer, gameOver, questionIndex } = gameState;
    if (selectedAnswer || gameOver) return;

    try {
      setGameState((prev) => ({
        ...prev,
        selectedAnswer: answer,
      }));

      await delay(1500);

      const isAnswerCorrect = answer.correct;

      setGameState((prev) => ({
        ...prev,
        answerStatus: isAnswerCorrect ? 'correct' : 'wrong',
      }));

      await delay(2000);

      if (isAnswerCorrect) {
        const isLast = questionIndex + 1 >= questions.length;
        setGameState((prev) => ({
          questionIndex: prev.questionIndex + 1,
          selectedAnswer: null,
          answerStatus: null,
          gameOver: isLast,
        }));
      } else {
        setGameState((prev) => ({
          ...prev,
          gameOver: true,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (gameState.gameOver) {
    const earnedAmount = questions[gameState.questionIndex - 1]?.amount || '0';
    return <GameOver earnedAmount={earnedAmount} handleRestart={() => setGameState(initialGameState)} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BurgerButton />
        <header className={styles.question}>
          <h2>{currentQuestion?.question}</h2>
        </header>

        <section className={styles.answers}>
          {currentQuestion?.answers.map((answer, index) => {
            const isSelected = gameState.selectedAnswer?.text === answer.text;
            const markers = ['A', 'B', 'C', 'D', 'E'];

            return (
              <RectangleItem
                key={answer.text}
                size="lg"
                marker={markers[index]}
                isSelected={isSelected}
                isCorrect={isSelected && gameState.answerStatus === 'correct'}
                isWrong={isSelected && gameState.answerStatus === 'wrong'}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!gameState.selectedAnswer && !isSelected}
              >
                {answer.text}
              </RectangleItem>
            );
          })}
        </section>
      </div>

      <aside className={clsx(styles.sidebar, { [styles.mobileScreenActive]: isBurgerMenuOpen })}>
        <div className={styles.winningsList}>
          {amountsReversed.map((q) => {
            const currentId = questions[gameState.questionIndex]?.id;
            const isActive = q.id === currentId;
            const isPassed = q.id < currentId;

            return (
              <RectangleItem key={q.id} isActive={isActive} isPassed={isPassed}>
                ${q.amount}
              </RectangleItem>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default GameScreen;
