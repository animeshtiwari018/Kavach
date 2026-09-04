"use client";

import { useState } from "react";
import Preloader from "@/components/system/preloader";
import LockScreen from "@/components/system/lockscreen";
import Homepage from "@/components/system/homepage";
import MobileHomepage from "@/components/system/mobile-homepage";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { isMobile } = useWindowSize();

  if (unlocked) {
    if (isMobile) {
      return <MobileHomepage onLogout={() => setUnlocked(false)} />;
    }
    return <Homepage onLogout={() => setUnlocked(false)} />;
  }

  if (bootComplete) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <Preloader onComplete={() => setBootComplete(true)} />;
}
