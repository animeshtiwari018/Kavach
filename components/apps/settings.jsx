"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Lock,
  Palette,
  Radio,
  Cpu,
  Bell,
  Info,
  Search,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  KeyRound,
  Trash2,
  Activity,
  Terminal,
} from "lucide-react";

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Settings State
  const [themeMode, setThemeMode] = useState("dark"); // stealth, olive, dark, crimson
  const [accentColor, setAccentColor] = useState("green"); // green, blue, amber, red
  const [iconStyle, setIconStyle] = useState("default"); // default, camo, contrast, hud
  const [showRadar, setShowRadar] = useState(true);
  const [showCorners, setShowCorners] = useState(true);

  // Security Toggles
  const [quantumCrypto, setQuantumCrypto] = useState(true);
  const [defenseFirewall, setDefenseFirewall] = useState(true);
  const [stealthMode, setStealthMode] = useState(true);
  const [threatNeutralize, setThreatNeutralize] = useState(true);

  // Comms Toggles
  const [satRelay, setSatRelay] = useState(true);
  const [meshNetwork, setMeshNetwork] = useState(true);
  const [signalGain, setSignalGain] = useState(85);

  // Privacy & Vault Toggles
  const [zeroLogs, setZeroLogs] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoLock, setAutoLock] = useState(true);

  // Alerts & Diagnostics Toggles
  const [audioPings, setAudioPings] = useState(true);
  const [alertSirens, setAlertSirens] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const navItems = [
    { id: "appearance", label: "Appearance", icon: Palette, badge: "UI" },
    { id: "defense", label: "Defense & Security", icon: Shield, badge: "SEC" },
    { id: "network", label: "Network & Comms", icon: Radio, badge: "NET" },
    { id: "privacy", label: "Privacy & Vault", icon: Lock, badge: "VAULT" },
    { id: "performance", label: "Performance & Core", icon: Cpu, badge: "SYS" },
    { id: "alerts", label: "Alerts & Audio", icon: Bell, badge: "AUDIO" },
    { id: "about", label: "Operative Info", icon: Info, badge: "IDENT" },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none relative overflow-hidden">
      {/* Real-time Toast Feedback Notification */}
      {toastMessage && (
        <div className="absolute top-3 right-4 z-50 bg-[#121610] border border-[#8E9B72] text-[#8E9B72] px-3.5 py-2 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="font-bold tracking-wide text-[10px] uppercase">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <div className="w-56 bg-[#0B0E0A] border-r border-[#24291F] p-3 flex flex-col gap-3 flex-shrink-0">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5E6255]" />
          <input
            type="text"
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141912] border border-[#24291F] focus:border-[#8E9B72] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#D4D5C8] placeholder:text-[#5E6255] outline-none transition-colors"
          />
        </div>

        {/* Classification Header Badge */}
        <div className="bg-[#121610] border border-[#3A4034] rounded-lg p-2 flex items-center justify-between text-[9px]">
          <div className="flex items-center gap-1.5 font-bold text-[#EF4444] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping" />
            CLASSIFIED
          </div>
          <span className="text-[#73786B] font-semibold">LEVEL 4</span>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-0.5">
          {filteredNav.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-[#161C13] border border-[#8E9B72]/50 text-white font-bold shadow-md"
                    : "text-[#73786B] hover:text-[#D4D5C8] hover:bg-[#121610]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComp
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-[#8E9B72]" : "text-[#5E6255]"
                    }`}
                  />
                  <span className="truncate text-[11px]">{item.label}</span>
                </div>
                <span
                  className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border ${
                    isActive
                      ? "border-[#8E9B72]/40 text-[#8E9B72] bg-black/40"
                      : "border-[#24291F] text-[#5E6255]"
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* System Operator Footer */}
        <div className="pt-2 border-t border-[#24291F] text-[9.5px] text-[#5E6255] flex flex-col gap-0.5">
          <div className="text-[#73786B] font-bold">OPERATIVE: ANIMESH</div>
          <div>HOST: KAVACH-NODE_01</div>
        </div>
      </div>

      {/* Main Settings Panel Area */}
      <div className="flex-1 bg-[#070906] p-5 overflow-y-auto space-y-5">
        {/* TAB 1: APPEARANCE & THEME */}
        {activeTab === "appearance" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Appearance Settings
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Configure desktop UI visuals, tactical theme presets, accent highlights, and HUD overlays.
              </p>
            </div>

            {/* Appearance Mode Selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#8E9B72] uppercase tracking-wider block">
                THEME PRESETS
              </span>
              <div className="grid grid-cols-3 gap-3">
                {/* Tactical Olive */}
                <button
                  onClick={() => {
                    setThemeMode("olive");
                    showToast("THEME APPLIED // TACTICAL OLIVE");
                  }}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    themeMode === "olive"
                      ? "border-[#8E9B72] bg-[#121610] shadow-[0_0_15px_rgba(142,155,114,0.2)]"
                      : "border-[#24291F] bg-[#0E120B] hover:border-[#3A4034]"
                  }`}
                >
                  <div className="w-full h-14 rounded-lg bg-gradient-to-br from-[#0B0E0A] via-[#121610] to-[#1F271B] border border-[#3A4034] relative overflow-hidden flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#8E9B72]">KAVACH</span>
                  </div>
                  <span className="text-[10px] font-bold text-white">Tactical Olive</span>
                </button>

                {/* Stealth Dark */}
                <button
                  onClick={() => {
                    setThemeMode("dark");
                    showToast("THEME APPLIED // STEALTH BLACK");
                  }}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    themeMode === "dark"
                      ? "border-[#8E9B72] bg-[#121610] shadow-[0_0_15px_rgba(142,155,114,0.2)]"
                      : "border-[#24291F] bg-[#0E120B] hover:border-[#3A4034]"
                  }`}
                >
                  <div className="w-full h-14 rounded-lg bg-gradient-to-br from-black via-[#080808] to-[#121212] border border-[#24291F] relative overflow-hidden flex items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-300">STEALTH</span>
                  </div>
                  <span className="text-[10px] font-bold text-white">Stealth Black</span>
                </button>

                {/* Crimson Alert */}
                <button
                  onClick={() => {
                    setThemeMode("crimson");
                    showToast("THEME APPLIED // CRIMSON ALERT");
                  }}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    themeMode === "crimson"
                      ? "border-[#EF4444] bg-[#160A0A] shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      : "border-[#24291F] bg-[#0E120B] hover:border-[#3A4034]"
                  }`}
                >
                  <div className="w-full h-14 rounded-lg bg-gradient-to-br from-[#120808] via-[#1F0A0A] to-[#2B0E0E] border border-red-900/50 relative overflow-hidden flex items-center justify-center">
                    <span className="text-[9px] font-bold text-red-400">CRIMSON</span>
                  </div>
                  <span className="text-[10px] font-bold text-white">Crimson Alert</span>
                </button>
              </div>
            </div>

            {/* Accent Color Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#8E9B72] uppercase tracking-wider block">
                ACCENT COLOR HIGHLIGHT
              </span>
              <div className="flex items-center gap-3 bg-[#0B0E0A] border border-[#24291F] p-3 rounded-xl">
                <button
                  onClick={() => {
                    setAccentColor("green");
                    showToast("ACCENT CHANGED // KAVACH GREEN");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    accentColor === "green"
                      ? "border-[#8E9B72] text-[#8E9B72] bg-[#121610]"
                      : "border-[#24291F] text-[#73786B]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8E9B72]" />
                  <span>Kavach Green</span>
                </button>

                <button
                  onClick={() => {
                    setAccentColor("blue");
                    showToast("ACCENT CHANGED // CYBER BLUE");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    accentColor === "blue"
                      ? "border-blue-500 text-blue-400 bg-blue-950/30"
                      : "border-[#24291F] text-[#73786B]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Cyber Blue</span>
                </button>

                <button
                  onClick={() => {
                    setAccentColor("amber");
                    showToast("ACCENT CHANGED // TACTICAL AMBER");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    accentColor === "amber"
                      ? "border-amber-500 text-amber-400 bg-amber-950/30"
                      : "border-[#24291F] text-[#73786B]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Tactical Amber</span>
                </button>
              </div>
            </div>

            {/* Desktop Overlays Toggle */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#8E9B72] uppercase tracking-wider block">
                DESKTOP HUD OVERLAYS
              </span>
              <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Desktop Radar & Weather Widgets</span>
                    <span className="text-[9.5px] text-[#73786B]">
                      Display live sector atmospherics and operational calendar on desktop
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowRadar(!showRadar);
                      showToast(`WIDGETS ${!showRadar ? "ENABLED" : "DISABLED"}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      showRadar ? "bg-[#8E9B72]" : "bg-[#24291F]"
                    }`}
                  >
                    <div
                      className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        showRadar ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#24291F]">
                  <div>
                    <span className="font-bold text-white block">Tactical HUD Corner Brackets</span>
                    <span className="text-[9.5px] text-[#73786B]">
                      Render tactical coordinate notches at the viewport corners
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCorners(!showCorners);
                      showToast(`HUD CORNERS ${!showCorners ? "ENABLED" : "DISABLED"}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      showCorners ? "bg-[#8E9B72]" : "bg-[#24291F]"
                    }`}
                  >
                    <div
                      className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        showCorners ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEFENSE & SECURITY */}
        {activeTab === "defense" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Defense & Security Protocols
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Configure AES-256 vault encryption, defense firewalling, and automated threat mitigation.
              </p>
            </div>

            {/* Clearance Banner */}
            <div className="bg-[#121610] border border-[#8E9B72]/40 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#8E9B72]" />
                <div>
                  <div className="text-xs font-bold text-white">CLEARANCE STATUS: LEVEL 4 CLEARED</div>
                  <div className="text-[9.5px] text-[#73786B]">AES-256 Hardware Token Validated</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-green-950/40 border border-green-500/40 text-green-400 text-[9px] font-bold uppercase">
                SECURED
              </span>
            </div>

            {/* Security Toggles */}
            <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Quantum AES-256 Vault Core</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Encrypt all local persistent storage using DARPA quantum vault standard
                  </span>
                </div>
                <button
                  onClick={() => {
                    setQuantumCrypto(!quantumCrypto);
                    showToast(`QUANTUM VAULT ${!quantumCrypto ? "ACTIVE" : "PAUSED"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    quantumCrypto ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      quantumCrypto ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#24291F]">
                <div>
                  <span className="font-bold text-white block">Hardened Defense Firewall</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Intercept and inspect all inbound/outbound packets for intrusion signatures
                  </span>
                </div>
                <button
                  onClick={() => {
                    setDefenseFirewall(!defenseFirewall);
                    showToast(`FIREWALL ${!defenseFirewall ? "ACTIVE" : "INACTIVE"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    defenseFirewall ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      defenseFirewall ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#24291F]">
                <div>
                  <span className="font-bold text-white block">Stealth Node Protocol</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Mask IP address and broadcast identity from external network probes
                  </span>
                </div>
                <button
                  onClick={() => {
                    setStealthMode(!stealthMode);
                    showToast(`STEALTH MODE ${!stealthMode ? "ENABLED" : "DISABLED"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    stealthMode ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      stealthMode ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Tactical Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast("KEYS ROTATED // NEW SHA-512 SEED GENERATED")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#3A4034] bg-[#121610] hover:border-[#8E9B72] text-[#D4D5C8] font-bold cursor-pointer transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#8E9B72]" />
                <span>Rotate Encryption Keys</span>
              </button>

              <button
                onClick={() => showToast("SYSTEM SCAN COMPLETE // NO THREATS DETECTED")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#3A4034] bg-[#121610] hover:border-[#8E9B72] text-[#D4D5C8] font-bold cursor-pointer transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#8E9B72]" />
                <span>Run Integrity Scan</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: NETWORK & COMMS */}
        {activeTab === "network" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Network & Communications
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Configure satellite uplink relays, encrypted peer-to-peer tunnels, and signal power gain.
              </p>
            </div>

            <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Satellite Relay Uplink</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Primary orbital communication node (Encrypted 440MHz)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSatRelay(!satRelay);
                    showToast(`SATELLITE UPLINK ${!satRelay ? "CONNECTED" : "OFFLINE"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    satRelay ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      satRelay ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Signal Power Slider */}
              <div className="pt-3 border-t border-[#24291F]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">Signal Power Gain</span>
                  <span className="text-[#8E9B72] font-bold">{signalGain} dBm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={signalGain}
                  onChange={(e) => setSignalGain(Number(e.target.value))}
                  className="w-full h-1 bg-[#24291F] rounded-full appearance-none cursor-pointer accent-[#8E9B72]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRIVACY & VAULT */}
        {activeTab === "privacy" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Privacy & Data Vault
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Configure zero-knowledge logging, biometric touch verification, and auto-purging routines.
              </p>
            </div>

            <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Zero-Knowledge Log Policy</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Do not store transient diagnostic data on disk
                  </span>
                </div>
                <button
                  onClick={() => {
                    setZeroLogs(!zeroLogs);
                    showToast(`LOG POLICY ${!zeroLogs ? "ENFORCED" : "STANDARD"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    zeroLogs ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      zeroLogs ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#24291F]">
                <div>
                  <span className="font-bold text-white block">Auto-Purge Inactive Workstation</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Lock workstation after 5 minutes of inactivity
                  </span>
                </div>
                <button
                  onClick={() => {
                    setAutoLock(!autoLock);
                    showToast(`AUTO-LOCK ${!autoLock ? "ACTIVE" : "DISABLED"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    autoLock ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      autoLock ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => showToast("LOGS PURGED // ZERO TRACE REMAINING")}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-red-900/60 bg-[#160A0A] hover:bg-red-950/40 text-red-400 font-bold cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Purge All Transient Cache</span>
            </button>
          </div>
        )}

        {/* TAB 5: PERFORMANCE & CORE */}
        {activeTab === "performance" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Hardware Core Allocation
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Monitor and tune CPU thread assignments, GPU radar acceleration, and power throttling.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-3.5">
                <span className="text-[9.5px] text-[#73786B] block mb-1">CPU THREAD POOL</span>
                <span className="text-lg font-bold text-white">8 ACTIVE CORES</span>
              </div>
              <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-3.5">
                <span className="text-[9.5px] text-[#73786B] block mb-1">GPU ACCELERATION</span>
                <span className="text-lg font-bold text-[#8E9B72]">RADAR CORE ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ALERTS & AUDIO */}
        {activeTab === "alerts" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Alerts & Audio Diagnostics
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Manage UI feedback audio chimes, security siren triggers, and console alert sounds.
              </p>
            </div>

            <div className="bg-[#0B0E0A] border border-[#24291F] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Tactical Audio Feedback</span>
                  <span className="text-[9.5px] text-[#73786B]">
                    Play mechanical chimes on window clicks and system actions
                  </span>
                </div>
                <button
                  onClick={() => {
                    setAudioPings(!audioPings);
                    showToast(`AUDIO PINGS ${!audioPings ? "ON" : "MUTED"}`);
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    audioPings ? "bg-[#8E9B72]" : "bg-[#24291F]"
                  }`}
                >
                  <div
                    className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      audioPings ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: OPERATIVE INFO (ABOUT) */}
        {activeTab === "about" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                System Credentials & Operative Info
              </h2>
              <p className="text-[10px] text-[#73786B]">
                Authoritative software specification and operative clearance record.
              </p>
            </div>

            {/* Specification Hardware Plate */}
            <div className="bg-[#0B0E0A] border border-[#3A4034] rounded-xl p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-[#24291F] pb-2">
                <span className="text-xs font-bold text-white">SYSTEM OVERVIEW</span>
                <span className="text-[9px] text-[#8E9B72] font-bold">KAVACH SECURE OS v1.0.4</span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-[10.5px]">
                <div className="text-[#73786B]">OPERATIVE NAME:</div>
                <div className="text-white font-bold">ANIMESH TIWARI</div>

                <div className="text-[#73786B]">CLEARANCE RATING:</div>
                <div className="text-[#8E9B72] font-bold">LEVEL 4 // FULL SYSTEM AUTHORIZATION</div>

                <div className="text-[#73786B]">SYSTEM HOST NODE:</div>
                <div className="text-white">NODE_01 // AP-LOCAL</div>

                <div className="text-[#73786B]">HYPERKERNEL VERSION:</div>
                <div className="text-white">KAVACH-DARPA-KERNEL v6.12</div>

                <div className="text-[#73786B]">BUILD FINGERPRINT:</div>
                <div className="text-gray-400">KV-99042-X-2026-FINAL</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

