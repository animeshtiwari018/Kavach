"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { AppleIcon } from "@/components/icons";

import { VaniOrb } from "./system/vani";

export default function Menubar({
  time,
  onLogout,
  onSleep,
  onShutdown,
  onRestart,
  onSpotlightClick,
  onControlCenterClick,
  onVaniClick,
  isDarkMode,
  activeWindow,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [showWifiToggle, setShowWifiToggle] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);

  const menuRef = useRef(null);
  const wifiRef = useRef(null);

  // Safeguard: check if time is a Date object, if not fallback to new Date()
  const dateObj = time instanceof Date ? time : new Date();

  const formattedTime = dateObj.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    // Battery Status Logic
    if (typeof window !== "undefined" && "getBattery" in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
          updateBatteryStatus(battery);
          battery.addEventListener("levelchange", () =>
            updateBatteryStatus(battery),
          );
          battery.addEventListener("chargingchange", () =>
            updateBatteryStatus(battery),
          );
        })
        .catch(() => {
          setBatteryLevel(100);
          setIsCharging(false);
        });
    }

    // Wi-Fi LocalStorage state logic
    if (typeof window !== "undefined") {
      const savedWifi = localStorage.getItem("wifiEnabled");
      if (savedWifi !== null) {
        setWifiEnabled(savedWifi === "true");
      }
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
      if (
        wifiRef.current &&
        !wifiRef.current.contains(event.target) &&
        !event.target.closest(".wifi-icon")
      ) {
        setShowWifiToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateBatteryStatus = (battery) => {
    setBatteryLevel(Math.round(battery.level * 100));
    setIsCharging(battery.charging);
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const toggleWifi = () => {
    const newState = !wifiEnabled;
    setWifiEnabled(newState);
    localStorage.setItem("wifiEnabled", newState.toString());
  };

  const toggleWifiPopup = (e) => {
    e.stopPropagation();
    setShowWifiToggle(!showWifiToggle);
  };

  const menuBgClass = isDarkMode
    ? "bg-[#7a7a96]/40 backdrop-blur-xl border border-[#7a7a96]/35 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
    : "bg-[#7a7a96]/30 backdrop-blur-xl border border-[#7a7a96]/25 shadow-[0_8px_32px_0_rgba(122,122,150,0.1)]";
  const dropdownBgClass = isDarkMode
    ? "bg-white/[0.08] border border-white/[0.15] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    : "bg-white/80 border border-[#7a7a96]/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(122,122,150,0.15)]";
  const textClass = isDarkMode ? "text-[#f3f4f6]" : "text-gray-800";
  const hoverClass = isDarkMode ? "hover:bg-white/[0.12] hover:text-white" : "hover:bg-[#7a7a96]/15 hover:text-black";

  return (
    <div
      ref={menuRef}
      className={`fixed top-1 left-4 right-4 h-8 rounded-lg ${menuBgClass} z-50 flex items-center px-4 ${textClass} text-[13px]`}
    >
      <div className="flex-1 flex items-center">
        {/* Apple Menu */}
        <button
          className="flex items-center mr-4 cursor-pointer"
          onClick={() => toggleMenu("apple")}
        >
          <AppleIcon className="w-27 h-11" />
        </button>
        {activeMenu === "apple" && (
          <div
            className={`absolute top-full mt-1.5 left-0 ${dropdownBgClass} rounded-lg ${textClass} py-1 w-56 z-50`}
          >
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
            >
              About This Mac
            </button>
            <div className="border-t border-gray-700/30 my-1"></div>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
            >
              System Settings...
            </button>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
            >
              App Store...
            </button>
            <div className="border-t border-gray-700/30 my-1"></div>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
              onClick={onSleep}
            >
              Sleep
            </button>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
              onClick={onRestart}
            >
              Restart...
            </button>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
              onClick={onShutdown}
            >
              Shut Down...
            </button>
            <div className="border-t border-gray-700/30 my-1"></div>
            <button
              className={`w-full text-left px-4 py-1.5 ${hoverClass} cursor-pointer`}
              onClick={onLogout}
            >
              Log Out...
            </button>
          </div>
        )}
        {/* Active Application Title */}
        {activeWindow && (
          <button
            className={`mr-4 font-bold hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer ${
              activeMenu === "app" ? "bg-white/10" : ""
            }`}
            onClick={() => toggleMenu("app")}
          >
            {activeWindow.title}
          </button>
        )}
      </div>

      {/* Right Side Items */}
      <div className="flex items-center space-x-3">
        <span className="mr-0.5">{batteryLevel}%</span>
        {/* Battery Icon */}
        <div className="relative flex items-center">
          <div className="w-5.5 h-3 border border-current rounded-sm relative p-px">
            <div
              className="h-full bg-current rounded-2xs"
              style={{ width: `${batteryLevel}%` }}
            ></div>
            <div className="absolute -right-[3px] top-1/2 transform -translate-y-1/2 w-[2px] h-[5px] bg-current rounded-r-2xs"></div>
            {isCharging && (
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-green-400">
                ⚡
              </div>
            )}
          </div>
        </div>

        {/* Wi-Fi Icon */}
        <div className="relative flex items-center">
          <button
            className="wifi-icon cursor-pointer"
            onClick={toggleWifiPopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              {wifiEnabled ? (
                <>
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" />
                </>
              ) : (
                <>
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                  <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" />
                </>
              )}
            </svg>
          </button>
          {showWifiToggle && (
            <div
              ref={wifiRef}
              className={`absolute top-full mt-1.5 right-0 ${dropdownBgClass} rounded-lg ${textClass} py-3 px-4 w-64 z-50`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">Wi-Fi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifiEnabled}
                    onChange={toggleWifi}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-500/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Vani AI Voice Trigger */}
        <button
          onClick={onVaniClick}
          className="cursor-pointer flex items-center p-0.5 hover:scale-110 transition-transform"
          title="Activate VANI AI Assistant"
        >
          <VaniOrb size="sm" />
        </button>

        {/* Spotlight Icon */}
        <button
          onClick={onSpotlightClick}
          className="cursor-pointer flex items-center"
        >
          <Search className="w-[17px] h-[17px]" />
        </button>

        {/* Control Center Trigger */}
        <button
          onClick={onControlCenterClick}
          className="flex items-center justify-center cursor-pointer"
        >
          <span className="text-[10px] border px-1 rounded-sm opacity-80 border-current font-bold">
            CC
          </span>
        </button>

        {/* Clock */}
        <span className="font-semibold">{formattedTime}</span>
      </div>
    </div>
  );
}
