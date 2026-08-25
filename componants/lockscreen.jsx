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
    <div className="min-h-screen w-full bg-black relative flex flex-col justify-between p-6 md:p-8 text-neutral-400 font-mono overflow-hidden select-none grid-bg">
      {/* Dynamic scanlines and animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scanline-anim {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes radar-pulse {
          0% { transform: scale(0.98); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(0.98); opacity: 0.8; }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(16, 185, 129, 0) 0%,
            rgba(16, 185, 129, 0.05) 10%,
            rgba(16, 185, 129, 0) 20%
          );
          background-size: 100% 20px;
          animation: scanline-anim 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .grid-bg {
          background-image: 
            radial-gradient(circle at center, rgba(16, 185, 129, 0.04) 0%, transparent 75%),
            linear-gradient(to right, rgba(16, 185, 129, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 32px 32px, 32px 32px;
        }
        .cyber-dots {
          background-image: radial-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 0);
          background-size: 8px 8px;
        }
      `,
        }}
      />

      {/* Screen Effects overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />
      <div className="scanline" />

      {/* Top Header Status Area */}
      <div className="w-full flex justify-between items-start text-xs border-b border-neutral-800 pb-4 relative z-20">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 font-semibold tracking-widest text-[11px]">
              ACTIVE
            </span>
          </div>
          <span className="text-[10px] text-neutral-600 font-medium tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <div className="text-right flex flex-col gap-1">
          <span className="text-neutral-500 font-semibold tracking-wider">
            NODE_01
          </span>
          <span className="text-[10px] text-neutral-600 font-semibold tracking-wide">
            {dateStr.toUpperCase()} // {time}
          </span>
        </div>
      </div>

      {/* Center OS Console / Authentication Panel */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 relative z-20">
        {/* User / Operator Info Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar Ring */}
          <div className="relative w-24 h-24 rounded-full border border-neutral-800 flex items-center justify-center p-1 bg-neutral-950/40 mb-3 group hover:border-emerald-500/20 transition-all duration-500">
            <div className="absolute inset-0 rounded-full border border-dashed border-neutral-800/40 animate-[spin_60s_linear_infinite]" />
            <div className="w-full h-full rounded-full border border-neutral-800/60 bg-neutral-900/40 overflow-hidden flex items-center justify-center relative">
              {/* Scan effect in avatar */}
              <div
                className="absolute w-full h-[1px] bg-emerald-500/30 opacity-70 animate-[pan-y_3s_ease-in-out_infinite]"
                style={{
                  boxShadow: "0 0 6px rgba(16, 185, 129, 0.4)",
                }}
              />

              {/* SVG Fingerprint / High-tech lock design */}
              <svg
                className="w-10 h-10 text-neutral-500 group-hover:text-emerald-400 transition-colors duration-500"
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

          <div className="text-[10px] tracking-[0.3em] text-neutral-600 font-bold mb-4">
            [ AVATAR ]
          </div>

          <h2 className="text-lg font-bold tracking-[0.3em] text-white text-center font-sans">
            ANIMESH TIWARI
          </h2>
          <div className="mt-1.5 text-[9px] tracking-[0.2em] text-neutral-500 font-semibold">
            PRIMARY OPERATOR
          </div>
        </div>

        {/* Console Box Authentication Form */}
        <div className="w-full max-w-xs flex flex-col items-center">
          <div className="text-[10px] tracking-[0.25em] text-neutral-500 font-semibold mb-2 self-start pl-1">
            ACCESS KEY
          </div>

          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
            {/* Password input container with console border corners */}
            <div className="relative w-full group">
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-neutral-700 group-focus-within:border-emerald-500 transition-colors duration-200"></div>
              <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-neutral-700 group-focus-within:border-emerald-500 transition-colors duration-200"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-neutral-700 group-focus-within:border-emerald-500 transition-colors duration-200"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-neutral-700 group-focus-within:border-emerald-500 transition-colors duration-200"></div>

              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="• • • • • • • •"
                className="w-full bg-neutral-950/90 border border-neutral-800 rounded-none px-4 py-3 text-sm font-mono tracking-[0.4em] text-center text-white outline-none focus:border-neutral-800 placeholder-neutral-700/80 transition-all focus:placeholder-transparent"
                disabled={authStatus !== "idle"}
                autoFocus
              />
            </div>

            {/* Authorize Access submit button with custom console borders */}
            <div className="relative w-full group">
              <button
                type="submit"
                disabled={authStatus !== "idle"}
                className="w-full relative bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white rounded-none py-3 text-[11px] tracking-[0.25em] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase hover:text-emerald-400 group-active:scale-[0.99]"
              >
                {authStatus === "idle" ? (
                  "AUTHORIZE ACCESS"
                ) : (
                  <span className="flex items-center justify-center gap-2 text-emerald-500">
                    <svg
                      className="animate-spin h-3.5 w-3.5 text-emerald-500"
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
              <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-neutral-700 group-hover:border-neutral-500 transition-colors duration-200"></div>
              <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-neutral-700 group-hover:border-neutral-500 transition-colors duration-200"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-neutral-700 group-hover:border-neutral-500 transition-colors duration-200"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-neutral-700 group-hover:border-neutral-500 transition-colors duration-200"></div>
            </div>
          </form>
        </div>

        {/* Security / Secured line badge */}
        <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-neutral-500 font-bold mt-8">
          <svg
            className="w-3.5 h-3.5 text-emerald-500/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <span className="uppercase">SECURED • ENCRYPTED • ACTIVE</span>
        </div>
      </div>

      {/* Footer Branding section */}
      <div className="w-full flex flex-col items-center gap-1.5 pb-2 relative z-20">
        <h1 className="tracking-[0.8em] text-md font-bold text-white pl-[0.8em] font-mono leading-none">
          KAVACH
        </h1>
        <div className="text-[8px] tracking-[0.25em] text-neutral-600 font-bold uppercase select-none">
          SECURE OPERATING ENVIRONMENT
        </div>
      </div>
    </div>
  );
}
