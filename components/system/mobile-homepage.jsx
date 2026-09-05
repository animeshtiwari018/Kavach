"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

import TerminalApp from "../apps/terminal";
import BrowserApp from "../apps/browser";
import SettingsApp from "../apps/settings";
import FaceTimeApp from "../apps/facetime";
import NotesApp from "../apps/notes";
import GitHubApp from "../apps/github";
import SpotifyApp from "../apps/spotify";
import MissionArchiveApp from "../apps/mission-archive";
import SkillsApp from "../apps/skills";
import ServiceRecordApp from "../apps/service-record";
import SystemAnalysisApp from "../apps/system-analysis";
import ContactApp from "../apps/contact";
import ControlCenter from "../control-center";
import NotificationCenter from "./notification-center";

const MOBILE_APPS = [
  { id: "facetime", title: "FaceTime", icon: "/images/kavach.svg", component: FaceTimeApp },
  { id: "github", title: "GitHub", icon: "/images/github.svg", component: GitHubApp },
  { id: "spotify", title: "Spotify", icon: "/images/spotify.svg", component: SpotifyApp },
  { id: "mission-archive", title: "Archive", icon: "/images/Para_Folder.svg", component: MissionArchiveApp },
  { id: "skills", title: "Skills", icon: "/images/Para_Folder.svg", component: SkillsApp },
  { id: "service-record", title: "Service", icon: "/images/Para_Folder.svg", component: ServiceRecordApp },
  { id: "system-analysis", title: "Analysis", icon: "/images/Para_Folder.svg", component: SystemAnalysisApp },
  { id: "contact", title: "Contact", icon: "/images/Para_Folder.svg", component: ContactApp },
];

const DOCK_APPS = [
  { id: "safari", title: "Safari", icon: "/images/browser.svg", component: BrowserApp },
  { id: "notes", title: "Notes", icon: "/images/Para_Skull.svg", component: NotesApp },
  { id: "terminal", title: "Terminal", icon: "/images/Terminal.svg", component: TerminalApp },
  { id: "settings", title: "Settings", icon: "/images/kavach.svg", component: SettingsApp },
];

export default function MobileHomepage({ onLogout }) {
  const [activeApp, setActiveApp] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  
  // For simplicity we will assume dark mode for now, or you can pass it in
  const isDarkMode = true;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const openApp = (appId) => {
    setActiveApp(appId);
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  // Find active app component
  const allApps = [...MOBILE_APPS, ...DOCK_APPS];
  const ActiveComponent = activeApp ? allApps.find(a => a.id === activeApp)?.component : null;

  return (
    <div 
      className="w-full h-screen overflow-hidden relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/images/wallpaper-dark.jpg')` }}
    >
      {/* iOS Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 z-50 flex items-center justify-between px-6 select-none drop-shadow-md">
        <div 
          className="flex items-center h-full cursor-pointer pl-2 -ml-2" 
          onClick={() => {
            setIsNotificationCenterOpen(!isNotificationCenterOpen);
            setIsControlCenterOpen(false);
          }}
        >
          <span className="text-sm font-semibold tracking-wide">{formattedTime}</span>
        </div>
        <div 
          className="flex items-center gap-2 h-full cursor-pointer pr-2 -mr-2"
          onClick={() => {
            setIsControlCenterOpen(!isControlCenterOpen);
            setIsNotificationCenterOpen(false);
          }}
        >
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <BatteryMedium className="w-5 h-5" />
        </div>
      </div>

      <NotificationCenter 
        show={isNotificationCenterOpen} 
        onClose={() => setIsNotificationCenterOpen(false)} 
        isDarkMode={isDarkMode} 
      />

      <AnimatePresence>
        {isControlCenterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsControlCenterOpen(false)}
            />
            <ControlCenter
              onClose={() => setIsControlCenterOpen(false)}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => {}}
              brightness={brightness}
              onBrightnessChange={setBrightness}
            />
          </>
        )}
      </AnimatePresence>

      {/* Home Screen */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col pt-14"
          >
            {/* App Grid */}
            <div className="flex-1 px-5 pt-6 overflow-y-auto no-scrollbar pb-24">
              <div className="grid grid-cols-4 gap-x-3 gap-y-7">
                {MOBILE_APPS.map((app) => (
                  <div 
                    key={app.id} 
                    className="flex flex-col items-center gap-1.5 cursor-pointer active:opacity-70 transition-opacity"
                    onClick={() => openApp(app.id)}
                  >
                    <div className="w-[60px] h-[60px] flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm overflow-hidden">
                      <img src={app.icon} className="w-10 h-10 object-contain" alt={app.title} draggable={false} />
                    </div>
                    <span className="text-white text-[11px] font-medium tracking-wide drop-shadow-md text-center">
                      {app.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Dock */}
            <div className="absolute bottom-4 left-4 right-4 h-[84px] bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/20 rounded-[32px] flex items-center justify-around px-2 shadow-2xl">
              {DOCK_APPS.map((app) => (
                <div 
                  key={app.id} 
                  className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                  onClick={() => openApp(app.id)}
                >
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-2xl overflow-hidden relative">
                    <img src={app.icon} className="w-12 h-12 object-contain relative z-10" alt={app.title} draggable={false} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Active App Mode */}
      <AnimatePresence>
        {activeApp && ActiveComponent && (
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-40 bg-white dark:bg-[#0A0C09] backdrop-blur-2xl"
          >
            <div className="w-full h-full pt-12 relative overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto no-scrollbar relative text-white">
                <ActiveComponent isDarkMode={isDarkMode} onClose={closeApp} />
              </div>
              {/* iOS Home Indicator */}
              <div 
                className="absolute bottom-1 left-0 right-0 h-6 flex items-end justify-center pb-2 cursor-pointer z-50 bg-gradient-to-t from-black/80 to-transparent"
                onClick={closeApp}
              >
                <div className="w-1/3 h-1.5 bg-white rounded-full opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
