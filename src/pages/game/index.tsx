import { GetStaticProps } from 'next';
import { promises as fs } from 'fs';

import GameScreen from '@features/game/GameScreen';
import { Question } from '@features/game/types';

type Props = {
  questions: Question[];
};

export default function GamePage({ questions }: Props) {
  return <GameScreen questions={questions} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const file = await fs.readFile(process.cwd() + '/src/data/questions.json', 'utf8');
  const questions = JSON.parse(file) ?? [];

  return {
    props: {
      questions,
    },
  };
};
