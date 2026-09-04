"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Window from "../window";
import TerminalApp from "../apps/terminal";
import BrowserApp from "../apps/browser";
import SettingsApp from "../apps/settings";
import Menubar from "../menubar";
import ControlCenter from "../control-center";
import Dock from "../dock";
import Launchpad from "../launchpad";
import FaceTimeApp from "../apps/facetime";
import NotesApp from "../apps/notes";
import GitHubApp from "../apps/github";
import SpotifyApp from "../apps/spotify";
import MissionArchiveApp from "../apps/mission-archive";
import SkillsApp from "../apps/skills";
import ServiceRecordApp from "../apps/service-record";
import SystemAnalysisApp from "../apps/system-analysis";
import ContactApp from "../apps/contact";
import DesktopWidgets from "../widgets";
import VaniAssistant from "./vani";

export default function Homepage({ onLogout }) {
  const desktopRef = useRef(null);
  const constraintsRef = useRef(null);
  const [time, setTime] = useState(new Date());

  // System states
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isVaniOpen, setIsVaniOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Window list state
  const [apps, setApps] = useState([
    {
      id: "notes",
      title: "Notes — About Me",
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
      defaultX: 100,
      defaultY: 60,
      defaultWidth: 780,
      defaultHeight: 520,
      icon: (
        <img
          src="/images/Para_Skull.svg"
          alt="About Me"
          loading="eager"
          fetchPriority="high"
          className="w-14 h-14 object-contain select-none pointer-events-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      ),
      iconName: "Notes",
    },
    {
      id: "terminal",
      title: "Terminal Console",
      isOpen: false,
      isMinimized: false,
      zIndex: 9,
      defaultX: 60,
      defaultY: 60,
      defaultWidth: 520,
      defaultHeight: 350,
      icon: (
        <img
          src="/images/Terminal.svg"
          alt="Terminal"
          loading="eager"
          fetchPriority="high"
          className="w-14 h-14 object-contain select-none pointer-events-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      ),
      iconName: "Terminal",
    },
    {
      id: "browser",
      title: "Web Browser",
      isOpen: false,
      isMinimized: false,
      zIndex: 8,
      defaultX: 120,
      defaultY: 100,
      defaultWidth: 720,
      defaultHeight: 480,
      icon: (
        <img
          src="/images/browser.svg"
          alt="Browser"
          loading="eager"
          fetchPriority="high"
          className="w-14 h-14 object-contain select-none pointer-events-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      ),
      iconName: "Browser",
    },
    {
      id: "settings",
      title: "System Settings",
      isOpen: false,
      isMinimized: false,
      zIndex: 7,
      defaultX: 180,
      defaultY: 140,
      defaultWidth: 780,
      defaultHeight: 520,
      icon: "⚙️",
      iconName: "Settings",
    },
  ]);

  const [activeAppId, setActiveAppId] = useState("notes");
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

  // Center initial preloaded apps on screen mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      const h = window.innerHeight - 110; // available desktop height

      setApps((prev) =>
        prev.map((app) => {
          const centeredX = Math.max(
            10,
            Math.floor((w - app.defaultWidth) / 2),
          );
          const centeredY = Math.max(
            10,
            Math.floor((h - app.defaultHeight) / 2),
          );

          return {
            ...app,
            defaultX: centeredX,
            defaultY: centeredY,
          };
        }),
      );
    }
  }, []);

  // Set active focus on window click and raise its z-index
  const focusApp = (id) => {
    setActiveAppId(id);
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);

    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, zIndex: newZ, isMinimized: false } : app,
      ),
    );
  };

  const closeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isOpen: false } : app)),
    );
    if (activeAppId === id) {
      const openApps = apps.filter((a) => a.isOpen && a.id !== id);
      if (openApps.length > 0) {
        const topApp = openApps.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current,
        );
        setActiveAppId(topApp.id);
      } else {
        setActiveAppId(null);
      }
    }
  };

  const minimizeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isMinimized: true } : app)),
    );
    const openApps = apps.filter(
      (a) => a.isOpen && a.id !== id && !a.isMinimized,
    );
    if (openApps.length > 0) {
      const topApp = openApps.reduce((prev, current) =>
        prev.zIndex > current.zIndex ? prev : current,
      );
      setActiveAppId(topApp.id);
    } else {
      setActiveAppId(null);
    }
  };

  const toggleDockApp = (id) => {
    const app = apps.find((a) => a.id === id);

    if (!app) {
      const appMeta = {
        "mission-archive": {
          title: "Projects (Mission Archive)",
          size: { width: 780, height: 520 },
        },
        "system-analysis": {
          title: "Intelligence // System Analysis",
          size: { width: 800, height: 540 },
        },
        contact: {
          title: "Communications // Contact",
          size: { width: 780, height: 520 },
        },
        skills: {
          title: "Skill Intelligence Report",
          size: { width: 680, height: 540 },
        },
        "service-record": {
          title: "Kavach Service Record (Experience)",
          size: { width: 780, height: 520 },
        },
        facetime: { title: "FaceTime", size: { width: 780, height: 520 } },
        vscode: { title: "VS Code", size: { width: 780, height: 520 } },
        github: { title: "GitHub", size: { width: 780, height: 520 } },
        spotify: { title: "Spotify", size: { width: 780, height: 520 } },
      };

      const meta = appMeta[id] || {
        title: id.toUpperCase(),
        size: { width: 780, height: 520 },
      };
      handleDockAppClick({ id, title: meta.title, size: meta.size });
      return;
    }

    if (!app.isOpen) {
      const screenW = typeof window !== "undefined" ? window.innerWidth : 1000;
      const screenH =
        typeof window !== "undefined" ? window.innerHeight - 110 : 600;
      const centeredX = Math.max(
        10,
        Math.floor((screenW - app.defaultWidth) / 2),
      );
      const centeredY = Math.max(
        10,
        Math.floor((screenH - app.defaultHeight) / 2),
      );

      setApps((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                isOpen: true,
                isMinimized: false,
                defaultX: centeredX,
                defaultY: centeredY,
              }
            : a,
        ),
      );
      focusApp(id);
    } else if (app.isMinimized) {
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isMinimized: false } : a)),
      );
      focusApp(id);
    } else if (activeAppId === id) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  };

  const handleDockAppClick = (appWindow) => {
    const appMapId = appWindow.id === "safari" ? "browser" : appWindow.id;
    const exists = apps.some((a) => a.id === appMapId);

    const screenW = typeof window !== "undefined" ? window.innerWidth : 1000;
    const screenH =
      typeof window !== "undefined" ? window.innerHeight - 110 : 600;
    const appWidth = appWindow.size.width;
    const appHeight = appWindow.size.height;
    const centeredX = Math.max(10, Math.floor((screenW - appWidth) / 2));
    const centeredY = Math.max(10, Math.floor((screenH - appHeight) / 2));

    if (exists) {
      const app = apps.find((a) => a.id === appMapId);
      if (!app.isOpen) {
        setApps((prev) =>
          prev.map((a) =>
            a.id === appMapId
              ? {
                  ...a,
                  isOpen: true,
                  isMinimized: false,
                  defaultX: centeredX,
                  defaultY: centeredY,
                }
              : a,
          ),
        );
      } else if (app.isMinimized) {
        setApps((prev) =>
          prev.map((a) =>
            a.id === appMapId ? { ...a, isMinimized: false } : a,
          ),
        );
      }
      focusApp(appMapId);
    } else {
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      setApps((prev) => [
        ...prev,
        {
          id: appMapId,
          title: appWindow.title,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
          defaultX: centeredX,
          defaultY: centeredY,
          defaultWidth: appWidth,
          defaultHeight: appHeight,
        },
      ]);
      setActiveAppId(appMapId);
    }
  };

  const handleLaunchpadClick = () => {
    setIsLaunchpadOpen(true);
  };

  const handlePositionChange = (id, x, y) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, defaultX: x, defaultY: y } : app,
      ),
    );
  };

  const handleSizeChange = (id, w, h) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, defaultWidth: w, defaultHeight: h } : app,
      ),
    );
  };

  const handleDesktopClick = () => {
    setActiveAppId(null);
    setIsControlCenterOpen(false);
  };

  // Keyboard shortcut for Spotlight (Cmd/Ctrl + Space) & Vani AI (Alt/Opt + Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.altKey && e.code === "Space") {
        e.preventDefault();
        setIsVaniOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSpotlightOpen(false);
        setIsVaniOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVaniExecuteAction = (appId) => {
    const appMapId = appId === "safari" ? "browser" : appId;
    toggleDockApp(appMapId);
  };

  const handleSpotlightSearch = (e) => {
    e.preventDefault();
    const query = spotlightQuery.trim().toLowerCase();

    // Check if query matches any app icon name
    const foundApp = apps.find(
      (a) =>
        a.iconName.toLowerCase() === query ||
        a.title.toLowerCase().includes(query),
    );
    if (foundApp) {
      toggleDockApp(foundApp.id);
      setIsSpotlightOpen(false);
      setSpotlightQuery("");
    }
  };

  const renderAppComponent = (app) => {
    switch (app.id) {
      case "terminal":
        return <TerminalApp />;
      case "browser":
        return <BrowserApp />;
      case "settings":
        return <SettingsApp />;
      case "facetime":
        return <FaceTimeApp />;
      case "notes":
        return <NotesApp />;
      case "vscode":
        return (
          <iframe
            src="https://github1s.com"
            className="w-full h-full border-none bg-black"
            title="VS Code"
          />
        );
      case "github":
        return <GitHubApp />;
      case "spotify":
        return <SpotifyApp />;
      case "mission-archive":
      case "projects":
      case "archive":
        return <MissionArchiveApp />;
      case "skills":
        return <SkillsApp />;
      case "service-record":
      case "experience":
      case "record":
        return <ServiceRecordApp />;
      case "system-analysis":
      case "analysis":
      case "analytics":
        return <SystemAnalysisApp />;
      case "contact":
      case "communication":
      case "communications":
      case "mail-app":
        return <ContactApp />;
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#070906] text-[#D4D5C8] font-mono text-center">
            <h3 className="text-sm font-bold text-[#8E9B72] mb-2">
              {(app.title || "").toUpperCase()}
            </h3>
            <p className="text-xs text-[#73786B] max-w-xs leading-relaxed">
              This application is sandboxed. Connect module keys or input
              operational clearance to unlock full workstation integration.
            </p>
          </div>
        );
    }
  };

  // Get active window for the menubar indicator
  const activeWindow = apps.find(
    (a) => a.id === activeAppId && a.isOpen && !a.isMinimized,
  );

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden flex flex-col select-none transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#070906] text-[#D4D5C8]"
          : "bg-neutral-100 text-neutral-800"
      }`}
      style={{
        backgroundImage: isDarkMode
          ? `url("/images/Be Disciplind.svg")`
          : undefined,
        backgroundSize: "45% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
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
        onVaniClick={(e) => {
          e.stopPropagation();
          setIsVaniOpen(!isVaniOpen);
        }}
        isDarkMode={isDarkMode}
        activeWindow={activeWindow}
      />

      {/* Control Center Panel */}
      <AnimatePresence>
        {isControlCenterOpen && (
          <ControlCenter
            onClose={() => setIsControlCenterOpen(false)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            brightness={brightness}
            onBrightnessChange={(val) => setBrightness(val)}
          />
        )}
      </AnimatePresence>

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
                <p
                  className={`font-semibold ${isDarkMode ? "text-white/90" : "text-neutral-800"}`}
                >
                  Welcome to KAVACH.
                </p>
                <p
                  className={`text-[10.5px] mt-0.5 ${isDarkMode ? "text-white/60" : "text-neutral-500"}`}
                >
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
            <span className="text-[#73786B] group-hover:text-[#8E9B72] text-xl font-bold">
              ⏽
            </span>
          </motion.div>
          <span className="text-[10px] text-[#73786B] tracking-[0.3em] uppercase font-bold">
            Kavach System Shutdown - Click Power Icon to Boot
          </span>
        </div>
      )}

      {/* Main Desktop Canvas Workspace Area */}
      <main
        ref={desktopRef}
        className="flex-1 w-full relative pt-[42px] bg-transparent cursor-default"
        style={{ height: "calc(100vh - 36px - 70px)" }}
      >
        {/* Safe Drag Boundary Container */}
        <div
          ref={constraintsRef}
          className="absolute inset-x-2 top-[44px] bottom-[80px] pointer-events-none"
        />

        {/* Desktop Right-Side Widgets (Calendar & Weather) with Army Touch */}
        <DesktopWidgets />

        {/* Desktop Left-Side App Shortcut Icons */}
        <div className="absolute top-[60px] left-6 z-20 flex flex-col items-center gap-6 select-none">
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "mission-archive",
                title: "Projects (Mission Archive)",
                size: { width: 780, height: 520 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-[#8E9B72]/40 group-hover:border-[#8E9B72] rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(142,155,114,0.3)]">
              <img
                src="/images/kavach.svg"
                alt="Projects"
                loading="eager"
                fetchPriority="high"
                className="w-10 h-10 object-contain pointer-events-none select-none"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-[#8E9B72] bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              Projects
            </span>
          </motion.div>

          {/* System Analysis (Intelligence Analysis) Icon - Placed Next to Projects */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "system-analysis",
                title: "Intelligence // System Analysis",
                size: { width: 800, height: 540 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-blue-500/40 group-hover:border-blue-400 rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23.693L4.2 15.3m15.6 0a3 3 0 0 1-2.07 3.51l-1.635.545a9.06 9.06 0 0 1-8.19 0l-1.635-.545A3 3 0 0 1 4.2 15.3"
                />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-blue-400 bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              Analysis
            </span>
          </motion.div>

          {/* Contact (Communications) Icon */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "contact",
                title: "Communications // Contact",
                size: { width: 780, height: 520 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-[#8E9B72]/40 group-hover:border-[#8E9B72] rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(142,155,114,0.3)]">
              <svg
                className="w-8 h-8 text-[#8E9B72]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91A2.25 2.25 0 0 1 2.25 6.993V6.75"
                />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-[#8E9B72] bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              Contact
            </span>
          </motion.div>

          {/* Skills Icon */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "skills",
                title: "Skill Intelligence Report",
                size: { width: 680, height: 540 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-green-500/40 group-hover:border-green-400 rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-5.25 6.557c0 1.63 2.35 2.952 5.25 2.952s5.25-1.322 5.25-2.952m-10.5 0h10.5"
                />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-green-400 bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              Skills
            </span>
          </motion.div>

          {/* About Me (Notes App) Icon */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "notes",
                title: "Field Journal (About Me)",
                size: { width: 720, height: 480 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-amber-500/40 group-hover:border-amber-400 rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <img
                src="/images/Para_Skull.svg"
                alt="About Me"
                loading="eager"
                fetchPriority="high"
                className="w-10 h-10 object-contain pointer-events-none select-none"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-amber-400 bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              About Me
            </span>
          </motion.div>

          {/* Service Record (Rank Progression) Icon */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleDockAppClick({
                id: "service-record",
                title: "Kavach Service Record (Experience)",
                size: { width: 780, height: 520 },
              })
            }
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-14 h-14 bg-[#0A0C09]/90 border border-[#C2B280]/40 group-hover:border-[#C2B280] rounded-xl flex items-center justify-center p-2 backdrop-blur-md shadow-xl transition-all group-hover:shadow-[0_0_20px_rgba(194,178,128,0.3)]">
              <svg
                className="w-8 h-8 text-[#C2B280]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v.75M9 3.75V6m0 0h6m-6 0h6M9 6v.75"
                />
              </svg>
            </div>
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-[#C2B280] bg-black/70 px-2 py-0.5 rounded border border-[#24291F] tracking-wide shadow-md">
              Experience
            </span>
          </motion.div>
        </div>

        {/* Static Background Shield Watermark for Depth */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <svg
            className="w-96 h-96 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
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
                  constraintsRef={constraintsRef}
                  onPositionChange={(x, y) =>
                    handlePositionChange(app.id, x, y)
                  }
                  onSizeChange={(w, h) => handleSizeChange(app.id, w, h)}
                >
                  {renderAppComponent(app)}
                </Window>
              ),
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom App Dock */}
      <Dock
        onAppClick={handleDockAppClick}
        onLaunchpadClick={handleLaunchpadClick}
        onVaniClick={() => setIsVaniOpen((prev) => !prev)}
        activeAppIds={[
          ...apps
            .filter((a) => a.isOpen && !a.isMinimized)
            .map((a) => (a.id === "browser" ? "safari" : a.id)),
          ...(isVaniOpen ? ["vani"] : []),
        ]}
        isDarkMode={isDarkMode}
      />

      {/* VANI AI Assistant Glassmorphism Voice Panel */}
      <VaniAssistant
        isOpen={isVaniOpen}
        onClose={() => setIsVaniOpen(false)}
        onExecuteAction={handleVaniExecuteAction}
        isDarkMode={isDarkMode}
      />

      {/* Launchpad Overlay */}
      {isLaunchpadOpen && (
        <Launchpad
          onAppClick={handleDockAppClick}
          onClose={() => setIsLaunchpadOpen(false)}
        />
      )}
    </div>
  );
}
