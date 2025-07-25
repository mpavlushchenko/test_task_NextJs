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

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const GameScreen = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[questionIndex];

  const handleAnswerClick = async (answer: Answer) => {
    if (selectedAnswer || gameOver) return;

    setSelectedAnswer(answer);

    await delay(1500);
    setAnswerStatus(answer.correct ? 'correct' : 'wrong');

    await delay(2000);

    if (answer.correct) {
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((i) => i + 1);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setGameOver(false);
  };

  if (gameOver) {
    const winningsIndex = winnings.length - 1 - questionIndex;
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
            const isSelected = selectedAnswer?.text === answer.text;
            return (
              <button
                key={answer.text}
                type="button"
                className={clsx(styles.answer, {
                  [styles.selected]: isSelected,
                  [styles.correct]: isSelected && answerStatus === 'correct',
                  [styles.wrong]: isSelected && answerStatus === 'wrong',
                })}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswer}
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
            const indexFromTop = winnings.length - 1 - questionIndex;
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
