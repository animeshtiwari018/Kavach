"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Bluetooth,
  Radio,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Play,
  Pause,
  LayoutGrid,
  Tv,
  SlidersHorizontal,
} from "lucide-react";
import { useWindowSize } from "../hooks/useWindowSize";

export default function ControlCenter({
  onClose,
  isDarkMode,
  onToggleDarkMode,
  brightness,
  onBrightnessChange,
}) {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirroring, setScreenMirroring] = useState(false);
  const [kbdBrightness, setKbdBrightness] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWifi = localStorage.getItem("wifiEnabled");
      if (savedWifi !== null) {
        setWifiEnabled(savedWifi === "true");
      }
      setIsFullscreen(!!document.fullscreenElement);
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleWifi = () => {
    const newState = !wifiEnabled;
    setWifiEnabled(newState);
    localStorage.setItem("wifiEnabled", newState.toString());
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error entering fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const containerVariants = isMobile ? {
    hidden: { opacity: 0, y: "-100%" },
    show: {
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring", stiffness: 350, damping: 30,
        staggerChildren: 0.03
      }
    },
    exit: { 
      opacity: 0, 
      y: "-100%", 
      transition: { duration: 0.2 } 
    }
  } : {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    show: {
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring", stiffness: 400, damping: 30,
        staggerChildren: 0.03
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10, 
      transition: { duration: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 450, damping: 25 } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`fixed top-[42px] right-4 ${isMobile ? "w-[calc(100%-32px)]" : "w-[330px]"} rounded-3xl border border-white/10 p-3.5 backdrop-blur-2xl bg-[#1a212a]/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 flex flex-col gap-3 font-sans select-none origin-top-right`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top 2-Column Section */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column Card: Wi-Fi, Bluetooth, AirDrop */}
        <motion.div variants={itemVariants} className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col justify-between gap-3 shadow-sm">
          {/* Wi-Fi */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={toggleWifi}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <motion.div
              layout
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                wifiEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Wifi className="w-4 h-4" />
            </motion.div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">Wi-Fi</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {wifiEnabled ? "Home" : "Off"}
              </div>
            </div>
          </motion.button>

          {/* Bluetooth */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <motion.div
              layout
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                bluetoothEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Bluetooth className="w-4 h-4" />
            </motion.div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">Bluetooth</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {bluetoothEnabled ? "On" : "Off"}
              </div>
            </div>
          </motion.button>

          {/* AirDrop */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setAirdropEnabled(!airdropEnabled)}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <motion.div
              layout
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                airdropEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Radio className="w-4 h-4" />
            </motion.div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">AirDrop</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {airdropEnabled ? "Everyone" : "Off"}
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-3">
          {/* Top Box: Focus & Dark Mode */}
          <motion.div variants={itemVariants} className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-3 shadow-sm">
            {/* Focus */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setFocusEnabled(!focusEnabled)}
              className="flex items-center gap-2.5 text-left w-full cursor-pointer group"
            >
              <motion.div
                layout
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  focusEnabled ? "bg-indigo-600 text-white" : "bg-white/10 text-gray-300"
                }`}
              >
                <Moon className="w-4 h-4" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold leading-tight text-white">Focus</div>
                <div className="text-[10px] text-gray-400 font-medium truncate">
                  {focusEnabled ? "On" : "Off"}
                </div>
              </div>
            </motion.button>

            {/* Dark Mode */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={onToggleDarkMode}
              className="flex items-center gap-2.5 text-left w-full cursor-pointer group"
            >
              <motion.div
                layout
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDarkMode ? "bg-[#007AFF] text-white" : "bg-white/10 text-gray-300"
                }`}
              >
                <Moon className="w-4 h-4" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold leading-tight text-white">
                  Dark Mode
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Row 2: Keyboard Brightness & Enter Fullscreen */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
            {/* Keyboard Brightness */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setKbdBrightness(!kbdBrightness)}
              className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-2 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors min-h-[66px] ${
                kbdBrightness ? "border-[#007AFF]/60 bg-[#007AFF]/20" : ""
              }`}
            >
              <Sun className={`w-4 h-4 ${kbdBrightness ? "text-[#007AFF]" : "text-gray-200"}`} />
              <span className={`text-[10px] font-bold leading-tight ${kbdBrightness ? "text-[#007AFF]" : "text-gray-200"}`}>
                Kbd Bright
              </span>
            </motion.button>

            {/* Enter Fullscreen */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={toggleFullscreen}
              className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-2 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors min-h-[66px] ${
                isFullscreen ? "border-[#007AFF]/60 bg-[#007AFF]/20" : ""
              }`}
            >
              {isFullscreen ? (
                <Minimize className={`w-4 h-4 ${isFullscreen ? "text-[#007AFF]" : "text-gray-200"}`} />
              ) : (
                <Maximize className="w-4 h-4 text-gray-200" />
              )}
              <span className={`text-[10px] font-bold leading-tight ${isFullscreen ? "text-[#007AFF]" : "text-gray-200"}`}>
                {isFullscreen ? "Exit Full" : "Fullscreen"}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Row 2: Stage Manager & Screen Mirroring */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
        {/* Stage Manager */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStageManager(!stageManager)}
          className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors ${
            stageManager ? "bg-[#007AFF]/30 border-[#007AFF]/60" : ""
          }`}
        >
          <LayoutGrid className="w-5 h-5 text-gray-200" />
          <span className="text-[11px] font-bold text-gray-200">Stage Manager</span>
        </motion.button>

        {/* Screen Mirroring */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreenMirroring(!screenMirroring)}
          className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors ${
            screenMirroring ? "bg-[#007AFF]/30 border-[#007AFF]/60" : ""
          }`}
        >
          <Tv className="w-5 h-5 text-gray-200" />
          <span className="text-[11px] font-bold text-gray-200">Screen Mirroring</span>
        </motion.button>
      </motion.div>

      {/* Display Slider */}
      <motion.div variants={itemVariants} className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm group">
        <div className="text-[11px] font-bold text-gray-200">Display</div>
        <motion.div whileTap={{ scale: 0.98 }} className="relative flex items-center h-8 bg-[#181f28] rounded-full px-3 overflow-hidden border border-white/5 cursor-pointer">
          <Sun className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none group-hover:text-white transition-colors" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-20"
          />
          {/* Visual Track Fill & Thumb */}
          <motion.div
            layout
            className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all duration-75 pointer-events-none"
            style={{ width: `${brightness}%` }}
          />
          <motion.div
            layout
            className="absolute w-6 h-6 rounded-full bg-white shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
            style={{ left: `calc(${brightness}% - 14px)` }}
          />
        </motion.div>
      </motion.div>

      {/* Sound Slider */}
      <motion.div variants={itemVariants} className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm group">
        <div className="text-[11px] font-bold text-gray-200">Sound</div>
        <motion.div whileTap={{ scale: 0.98 }} className="relative flex items-center h-8 bg-[#181f28] rounded-full px-3 overflow-hidden border border-white/5 cursor-pointer">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none group-hover:text-white transition-colors" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-20"
          />
          {/* Visual Track Fill & Thumb */}
          <motion.div
            layout
            className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all duration-75 pointer-events-none"
            style={{ width: `${volume}%` }}
          />
          <motion.div
            layout
            className="absolute w-6 h-6 rounded-full bg-white shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
            style={{ left: `calc(${volume}% - 14px)` }}
          />
        </motion.div>
      </motion.div>

      {/* Music / Now Playing Card */}
      <motion.div variants={itemVariants} className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10 shadow relative">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/images/kavach.svg"
              alt="Album Art"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {isPlaying && (
              <motion.div 
                className="absolute inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-white leading-tight truncate">
              Faded
            </div>
            <div className="text-[10px] text-gray-400 font-medium truncate">
              Alan Walker / Jesper Borgen
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </motion.button>
      </motion.div>

      {/* Footer: Edit Controls */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer py-0.5 px-3 rounded-full hover:bg-white/10"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Edit Controls</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
