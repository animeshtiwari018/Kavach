"use client";

import { useState, useEffect } from "react";

export default function LockScreen() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authStatus, setAuthStatus] = useState("idle"); // idle, verifying, success
  const [accessLevel, setAccessLevel] = useState("none"); // none, visitor, admin
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
        }),
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e) => {
    e?.preventDefault();
    if (authStatus !== "idle") return;

    setAuthStatus("verifying");

    setTimeout(() => {
      const code = passcode.trim().toUpperCase();
      if (code === "ADMIN" || code === "COMMANDER") {
        setAccessLevel("admin");
      } else {
        setAccessLevel("visitor");
      }
      setAuthStatus("success");

      // Immediately transition to unlocked state, no delay for messages
      setIsUnlocked(true);
    }, 800); // Small fake verifying delay for the spinner
  };

  if (isUnlocked) {
    // Return empty string or black screen as requested (removing the main page)
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between text-white font-sans overflow-hidden select-none bg-black">
      {/* Top Header Placeholder (No actual menu bar visible in the provided image) */}
      <div className="w-full h-8"></div>

      {/* Center Lock Screen Container */}
      <div className="flex flex-col items-center justify-center flex-1 w-full mt-[-8vh]">
        {/* Clock & Date */}
        <div className="flex flex-col items-center drop-shadow-md">
          <h1
            className="text-[3rem] font-light tracking-tight leading-none mb-1"
            style={{
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            {time}
          </h1>
          <p className="text-lg font-normal tracking-wide opacity-90 drop-shadow">
            {dateStr}
          </p>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center mt-10">
          {/* Avatar */}
          <div className="w-[6rem] h-[6rem] rounded-full bg-[#1e293b] flex items-center justify-center mb-3 shadow-lg border border-white/5">
            <span className="text-white text-4xl font-semibold">A</span>
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold mb-4 drop-shadow-lg tracking-wide">
            Animesh
          </h2>

          {/* Authentication Form */}
          {/* Authentication Form */}
          <form
            onSubmit={handleUnlock}
            className="flex flex-col items-center gap-2 animate-fade-in min-h-[5rem]"
          >
            {authStatus === "idle" ? (
              <>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Access Key"
                  className="w-[16rem] rounded-md px-3 py-2 text-[13px] outline-none placeholder-white/50 focus:placeholder-transparent text-white transition-all shadow-md"
                  style={{
                    background: "rgba(0, 0, 5, 0.15)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                  }}
                  autoFocus
                />

                <button
                  type="submit"
                  className="mt-1 rounded-lg px-5 py-2 text-[12px] font-medium tracking-wide transition-all shadow-md text-white/80 hover:text-white"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Authenticate
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full mt-4">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer System Controls */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <div className="w-4 h-0.5 bg-white/70 rounded-full mt-1 mb-2"></div>
        <div className="tracking-[0.4em] text-[10px] font-semibold text-white/50 uppercase pointer-events-none select-none">
          Kavach
        </div>
      </div>
    </div>
  );
}
