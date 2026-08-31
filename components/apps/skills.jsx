"use client";

import { useState } from "react";
import {
  Brain,
  Code2,
  Activity,
  Layers,
  CheckCircle2,
  Terminal,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const CORE_CAPABILITIES = [
  { name: "JAVASCRIPT (ES6+)", status: "OPERATIONAL", level: 95, type: "Core Language" },
  { name: "REACT 19", status: "OPERATIONAL", level: 92, type: "Frontend Core" },
  { name: "NODE.JS", status: "OPERATIONAL", level: 90, type: "Server Runtime" },
  { name: "EXPRESS.JS", status: "ACTIVE", level: 88, type: "API Framework" },
  { name: "MONGODB", status: "ACTIVE", level: 85, type: "Database Store" },
];

const SUPPORT_SYSTEMS = [
  { name: "GIT / GITHUB", status: "OPERATIONAL", level: 92, type: "Version Control" },
  { name: "REST API ARCHITECTURE", status: "ACTIVE", level: 95, type: "Network Protocol" },
  { name: "TAILWIND CSS", status: "OPERATIONAL", level: 94, type: "Design System" },
  { name: "NEXT.JS 15", status: "OPERATIONAL", level: 90, type: "React Framework" },
];

const CURRENT_TRAINING = [
  { name: "C++ / DSA", status: "IN PROGRESS", level: 75, detail: "Data Structures, Algorithms & Problem Solving" },
  { name: "SYSTEM DESIGN", status: "IN PROGRESS", level: 70, detail: "Microservices, Distributed Systems & Caching" },
];

export default function SkillsApp() {
  return (
    <div className="w-full h-full flex flex-col bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F] relative">
      {/* Top Header Strip */}
      <div className="px-4 py-2 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
          <Brain className="w-4 h-4 text-green-400" />
          <span>SKILL INTELLIGENCE REPORT</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold">
          <span className="text-[#8E9B72]">[ SYSTEM LEVEL 4 ]</span>
          <span className="text-green-400">[ VERIFIED ]</span>
          <span className="text-[#5E6255]">[ WIN ]</span>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#070906]">
        {/* Primary Domain Card */}
        <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2 shadow-lg relative">
          <div className="flex items-center justify-between text-[9px] text-[#73786B] font-bold tracking-widest uppercase">
            <span>PRIMARY DOMAIN</span>
            <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 rounded">
              EXPERT CLEARANCE
            </span>
          </div>
          <h1 className="text-base font-bold text-white tracking-widest">
            FULL STACK DEVELOPMENT & SYSTEMS ARCHITECTURE
          </h1>
          <p className="text-xs text-[#8E9B72] leading-relaxed">
            Engineering modern end-to-end web applications, microservices pipelines, and interactive desktop workstation interfaces.
          </p>
        </div>

        {/* Core Capabilities Section */}
        <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-[#24291F] pb-2">
            <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase flex items-center gap-2">
              <Code2 className="w-4 h-4 text-green-400" />
              <span>CORE CAPABILITIES</span>
            </h2>
            <span className="text-[9px] text-[#5E6255] font-bold">STATUS TELEMETRY</span>
          </div>

          <div className="space-y-2.5">
            {CORE_CAPABILITIES.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 3 }}
                className="p-2.5 bg-[#121610] border border-[#24291F] rounded flex flex-col space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs tracking-wider">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                    ● {skill.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[9.5px] text-[#73786B]">
                  <span className="w-28 text-[#8E9B72] font-semibold">{skill.type}</span>
                  <div className="flex-1 h-1.5 bg-[#070906] border border-[#24291F] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="font-bold text-white w-8 text-right">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Systems Section */}
        <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-[#24291F] pb-2">
            <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-green-400" />
              <span>SUPPORT SYSTEMS</span>
            </h2>
            <span className="text-[9px] text-[#5E6255] font-bold">INFRASTRUCTURE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUPPORT_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#121610] border border-[#24291F] rounded space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px] truncate">
                    {sys.name}
                  </span>
                  <span className="text-[9px] font-bold text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
                    ● {sys.status}
                  </span>
                </div>
                <div className="h-1.5 bg-[#070906] border border-[#24291F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${sys.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Training Section */}
        <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-[#24291F] pb-2">
            <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>CURRENT TRAINING</span>
            </h2>
            <span className="text-[9px] text-amber-400 font-bold">ACTIVE EVOLUTION</span>
          </div>

          <div className="space-y-2">
            {CURRENT_TRAINING.map((tr, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#121610] border border-[#24291F] rounded flex flex-col space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs tracking-wider">
                    {tr.name}
                  </span>
                  <span className="text-[9.5px] font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#fbbf24]" />
                    ● {tr.status}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#73786B]">{tr.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Telemetry Bar */}
      <div className="px-4 py-2 bg-[#0A0C09] border-t border-[#24291F] flex items-center justify-between text-[9.5px] text-[#73786B] font-semibold">
        <span>SKILL MATRIX: <strong className="text-white">FULLY VERIFIED</strong></span>
        <span className="flex items-center gap-1.5">
          TELEMETRY: <strong className="text-green-400">ONLINE</strong>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
        </span>
      </div>
    </div>
  );
}
