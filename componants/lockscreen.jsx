"use client";

import { useState, useEffect } from "react";

export default function LockScreen() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e) => {
    e?.preventDefault();
    // Simulate unlock transition
    setIsUnlocked(true);
  };

  if (isUnlocked) {
    // Return empty string or black screen as requested (removing the main page)
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-between text-white font-sans overflow-hidden select-none"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop')", // High quality abstract landscape
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Header Placeholder (No actual menu bar visible in the provided image) */}
      <div className="w-full h-8"></div>

      {/* Center Lock Screen Container */}
      <div className="flex flex-col items-center mb-auto pt-16">
        
        {/* Clock & Date */}
        <div className="flex flex-col items-center drop-shadow-md">
          <h1 className="text-[5.5rem] font-light tracking-tight leading-none mb-1">
            {time}
          </h1>
          <p className="text-xl font-normal tracking-wide opacity-90 drop-shadow">
            {dateStr}
          </p>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center mt-12">
          {/* Avatar */}
          <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-[#1e293b] flex items-center justify-center mb-3 shadow-lg border border-white/5">
            <span className="text-white text-4xl font-semibold">D</span>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold mb-6 drop-shadow-lg tracking-wide">Daniel</h2>

          {/* Authentication Form */}
          <form onSubmit={handleUnlock} className="flex flex-col items-center gap-3 w-64 animate-fade-in">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Password"
              className="w-[18rem] rounded-xl px-4 py-2 text-[15px] outline-none placeholder-white/70 focus:placeholder-transparent text-white transition-all shadow-md text-center"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              autoFocus
            />
            
            <button
              type="submit"
              className="mt-1 rounded-[10px] px-5 py-1.5 text-[13px] font-medium tracking-wide transition-all shadow-md text-white/90 hover:text-white"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Footer System Controls */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <div className="w-4 h-0.5 bg-white/70 rounded-full mt-1"></div>
      </div>
      
    </div>
  );
}
