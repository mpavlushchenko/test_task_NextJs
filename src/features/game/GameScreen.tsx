import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { winnings } from '@data/winnings';
import { questions } from '@data/questions';

import styles from './GameScreen.module.css';

export type Answer = {
  text: string;
  correct: boolean;
};

const GameScreen = () => {
  const router = useRouter();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[questionIndex];

  const handleAnswer = (answer: Answer) => {
    const { text, correct } = answer;
    if (selected) return;
    setSelected(text);
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) {
        if (questionIndex + 1 < questions.length) {
          setQuestionIndex((prev) => prev + 1);
          setSelected(null);
          setIsCorrect(null);
        } else {
          router.push('/win');
        }
      } else {
        router.push('/lose');
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.question}>
          <h2>{currentQuestion.question}</h2>
        </header>
        <section className={styles.answers}>
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.text}
              type="button"
              onClick={() => handleAnswer(answer)}
              className={clsx(
                styles.answerButton,
                selected === answer.text && (isCorrect ? styles.correct : styles.wrong),
              )}
            >
              {answer.text}
            </button>
          ))}
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
                className={`${styles.winningItem} ${isActive ? styles.active : isPassed ? styles.passed : ''}`}
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
