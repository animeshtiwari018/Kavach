"use client";

import { useState } from "react";
import Preloader from "@/componants/preloader";
import LockScreen from "@/componants/lockscreen";
import Homepage from "@/componants/homepage";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return <Homepage />;
  }

  if (bootComplete) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <Preloader onComplete={() => setBootComplete(true)} />;
}
