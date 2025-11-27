import React from "react";
import RadioOption from "./RadioOption";

const QuestionView = ({
  question,
  currentAnswer,
  currentIndex,
  totalQuestions,
  onAnswer,
  onBack,
  t,
  lang,
}) => {
  const progress = (currentIndex / totalQuestions) * 100;

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-end">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base md:text-lg text-black tracking-widest uppercase">
              {t.typeCheck}
            </span>
          </div>
          <span className="font-mono text-[10px] md:text-xs font-bold text-black tracking-widest">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="h-1 bg-neutral-100 w-full">
          <div
            className="h-full bg-black transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 bg-white flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white p-4 md:p-14 text-center">
            <h2 className="text-xl md:text-4xl text-black font-medium mb-10 md:mb-16 leading-tight min-h-[5rem] flex items-center justify-center">
              {question.text[lang]}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest hidden md:block w-24 text-right">
                {t.disagree}
              </span>

              <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
                <RadioOption
                  value={-2}
                  selectedValue={currentAnswer}
                  onChange={onAnswer}
                  sizeClass="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <RadioOption
                  value={-1}
                  selectedValue={currentAnswer}
                  onChange={onAnswer}
                  sizeClass="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
                <RadioOption
                  value={0}
                  selectedValue={currentAnswer}
                  onChange={onAnswer}
                  sizeClass="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
                <RadioOption
                  value={1}
                  selectedValue={currentAnswer}
                  onChange={onAnswer}
                  sizeClass="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
                <RadioOption
                  value={2}
                  selectedValue={currentAnswer}
                  onChange={onAnswer}
                  sizeClass="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
              </div>

              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest hidden md:block w-24 text-left">
                {t.agree}
              </span>

              {/* Mobile Labels */}
              <div className="flex justify-between w-full md:hidden mt-6 px-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">
                  {t.disagree}
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">
                  {t.agree}
                </span>
              </div>
            </div>
          </div>

          {currentIndex > 0 && (
            <div className="mt-8 md:mt-12 text-center">
              <button
                onClick={onBack}
                className="text-neutral-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors border-b border-transparent hover:border-black pb-1"
              >
                {t.back}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionView;
