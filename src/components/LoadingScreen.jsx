import React from "react";
import { Brain } from "lucide-react";

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white transition-opacity duration-500">
    <div className="relative flex items-center justify-center">
      <Brain className="w-12 h-12 text-black" strokeWidth={1.5} />
      <div className="absolute inset-0 -m-6 border-2 border-neutral-100 border-t-black rounded-full w-24 h-24 animate-spin" />
    </div>
  </div>
);

export default LoadingScreen;
