"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authStatus, setAuthStatus] = useState("idle"); // idle, verifying, success
  const [accessLevel, setAccessLevel] = useState("none"); // none, visitor, admin
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isBtnPressed, setIsBtnPressed] = useState(false);

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
      if (onUnlock) {
        setTimeout(() => {
          onUnlock();
        }, 200);
      }
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
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .lock-grid {
          background-color: #0A0C09;
          background-image: 
            linear-gradient(
              rgba(6, 8, 6, 0.78),
              rgba(6, 8, 6, 0.90)
            ),
            url("/images/bg2.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .cursor-blink {
          animation: blink 1.2s infinite steps(1);
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
            <span className="relative flex h-2 w-2 items-center justify-center">
              {/* Outer pulsing ring 1 */}
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]"
                animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              {/* Mid pulsing ring 2 */}
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]"
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              {/* Center solid indicator dot */}
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
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(255,255,255,0.05)",
            }}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-[#24291F] opacity-40 animate-[spin_180s_linear_infinite]" />
            <div className="w-full h-full rounded-full border border-[#24291F] bg-[#11140F] overflow-hidden flex items-center justify-center relative">
              {/* Subtle diagonal metallic reflection highlight */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, white 0%, transparent 50%, white 100%)",
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
            {/* Password input container with Framer Motion interactive corners */}
            <div className="relative w-full group">
              {/* Background fill */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: "rgba(10, 12, 9, 0.72)" }}
              />

              {/* Tactical Inner Dotted Border Frame */}
              <div 
                className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border border-dotted border-[#24291F] group-focus-within:border-[#3A4034]/70 transition-colors duration-300 pointer-events-none z-10" 
              />

              {/* Corner welded rivets */}
              <motion.span 
                className="absolute top-[6px] left-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isFocused ? "#8E9B72" : "#24291F" }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute top-[6px] right-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isFocused ? "#8E9B72" : "#24291F" }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute bottom-[6.5px] left-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isFocused ? "#8E9B72" : "#24291F" }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute bottom-[6.5px] right-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isFocused ? "#8E9B72" : "#24291F" }}
                transition={{ duration: 0.3 }}
              />

              {/* HUD Targeting notch crosshairs on side borders */}
              <motion.span
                className="absolute left-[-2px] top-1/2 -translate-y-1/2 text-[8px] font-bold select-none pointer-events-none z-20"
                animate={{ color: isFocused ? "#8E9B72" : "#3A4034" }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
              <motion.span
                className="absolute right-[-2.5px] top-1/2 -translate-y-1/2 text-[8px] font-bold select-none pointer-events-none z-20"
                animate={{ color: isFocused ? "#8E9B72" : "#3A4034" }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>

              {/* Animated Corner Unicode Glyphs */}
              <motion.span
                className="absolute -top-[5.5px] -left-[1px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isFocused ? "#8E9B72" : "#3A4034",
                  scale: isFocused ? 1.05 : 1,
                  x: isFocused ? 0.5 : 0,
                  y: isFocused ? 0.5 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                ┌
              </motion.span>
              <motion.span
                className="absolute -top-[5.5px] -right-[1.5px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isFocused ? "#8E9B72" : "#3A4034",
                  scale: isFocused ? 1.05 : 1,
                  x: isFocused ? -0.5 : 0,
                  y: isFocused ? 0.5 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                ┐
              </motion.span>
              <motion.span
                className="absolute -bottom-[7.5px] -left-[1px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isFocused ? "#8E9B72" : "#3A4034",
                  scale: isFocused ? 1.05 : 1,
                  x: isFocused ? 0.5 : 0,
                  y: isFocused ? -0.5 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                └
              </motion.span>
              <motion.span
                className="absolute -bottom-[7.5px] -right-[1.5px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isFocused ? "#8E9B72" : "#3A4034",
                  scale: isFocused ? 1.05 : 1,
                  x: isFocused ? -0.5 : 0,
                  y: isFocused ? -0.5 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                ┘
              </motion.span>

              {/* Animated Mechanical Border Lines */}
              <motion.div
                className="absolute top-0 left-[6px] right-[6px] h-[1px] z-10 origin-center"
                animate={{
                  scaleX: isFocused ? 1 : 0.95,
                  backgroundColor: isFocused ? "#8E9B72" : "#3A4034",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute bottom-0 left-[6px] right-[6px] h-[1px] z-10 origin-center"
                animate={{
                  scaleX: isFocused ? 1 : 0.95,
                  backgroundColor: isFocused ? "#8E9B72" : "#3A4034",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute left-0 top-[6px] bottom-[6px] w-[1px] z-10 origin-center"
                animate={{
                  scaleY: isFocused ? 1 : 0.9,
                  backgroundColor: isFocused ? "#8E9B72" : "#3A4034",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute right-0 top-[6px] bottom-[6px] w-[1px] z-10 origin-center"
                animate={{
                  scaleY: isFocused ? 1 : 0.9,
                  backgroundColor: isFocused ? "#8E9B72" : "#3A4034",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              {/* Custom Spring-Animated Passcode Display with Caret Tracking */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none z-20 select-none">
                {/* Empty & focused state: Blinking cursor in the center */}
                {passcode.length === 0 && isFocused && (
                  <span className="w-1.5 h-3 bg-[#8E9B72] cursor-blink" />
                )}

                {/* Empty & unfocused state: Muted asterisks placeholder */}
                {passcode.length === 0 && !isFocused && (
                  <span className="text-[11px] font-mono text-[#5E6255] tracking-[0.25em] pl-[0.25em]">
                    ********
                  </span>
                )}

                {/* Characters present: Render each char (masked or visible) with relative caret position */}
                {passcode.length > 0 && (
                  <div className="flex items-center justify-center font-mono text-[12px] text-[#D4D5C8] tracking-normal select-none">
                    <AnimatePresence initial={false}>
                      {passcode.split("").map((char, idx) => {
                        const displayChar = showPasscode ? char : "*";
                        return (
                          <div
                            key={idx}
                            className="relative flex items-center justify-center w-[11px] h-5"
                          >
                            {/* Blinking vertical cursor line before this character if selectionIndex === idx and focused */}
                            {isFocused && selectionIndex === idx && (
                              <span className="absolute left-0 w-[1.5px] h-3.5 bg-[#8E9B72] cursor-blink" />
                            )}

                            {/* The spring-animated masked character */}
                            <motion.span
                              initial={{ scale: 0, opacity: 0, y: 3 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0, opacity: 0, y: -3 }}
                              transition={{
                                type: "spring",
                                stiffness: 450,
                                damping: 22,
                              }}
                              className="absolute leading-none"
                            >
                              {displayChar}
                            </motion.span>

                            {/* Blinking vertical cursor line after the last character if selectionIndex === passcode.length and idx === passcode.length - 1 and focused */}
                            {isFocused &&
                              selectionIndex === passcode.length &&
                              idx === passcode.length - 1 && (
                                <span className="absolute right-0 w-[1.5px] h-3.5 bg-[#8E9B72] cursor-blink" />
                              )}
                          </div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Toggle visibility eye button */}
              {passcode.length > 0 && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73786B] hover:text-[#D4D5C8] active:text-[#8E9B72] transition-colors focus:outline-none z-40 p-1 cursor-pointer"
                >
                  {showPasscode ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* The functional invisible input */}
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setSelectionIndex(e.target.selectionStart);
                }}
                onFocus={(e) => {
                  setIsFocused(true);
                  setSelectionIndex(e.target.selectionStart);
                }}
                onBlur={() => setIsFocused(false)}
                onSelect={(e) => {
                  setSelectionIndex(e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  setSelectionIndex(e.target.selectionStart);
                }}
                onMouseDown={(e) => {
                  setTimeout(() => {
                    setSelectionIndex(e.target.selectionStart);
                  }, 10);
                }}
                className="w-full bg-transparent border-none outline-none rounded-none pl-10 pr-10 py-3 text-[15px] font-mono text-transparent text-center tracking-[4.5px] select-all caret-transparent relative z-30 cursor-text selection:bg-[#8E9B72]/30 selection:text-transparent"
                disabled={authStatus !== "idle"}
                autoFocus
              />
            </div>

            {/* Authorize Access submit button with mechanical tactical styling */}
            <div className="relative w-3/4 self-center group/btn">
              {/* Background fill */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  backgroundColor: authStatus !== "idle"
                    ? "#1A1E16"
                    : isBtnPressed 
                    ? "#8E9B72" 
                    : isBtnHovered 
                    ? "#252B20" 
                    : "#1A1E16"
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Tactical Inner Dotted Border Frame */}
              <motion.div 
                className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border border-dotted pointer-events-none z-10"
                animate={{
                  borderColor: isBtnPressed ? "rgba(10, 12, 9, 0.4)" : isBtnHovered ? "#737B65" : "#4A5042"
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Welded Corner Rivets */}
              <motion.span 
                className="absolute top-[6px] left-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="absolute top-[6px] right-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="absolute bottom-[6.5px] left-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="absolute bottom-[6.5px] right-[6px] w-[2.5px] h-[2.5px] rounded-full z-20 pointer-events-none"
                animate={{ backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              />

              {/* HUD Targeting notch crosshairs on side borders */}
              <motion.span
                className="absolute left-[-2px] top-1/2 -translate-y-1/2 text-[8px] font-bold select-none pointer-events-none z-20"
                animate={{ color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
              <motion.span
                className="absolute right-[-2.5px] top-1/2 -translate-y-1/2 text-[8px] font-bold select-none pointer-events-none z-20"
                animate={{ color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042" }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>

              {/* Animated Corner Unicode Glyphs */}
              <motion.span
                className="absolute -top-[5.5px] -left-[1px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042",
                  scale: isBtnHovered ? 1.05 : 1,
                  x: isBtnHovered ? 0.5 : 0,
                  y: isBtnHovered ? 0.5 : 0
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >┌</motion.span>
              <motion.span
                className="absolute -top-[5.5px] -right-[1.5px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042",
                  scale: isBtnHovered ? 1.05 : 1,
                  x: isBtnHovered ? -0.5 : 0,
                  y: isBtnHovered ? 0.5 : 0
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >┐</motion.span>
              <motion.span
                className="absolute -bottom-[7.5px] -left-[1px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042",
                  scale: isBtnHovered ? 1.05 : 1,
                  x: isBtnHovered ? 0.5 : 0,
                  y: isBtnHovered ? -0.5 : 0
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >└</motion.span>
              <motion.span
                className="absolute -bottom-[7.5px] -right-[1.5px] text-[10px] font-mono font-bold leading-none select-none pointer-events-none z-20"
                animate={{
                  color: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042",
                  scale: isBtnHovered ? 1.05 : 1,
                  x: isBtnHovered ? -0.5 : 0,
                  y: isBtnHovered ? -0.5 : 0
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >┘</motion.span>

              {/* Animated Mechanical Border Lines */}
              <motion.div
                className="absolute top-0 left-[6px] right-[6px] h-[1px] z-10 origin-center"
                animate={{
                  scaleX: isBtnHovered ? 1 : 0.95,
                  backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute bottom-0 left-[6px] right-[6px] h-[1px] z-10 origin-center"
                animate={{
                  scaleX: isBtnHovered ? 1 : 0.95,
                  backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute left-0 top-[6px] bottom-[6px] w-[1px] z-10 origin-center"
                animate={{
                  scaleY: isBtnHovered ? 1 : 0.90,
                  backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute right-0 top-[6px] bottom-[6px] w-[1px] z-10 origin-center"
                animate={{
                  scaleY: isBtnHovered ? 1 : 0.90,
                  backgroundColor: isBtnPressed ? "#0A0C09" : isBtnHovered ? "#737B65" : "#4A5042"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              <button
                type="submit"
                disabled={authStatus !== "idle"}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => {
                  setIsBtnHovered(false);
                  setIsBtnPressed(false);
                }}
                onMouseDown={() => setIsBtnPressed(true)}
                onMouseUp={() => setIsBtnPressed(false)}
                className="w-full relative bg-transparent border-none text-[#C9CBC0] rounded-none py-2.5 text-[10px] tracking-[0.25em] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase z-20 focus:outline-none flex items-center justify-center cursor-pointer select-none"
              >
                <motion.span
                  animate={{
                    color: authStatus !== "idle"
                      ? "#C9CBC0"
                      : isBtnPressed
                      ? "#0A0C09"
                      : isBtnHovered
                      ? "#E8EDF7"
                      : "#C9CBC0"
                  }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center gap-2"
                >
                  {authStatus === "idle" ? (
                    "AUTHENTICATE"
                  ) : (
                    <>
                      <svg
                        className="animate-spin h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      VERIFYING...
                    </>
                  )}
                </motion.span>
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
            SECURED <span className="text-[#22C55E]">•</span> ENCRYPTED{" "}
            <span className="text-[#73786B]/40">•</span> ACTIVE
          </span>
        </div>
      </div>

      {/* Footer Branding section */}
      <div className="w-full flex flex-col items-center gap-2 pb-2 relative z-20 select-none">
        <div className="flex justify-center items-center gap-1.5 select-none h-4">
          {"KAVACH".split("").map((letter, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0.1, y: 3 }}
              animate={{
                opacity: [0.25, 0.45, 0.25],
                y: 0,
              }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: idx * 0.35,
                },
                y: {
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: idx * 0.1,
                },
              }}
              className="text-md font-bold text-[#B6B8AA] font-mono leading-none pl-[0.1em]"
              style={{ textShadow: "0 0 8px rgba(182, 184, 170, 0.1)" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="text-[8px] tracking-[0.25em] text-[#5E6255] font-bold uppercase select-none">
          SECURE OPERATING ENVIRONMENT
        </div>
      </div>
    </div>
  );
}
