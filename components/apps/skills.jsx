"use client";

import { useState, useRef } from "react";
import {
  Search,
  Folder,
  Tag,
  Lock,
  Shield,
  Radio,
  Check,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Database,
  GitBranch,
  Zap,
  X,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = [
  { id: "ALL", label: "ALL ASSETS", code: "MATRIX" },
  { id: "FRONTLINE", label: "FRONTLINE", code: "FRONT" },
  { id: "ASSAULT", label: "ASSAULT", code: "ASLT" },
  { id: "COMMAND", label: "COMMAND", code: "CMD" },
  { id: "INTELLIGENCE", label: "INTELLIGENCE", code: "INTEL" },
  { id: "FIELD OPS", label: "FIELD OPS", code: "OPS" },
  { id: "TRAINING", label: "TRAINING", code: "TRN" },
];

const SKILLS_DATA = [
  {
    id: "js",
    name: "JAVASCRIPT",
    category: "FRONTLINE",
    categoryLabel: "FRONTLINE",
    type: "Programming Language",
    role: "Core Development System",
    status: "OPERATIONAL",
    level: 85,
    deployment: "Frontend • Backend • APIs",
    experience: "Practical Project Usage",
    capabilities: [
      "ES6+ Modern Syntax & ES Modules",
      "DOM Manipulation & Browser APIs",
      "Async/Await & Promises Architecture",
      "Event-Driven Asynchronous Model",
      "Full-Stack Integration (MERN)",
    ],
    deployedIn: "Kavach Workstation, REST Microservices",
  },
  {
    id: "react",
    name: "REACT",
    category: "ASSAULT",
    categoryLabel: "ASSAULT",
    type: "Frontend Library",
    role: "Client Architecture",
    status: "OPERATIONAL",
    level: 90,
    deployment: "Interactive Web Interfaces",
    experience: "Production Web Workstations",
    capabilities: [
      "React 19 Hooks & Custom State",
      "Component Composition Patterns",
      "Virtual DOM & Render Optimization",
      "Framer Motion UI Animations",
      "Single Page Application Routing",
    ],
    deployedIn: "Kavach Workstation Shell, Interactive Apps",
  },
  {
    id: "nodejs",
    name: "NODE.JS",
    category: "COMMAND",
    categoryLabel: "COMMAND",
    type: "Runtime Engine",
    role: "Backend & Systems",
    status: "OPERATIONAL",
    level: 88,
    deployment: "Server Runtime • Microservices",
    experience: "High-Throughput APIs & Services",
    capabilities: [
      "Event-Driven Non-Blocking I/O",
      "Express.js REST Ingress Pipelines",
      "Middleware & JWT Authentication",
      "Stream & Buffer Data Handling",
      "NPM Ecosystem & Service Architecture",
    ],
    deployedIn: "Secure REST Microservices Gateway",
  },
  {
    id: "mongodb",
    name: "MONGODB",
    category: "INTELLIGENCE",
    categoryLabel: "INTELLIGENCE",
    type: "NoSQL Database",
    role: "Data Persistence",
    status: "OPERATIONAL",
    level: 82,
    deployment: "Database Vaults • User Records",
    experience: "Document Store & Indexing",
    capabilities: [
      "Mongoose Schema Design & Validation",
      "Aggregation Pipelines & Queries",
      "Document Indexing & Performance",
      "Relational Association Modeling",
      "REST Data Persistence Layers",
    ],
    deployedIn: "User Accounts & Portfolio Vault",
  },
  {
    id: "git",
    name: "GIT / GITHUB",
    category: "FIELD OPS",
    categoryLabel: "FIELD OPS",
    type: "Version Control",
    role: "Repository Operations",
    status: "OPERATIONAL",
    level: 92,
    deployment: "Source Control • Deployments",
    experience: "Branch Management & CI/CD",
    capabilities: [
      "Branch Management & Merging Strategy",
      "Commit History & Audit Trails",
      "Remote Sync & Pull Requests",
      "Rebase, Stash & Conflict Resolution",
      "GitHub Actions & CI Pipelines",
    ],
    deployedIn: "All Kavach Systems & Repositories",
  },
  {
    id: "dsa",
    name: "DATA STRUCTURES & ALGORITHMS",
    category: "TRAINING",
    categoryLabel: "TRAINING",
    type: "Algorithmic Foundation",
    role: "Problem Solving",
    status: "OPERATIONAL",
    level: 78,
    deployment: "C++ Memory & Algorithmic Optimization",
    experience: "Problem Solving & Systems DSA",
    capabilities: [
      "Arrays, Strings & Pointer Manipulation",
      "Trees, Graphs & Traversal Algorithms",
      "Dynamic Programming & Recursion",
      "Time & Space Complexity Analysis (Big-O)",
      "C++ STL Data Structure Engineering",
    ],
    deployedIn: "C++ Algorithmic Toolkit & Engine",
  },
  {
    id: "nextjs",
    name: "NEXT.JS 15",
    category: "ASSAULT",
    categoryLabel: "ASSAULT",
    type: "React Framework",
    role: "Full-Stack Web Framework",
    status: "OPERATIONAL",
    level: 86,
    deployment: "Server Components • App Router",
    experience: "Production Next.js Apps",
    capabilities: [
      "App Router Architecture & Layouts",
      "Server & Client Component Boundaries",
      "SEO Metadata & Performance Optimization",
      "Route Handlers & Server Actions",
      "Incremental Static Regeneration",
    ],
    deployedIn: "Kavach Workstation Production Shell",
  },
  {
    id: "tailwind",
    name: "TAILWIND CSS",
    category: "ASSAULT",
    categoryLabel: "ASSAULT",
    type: "Utility CSS Framework",
    role: "UI & Design System",
    status: "OPERATIONAL",
    level: 92,
    deployment: "Responsive Layouts • Themes",
    experience: "Custom Design Tokens & Glassmorphism",
    capabilities: [
      "Utility-First Responsive Layouts",
      "Dark Mode & Custom Theme Variables",
      "Grid, Flexbox & Precise Spacing",
      "Micro-Interactions & Hover States",
      "Custom Plugin & Design Tokens",
    ],
    deployedIn: "Kavach Workstation Operating System",
  },
  {
    id: "cpp",
    name: "C++",
    category: "TRAINING",
    categoryLabel: "TRAINING",
    type: "Systems Language",
    role: "Low-Level Systems & DSA",
    status: "OPERATIONAL",
    level: 80,
    deployment: "Algorithms • Memory Management",
    experience: "C++ Systems Development",
    capabilities: [
      "Manual Memory Allocation & Pointers",
      "Object-Oriented Programming (OOP)",
      "Standard Template Library (STL)",
      "Algorithmic Data Structures",
      "Fast Execution System Logic",
    ],
    deployedIn: "DSA Problem Solving Engine",
  },
  {
    id: "redis",
    name: "REDIS",
    category: "COMMAND",
    categoryLabel: "COMMAND",
    type: "In-Memory Data Store",
    role: "Caching & Session Store",
    status: "OPERATIONAL",
    level: 76,
    deployment: "API Rate Limiting • Session Cache",
    experience: "Performance Caching Layer",
    capabilities: [
      "In-Memory Key-Value Caching",
      "API Rate Limiting Middleware",
      "Session Store Security",
      "Pub/Sub Messaging Patterns",
      "Data Expiration Policies",
    ],
    deployedIn: "REST Microservice Gateway",
  },
];

const renderProficiencyBar = (level) => {
  const totalBlocks = 20;
  const filledBlocks = Math.round((level / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  return "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
};

export default function SkillsApp() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkillId, setActiveSkillId] = useState("js");
  const [isScanning, setIsScanning] = useState(false);
  const scanTimerRef = useRef(null);

  // Dynamic Sidebar & List Widths
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(250);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const activeSkill =
    SKILLS_DATA.find((s) => s.id === activeSkillId) || SKILLS_DATA[0];

  const handleSelectSkill = (skillId) => {
    if (skillId === activeSkillId && !isScanning) return;
    setActiveSkillId(skillId);
    setIsScanning(true);
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 420);
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

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory =
      selectedCategory === "ALL" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#141614] text-[#E2E4DF] font-sans select-none overflow-hidden text-xs">
      {/* App Header Bar */}
      <div className="h-11 px-4 bg-[#181B18] border-b border-[#2A2E29] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#C2B280]" />
            KAVACH // TECHNICAL ARSENAL
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            SYS STATUS: OPERATIONAL
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase">
            SECURE
          </span>
        </div>
      </div>

      {/* Main 3-Column macOS Window Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Network Navigation Sidebar */}
        <div
          style={{ width: `${sidebarWidth}px` }}
          className="bg-[#181B18] flex flex-col h-full shrink-0 p-3 select-none overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Network Section */}
          <div className="mb-4">
            <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase mb-2 px-1 font-mono flex items-center justify-between">
              <span>KAVACH NETWORK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C6F52] inline-block animate-pulse" />
            </div>
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === "ALL"
                  ? "bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold"
                  : "text-[#A8ACA2] hover:bg-[#222622]"
              }`}
            >
              <span className="flex items-center gap-2 truncate font-mono text-[11px]">
                <Folder className="w-3.5 h-3.5 shrink-0 text-[#C2B280]" />
                <span className="truncate">ALL ASSETS</span>
              </span>
              <span className="text-[10px] font-mono text-[#8C9486] font-bold shrink-0">
                {SKILLS_DATA.length}
              </span>
            </button>
          </div>

          {/* Categories Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase mb-2 px-1 font-mono">
              ARSENAL CATEGORIES
            </div>
            <div className="space-y-1">
              {CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.id ? "ALL" : cat.id
                    )
                  }
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#2D362A] text-[#C2B280] font-bold border border-[#5C6F52]/40"
                      : "text-[#A8ACA2] hover:bg-[#222622] hover:text-[#E2E4DF]"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-[#5C6F52] text-[10px]">▣</span>
                    <span className="truncate">{cat.label}</span>
                  </span>
                  <span className="text-[9px] text-[#7A8274] shrink-0 font-semibold">
                    {SKILLS_DATA.filter((s) => s.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer Status */}
          <div className="pt-2 border-t border-[#2A2E29] text-[9px] font-mono text-[#7A8274] flex items-center justify-between shrink-0">
            <span>INVENTORY: ACTIVE</span>
            <span className="text-[#C2B280] font-bold">KAVACH // v2.6</span>
          </div>
        </div>

        {/* Resizer Handle 1 */}
        <div
          onMouseDown={startResizingSidebar}
          onDoubleClick={() => setSidebarWidth(195)}
          className={`w-1 h-full cursor-col-resize hover:bg-[#5C6F52] transition-colors shrink-0 z-30 ${
            isResizingSidebar ? "bg-[#5C6F52]" : "bg-[#2A2E29]"
          }`}
          title="Drag to resize sidebar (Double click to reset)"
        />

        {/* Column 2: Arsenal Skill Items List */}
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
                placeholder="Search technical assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#E2E4DF] font-mono text-xs placeholder:text-[#656C60] min-w-0"
              />
            </div>
          </div>

          {/* Skill Items List */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {filteredSkills.map((skill) => {
              const isActive = skill.id === activeSkillId;
              return (
                <div
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill.id)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-all relative border ${
                    isActive
                      ? "bg-[#344030]/60 border-[#5C6F52]/80 text-[#E2E4DF] shadow-sm"
                      : "border-transparent hover:bg-[#252924] text-[#A8ACA2]"
                  }`}
                >
                  {/* Active Khaki Accent */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C2B280] rounded-r" />
                  )}

                  {/* Category Tag */}
                  <div className="text-[9px] font-mono font-bold text-[#7A8274] tracking-wider uppercase mb-0.5 flex items-center justify-between">
                    <span>▣ {skill.categoryLabel}</span>
                    <span className="text-[#708764]">{skill.level}%</span>
                  </div>

                  {/* Technology Title */}
                  <div className="font-bold text-xs text-[#E2E4DF] font-mono truncate tracking-tight">
                    {skill.name}
                  </div>

                  {/* Subtitle / Type */}
                  <div className="text-[10px] text-[#8C9486] font-mono truncate mt-0.5">
                    {skill.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resizer Handle 2 */}
        <div
          onMouseDown={startResizingList}
          onDoubleClick={() => setListWidth(250)}
          className={`w-1 h-full cursor-col-resize hover:bg-[#5C6F52] transition-colors shrink-0 z-30 ${
            isResizingList ? "bg-[#5C6F52]" : "bg-[#2A2E29]"
          }`}
          title="Drag to resize asset list (Double click to reset)"
        />

        {/* Column 3: Selected Skill Technical Dossier Panel */}
        <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {isScanning ? (
              /* SYSTEM SCAN TRANSITION SCREEN */
              <motion.div
                key="scan-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 font-mono space-y-4 text-xs select-none h-full flex flex-col justify-start pt-10"
              >
                <div className="text-[#5C6F52] font-bold tracking-widest flex items-center gap-2 text-xs">
                  <span>SCANNING ASSET...</span>
                  <span className="w-2 h-2 rounded-full bg-[#5C6F52] inline-block animate-ping" />
                </div>

                <div className="w-full border-b border-dashed border-[#2A2E29]" />

                <div className="text-[#C2B280] font-bold tracking-wider text-[11px]">
                  ASSET IDENTIFIED
                </div>

                <div className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-1">
                  {activeSkill.name}
                </div>

                <div className="space-y-2 text-[#9CA396] pt-3 text-[11px]">
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">TYPE</span>
                    <span>: {activeSkill.type.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">ROLE</span>
                    <span>: {activeSkill.role.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">STATUS</span>
                    <span className="text-[#708764] font-bold">
                      {activeSkill.status}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#7A8274]">CLEARANCE</span>
                    <span className="text-[#C2B280]">ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* FULL TECHNICAL DOSSIER PANEL */
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-6 space-y-6 font-mono text-xs"
              >
                {/* Header Asset Bar */}
                <div className="border-b border-dashed border-[#2A2E29] pb-4 space-y-1">
                  <div className="text-[10px] text-[#7A8274] tracking-widest font-bold uppercase flex items-center justify-between">
                    <span>PERSONNEL ASSET // {activeSkill.categoryLabel}</span>
                    <span className="text-[#708764] flex items-center gap-1 font-bold">
                      <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
                      OPERATIONAL
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-1">
                    {activeSkill.name}
                  </h1>
                  <p className="text-[11px] text-[#C2B280] font-semibold tracking-wide">
                    {activeSkill.role.toUpperCase()}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 space-y-3 shadow-sm">
                  <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase border-b border-[#2A2E29] pb-2">
                    SPECIFICATION MATRIX
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase">
                        TYPE
                      </span>
                      <span className="text-[#E2E4DF] font-semibold">
                        {activeSkill.type}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase">
                        ROLE
                      </span>
                      <span className="text-[#E2E4DF] font-semibold">
                        {activeSkill.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase">
                        STATUS
                      </span>
                      <span className="text-[#708764] font-bold flex items-center gap-1">
                        ● {activeSkill.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#7A8274] block text-[9.5px] uppercase">
                        EXPERIENCE
                      </span>
                      <span className="text-[#C2B280] font-semibold">
                        {activeSkill.experience}
                      </span>
                    </div>
                  </div>

                  {/* Proficiency Meter */}
                  <div className="pt-2 border-t border-[#2A2E29] space-y-1">
                    <div className="flex justify-between text-[10px] text-[#7A8274] font-bold">
                      <span>PROFICIENCY TELEMETRY</span>
                      <span className="text-[#C2B280]">
                        {activeSkill.level}%
                      </span>
                    </div>
                    <div className="text-[#5C6F52] text-xs font-mono tracking-wider overflow-hidden truncate select-none">
                      {renderProficiencyBar(activeSkill.level)}
                    </div>
                  </div>

                  {/* Deployment Spectrum */}
                  <div className="pt-2 border-t border-[#2A2E29]">
                    <span className="text-[#7A8274] block text-[9.5px] uppercase">
                      DEPLOYMENT SPECTRUM
                    </span>
                    <span className="text-[#E2E4DF] font-mono text-[11px]">
                      {activeSkill.deployment}
                    </span>
                  </div>
                </div>

                {/* Field Capabilities */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                    <span>◈ FIELD CAPABILITIES</span>
                  </div>
                  <ul className="space-y-1.5 text-[#D0D3CB]">
                    {activeSkill.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-[#5C6F52] shrink-0 font-bold">
                          ▪
                        </span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Impact / Deployed Systems */}
                <div className="bg-[#181C18]/60 border border-[#2D362A] rounded-lg p-3.5 space-y-1.5">
                  <div className="text-[10px] font-bold text-[#708764] tracking-widest uppercase">
                    DEPLOYED IN KAVACH OPERATIONS
                  </div>
                  <p className="text-xs text-[#E2E4DF] font-mono">
                    {activeSkill.deployedIn}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
