"use client";

import React, { useState, useEffect } from "react";
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

  return (
    <div
      className="fixed top-[42px] right-4 w-[330px] rounded-3xl border border-white/10 p-3.5 backdrop-blur-2xl bg-[#1a212a]/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 flex flex-col gap-3 font-sans select-none transition-all duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top 2-Column Section */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column Card: Wi-Fi, Bluetooth, AirDrop */}
        <div className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col justify-between gap-3 shadow-sm">
          {/* Wi-Fi */}
          <button
            onClick={toggleWifi}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                wifiEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Wifi className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">Wi-Fi</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {wifiEnabled ? "Home" : "Off"}
              </div>
            </div>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                bluetoothEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Bluetooth className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">Bluetooth</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {bluetoothEnabled ? "On" : "Off"}
              </div>
            </div>
          </button>

          {/* AirDrop */}
          <button
            onClick={() => setAirdropEnabled(!airdropEnabled)}
            className="flex items-center gap-3 text-left w-full cursor-pointer group"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                airdropEnabled ? "bg-[#007AFF] text-white" : "bg-white/15 text-gray-300"
              }`}
            >
              <Radio className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-white">AirDrop</div>
              <div className="text-[10px] text-gray-400 font-medium truncate">
                {airdropEnabled ? "Everyone" : "Off"}
              </div>
            </div>
          </button>
        </div>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-3">
          {/* Top Box: Focus & Dark Mode */}
          <div className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-3 shadow-sm">
            {/* Focus */}
            <button
              onClick={() => setFocusEnabled(!focusEnabled)}
              className="flex items-center gap-2.5 text-left w-full cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  focusEnabled ? "bg-indigo-600 text-white" : "bg-white/10 text-gray-300"
                }`}
              >
                <Moon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold leading-tight text-white">Focus</div>
                <div className="text-[10px] text-gray-400 font-medium truncate">
                  {focusEnabled ? "On" : "Off"}
                </div>
              </div>
            </button>

            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              className="flex items-center gap-2.5 text-left w-full cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDarkMode ? "bg-[#007AFF] text-white" : "bg-white/10 text-gray-300"
                }`}
              >
                <Moon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold leading-tight text-white">
                  Dark Mode
                </div>
              </div>
            </button>
          </div>

          {/* Row 2: Keyboard Brightness & Enter Fullscreen */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Keyboard Brightness */}
            <button
              onClick={() => setKbdBrightness(!kbdBrightness)}
              className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-2 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors min-h-[66px] ${
                kbdBrightness ? "border-[#007AFF]/60" : ""
              }`}
            >
              <Sun className="w-4 h-4 text-gray-200" />
              <span className="text-[10px] font-bold leading-tight text-gray-200">
                Keyboard Brightness
              </span>
            </button>

            {/* Enter Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-2 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors min-h-[66px] ${
                isFullscreen ? "border-[#007AFF]/60" : ""
              }`}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-gray-200" />
              ) : (
                <Maximize className="w-4 h-4 text-gray-200" />
              )}
              <span className="text-[10px] font-bold leading-tight text-gray-200">
                {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Stage Manager & Screen Mirroring */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Stage Manager */}
        <button
          onClick={() => setStageManager(!stageManager)}
          className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors ${
            stageManager ? "bg-[#007AFF]/30 border-[#007AFF]/60" : ""
          }`}
        >
          <LayoutGrid className="w-5 h-5 text-gray-200" />
          <span className="text-[11px] font-bold text-gray-200">Stage Manager</span>
        </button>

        {/* Screen Mirroring */}
        <button
          onClick={() => setScreenMirroring(!screenMirroring)}
          className={`bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer hover:bg-[#323b47]/90 transition-colors ${
            screenMirroring ? "bg-[#007AFF]/30 border-[#007AFF]/60" : ""
          }`}
        >
          <Tv className="w-5 h-5 text-gray-200" />
          <span className="text-[11px] font-bold text-gray-200">Screen Mirroring</span>
        </button>
      </div>

      {/* Display Slider */}
      <div className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm">
        <div className="text-[11px] font-bold text-gray-200">Display</div>
        <div className="relative flex items-center h-8 bg-[#181f28] rounded-full px-3 overflow-hidden border border-white/5">
          <Sun className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-20"
          />
          {/* Visual Track Fill & Thumb */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all duration-75 pointer-events-none"
            style={{ width: `${brightness}%` }}
          />
          <div
            className="absolute w-6 h-6 rounded-full bg-white shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
            style={{ left: `calc(${brightness}% - 14px)` }}
          />
        </div>
      </div>

      {/* Sound Slider */}
      <div className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm">
        <div className="text-[11px] font-bold text-gray-200">Sound</div>
        <div className="relative flex items-center h-8 bg-[#181f28] rounded-full px-3 overflow-hidden border border-white/5">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2 z-10 pointer-events-none" />
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
          <div
            className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all duration-75 pointer-events-none"
            style={{ width: `${volume}%` }}
          />
          <div
            className="absolute w-6 h-6 rounded-full bg-white shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
            style={{ left: `calc(${volume}% - 14px)` }}
          />
        </div>
      </div>

      {/* Music / Now Playing Card */}
      <div className="bg-[#262e38]/85 border border-white/5 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10 shadow">
            <img
              src="/images/kavach.svg"
              alt="Album Art"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
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

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Footer: Edit Controls */}
      <button
        onClick={onClose}
        className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer py-0.5"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Edit Controls</span>
      </button>
    </div>
  );
}

