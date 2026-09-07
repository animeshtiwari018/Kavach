"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("kavach_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.themeMode !== undefined) setThemeMode(parsed.themeMode);
        if (parsed.accentColor !== undefined) setAccentColor(parsed.accentColor);
        if (parsed.showRadar !== undefined) setShowRadar(parsed.showRadar);
        if (parsed.showCorners !== undefined) setShowCorners(parsed.showCorners);
        if (parsed.quantumCrypto !== undefined) setQuantumCrypto(parsed.quantumCrypto);
        if (parsed.defenseFirewall !== undefined) setDefenseFirewall(parsed.defenseFirewall);
        if (parsed.stealthMode !== undefined) setStealthMode(parsed.stealthMode);
        if (parsed.satRelay !== undefined) setSatRelay(parsed.satRelay);
        if (parsed.signalGain !== undefined) setSignalGain(parsed.signalGain);
        if (parsed.zeroLogs !== undefined) setZeroLogs(parsed.zeroLogs);
        if (parsed.autoLock !== undefined) setAutoLock(parsed.autoLock);
        if (parsed.audioPings !== undefined) setAudioPings(parsed.audioPings);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const stateToSave = {
        themeMode, accentColor, showRadar, showCorners, quantumCrypto, 
        defenseFirewall, stealthMode, satRelay, signalGain, zeroLogs, autoLock, audioPings
      };
      localStorage.setItem("kavach_settings", JSON.stringify(stateToSave));
    }
  }, [themeMode, accentColor, showRadar, showCorners, quantumCrypto, defenseFirewall, stealthMode, satRelay, signalGain, zeroLogs, autoLock, audioPings, isLoaded]);

  const value = {
    themeMode, setThemeMode,
    accentColor, setAccentColor,
    iconStyle, setIconStyle,
    showRadar, setShowRadar,
    showCorners, setShowCorners,
    quantumCrypto, setQuantumCrypto,
    defenseFirewall, setDefenseFirewall,
    stealthMode, setStealthMode,
    threatNeutralize, setThreatNeutralize,
    satRelay, setSatRelay,
    meshNetwork, setMeshNetwork,
    signalGain, setSignalGain,
    zeroLogs, setZeroLogs,
    biometricAuth, setBiometricAuth,
    autoLock, setAutoLock,
    audioPings, setAudioPings,
    alertSirens, setAlertSirens,
    diagnosticLogs, setDiagnosticLogs,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
