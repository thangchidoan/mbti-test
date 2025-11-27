import { QUESTION_BANK } from "../constants/questions";

export const generateQuestions = (count) => {
  const generated = [];
  for (let i = 0; i < count; i++) {
    const base = QUESTION_BANK[i % QUESTION_BANK.length];
    generated.push({
      id: i,
      text: base.text,
      dimension: base.dimension,
      direction: base.direction,
      displayId: i + 1,
    });
  }
  return generated;
};
