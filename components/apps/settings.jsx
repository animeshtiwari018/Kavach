"use client";

import { useState } from "react";

export default function SettingsApp() {
  const [firewall, setFirewall] = useState(true);
  const [crypto, setCrypto] = useState(true);
  const [diagnostics, setDiagnostics] = useState(false);
  const [accent, setAccent] = useState("green"); // green, amber, blue

  return (
    <div className="w-full h-full flex flex-col bg-[#070906] text-[#D4D5C8] font-mono text-[11px] overflow-auto p-4 space-y-4">
      {/* System Hardware Plate */}
      <div className="border border-[#24291F] bg-[#121610] p-3 rounded space-y-2">
        <h3 className="text-white font-bold text-xs tracking-wider border-b border-[#24291F] pb-1 uppercase">
          System Overview
        </h3>
        <div className="grid grid-cols-2 gap-y-1.5 text-[10px] text-[#73786B]">
          <div>OS IDENT:</div>
          <div className="text-white font-bold">KAVACH SECURE OS v1.0.4</div>
          <div>HOST NODE:</div>
          <div className="text-white">NODE_01 // AP-LOCAL</div>
          <div>OPERATOR:</div>
          <div className="text-white">ANIMESH TIWARI</div>
          <div>CRYPTO CORE:</div>
          <div className="text-white">AES-256 QUANTUM VAULT</div>
        </div>
      </div>

      {/* Security Protocols switches */}
      <div className="space-y-3">
        <h3 className="text-[#8E9B72] font-bold text-xs tracking-wider border-b border-[#24291F] pb-1 uppercase">
          Security Protocols
        </h3>

        {/* Firewall Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="block font-bold">CORE FIREWALL SECURITY</span>
            <span className="text-[9px] text-[#73786B]">Filter unauthorized network packets</span>
          </div>
          <button
            onClick={() => setFirewall(!firewall)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
              firewall ? "bg-[#8E9B72]" : "bg-[#24291F]"
            }`}
          >
            <div
              className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                firewall ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Cryptographic Tunneling Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="block font-bold">ENCRYPTED PROTOCOL TUNNEL</span>
            <span className="text-[9px] text-[#73786B]">Force AES-256 packaging on data streams</span>
          </div>
          <button
            onClick={() => setCrypto(!crypto)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
              crypto ? "bg-[#8E9B72]" : "bg-[#24291F]"
            }`}
          >
            <div
              className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                crypto ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Diagnostics Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="block font-bold">AUDIO DIAGNOSTIC FEEDBACK</span>
            <span className="text-[9px] text-[#73786B]">Pings and alerts for UI action states</span>
          </div>
          <button
            onClick={() => setDiagnostics(!diagnostics)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
              diagnostics ? "bg-[#8E9B72]" : "bg-[#24291F]"
            }`}
          >
            <div
              className={`bg-[#070906] w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                diagnostics ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Accent Color customizer */}
      <div className="space-y-2.5">
        <h3 className="text-white font-bold text-xs tracking-wider border-b border-[#24291F] pb-1 uppercase">
          Desktop Theme Theme Accent
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAccent("green")}
            className={`flex items-center gap-1.5 px-2.5 py-1 border rounded text-[10px] cursor-pointer transition-colors ${
              accent === "green" 
                ? "border-[#8E9B72] text-[#8E9B72] bg-[#121610]" 
                : "border-[#24291F] text-[#73786B] hover:text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B72]" />
            Kavach Green
          </button>
          <button
            onClick={() => setAccent("amber")}
            className={`flex items-center gap-1.5 px-2.5 py-1 border rounded text-[10px] cursor-pointer transition-colors ${
              accent === "amber" 
                ? "border-amber-500 text-amber-500 bg-amber-950/20" 
                : "border-[#24291F] text-[#73786B] hover:text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Amber Orange
          </button>
          <button
            onClick={() => setAccent("blue")}
            className={`flex items-center gap-1.5 px-2.5 py-1 border rounded text-[10px] cursor-pointer transition-colors ${
              accent === "blue" 
                ? "border-blue-500 text-blue-500 bg-blue-950/20" 
                : "border-[#24291F] text-[#73786B] hover:text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Cyber Blue
          </button>
        </div>
      </div>
    </div>
  );
}
