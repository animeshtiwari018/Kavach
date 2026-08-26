"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Window from "../window";
import TerminalApp from "../apps/terminal";
import BrowserApp from "../apps/browser";
import SettingsApp from "../apps/settings";
import Menubar from "../menubar";
import ControlCenter from "../control-center";

export default function Homepage({ onLogout }) {
  const desktopRef = useRef(null);
  const [time, setTime] = useState(new Date());

  // System states
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Window list state
  const [apps, setApps] = useState([
    {
      id: "terminal",
      title: "Terminal Console",
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
      defaultX: 60,
      defaultY: 60,
      defaultWidth: 520,
      defaultHeight: 350,
      icon: (
        <img
          src="/images/Terminal.png"
          alt="Terminal"
          className="w-14 h-14 object-contain select-none pointer-events-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      ),
      iconName: "Terminal",
      component: <TerminalApp />,
    },
    {
      id: "browser",
      title: "Web Browser",
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      defaultX: 120,
      defaultY: 100,
      defaultWidth: 600,
      defaultHeight: 400,
      icon: "🌐",
      iconName: "Browser",
      component: <BrowserApp />,
    },
    {
      id: "settings",
      title: "System Settings",
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      defaultX: 180,
      defaultY: 140,
      defaultWidth: 420,
      defaultHeight: 345,
      icon: "⚙️",
      iconName: "Settings",
      component: <SettingsApp />,
    },
  ]);

  const [activeAppId, setActiveAppId] = useState("terminal");
  const [topZIndex, setTopZIndex] = useState(10);

  // Dynamic system clock updating every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Show access granted notification on mount
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNotification(true);
    }, 400);

    const dismissTimer = setTimeout(() => {
      setShowNotification(false);
    }, 6400);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  // Set active focus on window click and raise its z-index
  const focusApp = (id) => {
    setActiveAppId(id);
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);

    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, zIndex: newZ, isMinimized: false } : app))
    );
  };

  const closeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isOpen: false } : app))
    );
    if (activeAppId === id) {
      const openApps = apps.filter((a) => a.isOpen && a.id !== id);
      if (openApps.length > 0) {
        const topApp = openApps.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        );
        setActiveAppId(topApp.id);
      } else {
        setActiveAppId(null);
      }
    }
  };

  const minimizeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isMinimized: true } : app))
    );
    const openApps = apps.filter((a) => a.isOpen && a.id !== id && !a.isMinimized);
    if (openApps.length > 0) {
      const topApp = openApps.reduce((prev, current) =>
        prev.zIndex > current.zIndex ? prev : current
      );
      setActiveAppId(topApp.id);
    } else {
      setActiveAppId(null);
    }
  };

  const toggleDockApp = (id) => {
    const app = apps.find((a) => a.id === id);

    if (!app.isOpen) {
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isOpen: true, isMinimized: false } : a))
      );
      focusApp(id);
    } else if (app.isMinimized) {
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isMinimized: false } : a))
      );
      focusApp(id);
    } else if (activeAppId === id) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  };

  const handleDesktopClick = () => {
    setActiveAppId(null);
    setIsControlCenterOpen(false);
  };

  // Keyboard shortcut for Spotlight (Cmd/Ctrl + Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSpotlightSearch = (e) => {
    e.preventDefault();
    const query = spotlightQuery.trim().toLowerCase();
    
    // Check if query matches any app icon name
    const foundApp = apps.find(a => a.iconName.toLowerCase() === query || a.title.toLowerCase().includes(query));
    if (foundApp) {
      toggleDockApp(foundApp.id);
      setIsSpotlightOpen(false);
      setSpotlightQuery("");
    }
  };

  // Get active window for the menubar indicator
  const activeWindow = apps.find((a) => a.id === activeAppId && a.isOpen && !a.isMinimized);

  return (
    <div 
      className={`min-h-screen w-full relative overflow-hidden flex flex-col select-none transition-colors duration-300 ${
        isDarkMode ? "bg-black text-[#D4D5C8]" : "bg-neutral-100 text-neutral-800"
      }`}
      onClick={handleDesktopClick}
    >
      {/* Top macOS Menubar */}
      <Menubar
        time={time}
        onLogout={onLogout}
        onSleep={() => setIsSleeping(true)}
        onShutdown={() => setIsShutdown(true)}
        onRestart={() => window.location.reload()}
        onSpotlightClick={(e) => {
          e.stopPropagation();
          setIsSpotlightOpen(!isSpotlightOpen);
        }}
        onControlCenterClick={(e) => {
          e.stopPropagation();
          setIsControlCenterOpen(!isControlCenterOpen);
        }}
        isDarkMode={isDarkMode}
        activeWindow={activeWindow}
      />

      {/* Control Center Panel */}
      {isControlCenterOpen && (
        <ControlCenter
          onClose={() => setIsControlCenterOpen(false)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          brightness={brightness}
          onBrightnessChange={(val) => setBrightness(val)}
        />
      )}

      {/* Spotlight Search Overlay Dialog */}
      <AnimatePresence>
        {isSpotlightOpen && (
          <div 
            className="fixed inset-0 bg-transparent z-[100] flex items-start justify-center pt-24"
            onClick={() => setIsSpotlightOpen(false)}
          >
            <motion.form
              onSubmit={handleSpotlightSearch}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-[450px] shadow-2xl rounded-lg p-3 border flex items-center gap-3 backdrop-blur-xl ${
                isDarkMode 
                  ? "bg-gray-900/90 border-gray-800/60 text-white" 
                  : "bg-white/95 border-gray-200 text-gray-800"
              }`}
            >
              <span className="text-lg opacity-60">🔍</span>
              <input
                type="text"
                placeholder="Spotlight Search (Type Terminal, Browser, Settings...)"
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-sans text-sm"
                autoFocus
              />
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* Security Access Granted Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className={`fixed top-12 right-6 z-[99] w-[320px] rounded-lg border p-4 shadow-2xl backdrop-blur-xl flex gap-3 items-start cursor-default select-none ${
              isDarkMode
                ? "bg-[#0b0c09]/90 border-[#8e9b72]/40 text-[#D4D5C8]"
                : "bg-white/95 border-[#7a7a96]/20 text-neutral-800"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Status Radar Pulse Indicator */}
            <div className="flex-shrink-0 mt-1 relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </div>

            {/* Notification content */}
            <div className="flex-1 min-w-0 font-mono">
              <div className="text-[10px] tracking-widest text-[#8e9b72]/95 font-bold uppercase mb-0.5">
                Security Alert
              </div>
              <h4 className="text-xs font-bold tracking-wide text-green-500 mb-1.5">
                VISITOR ACCESS GRANTED
              </h4>
              <div className="text-[11px] leading-relaxed opacity-95">
                <p className={`font-semibold ${isDarkMode ? "text-white/90" : "text-neutral-800"}`}>
                  Welcome to KAVACH.
                </p>
                <p className={`text-[10.5px] mt-0.5 ${isDarkMode ? "text-white/60" : "text-neutral-500"}`}>
                  Explore the system at your discretion.
                </p>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setShowNotification(false)}
              className="flex-shrink-0 text-current opacity-40 hover:opacity-100 transition-opacity cursor-pointer text-xs p-0.5"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Brightness Mask Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-[999] transition-opacity duration-300"
        style={{ opacity: Math.max(0, 0.95 - brightness / 100) }}
      />

      {/* System Sleep Mode Overlay */}
      {isSleeping && (
        <div 
          onClick={() => setIsSleeping(false)}
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <motion.span 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-mono text-[#5E6255] tracking-[0.3em]"
          >
            [ SYSTEM IN SLEEP CYCLE - CLICK TO WAKE ]
          </motion.span>
        </div>
      )}

      {/* System Power Off / Shutdown Mode Overlay */}
      {isShutdown && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-center p-6 select-none cursor-default font-mono">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="w-16 h-16 rounded-full border border-[#3A4034] flex items-center justify-center bg-[#0A0C09] hover:bg-[#121610] hover:border-[#8E9B72] transition-colors cursor-pointer group mb-4"
          >
            <span className="text-[#73786B] group-hover:text-[#8E9B72] text-xl font-bold">⏽</span>
          </motion.div>
          <span className="text-[10px] text-[#73786B] tracking-[0.3em] uppercase font-bold">
            Kavach System Shutdown - Click Power Icon to Boot
          </span>
        </div>
      )}

      {/* Main Desktop Canvas Workspace Area */}
      <main 
        ref={desktopRef}
        className="flex-1 w-full relative pt-[42px] flex items-center justify-center bg-transparent cursor-default"
        style={{ height: "calc(100vh - 36px - 70px)" }}
      >
        {/* Static Background Shield Watermark for Depth */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <svg className="w-96 h-96 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        {/* Dynamic Windows Rendering */}
        <AnimatePresence>
          {apps.map(
            (app) =>
              app.isOpen &&
              !app.isMinimized && (
                <Window
                  key={app.id}
                  title={app.title}
                  isOpen={app.isOpen}
                  isActive={activeAppId === app.id}
                  onClose={() => closeApp(app.id)}
                  onMinimize={() => minimizeApp(app.id)}
                  onFocus={() => focusApp(app.id)}
                  defaultWidth={app.defaultWidth}
                  defaultHeight={app.defaultHeight}
                  defaultX={app.defaultX}
                  defaultY={app.defaultY}
                  desktopRef={desktopRef}
                >
                  {app.component}
                </Window>
              )
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom App Dock */}
      <div className="h-[70px] w-full flex items-center justify-center bg-transparent pointer-events-none z-40 select-none pb-3">
        <div className={`flex items-end gap-4 px-6 py-2 rounded-2xl border shadow-2xl backdrop-blur-lg pointer-events-auto select-none relative transition-colors duration-300 ${
          isDarkMode 
            ? "bg-[#121610]/75 border-[#3A4034]/70" 
            : "bg-white/70 border-neutral-300"
        }`}>
          {apps.map((app) => {
            const isRunning = app.isOpen;
            const isFocused = activeAppId === app.id && isRunning && !app.isMinimized;

            return (
              <div key={app.id} className="flex flex-col items-center gap-1.5 relative">
                <motion.button
                  onClick={() => toggleDockApp(app.id)}
                  whileHover={{ scale: 1.15, y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={`flex items-center justify-center cursor-pointer transition-all duration-200 relative ${
                    app.id === "terminal"
                      ? "w-14 h-14"
                      : `w-11 h-11 rounded-xl border font-mono text-[16px] shadow-lg ${
                          isFocused
                            ? isDarkMode 
                              ? "bg-[#252B20] border-[#8E9B72]" 
                              : "bg-neutral-200 border-blue-500"
                            : isDarkMode
                              ? "bg-[#0A0C09]/90 border-[#3A4034]/80 hover:bg-[#1A2016]/90 hover:border-[#5E6255]"
                              : "bg-white border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
                        }`
                  }`}
                  title={app.iconName}
                >
                  {app.icon}
                </motion.button>

                {/* Dock Running Indicator Dot */}
                <div className="h-1 w-full flex justify-center absolute -bottom-1">
                  {isRunning && (
                    <motion.span
                      layoutId={`running-dot-${app.id}`}
                      className={`h-1.5 w-1.5 rounded-full shadow ${
                        isFocused 
                          ? isDarkMode 
                            ? "bg-[#8E9B72] shadow-[#8E9B72]/50" 
                            : "bg-blue-500 shadow-blue-500/50"
                          : "bg-neutral-400"
                      }`}
                      animate={{ scale: isFocused ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
