"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Consistent linear progress loading simulation (reaches 100% in 2 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait 500ms so user sees the progress bar full at 100%
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }

        const increment = 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black select-none p-4">
      <motion.div 
        className="flex flex-col items-center gap-4 max-w-xs w-full"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Skull Image Container */}
        <motion.div 
          className="w-40 h-40 flex items-center justify-center"
          animate={{ 
            scale: [0.97, 1.03, 0.97]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.06 }}
        >
          {imageError ? (
            /* Premium, clean geometric skull SVG fallback if the PNG is not yet present */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-16 h-16 text-neutral-600 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.13 2 5 5.13 5 9c0 3.31 2.69 6 6 6h2c3.31 0 6-2.69 6-6 0-3.87-3.13-7-7-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15v4a2 2 0 002 2h2a2 2 0 002-2v-4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 10h.01M15 10h.01"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 18h4" />
            </svg>
          ) : (
            <img
              src="/images/Para_Skull.svg"
              alt="Skull logo"
              className="w-36 h-36 object-contain brightness-90 hover:brightness-100 transition-all duration-300 pointer-events-none select-none"
              onError={() => setImageError(true)}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          )}
        </motion.div>

        {/* Loading Bar */}
        <div className="w-[200px] sm:w-[290px] h-[4px] bg-[#1A1E24] rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
