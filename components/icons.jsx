"use client";

import React from "react";

export function AppleIcon({ className = "w-4 h-4" }) {
  return (
    <img
      src="/images/kavach.png"
      alt="Kavach"
      className={`${className} object-contain select-none pointer-events-none`}
      draggable="false"
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
