"use client";

import { useState } from "react";
import {
  Brain,
  Shield,
  Search,
  CheckCircle2,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Radio,
  Target,
  Zap,
  Globe,
  Database,
  Lock,
  GitBranch,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const REGIMENTS = [
  { id: "ALL", name: "ALL REGIMENTS", motto: "SYSTEM MATRIX" },
  { id: "SIGNALS", name: "CORPS OF SIGNALS", motto: "TEEVRA CHHAUKANNA" },
  { id: "ENGINEERS", name: "CORPS OF ENGINEERS", motto: "SARVATRA" },
  { id: "AIR-DEFENCE", name: "AIR DEFENCE (AAD)", motto: "AKASHE SHATRUN JAHI" },
  { id: "INTELLIGENCE", name: "INTELLIGENCE CORPS", motto: "SADA SEVA" },
];

const SKILLS_DATA = [
  // CORPS OF SIGNALS
  {
    id: "sig-1",
    name: "NODE.JS",
    regimentId: "SIGNALS",
    regimentName: "CORPS OF SIGNALS",
    motto: "TEEVRA CHHAUKANNA (SWIFT AND ALERT)",
    responsibility: "Asynchronous non-blocking event loop server runtime & high-frequency stream processing.",
    status: "OPERATIONAL",
    level: 95,
    icon: Terminal,
    color: "text-green-400",
  },
  {
    id: "sig-2",
    name: "EXPRESS.JS",
    regimentId: "SIGNALS",
    regimentName: "CORPS OF SIGNALS",
    motto: "TEEVRA CHHAUKANNA (SWIFT AND ALERT)",
    responsibility: "RESTful API ingress routing pipeline, security middleware, and request contracts.",
    status: "ACTIVE",
    level: 88,
    icon: Radio,
    color: "text-cyan-400",
  },
  {
    id: "sig-3",
    name: "REST API ARCHITECTURE",
    regimentId: "SIGNALS",
    regimentName: "CORPS OF SIGNALS",
    motto: "TEEVRA CHHAUKANNA (SWIFT AND ALERT)",
    responsibility: "HTTP/HTTPS protocols, JSON contracts, rate limiting, and microservice communication.",
    status: "OPERATIONAL",
    level: 95,
    icon: Globe,
    color: "text-green-400",
  },

  // CORPS OF ENGINEERS
  {
    id: "eng-1",
    name: "REACT 19",
    regimentId: "ENGINEERS",
    regimentName: "CORPS OF ENGINEERS",
    motto: "SARVATRA (EVERYWHERE)",
    responsibility: "Dynamic component composition trees, state management Hooks, and client interaction.",
    status: "OPERATIONAL",
    level: 92,
    icon: Code2,
    color: "text-green-400",
  },
  {
    id: "eng-2",
    name: "NEXT.JS 15",
    regimentId: "ENGINEERS",
    regimentName: "CORPS OF ENGINEERS",
    motto: "SARVATRA (EVERYWHERE)",
    responsibility: "Full-stack Server Components (RSC), App Router shells, and fast load optimization.",
    status: "OPERATIONAL",
    level: 90,
    icon: Layers,
    color: "text-green-400",
  },
  {
    id: "eng-3",
    name: "TAILWIND CSS",
    regimentId: "ENGINEERS",
    regimentName: "CORPS OF ENGINEERS",
    motto: "SARVATRA (EVERYWHERE)",
    responsibility: "Utility-first design tokens, responsive viewports, and custom dark mode themes.",
    status: "OPERATIONAL",
    level: 94,
    icon: Zap,
    color: "text-green-400",
  },
  {
    id: "eng-4",
    name: "JAVASCRIPT (ES6+)",
    regimentId: "ENGINEERS",
    regimentName: "CORPS OF ENGINEERS",
    motto: "SARVATRA (EVERYWHERE)",
    responsibility: "Core language execution, async/await promises, ES modules, and closure scopes.",
    status: "OPERATIONAL",
    level: 95,
    icon: Cpu,
    color: "text-green-400",
  },

  // AIR DEFENCE
  {
    id: "aad-1",
    name: "MONGODB",
    regimentId: "AIR-DEFENCE",
    regimentName: "CORPS OF ARMY AIR DEFENCE",
    motto: "AKASHE SHATRUN JAHI (KILL ENEMY IN SKY)",
    responsibility: "NoSQL document store, schema indexing, aggregation pipelines, and vault data security.",
    status: "ACTIVE",
    level: 85,
    icon: Database,
    color: "text-cyan-400",
  },
  {
    id: "aad-2",
    name: "JWT & RBAC AUTH",
    regimentId: "AIR-DEFENCE",
    regimentName: "CORPS OF ARMY AIR DEFENCE",
    motto: "AKASHE SHATRUN JAHI (KILL ENEMY IN SKY)",
    responsibility: "Token signature verification, role clearance enforcement, and session defense.",
    status: "OPERATIONAL",
    level: 92,
    icon: Lock,
    color: "text-green-400",
  },

  // INTELLIGENCE CORPS
  {
    id: "int-1",
    name: "GIT / GITHUB",
    regimentId: "INTELLIGENCE",
    regimentName: "INTELLIGENCE CORPS",
    motto: "SADA SEVA (ALWAYS SERVING)",
    responsibility: "Version control audit trails, branch merging, pull requests, and repository tracking.",
    status: "OPERATIONAL",
    level: 92,
    icon: GitBranch,
    color: "text-green-400",
  },
  {
    id: "int-2",
    name: "C++ / DSA",
    regimentId: "INTELLIGENCE",
    regimentName: "INTELLIGENCE CORPS",
    motto: "SADA SEVA (ALWAYS SERVING)",
    responsibility: "Data structures, algorithmic complexity optimization, memory allocation & problem solving.",
    status: "IN PROGRESS",
    level: 75,
    icon: Target,
    color: "text-amber-400",
  },
];

export default function SkillsApp() {
  const [selectedRegiment, setSelectedRegiment] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesRegiment =
      selectedRegiment === "ALL" || skill.regimentId === selectedRegiment;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.responsibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.regimentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegiment && matchesSearch;
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F]">
      {/* Top Header Bar */}
      <div className="px-4 py-2 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
          <Brain className="w-4 h-4 text-green-400" />
          <span>SKILL INTELLIGENCE REPORT</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-bold">
          <span className="text-[#8E9B72]">[ SYSTEM LEVEL 4 ]</span>
          <span className="text-green-400">[ VERIFIED ]</span>
        </div>
      </div>

      {/* Regiment Quick Filter Tabs */}
      <div className="px-3 py-1.5 bg-[#0C0E0B] border-b border-[#24291F] flex items-center gap-1.5 overflow-x-auto text-[9.5px]">
        {REGIMENTS.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegiment(reg.id)}
            className={`px-2.5 py-1 rounded border font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedRegiment === reg.id
                ? "bg-[#121610] border-green-500/60 text-green-400 shadow-sm"
                : "border-[#24291F] text-[#73786B] hover:text-white hover:bg-[#121610]/50"
            }`}
          >
            {reg.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 bg-[#070906] border-b border-[#24291F] flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-[#121610] border border-[#24291F] rounded focus-within:border-[#8E9B72] transition-colors">
          <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
          <input
            type="text"
            placeholder="Search skills or responsibilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255] uppercase tracking-wider"
          />
        </div>
        <div className="text-[9.5px] text-[#73786B] font-bold">
          SHOWING: <strong className="text-white">{filteredSkills.length} SKILLS</strong>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#070906]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
          {filteredSkills.map((skill) => {
            const IconComp = skill.icon;
            return (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 bg-[#0A0C09] hover:bg-[#121610] border border-[#24291F] hover:border-green-500/50 rounded-lg transition-all shadow-md flex flex-col justify-between space-y-3 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-[#121610] border border-[#24291F] group-hover:border-green-500/40 text-green-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs tracking-wider group-hover:text-green-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[8.5px] text-[#8E9B72] font-semibold tracking-wider block">
                        {skill.regimentName}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`flex items-center gap-1 text-[8.5px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                      skill.status === "OPERATIONAL"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : skill.status === "ACTIVE"
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        skill.status === "OPERATIONAL"
                          ? "bg-green-400 animate-pulse"
                          : skill.status === "ACTIVE"
                          ? "bg-cyan-400 animate-pulse"
                          : "bg-amber-400 animate-pulse"
                      }`}
                    />
                    ● {skill.status}
                  </span>
                </div>

                {/* Responsibility Text */}
                <p className="text-[10px] text-[#D4D5C8] leading-relaxed">
                  {skill.responsibility}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1 border-t border-[#24291F]/60">
                  <div className="flex justify-between text-[9px] text-[#73786B] font-bold">
                    <span>PROFICIENCY TELEMETRY</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[#070906] border border-[#24291F] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        skill.status === "OPERATIONAL"
                          ? "bg-green-400"
                          : skill.status === "ACTIVE"
                          ? "bg-cyan-400"
                          : "bg-amber-400"
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="px-4 py-1.5 bg-[#0A0C09] border-t border-[#24291F] flex items-center justify-between text-[9px] text-[#73786B]">
        <span>REGIMENT MATRIX: <strong className="text-white">VERIFIED</strong></span>
        <span className="text-green-400 font-bold">● TELEMETRY OPERATIONAL</span>
      </div>
    </div>
  );
}
