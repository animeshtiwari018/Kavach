"use client";

import { useState, useEffect } from "react";

export default function LockScreen() {
  const [passcode, setPasscode] = useState("");
  const [authStatus, setAuthStatus] = useState("idle"); // idle, verifying, denied, success
  const [accessLevel, setAccessLevel] = useState("none"); // none, visitor, admin
  const [time, setTime] = useState("");
  
  // Terminal state for desktop
  const [terminalHistory, setTerminalHistory] = useState([
    "System initialized.",
    "Awaiting commands...",
  ]);
  const [cmdInput, setCmdInput] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${now.getUTCHours().toString().padStart(2, "0")}:${now
          .getUTCMinutes()
          .toString()
          .padStart(2, "0")}:${now
          .getUTCSeconds()
          .toString()
          .padStart(2, "0")} ZULU`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = (isGuestOverride = false) => {
    if (authStatus !== "idle" && authStatus !== "denied") return;
    
    setAuthStatus("verifying");
    
    setTimeout(() => {
      if (isGuestOverride) {
        setAuthStatus("denied");
        setTimeout(() => {
          setAccessLevel("visitor");
          setAuthStatus("success");
        }, 1500);
      } else {
        const code = passcode.trim().toUpperCase();
        if (code === "COMMANDER" || code === "ADMIN") {
          setAuthStatus("success");
          setTimeout(() => {
            setAccessLevel("admin");
          }, 1000);
        } else {
          setAuthStatus("denied");
          setTimeout(() => {
            setAccessLevel("visitor");
            setAuthStatus("success");
          }, 1500);
        }
      }
    }, 1200);
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    
    const newHistory = [...terminalHistory, `> ${cmdInput}`];
    const cmd = cmdInput.trim().toLowerCase();
    
    if (accessLevel === "visitor") {
      if (["help", "projects", "contact", "clear"].includes(cmd)) {
        if (cmd === "clear") {
          setTerminalHistory([]);
        } else if (cmd === "help") {
          newHistory.push("Available commands: help, projects, contact, clear");
        } else {
          newHistory.push(`Executing ${cmd}... [DATA REDACTED]`);
        }
      } else {
        newHistory.push("[ACCESS DENIED: LEVEL-1 CLEARANCE INSUFFICIENT]");
      }
    } else if (accessLevel === "admin") {
      if (cmd === "clear") {
        setTerminalHistory([]);
      } else {
        newHistory.push(`[SUDO] Executing ${cmd}... SUCCESS`);
      }
    }
    
    if (cmd !== "clear") {
      setTerminalHistory(newHistory);
    }
    setCmdInput("");
  };

  if (accessLevel !== "none" && authStatus === "success") {
    // Desktop View
    const isVisitor = accessLevel === "visitor";
    return (
      <div className="min-h-screen bg-military-black text-military-white font-fira relative overflow-hidden flex flex-col p-6 selection:bg-military-green selection:text-military-black">
        {/* Environmental Overlays */}
        <div className="scanline-overlay"></div>
        <div className="scanline-bar"></div>
        <div className="crt-vignette"></div>

        {/* Header Badge */}
        <div className="z-10 flex justify-between items-start mb-8 border-b border-military-white/20 pb-4">
          <div className="flex flex-col">
            <h1 className="font-rajdhani text-2xl font-bold tracking-widest uppercase">
              Kavach OS
            </h1>
            <div className={`mt-2 px-3 py-1 text-sm border inline-block w-fit font-bold tracking-wider ${isVisitor ? 'border-military-amber text-military-amber' : 'border-military-green text-military-green'}`}>
              {isVisitor ? '[CLEARANCE: VISITOR / LEVEL 1]' : '[CLEARANCE: COMMANDER / CLASS ALPHA]'}
            </div>
          </div>
          <div className="text-right font-rajdhani text-military-white/60">
            <p>USER STATUS: ACTIVE</p>
            <p className="mt-1">{time}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Area */}
          <div className="border border-military-white/20 p-6 relative group bg-black/40">
            {/* Stencil Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-military-white/50 -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-military-white/50 translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-military-white/50 -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-military-white/50 translate-x-1 translate-y-1"></div>

            <h2 className="font-rajdhani text-xl border-b border-military-white/20 pb-2 mb-4">
              {isVisitor ? 'PUBLIC DOSSIER' : 'CLASSIFIED DOSSIERS'}
            </h2>
            <div className="space-y-4 text-sm text-military-white/80">
              {isVisitor ? (
                <>
                  <p>Welcome, Guest. Access to core systems is restricted.</p>
                  <ul className="list-disc pl-5 space-y-2 text-military-white/60">
                    <li>Basic bio available.</li>
                    <li>Public project arsenal viewable.</li>
                    <li>Standard comms channels open.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-military-green">Welcome back, Commander. All systems unlocked.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Secret laboratory builds online.</li>
                    <li>Full tactical diagnostics available.</li>
                    <li>System override ready.</li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Terminal Area */}
          <div className="border border-military-white/20 p-6 relative flex flex-col bg-black/40 h-[400px]">
            {/* Stencil Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-military-white/50 -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-military-white/50 translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-military-white/50 -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-military-white/50 translate-x-1 translate-y-1"></div>

            <div className="flex-1 overflow-y-auto font-fira text-xs space-y-1 mb-4 scrollbar-hide">
              {terminalHistory.map((line, i) => (
                <div key={i} className={line.includes('DENIED') ? 'text-red-500' : line.includes('SUCCESS') ? 'text-military-green' : 'text-military-white/80'}>{line}</div>
              ))}
            </div>
            
            <form onSubmit={handleTerminalCommand} className="flex border-t border-military-white/20 pt-3">
              <span className="mr-2 text-military-white/50">{'>'}</span>
              <input 
                type="text" 
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-military-white font-fira text-sm uppercase placeholder-military-white/20"
                placeholder="ENTER COMMAND..."
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 right-6 opacity-20 font-rajdhani font-bold text-xl uppercase pointer-events-none tracking-widest z-0">
          {isVisitor ? 'GUEST SESSION // READ-ONLY' : 'COMMAND OVERRIDE ACTIVE // UNRESTRICTED'}
        </div>
      </div>
    );
  }

  // Lock Screen View
  return (
    <div className="min-h-screen bg-military-black text-military-white font-fira relative overflow-hidden flex flex-col selection:bg-military-white selection:text-military-black">
      {/* Environmental Overlays */}
      <div className="scanline-overlay"></div>
      <div className="scanline-bar"></div>
      <div className="crt-vignette"></div>

      {/* Header Bar */}
      <div className="w-full flex justify-between items-center p-4 border-b border-military-white/20 font-rajdhani z-10 text-sm tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-military-green rounded-full animate-pulse"></div>
          <span>DEFCON 3 // SYSTEM SECURE</span>
        </div>
        <div className="flex gap-6 text-military-white/60">
          <span className="hidden sm:inline-block">26.9124° N, 75.7873° E</span>
          <span>{time}</span>
        </div>
      </div>

      {/* Center Authentication Terminal */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="relative border border-military-white/30 bg-military-black p-8 w-full max-w-md shadow-2xl backdrop-blur-sm">
          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 text-military-white/60 font-bold leading-none text-xl">[</div>
          <div className="absolute -top-1 -right-1 text-military-white/60 font-bold leading-none text-xl">]</div>
          <div className="absolute -bottom-1 -left-1 text-military-white/60 font-bold leading-none text-xl">[</div>
          <div className="absolute -bottom-1 -right-1 text-military-white/60 font-bold leading-none text-xl">]</div>

          {/* Crosshairs */}
          <div className="absolute top-1/2 -left-3 w-6 h-[1px] bg-military-white/30"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-[1px] bg-military-white/30"></div>
          <div className="absolute -top-3 left-1/2 w-[1px] h-6 bg-military-white/30"></div>
          <div className="absolute -bottom-3 left-1/2 w-[1px] h-6 bg-military-white/30"></div>

          <div className="flex flex-col items-center">
            {/* System Header */}
            <h2 className="font-rajdhani text-center font-bold text-lg tracking-widest border-b border-military-white/20 pb-3 w-full mb-6 text-military-white/80 uppercase">
              RESTRICTED ACCESS <br/> <span className="text-sm opacity-70">// AUTHORIZED PERSONNEL ONLY</span>
            </h2>

            {/* Badge/Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-military-white/80 mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>

            {/* Status Messages */}
            <div className="h-6 w-full mb-4 text-center text-xs font-bold tracking-wider">
              {authStatus === "verifying" && (
                <span className="text-military-amber animate-pulse">[VERIFYING CREDENTIALS...]</span>
              )}
              {authStatus === "denied" && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-red-500 font-bold animate-pulse">[CLEARANCE DENIED: UNKNOWN PASSCODE]</span>
                  <span className="text-military-white/60 text-[10px] mt-1">[INITIATING GUEST OVERRIDE PROTOCOL...]</span>
                </div>
              )}
              {authStatus === "success" && (
                <span className="text-military-green title-glow">
                  {accessLevel === "admin" ? "[PASSCODE ACCEPTED: CLASS-ALPHA COMMANDER]" : "[SUCCESS: LEVEL-1 GUEST CLEARANCE GRANTED]"}
                </span>
              )}
            </div>

            {/* Input Field */}
            <div className="w-full relative group mb-6">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate(false)}
                disabled={authStatus !== "idle"}
                className="w-full bg-transparent border border-military-white/30 outline-none text-center px-4 py-3 text-military-white placeholder-military-white/20 font-fira tracking-widest focus:border-military-white transition-colors uppercase disabled:opacity-50"
                placeholder="ENTER PASSCODE..."
              />
              {/* Blinking Cursor Simulation (visible only when empty and not focused, or just CSS based) */}
              {!passcode && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-military-white/40 cursor-blink pointer-events-none"></div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full font-rajdhani tracking-widest font-bold">
              <button
                onClick={() => handleAuthenticate(false)}
                disabled={authStatus !== "idle"}
                className="w-full py-2 border border-military-white hover:bg-military-white hover:text-military-black transition-all uppercase disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-military-white"
              >
                [AUTHENTICATE]
              </button>
              <button
                onClick={() => handleAuthenticate(true)}
                disabled={authStatus !== "idle"}
                className="w-full py-2 border border-military-white/20 text-military-white/60 hover:border-military-amber hover:text-military-amber transition-all uppercase disabled:opacity-50"
              >
                [INITIATE GUEST OVERRIDE]
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="p-4 text-center z-10 text-[10px] sm:text-xs text-military-white/40 tracking-wider font-rajdhani pb-6">
        <p>Enter passcode <span className="text-military-white/60">COMMANDER</span> or <span className="text-military-white/60">ADMIN</span> for Class-Alpha access.</p>
        <p>Any other key defaults to Level-1 Guest mode.</p>
      </div>
    </div>
  );
}
