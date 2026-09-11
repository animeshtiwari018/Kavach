"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, AlertTriangle, Clock, Code2, ChevronRight } from "lucide-react";

const DECOMMISSIONED = [
  {
    id: "D-001",
    name: "QuickNotes Chrome Extension",
    type: "Browser Extension",
    stack: "Vanilla JS • Chrome API • LocalStorage",
    year: "2024",
    reason: "SCOPE CREEP",
    summary:
      "Started as a minimal note-taking extension. Kept adding features — sync, tagging, markdown — until the architecture became a mess. Abandoned mid-refactor when I realized it needed a full rewrite to be viable.",
    lessons: "Define scope hard before building. A tool that tries to do everything does nothing well.",
    phase: "Mid-Development",
  },
  {
    id: "D-002",
    name: "Campus Event Aggregator",
    type: "Full-Stack Web App",
    stack: "React • Node.js • Puppeteer • MongoDB",
    year: "2024",
    reason: "DATA ACCESS BLOCKED",
    summary:
      "A scraper + aggregator that pulled events from college portals and unified them in one dashboard. Worked locally but got blocked when colleges added bot-detection and login walls. No official API existed.",
    lessons: "Validate data access before investing in the product. Scraping is fragile by design.",
    phase: "Beta / Blocked",
  },
  {
    id: "D-003",
    name: "CLI Task Manager",
    type: "Command Line Tool",
    stack: "Python • Click • SQLite • Rich",
    year: "2023",
    reason: "SUPERSEDED",
    summary:
      "A terminal-based task manager with tags, priorities, and deadline tracking. Worked well but I already used Notion — I was solving a problem I didn't actually have. Stopped maintaining it after a few weeks.",
    lessons: "Build for real pain, not imagined convenience. If you wouldn't use it, no one will.",
    phase: "Complete but Unused",
  },
  {
    id: "D-004",
    name: "Real-Time Code Collaboration Editor",
    type: "Full-Stack Application",
    stack: "React • Socket.io • Node.js • Monaco Editor",
    year: "2025",
    reason: "COMPLEXITY OVERRUN",
    summary:
      "A live collaborative code editor with cursor sync, presence indicators, and shared execution. The operational-transform logic for conflict resolution became exponentially hard. Paused indefinitely — the problem is genuinely difficult.",
    lessons: "OT and CRDT algorithms are not weekend projects. Prototype the hardest part first.",
    phase: "Prototype / Paused",
  },
];

const REASON_STYLE = {
  "SCOPE CREEP":       "bg-amber-500/10 border-amber-500/25 text-amber-400",
  "DATA ACCESS BLOCKED": "bg-red-500/10 border-red-500/25 text-red-400",
  "SUPERSEDED":        "bg-[#181B18] border-[#4A5044]/50 text-[#7A8274]",
  "COMPLEXITY OVERRUN": "bg-orange-500/10 border-orange-500/25 text-orange-400",
};

export default function TrashApp() {
  const [selectedId, setSelectedId] = useState("D-001");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);

  const selected = DECOMMISSIONED.find((p) => p.id === selectedId) || DECOMMISSIONED[0];

  return (
    <div className="w-full h-full flex flex-col bg-[#141614] text-[#E2E4DF] font-sans select-none overflow-hidden text-xs">

      {/* Header Bar */}
      <div className="h-11 px-4 bg-[#181B18] border-b border-[#2A2E29] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <Trash2 className="w-3.5 h-3.5 text-[#7A8274]" />
          <span className="text-[#A8ACA2] font-bold text-[11px] tracking-widest uppercase">
            KAVACH // DECOMMISSIONED
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#5A5E55]">
          <span>{DECOMMISSIONED.length} RECORDS</span>
          <span className="px-1.5 py-0.5 border border-[#2A2E29] rounded text-[9px] text-[#5A5E55]">
            ARCHIVED
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Project List */}
        <div
          className={`${showMobileList ? "flex" : "hidden"} md:flex w-full md:w-[260px] shrink-0 flex-col border-r border-[#2A2E29] bg-[#161816] overflow-hidden`}
        >
          {/* List header */}
          <div className="px-3 py-2.5 border-b border-[#2A2E29] text-[9.5px] font-mono font-bold text-[#5A5E55] tracking-widest uppercase">
            PROJECT FILES
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {DECOMMISSIONED.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <div
                  key={p.id}
                  onClick={() => { setSelectedId(p.id); setShowMobileList(false); }}
                  className={`relative px-3 py-2.5 rounded-lg cursor-pointer transition-all border font-mono ${
                    isSelected
                      ? "bg-[#1E211E] border-[#3A3F38] text-[#E2E4DF]"
                      : "border-transparent hover:bg-[#1A1D1A] text-[#8A8E84]"
                  }`}
                >
                  {/* Accent line */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#4A5044] rounded-r" />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[11px] truncate leading-snug">
                        {p.name}
                      </div>
                      <div className="text-[9.5px] text-[#5A5E55] mt-0.5 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 shrink-0" />
                        {p.year} · {p.phase}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="w-3 h-3 text-[#4A5044] shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="mt-1.5">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded border text-[8.5px] font-bold uppercase tracking-wider ${
                        REASON_STYLE[p.reason] || "bg-[#181B18] border-[#2A2E29] text-[#5A5E55]"
                      }`}
                    >
                      {p.reason}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* List footer */}
          <div className="px-3 py-2 border-t border-[#2A2E29] text-[9px] font-mono text-[#404540] flex items-center gap-1.5">
            <Trash2 className="w-2.5 h-2.5" />
            <span>these projects taught me more than the ones that shipped</span>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className={`${!showMobileList ? "flex" : "hidden"} md:flex flex-1 flex-col overflow-hidden`}>

          {/* Mobile back button */}
          <div className="md:hidden px-3 pt-3 pb-0 border-b border-[#2A2E29] bg-[#181B18] shrink-0">
            <button
              onClick={() => setShowMobileList(true)}
              className="mb-3 px-3 py-1.5 bg-[#1C1F1C] border border-[#2A2E29] text-[#A8ACA2] text-[10px] uppercase font-bold font-mono rounded flex items-center gap-2 hover:text-[#E2E4DF] hover:border-[#3A3F38] transition-colors"
            >
              ← BACK
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-5 space-y-5 font-mono"
            >
              {/* Project header */}
              <div className="space-y-1 pb-4 border-b border-[#2A2E29]">
                <div className="text-[9.5px] text-[#5A5E55] tracking-widest uppercase font-bold">
                  {selected.id} · {selected.type}
                </div>
                <h2 className="text-xl font-bold text-[#D4D6D0] tracking-tight leading-tight">
                  {selected.name}
                </h2>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${
                      REASON_STYLE[selected.reason] || "bg-[#181B18] border-[#2A2E29] text-[#5A5E55]"
                    }`}
                  >
                    ✕ {selected.reason}
                  </span>
                  <span className="text-[9.5px] text-[#5A5E55] flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {selected.year}
                  </span>
                  <span className="text-[9.5px] text-[#5A5E55]">
                    Phase: {selected.phase}
                  </span>
                </div>
              </div>

              {/* Stack */}
              <div className="space-y-1.5">
                <div className="text-[9.5px] font-bold text-[#5A5E55] tracking-widest uppercase flex items-center gap-1.5">
                  <Code2 className="w-3 h-3" /> TECH STACK
                </div>
                <div className="text-[#9CA396] text-[11px]">{selected.stack}</div>
              </div>

              {/* What happened */}
              <div className="space-y-2">
                <div className="text-[9.5px] font-bold text-[#5A5E55] tracking-widest uppercase flex items-center gap-1.5 border-b border-[#222622] pb-1.5">
                  <AlertTriangle className="w-3 h-3 text-[#5A5E55]" /> WHAT HAPPENED
                </div>
                <p className="text-[#B0B4AC] text-[12px] leading-relaxed">
                  {selected.summary}
                </p>
              </div>

              {/* Lessons */}
              <div className="bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 space-y-1.5">
                <div className="text-[9.5px] font-bold text-[#4A5044] tracking-widest uppercase">
                  LESSON LEARNED
                </div>
                <p className="text-[#8A9086] text-[11.5px] leading-relaxed italic">
                  "{selected.lessons}"
                </p>
              </div>

              {/* Divider note */}
              <div className="text-[9px] text-[#3A3E38] font-mono pt-2 border-t border-[#1E211E]">
                FILE STATUS: DECOMMISSIONED · NOT FOR DEPLOYMENT · RETAINED FOR REFERENCE
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
