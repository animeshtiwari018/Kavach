"use client";

import React, { useState, useEffect } from "react";
import {
  Wifi,
  Bluetooth,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Maximize,
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
  const [volume, setVolume] = useState(75);
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

  const bgPanelClass = isDarkMode
    ? "bg-gray-900/80 text-white border-gray-800/60"
    : "bg-gray-100/90 text-gray-800 border-gray-200/50";
  const bgCardClass = isDarkMode
    ? "bg-gray-800/85 hover:bg-gray-800"
    : "bg-gray-200/90 hover:bg-gray-200/70";

  return (
    <div
      className={`fixed top-[44px] right-4 w-72 rounded-xl border overflow-hidden shadow-2xl z-50 p-4 backdrop-blur-xl ${bgPanelClass} transition-colors duration-300 font-sans`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-4 gap-2 mb-4">
        {/* Wi-Fi Switch */}
        <button
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-colors ${
            wifiEnabled ? "bg-blue-500 text-white" : bgCardClass
          }`}
          onClick={toggleWifi}
        >
          <Wifi className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Wi-Fi</span>
        </button>

        {/* Bluetooth Switch */}
        <button
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-colors ${
            bluetoothEnabled ? "bg-blue-500 text-white" : bgCardClass
          }`}
          onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
        >
          <Bluetooth className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">BT</span>
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-colors ${
            isDarkMode ? "bg-blue-500 text-white" : bgCardClass
          }`}
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 mb-1" />
          ) : (
            <Sun className="w-5 h-5 mb-1" />
          )}
          <span className="text-[10px] font-bold">
            {isDarkMode ? "Dark" : "Light"}
          </span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-colors ${
            isFullscreen ? "bg-blue-500 text-white" : bgCardClass
          }`}
          onClick={toggleFullscreen}
        >
          <Maximize className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Full</span>
        </button>
      </div>

      {/* Screen Brightness Slider */}
      <div
        className={`${isDarkMode ? "bg-gray-800/50" : "bg-gray-200/50"} rounded-xl p-3 mb-3 border ${isDarkMode ? "border-gray-800/30" : "border-gray-300/30"}`}
      >
        <div className="flex items-center justify-between mb-1.5 text-[11px] font-semibold">
          <span>Display</span>
          <span>{brightness}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={brightness}
          onChange={(e) => onBrightnessChange(Number.parseInt(e.target.value))}
          className="w-full h-1 bg-gray-500/30 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Volume Slider */}
      <div
        className={`${isDarkMode ? "bg-gray-800/50" : "bg-gray-200/50"} rounded-xl p-3 border ${isDarkMode ? "border-gray-800/30" : "border-gray-300/30"}`}
      >
        <div className="flex items-center justify-between mb-1.5 text-[11px] font-semibold">
          <span>Volume</span>
          <span>{volume}%</span>
        </div>
        <div className="flex items-center">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 mr-2" />
          ) : (
            <Volume2 className="w-4 h-4 mr-2" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number.parseInt(e.target.value))}
            className="flex-1 h-1 bg-gray-500/30 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
