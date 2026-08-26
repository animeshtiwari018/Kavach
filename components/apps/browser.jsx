"use client";

import { useState } from "react";

const PAGES = {
  "https://kavach.security": {
    title: "Kavach Security Gateway",
    body: (
      <div className="space-y-4">
        <h2 className="text-[#8E9B72] text-sm font-bold border-b border-[#24291F] pb-1">KAVACH SYSTEMS GATEWAY v1.0.4</h2>
        <p className="text-xs text-[#73786B] leading-relaxed">
          Kavach is an enterprise-grade digital vault and shield designed to secure critical operator workstations. Powered by Next.js and high-frequency cryptographic modules, Kavach ensures zero-leak operational isolation.
        </p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-[#121610] p-2 border border-[#24291F] rounded">
            <span className="block text-[#8E9B72] font-bold">NODE STATUS</span>
            <span className="text-green-400">ACTIVE & SECURED</span>
          </div>
          <div className="bg-[#121610] p-2 border border-[#24291F] rounded">
            <span className="block text-[#8E9B72] font-bold">KEY PROTOCOL</span>
            <span className="text-white">QUANTUM AES-256</span>
          </div>
        </div>
      </div>
    ),
  },
  "https://github.com/kavach": {
    title: "Kavach GitHub Repository",
    body: (
      <div className="space-y-3">
        <h2 className="text-white text-sm font-bold flex items-center gap-2">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          kavach-org / core-vault
        </h2>
        <p className="text-xs text-[#73786B]">
          Public repository for Kavach cryptographic primitives and tactical operating interface configurations.
        </p>
        <div className="bg-[#121610] p-3 border border-[#24291F] rounded space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-[#8E9B72]">Build:</span>
            <span className="text-green-400 font-bold">Passing</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E9B72]">Coverage:</span>
            <span className="text-white">98.4%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E9B72]">License:</span>
            <span className="text-white">MIT</span>
          </div>
        </div>
      </div>
    ),
  },
  "https://nextjs.org": {
    title: "Next.js - The React Framework",
    body: (
      <div className="space-y-3">
        <h2 className="text-white text-sm font-bold">NEXT.JS 16 Framework</h2>
        <p className="text-xs text-[#73786B] leading-relaxed">
          Next.js is a flexible React framework that gives you building blocks to create fast web applications. Used for Kavach due to App Router caching, Server Components capability, and fast load optimization.
        </p>
        <div className="text-[10px] text-[#8E9B72] border-t border-[#24291F] pt-2">
          Features Utilized: App Router, Client Actions, React 19 Compiler.
        </div>
      </div>
    ),
  },
};

export default function BrowserApp() {
  const [url, setUrl] = useState("https://kavach.security");
  const [currentUrl, setCurrentUrl] = useState("https://kavach.security");

  const navigateTo = (targetUrl) => {
    setUrl(targetUrl);
    setCurrentUrl(targetUrl);
  };

  const handleGo = (e) => {
    e.preventDefault();
    if (PAGES[url]) {
      setCurrentUrl(url);
    } else {
      navigateTo("https://kavach.security");
    }
  };

  const activePage = PAGES[currentUrl] || PAGES["https://kavach.security"];

  return (
    <div className="w-full h-full flex flex-col bg-[#070906] text-[#D4D5C8] font-mono text-[11px] overflow-hidden">
      {/* Browser Navigation Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-[#24291F] bg-[#0A0C09]">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1.5 text-[#5E6255]">
          <button 
            disabled 
            className="w-5 h-5 rounded border border-[#24291F] hover:text-white transition-colors cursor-not-allowed opacity-50 flex items-center justify-center"
          >
            ‹
          </button>
          <button 
            disabled 
            className="w-5 h-5 rounded border border-[#24291F] hover:text-white transition-colors cursor-not-allowed opacity-50 flex items-center justify-center"
          >
            ›
          </button>
          <button 
            onClick={() => setUrl(currentUrl)}
            className="w-5 h-5 rounded border border-[#24291F] hover:text-white transition-colors cursor-pointer flex items-center justify-center text-[10px]"
            title="Reload"
          >
            ⟳
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleGo} className="flex-1 flex items-center bg-[#121610] border border-[#24291F] rounded px-2 py-0.5">
          <span className="text-[#5E6255] text-[9px] mr-1 select-none">🔒</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-[10px] caret-[#8E9B72]"
          />
        </form>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-3 px-3 py-1 bg-[#121610] border-b border-[#24291F] text-[9px] text-[#73786B] font-bold select-none">
        <span className="text-[#5E6255]">BOOKMARKS:</span>
        <button 
          onClick={() => navigateTo("https://kavach.security")}
          className={`hover:text-white cursor-pointer transition-colors ${currentUrl === "https://kavach.security" ? "text-[#8E9B72]" : ""}`}
        >
          🛡️ Kavach Sec
        </button>
        <button 
          onClick={() => navigateTo("https://github.com/kavach")}
          className={`hover:text-white cursor-pointer transition-colors ${currentUrl === "https://github.com/kavach" ? "text-[#8E9B72]" : ""}`}
        >
          🐙 Core Repo
        </button>
        <button 
          onClick={() => navigateTo("https://nextjs.org")}
          className={`hover:text-white cursor-pointer transition-colors ${currentUrl === "https://nextjs.org" ? "text-[#8E9B72]" : ""}`}
        >
          ▲ Next.js
        </button>
      </div>

      {/* Web Content Render Frame */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0A0C09]/50">
        <div className="max-w-md mx-auto">
          {activePage.body}
        </div>
      </div>
    </div>
  );
}
