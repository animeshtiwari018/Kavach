"use client";

import { useState, useRef } from "react";
import {
  Search,
  ExternalLink,
  Shield,
  Folder,
  Radio,
  FileText,
  Target,
  Layers,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  Terminal,
  Layers3,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const MISSIONS = [
  {
    id: "001",
    code: "MISSION 001",
    recordId: "KVC-RECORD-001",
    opCode: "OPERATION // 001",
    title: "STUDENT RESOURCE PORTAL",
    classType: "FULL-STACK WEB APPLICATION",
    status: "DEPLOYED",
    date: "2026",
    stackSummary: "React • Node.js • Express • MongoDB",
    objective:
      "Centralized academic resource distribution and verified course materials platform engineered to eliminate fragmentation in student file sharing. Replaced legacy manual file distribution with a high-availability Next.js architecture and indexed MongoDB document query pipeline.",
    capabilities: [
      "Role-Based Access Control (RBAC) separating student and faculty clearances",
      "Instant multi-filter search indexing across 500+ course PDFs and notes",
      "JWT authentication pipeline with automated token rotation & session security",
      "Responsive interface optimized for low-bandwidth mobile and desktop access",
    ],
    technicalDeployment: {
      frontend: "React / Tailwind CSS",
      backend: "Node.js / Express",
      database: "MongoDB / Mongoose",
      deployment: "Vercel / Render",
    },
    techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://student-resource-portal.example.com",
    repoUrl: "https://github.com/animeshtiwari018/student-resource-portal",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    telemetry: {
      uptime: "99.9%",
      latency: "-68%",
      users: "3,000+ ACTIVE",
    },
  },
  {
    id: "002",
    code: "MISSION 002",
    recordId: "KVC-RECORD-002",
    opCode: "OPERATION // 002",
    title: "KAVACH WORKSTATION",
    classType: "SYSTEMS ARCHITECTURE",
    status: "ACTIVE",
    date: "2026",
    stackSummary: "Next.js 15 • React 19 • Framer Motion • Tailwind CSS",
    objective:
      "A defense-inspired web operating system workstation built to showcase personal software development projects, technical skills, and security dossier records in an interactive, modular environment.",
    capabilities: [
      "Custom drag & edge-resize physics window management engine",
      "Zero-latency state evaluation loop with dynamic dock magnification & Spotlight launcher",
      "Integrated FaceTime webcam telemetry & Field Journal notes app",
      "macOS workstation UI with restrained tactical styling",
    ],
    technicalDeployment: {
      frontend: "Next.js 15 / React 19 / Framer Motion / Tailwind CSS",
      backend: "Next.js Server Components & Route Handlers",
      database: "Local State & Client Storage",
      deployment: "Vercel Edge Network",
    },
    techStack: ["Next.js 15", "React 19", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kavach.security",
    repoUrl: "https://github.com/animeshtiwari018/Kavach",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    telemetry: {
      fps: "60 FPS",
      latency: "0ms STATE",
      security: "LOCAL SECURED",
    },
  },
  {
    id: "003",
    code: "MISSION 003",
    recordId: "KVC-RECORD-003",
    opCode: "OPERATION // 003",
    title: "BACKEND API GATEWAY",
    classType: "BACKEND MICROSERVICE",
    status: "DEPLOYED",
    date: "2026",
    stackSummary: "Node.js • Redis • Docker • Express • Nginx",
    objective:
      "A high-throughput ingress microservice proxy engineered to manage microservice authentication, request routing, IP rate limiting, and telemetry logging to stop unauthorized access and DDoS traffic spikes.",
    capabilities: [
      "Redis sliding-window rate limiting algorithm for traffic protection",
      "Sub-4 millisecond average gateway proxy routing delay under heavy load",
      "JWT authorization middleware pipeline with real-time audit logging",
      "Containerized Docker setup with Nginx load balancer integration",
    ],
    technicalDeployment: {
      frontend: "REST API Client / Telemetry Dashboard",
      backend: "Node.js / Express",
      database: "Redis Key-Value Store",
      deployment: "Docker / Nginx Proxy",
    },
    techStack: ["Node.js", "Redis", "Docker", "Express", "REST API", "Nginx"],
    liveUrl: "https://api-gateway.example.com",
    repoUrl: "https://github.com/animeshtiwari018/backend-api-gateway",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    telemetry: {
      reqPerMin: "10,000+",
      delay: "< 4ms",
      protection: "ACTIVE",
    },
  },
  {
    id: "004",
    code: "MISSION 004",
    recordId: "KVC-RECORD-004",
    opCode: "OPERATION // 004",
    title: "NEURAL THREAT CORE",
    classType: "AI SECURITY ENGINE",
    status: "ARCHIVED",
    date: "2026",
    stackSummary: "Python • PyTorch • eBPF • Linux C • Docker",
    objective:
      "An autonomous Linux kernel system call anomaly detection core that inspects low-level execution streams to intercept zero-day security exploits in real time.",
    capabilities: [
      "Zero-overhead eBPF ring buffer event capture inside Linux kernel space",
      "99.4% detection accuracy for simulated shellcode injection attacks",
      "Autoencoder PyTorch neural network model for anomaly inference",
      "Static binary compilation for containerized security deployments",
    ],
    technicalDeployment: {
      frontend: "Python CLI & Telemetry Monitor",
      backend: "PyTorch / Linux C eBPF Probes",
      database: "Time-Series Log Stream",
      deployment: "Docker Container / Linux Kernel",
    },
    techStack: ["Python", "PyTorch", "eBPF", "Linux C", "Docker"],
    liveUrl: "https://classified.example.com",
    repoUrl: "https://github.com/animeshtiwari018/neural-core",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    telemetry: {
      accuracy: "99.4%",
      overhead: "0% KERNEL",
      sandbox: "VERIFIED",
    },
  },
];

export default function MissionArchiveApp() {
  const [selectedId, setSelectedId] = useState("001");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isOpeningFile, setIsOpeningFile] = useState(false);
  const openTimerRef = useRef(null);

  // Dynamic Sidebar & List Column Widths with Resizing Capabilities
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(250);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const currentMission = MISSIONS.find((m) => m.id === selectedId) || MISSIONS[0];

  const handleSelectMission = (missionId) => {
    if (missionId === selectedId && !isOpeningFile) return;
    setSelectedId(missionId);
    setIsOpeningFile(true);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setIsOpeningFile(false);
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

  const filteredMissions = MISSIONS.filter((m) => {
    const matchesFilter =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && m.status === "ACTIVE") ||
      (statusFilter === "COMPLETED" && (m.status === "COMPLETED" || m.status === "DEPLOYED")) ||
      (statusFilter === "ARCHIVED" && m.status === "ARCHIVED");

    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.classType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-[#121610] border-[#8E9B72]/60 text-[#8E9B72]";
      case "DEPLOYED":
      case "COMPLETED":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "ARCHIVED":
        return "bg-[#181B18] border-[#7A8274]/40 text-[#7A8274]";
      case "CLASSIFIED":
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
          <Shield className="w-3.5 h-3.5 text-[#C2B280]" />
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest uppercase">
            KAVACH // OPERATIONS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            SYS STATUS: OPERATIONAL
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
            [ SECURE ]
          </span>
        </div>
      </div>

      {/* Main 3-Column Workstation Layout Container */}
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

            {/* Files Folder Item */}
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
              {/* Skills Item */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">Skills</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">SYS</span>
              </button>

              {/* Projects Item (Highlighted with Muted Olive Accent) */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold shadow-sm">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#C2B280] text-[10px]">◈</span>
                  <span className="truncate">Projects</span>
                </span>
                <span className="text-[9px] text-[#C2B280] font-bold shrink-0">
                  {MISSIONS.length}
                </span>
              </button>

              {/* Contact Item */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#8E9B72] shrink-0" />
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

        {/* Column 2: Middle Mission Log Pane */}
        <div
          style={{ width: `${listWidth}px` }}
          className="bg-[#1C1F1C] flex flex-col h-full shrink-0 overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Search Bar */}
          <div className="p-2 border-b border-[#2A2E29] flex items-center gap-1.5 shrink-0">
            <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 bg-[#141614] border border-[#2D322B] rounded-md focus-within:border-[#5C6F52] transition-colors overflow-hidden">
              <Search className="w-3.5 h-3.5 text-[#7A8274] shrink-0" />
              <input
                type="text"
                placeholder="Search operations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#E2E4DF] font-mono text-xs placeholder:text-[#656C60] min-w-0 uppercase"
              />
            </div>
          </div>

          {/* Section Header & Status Filters */}
          <div className="p-2.5 border-b border-[#2A2E29] bg-[#181B18] space-y-2 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#C2B280] tracking-wider uppercase">
              <span>MISSION LOG</span>
              <span className="text-[9px] text-[#7A8274]">
                {filteredMissions.length} RECORD{filteredMissions.length !== 1 ? "S" : ""}
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 text-[9.5px] font-mono">
              {[
                { id: "ALL", label: "ALL" },
                { id: "ACTIVE", label: "ACTIVE" },
                { id: "COMPLETED", label: "COMPLETED" },
                { id: "ARCHIVED", label: "ARCHIVED" },
              ].map((filter) => {
                const isActive = statusFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`flex-1 py-0.5 px-1 rounded border text-center transition-all ${
                      isActive
                        ? "bg-[#344030] border-[#5C6F52] text-[#E2E4DF] font-bold"
                        : "bg-[#141614] border-[#2A2E29] text-[#7A8274] hover:text-[#A8ACA2] hover:bg-[#1A1E1A]"
                    }`}
                  >
                    ▣ {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mission Files List */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {filteredMissions.map((m) => {
              const isSelected = m.id === selectedId;
              const badgeClass = getStatusBadgeStyle(m.status);

              return (
                <div
                  key={m.id}
                  onClick={() => handleSelectMission(m.id)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-all relative border font-mono ${
                    isSelected
                      ? "bg-[#344030]/60 border-[#5C6F52]/80 text-[#E2E4DF] shadow-sm"
                      : "border-transparent hover:bg-[#252924] text-[#A8ACA2]"
                  }`}
                >
                  {/* Active Khaki Line Accent */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C2B280] rounded-r" />
                  )}

                  {/* Mission Code Header */}
                  <div className="flex items-center justify-between text-[9px] mb-0.5 font-bold text-[#8E9B72]">
                    <span>{m.code}</span>
                    <span className="text-[#7A8274]">{m.date}</span>
                  </div>

                  {/* Mission Title */}
                  <div className="font-bold text-xs text-[#E2E4DF] truncate">
                    {m.title}
                  </div>

                  {/* Metadata Row: Class & Status */}
                  <div className="flex items-center justify-between mt-1.5 text-[9.5px]">
                    <span className="text-[#73786B] truncate max-w-[130px]">
                      {m.classType}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded border text-[8.5px] font-bold uppercase ${badgeClass}`}
                    >
                      {m.status}
                    </span>
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
          title="Drag to resize mission list (Double click to reset)"
        />

        {/* Column 3: Main Project Dossier Panel */}
        <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {isOpeningFile ? (
              /* SUBTLE TACTICAL FILE LOADING TRANSITION SCREEN */
              <motion.div
                key="opening-file"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 font-mono space-y-3 text-xs select-none h-full flex flex-col justify-start pt-10"
              >
                <div className="text-[#8E9B72] font-bold tracking-widest flex items-center gap-2 text-xs uppercase">
                  <span>OPENING MISSION FILE...</span>
                  <span className="w-2 h-2 rounded-full bg-[#8E9B72] inline-block animate-ping" />
                </div>

                <div className="w-full border-b border-dashed border-[#2A2E29]" />

                <div className="text-[#C2B280] font-bold tracking-wider text-[11px] uppercase">
                  MISSION IDENTIFIED
                </div>

                <div className="text-xl font-bold text-[#E2E4DF] tracking-tight">
                  {currentMission.opCode}
                </div>

                <div className="space-y-1.5 text-[#9CA396] pt-2 text-[11px]">
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">OPERATION</span>
                    <span>: {currentMission.title}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">STATUS</span>
                    <span className="text-emerald-400 font-bold uppercase">
                      : {currentMission.status}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">CLASS</span>
                    <span>: {currentMission.classType}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* FULL MISSION DOSSIER DISPLAY */
              <motion.div
                key={currentMission.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-6 space-y-6 font-mono text-xs"
              >
                {/* Header: Operation Code & Title */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#8E9B72] tracking-widest font-bold uppercase flex items-center justify-between">
                    <span>{currentMission.opCode}</span>
                    <span className="text-[#7A8274]">{currentMission.recordId}</span>
                  </div>

                  <h1 className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-0.5">
                    {currentMission.title}
                  </h1>

                  <div className="w-full border-b border-dashed border-[#2A2E29] pt-3" />
                </div>

                {/* Technical Specifications Grid */}
                <div className="bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 space-y-3 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        STATUS
                      </span>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${getStatusBadgeStyle(
                          currentMission.status
                        )}`}
                      >
                        ● {currentMission.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        CLASS
                      </span>
                      <span className="text-[#E2E4DF] font-semibold block mt-1">
                        {currentMission.classType}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        STACK
                      </span>
                      <span className="text-[#C2B280] font-semibold block mt-1">
                        {currentMission.stackSummary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Objective Section */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <Target className="w-3.5 h-3.5 text-[#C2B280]" />
                    <span>OBJECTIVE</span>
                  </div>
                  <p className="text-xs text-[#D0D3CB] leading-relaxed pt-0.5">
                    {currentMission.objective}
                  </p>
                </div>

                {/* Mission Capabilities Section */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#708764]" />
                    <span>MISSION CAPABILITIES</span>
                  </div>
                  <ul className="space-y-1.5 text-[#D0D3CB]">
                    {currentMission.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-[#5C6F52] shrink-0 font-bold">•</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Deployment Section */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C2B280]" />
                    <span>TECHNICAL DEPLOYMENT</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] bg-[#191C19] border border-[#2A2E29] rounded-lg p-3.5">
                    <div className="space-y-0.5">
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        FRONTEND
                      </span>
                      <span className="text-[#E2E4DF] font-medium">
                        {currentMission.technicalDeployment.frontend}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        BACKEND
                      </span>
                      <span className="text-[#E2E4DF] font-medium">
                        {currentMission.technicalDeployment.backend}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        DATABASE
                      </span>
                      <span className="text-[#E2E4DF] font-medium">
                        {currentMission.technicalDeployment.database}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[#7A8274] block text-[9.5px] uppercase font-bold">
                        DEPLOYMENT
                      </span>
                      <span className="text-[#E2E4DF] font-medium">
                        {currentMission.technicalDeployment.deployment}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Field Evidence / Visual Record */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center justify-between border-b border-[#2A2E29] pb-1.5">
                    <span>FIELD EVIDENCE</span>
                    <span className="text-[9px] text-[#7A8274]">
                      TIMESTAMP: {currentMission.date}
                    </span>
                  </div>

                  <div className="border border-[#2A2E29] bg-[#0A0C09] rounded-lg overflow-hidden p-2 shadow-md">
                    <div className="aspect-video w-full rounded overflow-hidden bg-black border border-[#2A2E29]">
                      <img
                        src={currentMission.cover}
                        alt={currentMission.title}
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={currentMission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#344030] hover:bg-[#3f4f3b] border border-[#5C6F52] text-[#E2E4DF] rounded text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md uppercase"
                  >
                    <span>[ VIEW LIVE ]</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C2B280]" />
                  </a>

                  <a
                    href={currentMission.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#181B18] hover:bg-[#222622] border border-[#2A2E29] hover:border-[#5C6F52]/60 text-[#E2E4DF] rounded text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer uppercase"
                  >
                    <span>[ SOURCE CODE ]</span>
                    <GithubIcon className="w-3.5 h-3.5 text-[#A8ACA2]" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
