import { useState } from 'react';
import clsx from 'clsx';

import { winnings } from '@data/winnings';
import { questions } from '@data/questions';
import GameOver from '@features/finish/GameOver';

import styles from './GameScreen.module.css';

export type Answer = {
  text: string;
  correct: boolean;
};
type GameState = {
  questionIndex: number;
  selectedAnswer: Answer | null;
  answerStatus: 'correct' | 'wrong' | null;
  gameOver: boolean;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const initialGameState: GameState = {
  questionIndex: 0,
  selectedAnswer: null,
  answerStatus: null,
  gameOver: false,
};

const GameScreen = () => {
  const [gameState, setGameState] = useState<GameState>({
    questionIndex: 0,
    selectedAnswer: null,
    answerStatus: null,
    gameOver: false,
  });

  const currentQuestion = questions.at(gameState.questionIndex);

  const handleAnswerClick = async (answer: Answer) => {
    const { selectedAnswer, gameOver, questionIndex } = gameState;
    if (selectedAnswer || gameOver) return;

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answer,
    }));

    await delay(1500);

    const isCorrect = answer.correct;

    setGameState((prev) => ({
      ...prev,
      answerStatus: isCorrect ? 'correct' : 'wrong',
    }));

    await delay(2000);

    if (isCorrect) {
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
  };

  const handleRestart = () => {
    setGameState(initialGameState);
  };

  if (gameState.gameOver) {
    // TODO: check earnedAmount one more time
    const winningsIndex = winnings.length - 1 - gameState.questionIndex;
    const earnedAmount = winnings[winningsIndex]?.amount || '0';

    return <GameOver earnedAmount={earnedAmount} handleRestart={handleRestart} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.question}>
          <h2>{currentQuestion.question}</h2>
        </header>

        <section className={styles.answers}>
          {currentQuestion.answers.map((answer) => {
            const isSelected = gameState.selectedAnswer?.text === answer.text;
            return (
              <button
                key={answer.text}
                type="button"
                className={clsx(styles.answer, {
                  [styles.selected]: isSelected,
                  [styles.correct]: isSelected && gameState.answerStatus === 'correct',
                  [styles.wrong]: isSelected && gameState.answerStatus === 'wrong',
                })}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!gameState.selectedAnswer}
              >
                {answer.text}
              </button>
            );
          })}
        </section>
      </div>

      <aside className={styles.sidebar}>
        <ul className={styles.winningsList}>
          {winnings.map((item, i) => {
            const indexFromTop = winnings.length - 1 - gameState.questionIndex;
            const isActive = i === indexFromTop;
            const isPassed = i > indexFromTop;

            return (
              <li
                key={item.id}
                className={clsx(styles.winningItem, {
                  [styles.active]: isActive,
                  [styles.passed]: isPassed,
                })}
              >
                {item.amount}
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default GameScreen;
