"use client";

import { useState } from "react";
import Preloader from "@/components/system/preloader";
import LockScreen from "@/components/system/lockscreen";
import Homepage from "@/components/system/homepage";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return <Homepage onLogout={() => setUnlocked(false)} />;
  }

  if (bootComplete) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <Preloader onComplete={() => setBootComplete(true)} />;
}
