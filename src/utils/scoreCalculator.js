export const calculateMBTIType = (questions, answers) => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  questions.forEach((q, index) => {
    const answerVal = answers[index] || 0;
    const dimensionKey = q.dimension;
    const rawScore = answerVal * q.direction;

    if (dimensionKey === "EI") {
      if (rawScore > 0) scores.E += rawScore;
      else scores.I += Math.abs(rawScore);
    } else if (dimensionKey === "SN") {
      if (rawScore > 0) scores.N += rawScore;
      else scores.S += Math.abs(rawScore);
    } else if (dimensionKey === "TF") {
      if (rawScore > 0) scores.T += rawScore;
      else scores.F += Math.abs(rawScore);
    } else if (dimensionKey === "JP") {
      if (rawScore > 0) scores.J += rawScore;
      else scores.P += Math.abs(rawScore);
    }
  });

  const type = [
    scores.E >= scores.I ? "E" : "I",
    scores.N >= scores.S ? "N" : "S",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P",
  ].join("");

  return { type, scores };
};
