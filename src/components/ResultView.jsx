import React, { useState } from "react";
import { Briefcase, RefreshCw, Loader2 } from "lucide-react";
import { DIMENSIONS } from "../constants/dimensions";
import SimpleMarkdown from "./SimpleMarkdown";
import {
  fetchGeminiRecommendations,
  getFallbackRecommendations,
} from "../utils/geminiApi";

const ResultView = ({ result, t, lang, onRestart }) => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [aiError, setAiError] = useState(null);

  const handleFetchRecommendations = async () => {
    if (!result) return;

    setLoadingAI(true);
    setAiError(null);

    try {
      const text = await fetchGeminiRecommendations(
        result.type,
        t.aiPromptLang
      );
      setAiRecommendations(text);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setAiRecommendations(getFallbackRecommendations());
        setLoadingAI(false);
      }, 1000);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="mb-12 md:mb-16 border-b-2 border-black pb-8 md:pb-12">
          <div className="text-center">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
              {t.typeHeader}
            </h2>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-4 md:mb-6 text-black">
              {result.type}
            </h1>
            <p className="text-lg md:text-xl text-neutral-600">
              {t.analysisHeader}
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8">
              {Object.entries(DIMENSIONS).map(([key, dim]) => {
                const scoreKey1 = dim.a.en[dim.a.en.length - 2];
                const val1 = result.scores[scoreKey1];
                const total =
                  result.scores[dim.a.en[dim.a.en.length - 2]] +
                  result.scores[dim.b.en[dim.b.en.length - 2]] +
                  0.001;
                const pct1 = Math.round((val1 / total) * 100);

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-black">
                      <span>{dim.a[lang]}</span>
                      <span>{dim.b[lang]}</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 flex">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${pct1}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs text-neutral-400 font-mono">
                      <span>{pct1}%</span>
                      <span>{100 - pct1}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-neutral-50 p-6 md:p-12 border border-neutral-200">
          <div className="">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-6 md:mb-8 flex items-center gap-3">
              <Briefcase className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              {t.careerMatch}
            </h3>

            {!aiRecommendations && !loadingAI && (
              <div className="text-center py-8">
                <p className="text-neutral-600 mb-8 max-w-lg mx-auto text-sm md:text-base">
                  {t.careerDesc}
                </p>
                <button
                  onClick={handleFetchRecommendations}
                  className="bg-black text-white px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-2 mx-auto"
                >
                  {t.generate}
                </button>
              </div>
            )}

            {loadingAI && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                  {t.processing}
                </span>
              </div>
            )}

            {aiRecommendations && (
              <div className="">
                <SimpleMarkdown text={aiRecommendations} />

                <button
                  onClick={handleFetchRecommendations}
                  className="mt-8 md:mt-12 text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-black pb-1 w-fit hover:text-neutral-600 hover:border-neutral-600 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> {t.regenerate}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12 md:mt-20 mb-10">
          <button
            onClick={onRestart}
            className="text-neutral-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors"
          >
            {t.restart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
