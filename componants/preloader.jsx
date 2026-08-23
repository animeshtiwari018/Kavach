"use client";

import { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Realistic boot loading simulation with randomized increments and pauses
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
        
        // Random increment to simulate loading chunks of resources
        const currentStep = Math.random();
        let increment = 0;
        
        if (prev < 30) {
          // Slow start
          increment = currentStep * 8;
        } else if (prev < 70) {
          // Normal middle section
          increment = currentStep * 12;
        } else if (prev < 90) {
          // Slow crawl near the end
          increment = currentStep * 4;
        } else {
          // Fast finish
          increment = currentStep * 6;
        }
        
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black select-none p-4">
      <div className="flex flex-col items-center gap-8 max-w-xs w-full">
        {/* Skull Image Container */}
        <div className="w-24 h-24 flex items-center justify-center">
          {imageError ? (
            /* Premium, clean geometric skull SVG fallback if the PNG is not yet present */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-16 h-16 text-neutral-600 animate-pulse transition-all duration-300"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 18h4"
              />
            </svg>
          ) : (
            <img
              src="/skull.png"
              alt="Skull logo"
              className="w-20 h-20 object-contain brightness-90 hover:brightness-100 transition-all duration-300"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Apple-style Loading Bar */}
        <div className="w-[180px] sm:w-[200px] h-[3px] bg-neutral-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
