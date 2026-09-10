"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function WelcomePage({ isDarkMode }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-[500px] rounded-xl shadow-2xl border flex flex-col overflow-hidden ${
          isDarkMode
            ? "bg-[#0A0C09]/95 border-[#8E9B72]/40 text-[#D4D5C8]"
            : "bg-white/95 border-gray-300 text-gray-800"
        }`}
      >
        {/* System Header */}
        <div className={`px-4 py-3 flex items-center justify-between border-b text-[10px] font-mono tracking-[0.2em] uppercase ${
          isDarkMode ? "bg-[#121610] border-[#8E9B72]/20" : "bg-gray-100 border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Kavach OS // Core Init</span>
          </div>
          <span className="opacity-50">SYS.READY</span>
        </div>

        {/* Content Body */}
        <div className="p-10 flex flex-col items-center text-center relative">
          {/* Cyber Decorative Elements */}
          <div className="absolute top-6 left-6 opacity-20 text-[9px] font-mono whitespace-pre text-left leading-relaxed">
            {"[SYS_LOG] OK\n[KERNEL] LOADED\n[SEC] VERIFIED"}
          </div>
          <div className="absolute top-6 right-6 opacity-20 text-[9px] font-mono whitespace-pre text-right leading-relaxed">
            {"VER 2.0.4\nNODE: 0x4B\nACTIVE"}
          </div>

          {/* Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border ${
            isDarkMode ? "border-[#8E9B72]/40 bg-[#8E9B72]/10 text-[#8E9B72]" : "border-gray-300 bg-gray-100 text-gray-700"
          }`}>
            <ShieldCheck className="w-10 h-10" />
          </div>

          {/* Role Info */}
          <h1 className="text-3xl font-bold mb-1 tracking-wide font-sans">
            Animesh Tiwari
          </h1>
          <h2 className="text-xs font-mono font-bold mb-8 tracking-[0.2em] uppercase text-green-500">
            Full-Stack Developer
          </h2>
          
          {/* Terminal-style message */}
          <div className={`w-full p-5 rounded-lg mb-8 text-[13px] font-mono leading-relaxed border text-left ${
            isDarkMode ? "bg-[#121610]/70 border-[#8E9B72]/20" : "bg-gray-50 border-gray-200"
          }`}>
            <span className="text-green-500 mr-3 opacity-80">{">"}</span>
            <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              You are welcome. There are more to explore in me. You have freedom to see.
            </span>
            <span className="animate-pulse ml-1 text-green-500">_</span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsVisible(false)}
            className={`w-full py-3.5 rounded-lg font-mono font-bold text-[11px] tracking-[0.2em] uppercase transition-all flex justify-center items-center gap-2 group ${
              isDarkMode
                ? "bg-[#8E9B72]/10 hover:bg-[#8E9B72]/25 text-[#8E9B72] border border-[#8E9B72]/50 hover:border-[#8E9B72]"
                : "bg-neutral-800 hover:bg-neutral-700 text-white"
            }`}
          >
            <span>[ Initialize Workspace ]</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
