"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, Signal, Briefcase } from "lucide-react";

const IOSBatteryIcon = ({ level = 80 }) => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90 mt-0.5">
    <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" strokeWidth="1"/>
    <path d="M24 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="2" y="2" width={19 * (level / 100)} height="8" rx="2" fill="currentColor" />
  </svg>
);

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

const AnalysisIcon = (
  <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23.693L4.2 15.3m15.6 0a3 3 0 0 1-2.07 3.51l-1.635.545a9.06 9.06 0 0 1-8.19 0l-1.635-.545A3 3 0 0 1 4.2 15.3" />
  </svg>
);

const ContactIcon = (
  <svg className="w-10 h-10 text-[#8E9B72]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91A2.25 2.25 0 0 1 2.25 6.993V6.75" />
  </svg>
);

const SkillsIcon = (
  <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-5.25 6.557c0 1.63 2.35 2.952 5.25 2.952s5.25-1.322 5.25-2.952m-10.5 0h10.5" />
  </svg>
);

const ServiceIcon = <Briefcase className="w-10 h-10 text-amber-500" strokeWidth="1.5" />;

const MOBILE_APPS = [
  { id: "facetime", title: "FaceTime", icon: "/images/kavach.svg", component: FaceTimeApp },
  { id: "github", title: "GitHub", icon: "/images/github.svg", component: GitHubApp },
  { id: "spotify", title: "Spotify", icon: "/images/spotify.svg", component: SpotifyApp },
  { id: "mission-archive", title: "Archive", icon: "/images/kavach.svg", component: MissionArchiveApp },
  { id: "skills", title: "Skills", icon: SkillsIcon, component: SkillsApp },
  { id: "service-record", title: "Service", icon: ServiceIcon, component: ServiceRecordApp },
  { id: "system-analysis", title: "Analysis", icon: AnalysisIcon, component: SystemAnalysisApp },
  { id: "contact", title: "Contact", icon: ContactIcon, component: ContactApp },
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
      className="w-full h-[100dvh] overflow-hidden relative bg-cover bg-center text-white"
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
          className="flex items-center gap-1.5 h-full cursor-pointer pr-2 -mr-2"
          onClick={() => {
            setIsControlCenterOpen(!isControlCenterOpen);
            setIsNotificationCenterOpen(false);
          }}
        >
          <Signal className="w-[15px] h-[15px]" />
          <Wifi className="w-[15px] h-[15px]" />
          <IOSBatteryIcon level={80} />
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
                      {typeof app.icon === 'string' ? (
                        <img src={app.icon} className="w-10 h-10 object-contain" alt={app.title} draggable={false} />
                      ) : (
                        app.icon
                      )}
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
                    {typeof app.icon === 'string' ? (
                      <img src={app.icon} className="w-12 h-12 object-contain relative z-10" alt={app.title} draggable={false} />
                    ) : (
                      app.icon
                    )}
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
