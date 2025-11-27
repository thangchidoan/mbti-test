import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import IntroScreen from "./components/IntroScreen";
import QuestionView from "./components/QuestionView";
import ResultView from "./components/ResultView";
import { TRANSLATIONS } from "./constants/translations";
import { generateQuestions } from "./utils/questionGenerator";
import { calculateMBTIType } from "./utils/scoreCalculator";

const App = () => {
  const [lang, setLang] = useState("vi");
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const t = TRANSLATIONS[lang];

  const startTest = (mode) => {
    const count = mode === "mini" ? 26 : 76;
    setQuestions(generateQuestions(count));
    setStep(1);
    setCurrentQIndex(0);
    setAnswers({});
    window.scrollTo(0, 0);
  };

  const handleAnswer = (val) => {
    setAnswers((prev) => ({ ...prev, [currentQIndex]: val }));

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        finishTest();
      }
    }, 200);
  };

  const finishTest = () => {
    const calculatedResult = calculateMBTIType(questions, answers);
    setResult(calculatedResult);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setStep(0);
    setQuestions([]);
    setAnswers({});
    setCurrentQIndex(0);
    setResult(null);
    window.scrollTo(0, 0);
  };

  if (isAppLoading) {
    return (
      <div className="text-black bg-white min-h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="text-black bg-white min-h-screen selection:bg-neutral-200">
      {step === 0 && (
        <IntroScreen
          onStart={startTest}
          t={t}
          currentLang={lang}
          setLang={setLang}
        />
      )}

      {step === 1 && (
        <QuestionView
          question={questions[currentQIndex]}
          currentAnswer={answers[currentQIndex]}
          currentIndex={currentQIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={() => setCurrentQIndex((p) => p - 1)}
          t={t}
          lang={lang}
        />
      )}

      {step === 2 && (
        <ResultView
          result={result}
          t={t}
          lang={lang}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
