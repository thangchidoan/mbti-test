import React from "react";
import { Brain } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const IntroScreen = ({ onStart, t, currentLang, setLang }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-4xl mx-auto px-4 relative pt-12 pb-8">
    <LanguageSwitcher currentLang={currentLang} setLang={setLang} />
    <div className="mb-6 md:mb-8 p-4 md:p-6 border-2 border-black rounded-full">
      <Brain
        className="w-12 h-12 md:w-16 md:h-16 text-black"
        strokeWidth={1.5}
      />
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 md:mb-6 tracking-tight uppercase">
      {t.title}
    </h1>
    <p className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-12 max-w-2xl leading-relaxed mx-auto px-4">
      {t.subtitle}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl mx-auto px-2">
      <button
        onClick={() => onStart("mini")}
        className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white border-2 border-neutral-200 hover:border-black transition-colors w-full rounded-2xl md:rounded-none"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 md:mb-4 group-hover:text-black">
          {t.fastTrack}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-black mb-2">
          {t.miniTest}
        </span>
        <span className="text-sm font-medium text-neutral-500">
          26 {t.questions}
        </span>
        <span className="text-xs text-neutral-400 mt-2">~5 {t.minutes}</span>
      </button>

      <button
        onClick={() => onStart("matxa")}
        className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white border-2 border-neutral-200 hover:border-black transition-colors w-full rounded-2xl md:rounded-none"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 md:mb-4 group-hover:text-black">
          {t.deepDive}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-black mb-2">
          {t.matxaTest}
        </span>
        <span className="text-sm font-medium text-neutral-500">
          76 {t.questions}
        </span>
        <span className="text-xs text-neutral-400 mt-2">~15 {t.minutes}</span>
      </button>
    </div>
  </div>
);

export default IntroScreen;
