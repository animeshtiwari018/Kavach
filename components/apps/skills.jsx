"use client";

import { useState } from "react";
import {
  Radio,
  Shield,
  Search,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Wrench,
  Zap,
  Flame,
  Activity,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";

// Army Regiments & Corps Skill Architecture Data
const ARMY_REGIMENT_DIVISIONS = [
  {
    regimentId: "CORPS-SIGNALS",
    corpsName: "CORPS OF SIGNALS",
    motto: "TEEVRA CHHAUKANNA (SWIFT AND ALERT)",
    responsibility: "Command-and-control communications, network-centric warfare, high-frequency REST API ingress routing, and server stream protocols.",
    badgeColor: "border-green-500/50 text-green-400 bg-green-500/10",
    skills: [
      {
        name: "NODE.JS",
        code: "SIG-MOD-01",
        status: "OPERATIONAL",
        level: 95,
        responsibility: "Asynchronous non-blocking event-driven server runtime engine and stream processing.",
      },
      {
        name: "EXPRESS.JS",
        code: "SIG-MOD-02",
        status: "ACTIVE",
        level: 88,
        responsibility: "RESTful API route pipeline, security headers middleware, and payload validation.",
      },
      {
        name: "REST API ARCHITECTURE",
        code: "SIG-MOD-03",
        status: "OPERATIONAL",
        level: 95,
        responsibility: "HTTP/HTTPS protocols, JSON contracts, endpoint authorization, and rate limiting.",
      },
    ],
  },
  {
    regimentId: "CORPS-ENGINEERS",
    corpsName: "CORPS OF ENGINEERS (SAPPERS)",
    motto: "SARVATRA (EVERYWHERE)",
    responsibility: "Tactical bridgehead construction, application UI layout tokens, dynamic component composition, and full-stack architecture.",
    badgeColor: "border-[#8E9B72]/60 text-[#8E9B72] bg-[#8E9B72]/10",
    skills: [
      {
        name: "REACT 19",
        code: "ENG-MOD-01",
        status: "OPERATIONAL",
        level: 92,
        responsibility: "Dynamic component trees, state management Hooks, and client interaction layer.",
      },
      {
        name: "NEXT.JS 15",
        code: "ENG-MOD-02",
        status: "OPERATIONAL",
        level: 90,
        responsibility: "Server Components (RSC), App Router shells, fast static regeneration & SSR.",
      },
      {
        name: "TAILWIND CSS",
        code: "ENG-MOD-03",
        status: "OPERATIONAL",
        level: 94,
        responsibility: "Utility-first design tokens, responsive viewports, and custom dark mode themes.",
      },
      {
        name: "JAVASCRIPT (ES6+)",
        code: "ENG-MOD-04",
        status: "OPERATIONAL",
        level: 95,
        responsibility: "Core language primitives, async/await promises, ES modules, and closure scopes.",
      },
    ],
  },
  {
    regimentId: "CORPS-AIR-DEFENCE",
    corpsName: "CORPS OF ARMY AIR DEFENCE (AAD)",
    motto: "AKASHE SHATRUN JAHI (KILL THE ENEMY IN THE SKY)",
    responsibility: "Airspace protection, vault data isolation, document database indexing, and JWT authentication security shielding.",
    badgeColor: "border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
    skills: [
      {
        name: "MONGODB",
        code: "AAD-MOD-01",
        status: "ACTIVE",
        level: 85,
        responsibility: "NoSQL document store, schema indexing, aggregation pipelines, and vault security.",
      },
      {
        name: "JWT & RBAC AUTHENTICATION",
        code: "AAD-MOD-02",
        status: "OPERATIONAL",
        level: 92,
        responsibility: "Token signature verification, role clearance enforcement, and session defense.",
      },
    ],
  },
  {
    regimentId: "INTELLIGENCE-CORPS",
    corpsName: "INTELLIGENCE CORPS",
    motto: "SADA SEVA (ALWAYS SERVING)",
    responsibility: "Tactical code audit trails, version control history, algorithmic problem solving, and threat assessment.",
    badgeColor: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    skills: [
      {
        name: "GIT / GITHUB",
        code: "INT-MOD-01",
        status: "OPERATIONAL",
        level: 92,
        responsibility: "Version control audit trails, branch merging, pull requests, and CI/CD tracking.",
      },
      {
        name: "C++ / DSA (DATA STRUCTURES)",
        code: "INT-MOD-02",
        status: "IN PROGRESS",
        level: 75,
        responsibility: "Algorithmic complexity optimization, memory allocation, and problem solving.",
      },
      {
        name: "SYSTEM DESIGN & DISTRIBUTED SYSTEMS",
        code: "INT-MOD-03",
        status: "IN PROGRESS",
        level: 70,
        responsibility: "Microservices architecture, Redis in-memory caching, and scalability patterns.",
      },
    ],
  },
];

export default function SkillsApp() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full h-full flex flex-col bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F]">
      {/* Window Top Sub-Header */}
      <div className="px-4 py-2 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
          <Shield className="w-4 h-4 text-green-400" />
          <span>TACTICAL SKILLS ARCHITECTURE // REGIMENT MATRIX</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold">
          <span className="text-[#8E9B72]">[ REGIMENT MATRIX ]</span>
          <span className="text-green-400">[ VERIFIED ]</span>
          <span className="text-[#5E6255]">[ SECURE ]</span>
        </div>
      </div>

      {/* Search Bar Strip */}
      <div className="px-4 py-2 bg-[#0C0E0B] border-b border-[#24291F] flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-[#121610] border border-[#24291F] rounded focus-within:border-[#8E9B72] transition-colors">
          <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
          <input
            type="text"
            placeholder="Search regiment skills or responsibilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255] uppercase tracking-wider"
          />
        </div>
        <div className="text-[9.5px] text-[#73786B] font-bold">
          TOTAL CORPS: <strong className="text-white">04</strong> | ACTIVE MODULES: <strong className="text-green-400">11</strong>
        </div>
      </div>

      {/* Main Regiments Scroll Workspace */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#070906]">
        {ARMY_REGIMENT_DIVISIONS.map((regiment) => {
          // Filter skills based on search query
          const filteredSkills = regiment.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.responsibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
              regiment.corpsName.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div
              key={regiment.regimentId}
              className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4 shadow-lg relative"
            >
              {/* Regiment Division Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#24291F] pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 border text-[9px] font-bold rounded uppercase ${regiment.badgeColor}`}>
                      {regiment.regimentId}
                    </span>
                    <h2 className="text-sm font-bold text-white tracking-wider">
                      {regiment.corpsName}
                    </h2>
                  </div>
                  <div className="text-[9.5px] text-[#8E9B72] font-semibold tracking-widest uppercase">
                    MOTTO: {regiment.motto}
                  </div>
                </div>

                <div className="text-[9px] text-[#5E6255] font-bold tracking-wider uppercase">
                  STATUS: <span className="text-green-400 font-bold">● OPERATIONAL READY</span>
                </div>
              </div>

              {/* Regiment Responsibility Statement */}
              <p className="text-[10.5px] text-[#73786B] italic border-l-2 border-[#8E9B72]/60 pl-3 py-0.5">
                "{regiment.responsibility}"
              </p>

              {/* Skill Box Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSkills.map((skill) => {
                  const isCompleted = skill.status === "OPERATIONAL" || skill.status === "ACTIVE";
                  return (
                    <motion.div
                      key={skill.code}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 border border-[#24291F] hover:border-[#8E9B72] bg-[#121610] rounded flex flex-col justify-between space-y-2.5 transition-all shadow-md group"
                    >
                      {/* Skill Box Top Strip */}
                      <div className="flex items-start justify-between gap-2 border-b border-[#24291F]/80 pb-2">
                        <div className="space-y-0.5">
                          <span className="text-[8.5px] text-[#5E6255] font-bold block">
                            {skill.code}
                          </span>
                          <h3 className="font-bold text-white text-xs group-hover:text-[#8E9B72] transition-colors">
                            {skill.name}
                          </h3>
                        </div>

                        <span
                          className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded border ${
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
                                ? "bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]"
                                : skill.status === "ACTIVE"
                                ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"
                                : "bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]"
                            }`}
                          />
                          ● {skill.status}
                        </span>
                      </div>

                      {/* Skill Responsibility Explanation */}
                      <p className="text-[10px] text-[#D4D5C8] leading-relaxed">
                        {skill.responsibility}
                      </p>

                      {/* Telemetry Level Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[9px] text-[#73786B] font-bold">
                          <span>TACTICAL PROFICIENCY:</span>
                          <span className="text-white font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-[#070906] border border-[#24291F] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
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
          );
        })}
      </div>

      {/* Footer Bar */}
      <div className="px-4 py-2 bg-[#0A0C09] border-t border-[#24291F] flex items-center justify-between text-[9.5px] text-[#73786B] font-mono">
        <span>ARMY REGIMENT MATRIX: <strong className="text-white">100% OPERATIONAL</strong></span>
        <span className="flex items-center gap-1.5 font-bold text-green-400">
          <span>ALL CORPS TELEMETRY ONLINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
        </span>
      </div>
    </div>
  );
}
