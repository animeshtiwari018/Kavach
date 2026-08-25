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
    <div className="min-h-screen w-full relative flex flex-col justify-between p-6 md:p-8 text-[#73786B] font-mono overflow-hidden select-none lock-grid">
      {/* Heavy industrial panel styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes breath {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1.0; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .lock-grid {
          background-color: #0A0C09;
          background-image: 
            linear-gradient(
              rgba(6, 8, 6, 0.78),
              rgba(6, 8, 6, 0.90)
            ),
            url("/images/bg1.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `,
        }}
      />

      {/* Screen shadow effects overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C09]/50 via-transparent to-[#0A0C09]/70 pointer-events-none z-10" />

      {/* Top Header Status Area */}
      <div className="w-full flex justify-between items-start text-xs border-b border-[#3A4034] pb-4 relative z-20">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span 
                className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"
                style={{ animation: "breath 4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="text-[#22C55E] font-semibold tracking-widest text-[11px]">
              ACTIVE
            </span>
          </div>
          <span className="text-[10px] text-[#73786B] font-medium tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <div className="text-right flex flex-col gap-1">
          <span className="text-[#73786B] font-semibold tracking-wider">
            NODE_01
          </span>
          <span className="text-[10px] text-[#5E6255] font-semibold tracking-wide">
            {dateStr.toUpperCase()} // {time}
          </span>
        </div>
      </div>

      {/* Center OS Console / Authentication Panel */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 relative z-20">
        {/* User / Operator Info Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar Mechanical Plate */}
          <div 
            className="relative w-24 h-24 rounded-full border border-[#3A4034] flex items-center justify-center p-1 bg-[#11140F] mb-3 group transition-all duration-500"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(255,255,255,0.05)"
            }}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-[#24291F] opacity-40 animate-[spin_180s_linear_infinite]" />
            <div className="w-full h-full rounded-full border border-[#24291F] bg-[#11140F] overflow-hidden flex items-center justify-center relative">
              
              {/* Subtle diagonal metallic reflection highlight */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, white 0%, transparent 50%, white 100%)"
                }}
              />

              {/* SVG Shield / Fingerprint hardware plate icon */}
              <svg
                className="w-10 h-10 text-[#9A9C8C] transition-colors duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
          </div>

          <div className="text-[10px] tracking-[0.3em] text-[#73786B] font-bold mb-4">
            [ AVATAR ]
          </div>

          <h2 className="text-lg font-bold tracking-[0.2em] text-[#D4D5C8] text-center font-sans">
            ANIMESH TIWARI
          </h2>
          <div className="mt-1.5 text-[9px] tracking-[0.2em] text-[#73786B] font-semibold">
            PRIMARY OPERATOR
          </div>
        </div>

        {/* Console Box Authentication Form */}
        <div className="w-full max-w-xs flex flex-col items-center">
          <div className="text-[10px] tracking-[0.25em] text-[#73786B] font-semibold mb-2 self-start pl-1">
            ACCESS KEY
          </div>

          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
            {/* Password input container */}
            <div className="relative w-full">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="• • • • • • • •"
                className="w-full bg-[#101209]/72 border border-[#3A4034] rounded-none px-4 py-3 text-sm font-mono tracking-[0.4em] text-center text-[#D4D5C8] outline-none focus:border-[#8E9B72] placeholder-[#5E6255] transition-all duration-300 focus:placeholder-transparent"
                style={{
                  backgroundColor: "rgba(10, 12, 9, 0.72)"
                }}
                disabled={authStatus !== "idle"}
                autoFocus
              />
            </div>

            {/* Authorize Access submit button */}
            <div className="relative w-full">
              <button
                type="submit"
                disabled={authStatus !== "idle"}
                className="w-full relative bg-[#1A1E16] border border-[#4A5042] hover:bg-[#252B20] hover:border-[#737B65] active:bg-[#8E9B72] active:text-[#0A0C09] active:border-[#8E9B72] text-[#C9CBC0] rounded-none py-3 text-[11px] tracking-[0.25em] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase group-active:scale-[0.99]"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)"
                }}
              >
                {authStatus === "idle" ? (
                  "AUTHORIZE ACCESS"
                ) : (
                  <span className="flex items-center justify-center gap-2 text-[#8E9B72]">
                    <svg
                      className="animate-spin h-3.5 w-3.5 text-[#8E9B72]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    VERIFYING...
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security / Secured line badge */}
        <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-[#73786B] font-bold mt-8">
          <svg
            className="w-3.5 h-3.5 text-[#8E9B72]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <span className="uppercase">
            SECURED <span className="text-[#8E9B72]">•</span> ENCRYPTED <span className="text-[#73786B]/40">•</span> ACTIVE
          </span>
        </div>
      </div>

      {/* Footer Branding section */}
      <div className="w-full flex flex-col items-center gap-1.5 pb-2 relative z-20">
        <h1 
          className="tracking-[0.8em] text-md font-bold text-[#B6B8AA] pl-[0.8em] font-mono leading-none animate-[pulse_6s_ease-in-out_infinite]"
          style={{ opacity: 0.4 }}
        >
          KAVACH
        </h1>
        <div className="text-[8px] tracking-[0.25em] text-[#5E6255] font-bold uppercase select-none">
          SECURE OPERATING ENVIRONMENT
        </div>
      </div>
    </div>
  );
}
