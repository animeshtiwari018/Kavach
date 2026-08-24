"use client";

import { useState, useEffect } from "react";

export default function LockScreen() {
  const [passcode, setPasscode] = useState("");
  const [authStatus, setAuthStatus] = useState("idle"); // idle, verifying, success
  const [accessLevel, setAccessLevel] = useState("none"); // none, visitor, admin
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [zuluTime, setZuluTime] = useState("");
  
  // Notification banner state
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Main Clock (10:22 PM)
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
      
      // Main Date (Monday, August 24)
      setDateStr(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
      
      // Zulu Time for Menu Bar
      setZuluTime(
        `${now.getUTCHours().toString().padStart(2, "0")}:${now
          .getUTCMinutes()
          .toString()
          .padStart(2, "0")} ZULU`
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
      if (code === "COMMANDER" || code === "ADMIN") {
        setAccessLevel("admin");
      } else {
        setAccessLevel("visitor");
      }
      setAuthStatus("success");
      
      // Trigger banner after unlock
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 5000); // hide banner after 5s
      }, 800);
      
    }, 1200);
  };

  const Icons = {
    Wifi: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    Battery: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <rect x="4" y="9" width="10" height="6" fill="currentColor" />
      </svg>
    ),
    Search: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    Shield: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Folder: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Terminal: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    User: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  };

  const isUnlocked = authStatus === "success";
  const isVisitor = accessLevel === "visitor";

  return (
    <div className="min-h-screen mac-wallpaper text-white font-sans relative overflow-hidden select-none">
      
      {/* Top Menu Bar */}
      <div className="glass-menu w-full h-8 px-4 flex justify-between items-center text-xs font-medium z-50 relative">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <Icons.Shield className="w-4 h-4 opacity-80" />
          <span className="tracking-wide opacity-90 font-semibold">INTELLIGENCE WORKSTATION</span>
          {isUnlocked && (
            <>
              <span className="mx-2 opacity-30">|</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">File</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">Edit</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">View</span>
              <span className="opacity-80 hover:opacity-100 cursor-pointer">System</span>
            </>
          )}
        </div>
        
        {/* Right Side */}
        <div className="flex items-center gap-4 opacity-90">
          <Icons.Wifi className="w-4 h-4" />
          <Icons.Battery className="w-5 h-5" />
          <Icons.Search className="w-4 h-4 ml-1" />
          <span className="font-semibold ml-2">{zuluTime}</span>
        </div>
      </div>

      {/* Lock Screen UI */}
      {!isUnlocked && (
        <div className={`absolute inset-0 flex flex-col items-center pt-24 transition-opacity duration-700 ${authStatus === "success" ? "opacity-0" : "opacity-100"}`}>
          
          {/* Center Header Clock */}
          <div className="flex flex-col items-center mb-16 shadow-black drop-shadow-lg">
            <h1 className="text-7xl font-bold tracking-tight mb-2">{time}</h1>
            <p className="text-xl font-medium opacity-90 tracking-wide">{dateStr}</p>
          </div>

          {/* User Profile Card */}
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-4 border border-white/20 shadow-2xl relative">
              <Icons.User className="w-10 h-10 opacity-70" />
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            </div>
            
            <h2 className="text-xl font-semibold mb-1 shadow-black drop-shadow-md">COMMANDER KAVACH</h2>
            <div className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full glass-panel border-white/10 mb-8 shadow-black drop-shadow-md text-white/70 uppercase">
              [Clearance: Level-4 Restricted]
            </div>

            {/* Authentication Form */}
            {authStatus === "idle" ? (
              <form onSubmit={handleUnlock} className="flex flex-col items-center w-64 gap-4 animate-fade-in">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode..."
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-center text-sm outline-none placeholder-white/40 focus:placeholder-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full glass-button rounded-xl py-2.5 text-sm font-medium tracking-wide flex justify-center items-center gap-2"
                >
                  Unlock
                </button>
              </form>
            ) : (
              /* Status Messages */
              <div className="h-24 flex flex-col items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <div className="text-sm font-medium opacity-80 tracking-wide text-center">
                  {accessLevel === "admin" || passcode.trim().toUpperCase() === "ADMIN" || passcode.trim().toUpperCase() === "COMMANDER" ? (
                    <span className="text-green-300 drop-shadow-md animate-subtle-pulse">[Clearance Confirmed: Welcome Commander]</span>
                  ) : (
                    <span className="text-white/70 drop-shadow-md">[Authenticating Guest Session...]</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Security Note */}
          <div className="absolute bottom-8 text-[11px] font-medium text-white/40 tracking-wider text-center w-full shadow-black drop-shadow-sm">
            Guest Access: Enter any passcode to enter as Visitor. Enter admin key for full clearance.
          </div>
        </div>
      )}

      {/* Desktop UI */}
      {isUnlocked && (
        <div className="absolute inset-0 pt-8 animate-fade-in flex flex-col pointer-events-auto">
          
          {/* Notification Banner */}
          {showBanner && (
            <div className="absolute top-4 right-4 z-50 animate-slide-down">
              <div className="glass-panel rounded-2xl p-4 w-80 shadow-2xl flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${isVisitor ? "bg-yellow-400" : "bg-green-400"} shadow-lg`}></div>
                <div>
                  <h4 className="text-sm font-bold mb-1 opacity-90">{isVisitor ? "Guest Session Active" : "Class-Alpha Clearance Granted"}</h4>
                  <p className="text-xs opacity-70 leading-relaxed">
                    {isVisitor ? "View-only mode enabled. System restrictions apply." : "System unlocked. All restricted directories are now accessible."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Icons / Apps */}
          <div className="flex-1 p-6 flex flex-col gap-6 items-start">
            
            {/* Standard Portfolio Apps */}
            <div className="flex flex-col items-center gap-1 group cursor-pointer w-24">
              <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/10 transition-colors">
                <Icons.User className="w-8 h-8 opacity-80" />
              </div>
              <span className="text-xs font-medium bg-black/30 px-2 py-0.5 rounded shadow-sm text-white/90">Dossier</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer w-24">
              <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/10 transition-colors">
                <Icons.Folder className="w-8 h-8 opacity-80" />
              </div>
              <span className="text-xs font-medium bg-black/30 px-2 py-0.5 rounded shadow-sm text-white/90">Arsenal</span>
            </div>

            {/* Classified Folders (Admin Only) */}
            {!isVisitor && (
              <>
                <div className="flex flex-col items-center gap-1 group cursor-pointer w-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center shadow-lg border-red-500/30 group-hover:bg-red-500/10 transition-colors relative">
                    <Icons.Shield className="w-8 h-8 text-red-400/80" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black/50"></div>
                  </div>
                  <span className="text-xs font-bold text-red-200 bg-black/40 px-2 py-0.5 rounded shadow-sm">Classified</span>
                </div>
                
                <div className="flex flex-col items-center gap-1 group cursor-pointer w-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/10 transition-colors">
                    <Icons.Terminal className="w-8 h-8 opacity-80" />
                  </div>
                  <span className="text-xs font-medium bg-black/30 px-2 py-0.5 rounded shadow-sm text-white/90">System Ctrl</span>
                </div>
              </>
            )}

          </div>

          {/* macOS Bottom Dock */}
          <div className="pb-4 w-full flex justify-center z-40">
            <div className="glass-panel rounded-3xl px-3 py-2 flex items-end gap-2 h-16 border-white/20 shadow-2xl shadow-black/50">
              
              <div className="dock-item w-12 h-12 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/20">
                <Icons.User className="w-6 h-6 opacity-80" />
              </div>
              
              <div className="dock-item w-12 h-12 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/20">
                <Icons.Folder className="w-6 h-6 opacity-80" />
              </div>
              
              <div className="dock-item w-12 h-12 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-80">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {!isVisitor && (
                <>
                  <div className="w-px h-8 bg-white/20 self-center mx-1"></div>
                  <div className="dock-item w-12 h-12 bg-red-500/10 rounded-2xl border border-red-500/30 flex items-center justify-center cursor-pointer shadow-lg hover:bg-red-500/20">
                    <Icons.Terminal className="w-6 h-6 text-red-400" />
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
