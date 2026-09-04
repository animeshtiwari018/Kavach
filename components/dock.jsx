"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import { VaniOrb } from "./system/vani";
import { useWindowSize } from "../hooks/useWindowSize";

// App list config
const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/images/kavach.svg", component: "Launchpad", isSystem: true },
  { id: "vani", title: "VANI AI", icon: "vani", component: "Vani" },
  { id: "safari", title: "Safari", icon: "/images/browser.svg", component: "Safari" },
  { id: "settings", title: "Settings", icon: "/images/kavach.svg", component: "Settings" },
  { id: "vscode", title: "VS Code", icon: "/images/vscode.svg", component: "VSCode" },
  { id: "notes", title: "Notes", icon: "/images/Para_Skull.svg", component: "Notes" },
  { id: "facetime", title: "FaceTime", icon: "/images/kavach.svg", component: "FaceTime" },
  { id: "terminal", title: "Terminal", icon: "/images/Terminal.svg", component: "Terminal" },
  { id: "github", title: "GitHub", icon: "/images/github.svg", component: "GitHub" },
  { id: "youtube", title: "YouTube", icon: "/images/youtube.svg", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/images/spotify.svg", component: "Spotify" },
];

const emojiFallback = {
  launchpad: "🚀", vani: "🎙️", safari: "🌐", settings: "⚙️", mail: "✉️",
  vscode: "💻", notes: "📝", facetime: "📞", terminal: "📟", github: "🐙",
  youtube: "📺", spotify: "🎵",
};

// Custom Hook for macOS Dock Icon Magnification
const useDockHoverAnimation = (mouseX, ref, dockSize, dockMag) => {
  const distanceLimit = dockSize * 6;
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / (dockMag * 0.65),
    -distanceLimit / (dockMag * 0.85),
    0,
    distanceLimit / (dockMag * 0.85),
    distanceLimit / (dockMag * 0.65),
    distanceLimit,
  ];

  const widthOutput = [
    dockSize,
    dockSize * (dockMag * 0.55),
    dockSize * (dockMag * 0.75),
    dockSize * dockMag,
    dockSize * (dockMag * 0.75),
    dockSize * (dockMag * 0.55),
    dockSize,
  ];

  const beyondTheDistanceLimit = distanceLimit + 1;
  const distance = useMotionValue(beyondTheDistanceLimit);

  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    { stiffness: 1700, damping: 90 }
  );

  const width = useTransform(widthPX, (w) => `${w / 16}rem`);

  useAnimationFrame(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }
    distance.set(beyondTheDistanceLimit);
  });

  return { width, widthPX };
};

// Individual Dock Item
function DockItem({ app, mouseX, openApp, isOpen, dockSize, dockMag, isBouncing, isMobile }) {
  const imgRef = useRef(null);
  const { width, widthPX } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag);
  const scale = useTransform(widthPX, (w) => w / dockSize);
  
  const [isReceiving, setIsReceiving] = useState(false);
  const [imgError, setImgError] = useState(false);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      setIsReceiving(true);
      const timer = setTimeout(() => setIsReceiving(false), 350);
      return () => clearTimeout(timer);
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const isVani = app.id === "vani";
  const hasError = imgError;

  // If mobile, override dynamic width to fixed size
  const actualWidth = isMobile ? `${dockSize / 16}rem` : width;
  const actualScale = isMobile ? 1 : scale;

  const content = (
    <motion.div
      ref={imgRef}
      style={{
        width: actualWidth,
        height: actualWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "width, height",
      }}
      className="relative"
    >
      {isVani ? (
        <motion.div style={{ scale: actualScale, transformOrigin: 'center' }} className="flex items-center justify-center w-full h-full">
          <VaniOrb size="dock" />
        </motion.div>
      ) : hasError ? (
        <div className="flex items-center justify-center select-none font-sans w-full h-full text-3xl">
          {emojiFallback[app.id] || "📦"}
        </div>
      ) : (
        <img
          src={app.icon || "/placeholder.svg"}
          alt={app.title}
          title={app.title}
          draggable={false}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "22.5%",
            objectFit: "cover"
          }}
        />
      )}
    </motion.div>
  );

  return (
    <li
      id={`dock-${app.id}`}
      onClick={() => openApp(app)}
      className={`relative flex flex-col justify-end mb-1 cursor-pointer mx-1 ${
        isBouncing ? "dock-bounce" : ""
      } ${isReceiving ? "dock-receive" : ""}`}
    >
      {content}

      {/* Shadow beneath icon */}
      <div
        aria-hidden
        style={{
          width: "60%",
          height: 4,
          margin: "1px auto 0",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.28) 0%, transparent 80%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      
      {/* Open indicator dot with pulse */}
      <motion.div
        animate={isOpen ? { scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] } : { scale: 0, opacity: 0 }}
        transition={isOpen ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }}
        style={{
          width: 4,
          height: 4,
          margin: "1px auto 0",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 6px rgba(255,255,255,0.5)",
        }}
      />
    </li>
  );
}

// Main Dock Component
export default function Dock({ onAppClick, onLaunchpadClick, onVaniClick, activeAppIds = [], isDarkMode }) {
  const mouseX = useMotionValue(null);
  const dockSize = 48; // Base icon size in px
  const dockMag = 2; // Magnification factor

  const dockRef = useRef(null);
  const { isMobile } = useWindowSize();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [bouncingApp, setBouncingApp] = useState(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!showMobileMenu) return;
    const handleClickOutside = (event) => {
      if (dockRef.current && !dockRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileMenu]);

  const handleAppClick = (app) => {
    if (app.id === "launchpad") {
      onLaunchpadClick();
      return;
    }
    if (app.id === "vani") {
      onVaniClick?.();
      return;
    }

    if (!activeAppIds.includes(app.id)) {
      setBouncingApp(app.id);
      setTimeout(() => setBouncingApp(null), 700);
    }

    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 100 + 80, y: Math.random() * 30 + 15 },
      size: { width: 780, height: 520 },
    });

    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const visibleApps = isMobile ? dockApps.slice(0, 4) : dockApps;
  const hiddenApps = isMobile ? dockApps.slice(4) : [];

  return (
    <div
      ref={dockRef}
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* Mobile expanded overflow menu */}
      {isMobile && showMobileMenu && (
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[280px] backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-4 mb-2
          ${isDarkMode ? "bg-white/20" : "bg-white/90"}`}
        >
          <div className="grid grid-cols-4 gap-4">
            {hiddenApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={app.title}
                    className="w-12 h-12 object-contain"
                    draggable="false"
                  />
                </div>
                <span className={`text-xs mt-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {app.title}
                </span>
                {activeAppIds.includes(app.id) && (
                  <div className="w-1.5 h-1.5 bg-[#8E9B72] rounded-full mt-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main dock container */}
      <motion.div
        className={`px-3 py-2 rounded-2xl backdrop-blur-xl border border-white/20 flex items-end shadow-lg
          ${isDarkMode ? "bg-white/20" : "bg-white/60"}`}
        style={{
          height: isMobile ? "5rem" : `${(dockSize + 25) / 16}rem`,
        }}
      >
        <ul
          className="flex items-end px-2"
          onMouseMove={(e) => {
            if (!isMobile) mouseX.set(e.nativeEvent.x);
          }}
          onMouseLeave={() => mouseX.set(null)}
          style={{ height: `${(dockSize + 15) / 16}rem` }}
        >
          {visibleApps.map((app) => (
            <DockItem
              key={`dock-${app.id}`}
              app={app}
              mouseX={mouseX}
              dockSize={dockSize}
              dockMag={dockMag}
              isOpen={activeAppIds.includes(app.id)}
              openApp={handleAppClick}
              isBouncing={bouncingApp === app.id}
              isMobile={isMobile}
            />
          ))}

          {/* More/Overflow button for mobile viewports */}
          {isMobile && (
            <li
              className="flex flex-col items-center justify-end h-full px-3 mb-1"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <div className="relative cursor-pointer">
                <div
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center 
                  ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} 
                  ${showMobileMenu ? (isDarkMode ? "bg-blue-700" : "bg-blue-200") : ""}`}
                >
                  <MoreHorizontal
                    className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  />
                </div>
              </div>
            </li>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
