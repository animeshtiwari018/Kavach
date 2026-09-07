"use client";

import { SettingsProvider } from "../context/SettingsContext";

export function Providers({ children }) {
  return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
  );
}
