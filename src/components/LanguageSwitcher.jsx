import React from "react";

const LanguageSwitcher = ({ currentLang, setLang }) => {
  const languages = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
  ];

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors border ${
            currentLang === l.code
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-400 border-transparent hover:border-neutral-200 hover:text-black"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
