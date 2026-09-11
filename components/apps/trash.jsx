"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, AlertTriangle, Clock, Code2, ChevronLeft } from "lucide-react";

const DECOMMISSIONED = [
  {
    id: "D-001",
    name: "QuickNotes Chrome Extension",
    type: "Browser Extension",
    stack: ["Vanilla JS", "Chrome API", "LocalStorage"],
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
    stack: ["React", "Node.js", "Puppeteer", "MongoDB"],
    year: "2024",
    reason: "DATA ACCESS BLOCKED",
    summary:
      "A scraper + aggregator that pulled events from college portals and unified them in one dashboard. Worked locally but got blocked when colleges added bot-detection and login walls. No official API existed.",
    lessons: "Validate data access before investing in the product. Scraping is fragile by design.",
    phase: "Beta · Blocked",
  },
  {
    id: "D-003",
    name: "CLI Task Manager",
    type: "Command Line Tool",
    stack: ["Python", "Click", "SQLite", "Rich"],
    year: "2023",
    reason: "SUPERSEDED",
    summary:
      "A terminal-based task manager with tags, priorities, and deadline tracking. Worked well but I already used Notion — I was solving a problem I didn't actually have. Stopped maintaining it after a few weeks.",
    lessons: "Build for real pain, not imagined convenience. If you wouldn't use it, no one will.",
    phase: "Complete · Unused",
  },
  {
    id: "D-004",
    name: "Real-Time Collaboration Editor",
    type: "Full-Stack Application",
    stack: ["React", "Socket.io", "Node.js", "Monaco Editor"],
    year: "2025",
    reason: "COMPLEXITY OVERRUN",
    summary:
      "A live collaborative code editor with cursor sync, presence indicators, and shared execution. The operational-transform logic for conflict resolution became exponentially hard. Paused indefinitely — the problem is genuinely difficult.",
    lessons: "OT and CRDT algorithms are not weekend projects. Prototype the hardest part first.",
    phase: "Prototype · Paused",
  },
];

const REASON_STYLE = {
  "SCOPE CREEP":         "bg-amber-500/10 border-amber-500/20 text-amber-400/90",
  "DATA ACCESS BLOCKED": "bg-red-500/10   border-red-500/20   text-red-400/90",
  "SUPERSEDED":          "bg-[#1E211E]    border-[#3A3F38]    text-[#6A706A]",
  "COMPLEXITY OVERRUN":  "bg-orange-500/10 border-orange-500/20 text-orange-400/90",
};

export default function TrashApp() {
  const [selectedId, setSelectedId] = useState("D-001");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selected = DECOMMISSIONED.find((p) => p.id === selectedId) ?? DECOMMISSIONED[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    if (isMobile) setShowMobileList(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#141614] text-[#D4D6D0] font-mono select-none overflow-hidden text-xs">

      {/* ── Header ── */}
      <div className="h-10 px-4 bg-[#181B18] border-b border-[#252925] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Trash2 className="w-3 h-3 text-[#5A5E55]" />
          <span className="text-[#6A706A] font-bold text-[10.5px] tracking-widest uppercase">
            Decommissioned
          </span>
        </div>
        <span className="text-[9px] text-[#3E4240] tracking-wider">
          {DECOMMISSIONED.length} records
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── List Panel ── */}
        <div
          className={`${showMobileList ? "flex" : "hidden"} md:flex
            w-full md:w-[240px] shrink-0 flex-col
            border-r border-[#252925] bg-[#161816] overflow-hidden`}
        >
          {/* List header */}
          <div className="px-3 py-2 border-b border-[#252925]">
            <span className="text-[9px] font-bold text-[#444844] tracking-widest uppercase">
              Project Files
            </span>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-px">
            {DECOMMISSIONED.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`w-full text-left relative px-3 py-2.5 rounded-md cursor-pointer transition-colors border ${
                    isSelected
                      ? "bg-[#1C1F1C] border-[#303530] text-[#D4D6D0]"
                      : "border-transparent hover:bg-[#191C19] text-[#787C78]"
                  }`}
                >
                  {/* Left accent bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#505850] rounded-r" />
                  )}

                  <div className="text-[11px] font-semibold truncate leading-snug mb-1">
                    {p.name}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] text-[#4A4E4A] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 shrink-0" />
                      {p.year}
                    </span>
                    <span
                      className={`inline-block px-1.5 py-px rounded border text-[8px] font-bold uppercase tracking-wide ${
                        REASON_STYLE[p.reason] ?? "bg-[#1E211E] border-[#3A3F38] text-[#5A5E55]"
                      }`}
                    >
                      {p.reason}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-3 py-2.5 border-t border-[#252925] text-[8.5px] text-[#363A36] leading-relaxed">
            failed builds teach more than shipped ones
          </div>
        </div>

        {/* ── Detail Panel ── */}
        <div
          className={`${!showMobileList ? "flex" : "hidden"} md:flex
            flex-1 flex-col overflow-hidden bg-[#141614]`}
        >
          {/* Mobile back */}
          {isMobile && (
            <div className="px-3 py-2 border-b border-[#252925] bg-[#181B18] shrink-0">
              <button
                onClick={() => setShowMobileList(true)}
                className="flex items-center gap-1.5 text-[10px] text-[#6A706A] hover:text-[#9CA396] transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
                All Files
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex-1 overflow-y-auto"
            >
              <div className="p-5 space-y-6">

                {/* ── Project Header ── */}
                <div className="pb-4 border-b border-[#232623]">
                  <div className="text-[9px] text-[#444844] tracking-widest uppercase mb-2">
                    {selected.id} · {selected.type}
                  </div>
                  <h2 className="text-[18px] font-bold text-[#D4D6D0] tracking-tight leading-snug mb-3">
                    {selected.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[8.5px] font-bold uppercase tracking-wider ${
                        REASON_STYLE[selected.reason] ?? "bg-[#1E211E] border-[#3A3F38] text-[#5A5E55]"
                      }`}
                    >
                      ✕ {selected.reason}
                    </span>
                    <span className="text-[9px] text-[#4A4E4A] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {selected.year}
                    </span>
                    <span className="text-[9px] text-[#4A4E4A]">
                      {selected.phase}
                    </span>
                  </div>
                </div>

                {/* ── Tech Stack ── */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#444844] tracking-widest uppercase">
                    <Code2 className="w-2.5 h-2.5" />
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-[#1A1D1A] border border-[#2A2E29] rounded text-[9.5px] text-[#7A807A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── What Happened ── */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#444844] tracking-widest uppercase">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    What Happened
                  </div>
                  <p className="text-[12px] text-[#9CA396] leading-relaxed">
                    {selected.summary}
                  </p>
                </div>

                {/* ── Lesson Learned ── */}
                <div className="relative pl-3 border-l-2 border-[#3A3F38]">
                  <div className="text-[9px] font-bold text-[#4A4E4A] tracking-widest uppercase mb-1.5">
                    Lesson Learned
                  </div>
                  <p className="text-[11.5px] text-[#787C78] leading-relaxed italic">
                    &ldquo;{selected.lessons}&rdquo;
                  </p>
                </div>

                {/* ── Footer note ── */}
                <div className="pt-2 border-t border-[#1E211E] text-[8.5px] text-[#333733] tracking-wider">
                  FILE STATUS: DECOMMISSIONED · NOT FOR DEPLOYMENT · RETAINED FOR REFERENCE
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
