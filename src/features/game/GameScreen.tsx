import { useState } from 'react';
import clsx from 'clsx';

import GameOver from '@features/finish/GameOver';
import { Answer, Question } from '@features/game/types';

import styles from './GameScreen.module.css';

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

const GameScreen = ({ questions }: { questions: Question[] }) => {
  const [gameState, setGameState] = useState(initialGameState);

  const currentQuestion = questions.at(gameState.questionIndex);

  const handleAnswerClick = async (answer: Answer) => {
    const { selectedAnswer, gameOver, questionIndex } = gameState;

    if (selectedAnswer || gameOver) return;

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
  };

  const amountsReversed = questions
    .map((q) => ({
      id: q.id,
      amount: q.amount,
    }))
    .reverse();

  if (gameState.gameOver) {
    const indexFromTop = amountsReversed.length - gameState.questionIndex;
    const earnedAmount = amountsReversed[indexFromTop]?.amount || '0';

    return <GameOver earnedAmount={earnedAmount} handleRestart={() => setGameState(initialGameState)} />;
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
          {amountsReversed.map((q) => {
            const currentId = questions[gameState.questionIndex]?.id;
            const isActive = q.id === currentId;
            const isPassed = q.id < currentId;

            return (
              <li
                key={q.id}
                className={clsx(styles.winningItem, {
                  [styles.active]: isActive,
                  [styles.passed]: isPassed,
                })}
              >
                ${q.amount}
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default GameScreen;
