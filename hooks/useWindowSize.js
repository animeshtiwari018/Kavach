"use client";

import { useState, useEffect } from "react";

export function useWindowSize() {
  const [state, setState] = useState({
    winWidth: typeof window !== "undefined" ? window.innerWidth : 1024,
    winHeight: typeof window !== "undefined" ? window.innerHeight : 768,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => {
      setState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    // Call it immediately in case of late hydrations
    handler();

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return state;
}
