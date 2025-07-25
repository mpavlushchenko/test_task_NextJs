export type Answer = {
  text: string;
  correct: boolean;
};

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};
