"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Window from "../window";
import TerminalApp from "../apps/terminal";
import BrowserApp from "../apps/browser";
import SettingsApp from "../apps/settings";

export default function Homepage() {
  const desktopRef = useRef(null);
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");

  // Window list state
  const [apps, setApps] = useState([
    {
      id: "terminal",
      title: "Terminal Console",
      isOpen: true, // Default open Terminal for better interactive first look
      isMinimized: false,
      zIndex: 10,
      defaultX: 80,
      defaultY: 60,
      defaultWidth: 520,
      defaultHeight: 350,
      icon: "[_]",
      iconName: "Terminal",
      component: <TerminalApp />,
    },
    {
      id: "browser",
      title: "Web Browser",
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      defaultX: 140,
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
      defaultX: 200,
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

  // Dynamic system clock
  useEffect(() => {
    const updateClock = () => {
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
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
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
      // Set focus to the next open window, if any
      const openApps = apps.filter((a) => a.isOpen && a.id !== id);
      if (openApps.length > 0) {
        // Find open app with highest z-index
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
    // Move focus to next top open app
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
      // Open and focus
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isOpen: true, isMinimized: false } : a))
      );
      focusApp(id);
    } else if (app.isMinimized) {
      // Restore and focus
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isMinimized: false } : a))
      );
      focusApp(id);
    } else if (activeAppId === id) {
      // Minimize if already open and active
      minimizeApp(id);
    } else {
      // Focus if open but backgrounded
      focusApp(id);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-[#D4D5C8] font-mono selection:bg-[#8E9B72]/30 selection:text-transparent flex flex-col relative overflow-hidden select-none">
      
      {/* Top OS Menubar (Tactical Minimalist) */}
      <div className="h-9 w-full bg-[#0A0C09]/90 border-b border-[#3A4034] flex items-center justify-between px-4 z-50 text-[11px] tracking-wider relative backdrop-blur-md">
        {/* Left Side: System Control Menu */}
        <div className="flex items-center gap-4 text-[#73786B] font-semibold">
          <span className="text-[#8E9B72] text-[12px] font-bold cursor-pointer hover:text-white transition-colors">
            🛡️
          </span>
          <span className="text-white hover:text-white font-bold cursor-default">
            Kavach
          </span>
          <span className="hover:text-white cursor-default transition-colors">File</span>
          <span className="hover:text-white cursor-default transition-colors">Edit</span>
          <span className="hover:text-white cursor-default transition-colors">View</span>
          <span className="hover:text-white cursor-default transition-colors">Special</span>
        </div>

        {/* Center Title or Indicator */}
        <div className="hidden md:block text-[9px] text-[#5E6255] tracking-[0.3em] font-bold">
          // SECURE INTERCONNECT ACTIVE //
        </div>

        {/* Right Side: Status diagnostics, node identity & clock */}
        <div className="flex items-center gap-4 text-[#73786B] font-semibold select-none">
          <span className="text-[10px] text-[#5E6255] font-bold tracking-wide">
            NODE_01
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            SECURE
          </span>
          <span className="text-white">
            {dateStr.toUpperCase()} {time}
          </span>
        </div>
      </div>

      {/* Desktop Canvas Workspace Area */}
      <div
        ref={desktopRef}
        onClick={() => setActiveAppId(null)}
        className="flex-1 w-full relative p-4 flex items-center justify-center bg-black cursor-default"
        style={{ height: "calc(100vh - 36px - 70px)" }} // Remaining screen height
      >
        {/* Static Background Shield Watermark for Depth */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <svg className="w-96 h-96 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        {/* Render Active Windows with z-index ordering */}
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
      </div>

      {/* Floating macOS-like Bottom App Dock */}
      <div className="h-[70px] w-full flex items-center justify-center bg-transparent pointer-events-none z-50 select-none pb-3">
        <div className="flex items-end gap-4 px-6 py-2 rounded-2xl bg-[#121610]/75 border border-[#3A4034] shadow-2xl backdrop-blur-lg pointer-events-auto select-none relative transition-all duration-300">
          
          {apps.map((app) => {
            const isRunning = app.isOpen;
            const isFocused = activeAppId === app.id && isRunning && !app.isMinimized;

            return (
              <div key={app.id} className="flex flex-col items-center gap-1.5 relative">
                
                {/* macOS Magnify effect using Framer Motion */}
                <motion.button
                  onClick={() => toggleDockApp(app.id)}
                  whileHover={{ scale: 1.15, y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer border transition-colors relative font-mono text-[16px] shadow-lg ${
                    isFocused
                      ? "bg-[#252B20] border-[#8E9B72]"
                      : "bg-[#0A0C09]/90 border-[#3A4034] hover:bg-[#1A2016]/90 hover:border-[#5E6255]"
                  }`}
                  title={app.iconName}
                >
                  {app.icon}
                </motion.button>

                {/* Dock Running Indicator Dot (macOS style) */}
                <div className="h-1 w-full flex justify-center absolute -bottom-1">
                  {isRunning && (
                    <motion.span
                      layoutId={`running-dot-${app.id}`}
                      className={`h-1.5 w-1.5 rounded-full shadow ${
                        isFocused 
                          ? "bg-[#8E9B72] shadow-[#8E9B72]/50" 
                          : "bg-[#3A4034]"
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
