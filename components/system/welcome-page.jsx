"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function WelcomePage({ isDarkMode }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-[450px] p-8 rounded-2xl shadow-2xl border text-center flex flex-col items-center ${
          isDarkMode
            ? "bg-[#0A0C09]/95 border-[#8E9B72]/30 text-[#D4D5C8]"
            : "bg-white/95 border-gray-200 text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2 tracking-wide">
          Animesh Tiwari
        </h1>
        <h2 className="text-sm font-semibold mb-6 uppercase tracking-widest text-[#8E9B72]">
          Full-Stack Developer
        </h2>
        
        <p className="text-sm leading-relaxed mb-8 opacity-90 max-w-[300px]">
          You are welcome. There are more to explore in me. You have freedom to see.
        </p>

        <button
          onClick={() => setIsVisible(false)}
          className={`px-8 py-2.5 rounded-lg font-medium text-sm transition-all ${
            isDarkMode
              ? "bg-[#8E9B72]/10 hover:bg-[#8E9B72]/30 text-[#8E9B72] border border-[#8E9B72]/50"
              : "bg-neutral-800 hover:bg-neutral-700 text-white"
          }`}
        >
          Explore System
        </button>
      </motion.div>
    </div>
  );
}
