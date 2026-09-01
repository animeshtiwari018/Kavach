"use client";

import { useState, useRef } from "react";
import {
  Shield,
  Folder,
  Radio,
  Award,
  ChevronRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Terminal,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const RANKS_DATA = [
  {
    id: "rank-02",
    step: "STEP 02",
    recordId: "SR-002",
    rankTitle: "FIELD OPERATIVE",
    rankCode: "RANK 02",
    symbol: "★",
    category: "CURRENT ASSIGNMENT",
    status: "ACTIVE",
    posting: "KAVACH WORKSTATION & INDEPENDENT ENGINEERING",
    role: "Full-Stack Web Developer & Systems Engineer",
    period: "2025 — PRESENT",
    previousRank: "CADET",
    objective:
      "Engineers high-reliability web applications, custom workstation environments, microservices, and optimized algorithmic data engines.",
    duties: [
      "Architected Next.js workstation portfolio shell featuring window drag/resize physics management and webcam telemetry",
      "Developed high-throughput Node.js microservices with Redis rate-limiting algorithms and JWT security pipelines",
      "Created modular component systems with Framer Motion animations and custom dark-theme design tokens",
      "Managed version control, CI/CD workflows, and production deployments on Vercel and Docker",
    ],
    skillsDeployed: ["Next.js 15", "React 19", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion", "Git"],
  },
  {
    id: "rank-01",
    step: "STEP 01",
    recordId: "SR-001",
    rankTitle: "CADET",
    rankCode: "RANK 01",
    symbol: "◆",
    category: "INTERNSHIP ASSIGNMENT",
    status: "COMPLETED",
    posting: "WEB ENGINEERING INTERNSHIP",
    role: "Full-Stack Web Developer Intern",
    period: "2024 — 2025",
    previousRank: "N/A",
    objective:
      "First professional web engineering internship focused on full-stack web application development, academic resource portals, and REST API integration.",
    duties: [
      "Built Student Resource Portal web app for academic resource distribution and indexed document search pipelines",
      "Developed responsive frontend interfaces using React, JavaScript (ES6+), and Tailwind CSS",
      "Integrated MongoDB schemas with Mongoose ORM and Express REST API authorization endpoints",
      "Collaborated on version control using Git, code reviews, and cross-browser responsiveness testing",
    ],
    skillsDeployed: ["React", "JavaScript (ES6+)", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"],
  },
  {
    id: "rank-03",
    step: "STEP 03",
    recordId: "SR-003",
    rankTitle: "TECHNICAL OFFICER",
    rankCode: "RANK 03",
    symbol: "○",
    category: "NEXT LEVEL DIRECTIVE",
    status: "LOCKED",
    posting: "FULL-STACK SOFTWARE ENGINEER",
    role: "Software Engineer / Full-Stack Engineer",
    period: "FUTURE DIRECTIVE",
    previousRank: "FIELD OPERATIVE",
    objective:
      "Target professional milestone advancing towards full-time Software Engineer positions, microservice architecture design, and enterprise-grade systems.",
    duties: [
      "Design scalable enterprise microservices and event-driven architecture pipelines",
      "Lead feature delivery and full-stack web engineering across production codebases",
      "Optimize system performance, security middlewares, and automated testing suites",
    ],
    skillsDeployed: ["Software Engineering", "Microservices", "System Architecture", "Production Deployment"],
  },
  {
    id: "rank-04",
    step: "STEP 04",
    recordId: "SR-004",
    rankTitle: "COMMAND LEVEL",
    rankCode: "RANK 04",
    symbol: "○",
    category: "FUTURE CAREER OBJECTIVE",
    status: "LOCKED",
    posting: "SENIOR SOFTWARE ARCHITECT / LEAD ENGINEER",
    role: "Senior Engineering Lead & Systems Architect",
    period: "FUTURE DIRECTIVE",
    previousRank: "TECHNICAL OFFICER",
    objective:
      "Long-term career objective focusing on distributed cloud architecture, lead engineering management, and high-impact software systems.",
    duties: [
      "Architect enterprise-scale distributed cloud systems and real-time data pipelines",
      "Lead cross-functional engineering teams in delivering zero-downtime infrastructure",
      "Drive system security protocols, CI/CD pipelines, and performance benchmarks",
    ],
    skillsDeployed: ["System Architecture", "Distributed Systems", "Cloud Infrastructure", "Engineering Leadership"],
  },
];

export default function ServiceRecordApp() {
  const [selectedRankId, setSelectedRankId] = useState("rank-02");
  const [isAccessingRecord, setIsAccessingRecord] = useState(false);
  const accessTimerRef = useRef(null);

  // Dynamic Sidebar & Middle Column Resizing
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(250);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const currentRank = RANKS_DATA.find((r) => r.id === selectedRankId) || RANKS_DATA[0];

  const handleSelectRank = (rankId) => {
    if (rankId === selectedRankId && !isAccessingRecord) return;
    setSelectedRankId(rankId);
    setIsAccessingRecord(true);
    if (accessTimerRef.current) clearTimeout(accessTimerRef.current);
    accessTimerRef.current = setTimeout(() => {
      setIsAccessingRecord(false);
    }, 320);
  };

  const startResizingSidebar = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(130, Math.min(290, startWidth + deltaX));
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizingSidebar(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const startResizingList = (e) => {
    e.preventDefault();
    setIsResizingList(true);
    const startX = e.clientX;
    const startWidth = listWidth;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(160, Math.min(420, startWidth + deltaX));
      setListWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizingList(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-[#121610] border-[#8E9B72]/60 text-[#8E9B72]";
      case "COMPLETED":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "LOCKED":
        return "bg-red-500/10 border-[#C95555]/40 text-[#C95555]";
      default:
        return "bg-[#121610] border-[#8E9B72]/40 text-[#8E9B72]";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#141614] text-[#E2E4DF] font-sans select-none overflow-hidden text-xs">
      {/* Top Application Header Bar */}
      <div className="h-11 px-4 bg-[#181B18] border-b border-[#2A2E29] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#C2B280]" />
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest uppercase">
            KAVACH // SERVICE RECORD
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            SYS STATUS: OPERATIONAL
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
            [ PROTECTED ]
          </span>
        </div>
      </div>

      {/* Main 3-Column Workstation Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Left Navigation Sidebar */}
        <div
          style={{ width: `${sidebarWidth}px` }}
          className="bg-[#181B18] flex flex-col h-full shrink-0 p-3 select-none overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Kavach Network Group */}
          <div className="mb-4">
            <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase mb-2 px-1 font-mono flex items-center justify-between">
              <span>KAVACH NETWORK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C6F52] inline-block animate-pulse" />
            </div>

            <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-[#A8ACA2] hover:bg-[#222622] transition-colors mb-1">
              <span className="flex items-center gap-2 truncate font-mono text-[11px]">
                <Folder className="w-3.5 h-3.5 shrink-0 text-[#C2B280]" />
                <span className="truncate">FILES</span>
              </span>
              <span className="text-[10px] font-mono text-[#7A8274] font-semibold shrink-0">
                4
              </span>
            </button>
          </div>

          {/* Operations Group */}
          <div className="flex-1 overflow-y-auto space-y-3">
            <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase px-1 font-mono">
              OPERATIONS
            </div>

            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">Skills</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">SYS</span>
              </button>

              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">Projects</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">OPS</span>
              </button>

              {/* Service Record Item (Highlighted with Muted Olive Accent) */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold shadow-sm">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#C2B280] text-[10px]">◈</span>
                  <span className="truncate">Service Record</span>
                </span>
                <span className="text-[9px] text-[#C2B280] font-bold shrink-0">
                  {RANKS_DATA.length}
                </span>
              </button>

              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">Contact</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">COMM</span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-2 border-t border-[#2A2E29] text-[9px] font-mono text-[#7A8274] flex items-center justify-between shrink-0">
            <span>SYS: OPERATIONAL</span>
            <span className="text-[#C2B280] font-bold">KAVACH // v2.6</span>
          </div>
        </div>

        {/* Resizer Handle 1 (between Column 1 and Column 2) */}
        <div
          onMouseDown={startResizingSidebar}
          onDoubleClick={() => setSidebarWidth(195)}
          className={`w-1 h-full cursor-col-resize hover:bg-[#5C6F52] transition-colors shrink-0 z-30 ${
            isResizingSidebar ? "bg-[#5C6F52]" : "bg-[#2A2E29]"
          }`}
          title="Drag to resize sidebar (Double click to reset)"
        />

        {/* Column 2: Middle Career Progression Pane */}
        <div
          style={{ width: `${listWidth}px` }}
          className="bg-[#1C1F1C] flex flex-col h-full shrink-0 overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Header & Horizontal Compact Progression Indicator */}
          <div className="p-3 border-b border-[#2A2E29] bg-[#181B18] space-y-2 shrink-0">
            <div className="text-[10px] font-mono font-bold text-[#C2B280] tracking-wider uppercase flex items-center justify-between">
              <span>CAREER PROGRESSION</span>
              <span className="text-[9px] text-[#708764]">RANK 02 / 04</span>
            </div>

            {/* Horizontal Compact Progression Indicator Bar */}
            <div className="text-[8.5px] font-mono text-[#7A8274] pt-1 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
              <span className="text-[#8E9B72] font-bold">CADET</span>
              <span className="text-[#5C6F52]">──●──</span>
              <span className="text-[#C2B280] font-bold">FLD OPS</span>
              <span className="text-[#5E6255]">──○──</span>
              <span className="text-[#5E6255]">TECH OFF</span>
              <span className="text-[#5E6255]">──○──</span>
              <span className="text-[#5E6255]">CMD</span>
            </div>
          </div>

          {/* Vertical Rank Ladder Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 font-mono">
            {RANKS_DATA.map((rank) => {
              const isSelected = rank.id === selectedRankId;
              const isCurrent = rank.status === "ACTIVE";
              const isLocked = rank.status === "LOCKED";

              return (
                <div
                  key={rank.id}
                  onClick={() => handleSelectRank(rank.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all relative border ${
                    isSelected
                      ? "bg-[#344030]/60 border-[#5C6F52]/80 text-[#E2E4DF] shadow-sm"
                      : isLocked
                      ? "border-[#2A2E29]/60 bg-[#141614]/40 text-[#5E6255] hover:bg-[#181B18]"
                      : "border-transparent hover:bg-[#252924] text-[#A8ACA2]"
                  }`}
                >
                  {/* Active Khaki Accent Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C2B280] rounded-r" />
                  )}

                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className="font-bold text-[#8E9B72] flex items-center gap-1.5">
                      <span className="text-[#C2B280] font-bold">{rank.symbol}</span>
                      <span>{rank.step}</span>
                    </span>
                    <span
                      className={`text-[8.5px] px-1.5 py-0.2 rounded border font-bold uppercase ${getStatusBadgeStyle(
                        rank.status
                      )}`}
                    >
                      {rank.status}
                    </span>
                  </div>

                  {/* Rank Title */}
                  <div
                    className={`font-bold text-xs truncate ${
                      isCurrent
                        ? "text-[#E2E4DF]"
                        : isLocked
                        ? "text-[#7A8274]"
                        : "text-[#D0D3CB]"
                    }`}
                  >
                    {rank.rankTitle}
                  </div>

                  {/* Subtitle / Posting hint */}
                  <div className="text-[9.5px] text-[#73786B] truncate mt-0.5">
                    {rank.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resizer Handle 2 (between Column 2 and Column 3) */}
        <div
          onMouseDown={startResizingList}
          onDoubleClick={() => setListWidth(250)}
          className={`w-1 h-full cursor-col-resize hover:bg-[#5C6F52] transition-colors shrink-0 z-30 ${
            isResizingList ? "bg-[#5C6F52]" : "bg-[#2A2E29]"
          }`}
          title="Drag to resize rank list (Double click to reset)"
        />

        {/* Column 3: Right Selected Rank Posting Dossier */}
        <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {isAccessingRecord ? (
              /* FAST SUBTLE RECORD TRANSITION SCREEN */
              <motion.div
                key="accessing-record"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 font-mono space-y-3 text-xs select-none h-full flex flex-col justify-start pt-10"
              >
                <div className="text-[#8E9B72] font-bold tracking-widest flex items-center gap-2 text-xs uppercase">
                  <span>ACCESSING SERVICE RECORD...</span>
                  <span className="w-2 h-2 rounded-full bg-[#8E9B72] inline-block animate-ping" />
                </div>

                <div className="w-full border-b border-dashed border-[#2A2E29]" />

                <div className="text-[#C2B280] font-bold tracking-wider text-[11px] uppercase">
                  RANK IDENTIFIED
                </div>

                <div className="text-xl font-bold text-[#E2E4DF] tracking-tight">
                  {currentRank.rankCode} // {currentRank.rankTitle}
                </div>

                <div className="space-y-1.5 text-[#9CA396] pt-2 text-[11px]">
                  <div className="flex gap-4">
                    <span className="w-28 text-[#7A8274]">CLASSIFICATION</span>
                    <span>: {currentRank.category}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-28 text-[#7A8274]">STATUS</span>
                    <span className="text-emerald-400 font-bold uppercase">
                      : {currentRank.status}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-28 text-[#7A8274]">ASSIGNMENT</span>
                    <span>: ASSIGNMENT FOUND</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* FULL POSTING DOSSIER DISPLAY */
              <motion.div
                key={currentRank.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-6 space-y-6 font-mono text-xs"
              >
                {/* Header: Rank Code & Title */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#8E9B72] tracking-widest font-bold uppercase flex items-center justify-between">
                    <span>{currentRank.rankCode}</span>
                    <span className="text-[#7A8274]">{currentRank.recordId}</span>
                  </div>

                  <h1 className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-0.5 flex items-center gap-2">
                    <span>{currentRank.rankTitle}</span>
                    {currentRank.status === "ACTIVE" && (
                      <span className="text-xs text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-mono font-bold">
                        [ CURRENT RANK ]
                      </span>
                    )}
                  </h1>

                  <p className="text-[11px] text-[#C2B280] font-semibold tracking-wide pt-0.5">
                    {currentRank.category}
                  </p>

                  <div className="w-full border-b border-dashed border-[#2A2E29] pt-3" />
                </div>

                {/* Classification Transition Box */}
                <div className="bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 space-y-3 shadow-sm">
                  <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase border-b border-[#2A2E29] pb-2 flex items-center justify-between">
                    <span>KAVACH CLASSIFICATION MATRIX</span>
                    <span className="text-[#708764]">{currentRank.recordId}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        POSTING
                      </span>
                      <span className="text-[#E2E4DF] font-semibold block mt-0.5">
                        {currentRank.posting}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        ROLE
                      </span>
                      <span className="text-[#E2E4DF] font-semibold block mt-0.5">
                        {currentRank.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        PERIOD
                      </span>
                      <span className="text-[#C2B280] font-semibold block mt-0.5">
                        {currentRank.period}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        STATUS
                      </span>
                      <span
                        className={`inline-block mt-0.5 px-2 py-0.5 rounded border text-[9.5px] font-bold uppercase ${getStatusBadgeStyle(
                          currentRank.status
                        )}`}
                      >
                        ● {currentRank.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Objective / Overview Section */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C2B280]" />
                    <span>ASSIGNMENT OBJECTIVE</span>
                  </div>
                  <p className="text-xs text-[#D0D3CB] leading-relaxed pt-0.5">
                    {currentRank.objective}
                  </p>
                </div>

                {/* Primary Duties & Responsibilities Section */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#708764]" />
                    <span>PRIMARY DUTIES & RESPONSIBILITIES</span>
                  </div>
                  <ul className="space-y-1.5 text-[#D0D3CB]">
                    {currentRank.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-[#5C6F52] shrink-0 font-bold">•</span>
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Deployed Section */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C2B280]" />
                    <span>SKILLS DEPLOYED</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {currentRank.skillsDeployed.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#191C19] border border-[#2A2E29] text-[#8E9B72] font-mono text-[11px] font-bold rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Record Audit Telemetry Footer */}
                <div className="bg-[#181C18]/60 border border-[#2D362A] rounded-lg p-3 space-y-1 text-[10px]">
                  <div className="flex flex-wrap justify-between text-[#7A8274] font-bold">
                    <span>FILE: {currentRank.recordId}</span>
                    <span>CLASSIFICATION: PROFESSIONAL</span>
                    <span>STATUS: {currentRank.status}</span>
                    <span className="text-[#C2B280]">RECORD UPDATED: 2026</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
