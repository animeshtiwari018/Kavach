"use client";

import { useState, useEffect, useRef } from "react";
import Preloader from "@/componants/preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState([
    { id: 1, text: "Hardware Self-Test", typeSpeed: 25, showOk: true, typed: "", status: "waiting" },
    { id: 2, text: "Powering on...", typeSpeed: 30, showOk: true, typed: "", status: "waiting" },
    { id: 3, text: "Checking memory integrity...", typeSpeed: 20, showOk: true, typed: "", status: "waiting" },
    { id: 4, text: "Verifying secure boot signature...", typeSpeed: 25, showOk: true, typed: "", status: "waiting" },
    { id: 5, text: "Loading environment shell...", typeSpeed: 30, showOk: true, typed: "", status: "waiting" },
  ]);

  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [systemTime, setSystemTime] = useState("");
  const [showFinishedPrompt, setShowFinishedPrompt] = useState(false);
  const [systemUptime, setSystemUptime] = useState("00:00:00");
  const terminalEndRef = useRef(null);

  // Scroll to bottom of terminal on lines updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, showFinishedPrompt]);

  // Update clock & uptime
  useEffect(() => {
    const bootTime = Date.now();
    const updateStats = () => {
      const now = new Date();
      // Date-Time string formatting
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setSystemTime(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

      // Uptime calculations
      const diffMs = Date.now() - bootTime;
      const diffSecs = Math.floor(diffMs / 1000) % 60;
      const diffMins = Math.floor(diffMs / (1000 * 60)) % 60;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      setSystemUptime(
        `${String(diffHours).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`
      );
    };

    updateStats();
    const timer = setInterval(updateStats, 1000);
    return () => clearInterval(timer);
  }, [activeLineIndex]);

  // Sequential typing sequence
  const runBootSequence = async () => {
    setShowFinishedPrompt(false);
    setActiveLineIndex(0);

    // Initialize all lines back to waiting state
    setLines(prev =>
      prev.map(line => ({
        ...line,
        typed: "",
        status: "waiting"
      }))
    );

    // Initial short pause before terminal activity
    await new Promise(r => setTimeout(r, 600));

    for (let i = 0; i < lines.length; i++) {
      setActiveLineIndex(i);
      
      // Update state to typing
      setLines(prev =>
        prev.map((line, idx) => (idx === i ? { ...line, status: "typing" } : line))
      );

      const targetText = lines[i].text;
      let currentTyped = "";

      for (let charIdx = 0; charIdx < targetText.length; charIdx++) {
        currentTyped += targetText[charIdx];
        // Must update state functional form because loop is closure-bound
        setLines(prev =>
          prev.map((line, idx) => (idx === i ? { ...line, typed: currentTyped } : line))
        );
        await new Promise(r => setTimeout(r, lines[i].typeSpeed));
      }

      // Settle the typing glow
      setLines(prev =>
        prev.map((line, idx) => (idx === i ? { ...line, status: "settled" } : line))
      );
      await new Promise(r => setTimeout(r, 250));

      // Resolve the [ OK ] status indicator
      if (lines[i].showOk) {
        setLines(prev =>
          prev.map((line, idx) => (idx === i ? { ...line, status: "done" } : line))
        );
        await new Promise(r => setTimeout(r, 400));
      }
    }

    setActiveLineIndex(-1);
    setShowFinishedPrompt(true);
  };

  useEffect(() => {
    if (!isLoading) {
      runBootSequence();
    }
  }, [isLoading]);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="font-terminal bg-[#000000] text-[#00ff00] h-screen w-screen relative overflow-hidden select-none flex flex-col p-4 md:p-8">
      {/* CRT Overlay elements */}
      <div className="scanline-overlay" />
      <div className="scanline-bar" />
      <div className="crt-vignette" />

      {/* Screen container with flicker and subtle jitter */}
      <div className="crt-flicker crt-jitter flex flex-col flex-1 z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#00ff00]/30 pb-2 mb-4 text-[11px] sm:text-xs">
          <div className="title-glow font-bold tracking-wider">
            KAVACH SECURITY SYSTEMS [v4.89-SECURE]
          </div>
          <div className="flex items-center gap-4 mt-1 sm:mt-0 opacity-80">
            <div>UPTIME: {systemUptime}</div>
            <div>SYS_TIME: {systemTime || "2026-08-23 22:05:37"}</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
              <span>LINK_ACTIVE</span>
            </div>
          </div>
        </div>

        {/* ASCII Header Banner */}
        <div className="text-[#00ff00]/80 text-[1.8vw] sm:text-[9px] md:text-xs leading-none whitespace-pre select-none font-bold mb-4 font-mono">
          {"\n"}
          {"   _  __ ___ __   __ ___  ___  _  _ \n"}
          {"  | |/ //   \\\\ \\ / //   \\/ __|| || |\n"}
          {"  | ' < | - | \\ V / | - || (__| __ |\n"}
          {"  |_|\\_\\|_|_|  \\_/  |_|_|\\___||_||_|\n"}
          {"\n"}
          <span className="text-[10px] sm:text-xs opacity-60">
            CENTRAL SYSTEM DIAGNOSTICS & THREAT SHIELD ENGINE
          </span>
        </div>

        {/* Diagnostic Metadata */}
        <div className="text-[10px] sm:text-xs text-[#00ff00]/60 space-y-1 mb-6 border-b border-[#00ff00]/10 pb-4">
          <div>DEVICE ID: KAVACH-NODE-0775B</div>
          <div>CORE INTEGRITY SHA256: 0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</div>
          <div>MEM_POOL: 65,536 MB (SECURE_HEAP) // VIRTUAL_SWAP: 131,072 MB</div>
          <div>FIREWALL PROTOCOL: ACTIVE [LAYER-7 INTRUSION BLOCK]</div>
        </div>

        {/* Boot Sequential Loading Logs */}
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs sm:text-sm max-w-full">
          {lines.map((line, index) => {
            const isTyping = line.status === "typing";
            const isWaiting = line.status === "waiting";
            const isSettled = line.status === "settled";
            const isDone = line.status === "done";
            
            // If waiting, don't show the line content
            if (isWaiting) return null;

            return (
              <div key={line.id} className="flex items-start flex-wrap gap-x-2">
                <span className="text-[#00ff00]/40 select-none">
                  [{(index + 1).toString().padStart(2, "0")}]
                </span>
                
                {/* Character sequence and typing shadow effects */}
                <span 
                  className={
                    isTyping 
                      ? "chromatic-typing font-bold" 
                      : "settled-glow"
                  }
                >
                  {line.typed}
                </span>

                {/* Cursor indicator for the line actively typing */}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-[#00ff00] cursor-blink shadow-[0_0_8px_#00ff00]" />
                )}

                {/* Settle OK indicator */}
                {(isSettled || isDone) && line.showOk && (
                  <span className="opacity-0 animate-[fadeIn_0.2s_ease-out_forwards] font-bold text-[#00ff00] settled-glow ml-auto sm:ml-0">
                    ... [ <span className="animate-pulse">OK</span> ]
                  </span>
                )}
              </div>
            );
          })}

          {/* Prompt displaying after completion */}
          {showFinishedPrompt && (
            <div className="space-y-4 pt-4 border-t border-[#00ff00]/10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] w-full">
              <div className="text-[#00ff00] settled-glow font-bold animate-pulse text-xs sm:text-sm">
                +++ BOOT SEQUENCE COMPLETED. SECURE LAYER ESTABLISHED. +++
              </div>
              
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="text-[#00ff00]/50">KAVACH@SECURE_NODE:~#</span>
                <span className="text-[#00ff00]">system_status --detailed</span>
                <span className="inline-block w-2.5 h-4.5 bg-[#00ff00] cursor-blink shadow-[0_0_8px_#00ff00]" />
              </div>

              {/* Functional Cyber-Security Command Action Panel */}
              <div className="bg-[#00ff00]/5 border border-[#00ff00]/20 rounded p-3 mt-4 max-w-lg space-y-2">
                <div className="text-[11px] sm:text-xs text-[#00ff00]/50 uppercase tracking-wide">
                  System Operator Diagnostics:
                </div>
                <div className="text-[10px] sm:text-xs text-[#00ff00]/80">
                  Authentication protocol approved by SKM. Secure sandbox integrity verified.
                </div>
                <div className="pt-2">
                  <button 
                    onClick={runBootSequence}
                    className="text-xs font-bold px-3 py-1.5 border border-[#00ff00] rounded bg-transparent hover:bg-[#00ff00]/10 hover:shadow-[0_0_12px_rgba(0,255,0,0.4)] active:bg-[#00ff00]/20 transition-all duration-200 cursor-pointer pointer-events-auto"
                  >
                    &gt; REBOOT_SEQUENCE_SIMULATION
                  </button>
                </div>
              </div>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Brand Marker footer */}
        <div className="flex justify-between items-center text-[10px] opacity-75 border-t border-[#00ff00]/20 pt-2 mt-4">
          <div className="flex gap-4">
            <span>SECURE SYSTEM</span>
            <span>SECURE-BOOT: ON</span>
          </div>
          <div className="font-bold tracking-widest text-[#00ff00] title-glow">
            SYS_OP: SKM
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
