"use client";

import { useState } from "react";
import {
  Brain,
  Code2,
  Cpu,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Radio,
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
    <div className="w-full h-full flex flex-col bg-[#0B0F17] text-slate-200 font-mono text-[11px] select-none overflow-hidden border-t border-slate-800 relative">
      {/* Top Window Sub-Header Strip */}
      <div className="px-4 py-2 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>SKILL INTELLIGENCE REPORT</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold">
          <span className="text-cyan-400">[ SYSTEM LEVEL 4 ]</span>
          <span className="text-emerald-400">[ VERIFIED ]</span>
          <span className="text-slate-400">[ WIN ]</span>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0B0F17]">
        {/* Primary Domain Card */}
        <div className="p-4 border border-slate-800/90 bg-[#0F172A]/80 rounded-lg space-y-2 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold tracking-widest uppercase">
            <span>PRIMARY DOMAIN</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">
              EXPERT CLEARANCE
            </span>
          </div>
          <h1 className="text-base font-bold text-white tracking-widest">
            FULL STACK DEVELOPMENT & SYSTEMS ARCHITECTURE
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineering modern end-to-end web applications, microservices pipelines, and interactive desktop workstation interfaces.
          </p>
        </div>

        {/* Core Capabilities Section */}
        <div className="p-4 border border-slate-800 bg-[#0F172A]/60 rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>CORE CAPABILITIES</span>
            </h2>
            <span className="text-[9px] text-slate-400 font-bold">STATUS TELEMETRY</span>
          </div>

          <div className="space-y-2.5">
            {CORE_CAPABILITIES.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 3 }}
                className="p-2.5 bg-[#0B0F17] border border-slate-800/80 rounded flex flex-col space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs tracking-wider">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                    ● {skill.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[9.5px] text-slate-400">
                  <span className="w-24 text-slate-400 font-medium">{skill.type}</span>
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-300 w-8 text-right">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Systems Section */}
        <div className="p-4 border border-slate-800 bg-[#0F172A]/60 rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>SUPPORT SYSTEMS</span>
            </h2>
            <span className="text-[9px] text-slate-400 font-bold">INFRASTRUCTURE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUPPORT_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#0B0F17] border border-slate-800/80 rounded space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px] truncate">
                    {sys.name}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ● {sys.status}
                  </span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${sys.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Training Section */}
        <div className="p-4 border border-slate-800 bg-[#0F172A]/60 rounded-lg space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>CURRENT TRAINING</span>
            </h2>
            <span className="text-[9px] text-amber-400/90 font-bold">ACTIVE EVOLUTION</span>
          </div>

          <div className="space-y-2">
            {CURRENT_TRAINING.map((tr, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded flex flex-col space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs tracking-wider">
                    {tr.name}
                  </span>
                  <span className="text-[9.5px] font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                    ● {tr.status}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400">{tr.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Telemetry Bar */}
      <div className="px-4 py-2 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between text-[9.5px] text-slate-400 font-semibold">
        <span>SKILL MATRIX: <strong className="text-cyan-400">FULLY VERIFIED</strong></span>
        <span className="flex items-center gap-1.5">
          TELEMETRY: <strong className="text-emerald-400">ONLINE</strong>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </span>
      </div>
    </div>
  );
}
