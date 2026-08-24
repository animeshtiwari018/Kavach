"use client";

import { useState } from "react";
import Preloader from "@/componants/preloader";
import LockScreen from "@/componants/lockscreen";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  if (bootComplete) {
    return <LockScreen />;
  }

  return <Preloader onComplete={() => setBootComplete(true)} />;
}
