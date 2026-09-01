"use client";

import { useState, useRef } from "react";
import {
  Brain,
  Folder,
  Radio,
  Search,
  Activity,
  Layers,
  CheckCircle2,
  Terminal,
  Cpu,
  ArrowRight,
  RefreshCw,
  GitBranch,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ANALYSIS_MODULES = [
  {
    id: "module-01",
    code: "ANALYSIS // 01",
    title: "RECONNAISSANCE",
    category: "CONTEXT & OBSERVATION",
    subtitle: "Understand the environment before changing it.",
    workflow: ["OBSERVE", "IDENTIFY", "GATHER CONTEXT", "DEFINE THE ACTUAL PROBLEM"],
    principles: [
      "Read the existing system architecture and codebase first.",
      "Understand system inputs, outputs, and side effects.",
      "Identify operational constraints and legacy dependencies.",
      "Avoid fixing superficial symptoms before isolating the root cause.",
    ],
  },
  {
    id: "module-02",
    code: "ANALYSIS // 02",
    title: "PROBLEM DECOMPOSITION",
    category: "SYSTEM STRUCTURE",
    subtitle: "Break complex problems into smaller executable systems.",
    workflow: ["LARGE PROBLEM", "SYSTEM", "COMPONENTS", "SMALL TASKS", "EXECUTABLE SOLUTION"],
    principles: [
      "Decouple monolithic challenges into isolated component boundaries.",
      "Analyze data flows and interface boundaries between layers.",
      "Solve sub-problems independently to minimize cognitive overhead.",
      "Re-assemble verified units into a cohesive production pipeline.",
    ],
  },
  {
    id: "module-03",
    code: "ANALYSIS // 03",
    title: "SYSTEM THINKING",
    category: "ARCHITECTURE FLOW",
    subtitle: "Trace execution and state transition across the full technical stack.",
    coreFlow: ["INPUT", "PROCESS", "LOGIC", "STATE", "OUTPUT"],
    stackFlow: ["FRONTEND", "API GATEWAY", "BACKEND", "DATABASE"],
    principles: [
      "Evaluate state mutations across both client and server lifecycles.",
      "Ensure API contracts and type schemas remain immutable during updates.",
      "Design systems with predictable error propagation and fallbacks.",
    ],
  },
  {
    id: "module-04",
    code: "ANALYSIS // 04",
    title: "DEBUGGING PROTOCOL",
    category: "ROOT CAUSE ISOLATION",
    subtitle: "Empirical diagnosis driven by logs and reproducible test cases.",
    directive: "Do not guess the bug. Reproduce it.",
    workflow: ["DETECT", "REPRODUCE", "ISOLATE", "TRACE", "FIX", "VERIFY"],
    principles: [
      "Inspect un-truncated stack traces and runtime telemetry before acting.",
      "Isolate external variables to construct minimal reproducible test cases.",
      "Fix the underlying logic contract rather than patching symptoms.",
      "Add automated regression assertions after applying any fix.",
    ],
  },
  {
    id: "module-05",
    code: "ANALYSIS // 05",
    title: "ENGINEERING DECISIONS",
    category: "ENGINEERING TRADE-OFFS",
    subtitle: "Pragmatic decision-making framework for architectural choices.",
    principles: [
      {
        num: "01",
        title: "SIMPLICITY",
        desc: "Prefer the simplest solution that reliably solves the problem.",
      },
      {
        num: "02",
        title: "UNDERSTANDING",
        desc: "Understand why a system works before optimizing how it works.",
      },
      {
        num: "03",
        title: "TRADE-OFFS",
        desc: "Every technical decision has a cost in complexity or maintenance.",
      },
      {
        num: "04",
        title: "ITERATION",
        desc: "Build → test → observe → improve.",
      },
    ],
  },
  {
    id: "module-06",
    code: "ANALYSIS // 06",
    title: "LEARNING LOOP",
    category: "CONTINUOUS IMPROVEMENT",
    subtitle: "Iterative technical growth driven by execution and reflection.",
    cycle: ["LEARN", "BUILD", "BREAK", "DEBUG", "DOCUMENT", "REPEAT"],
    principles: [
      "Extract architectural lessons from edge cases and production failures.",
      "Document execution workflows to prevent recurring system issues.",
      "Stay curious and continually refine algorithmic and system foundations.",
    ],
  },
];

const DIAGNOSTICS = [
  { label: "PROBLEM SOLVING", level: "ACTIVE", status: "OPERATIONAL" },
  { label: "SYSTEM THINKING", level: "ACTIVE", status: "OPERATIONAL" },
  { label: "DEBUGGING", level: "ACTIVE", status: "OPERATIONAL" },
  { label: "ADAPTABILITY", level: "ACTIVE", status: "OPERATIONAL" },
  { label: "DOCUMENTATION", level: "ACTIVE", status: "OPERATIONAL" },
];

export default function SystemAnalysisApp() {
  const [selectedModuleId, setSelectedModuleId] = useState("module-01");
  const [isScanning, setIsScanning] = useState(false);
  const scanTimerRef = useRef(null);

  // Dynamic Sidebar & Middle Column Resizing
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(250);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const currentModule =
    ANALYSIS_MODULES.find((m) => m.id === selectedModuleId) || ANALYSIS_MODULES[0];

  const handleSelectModule = (moduleId) => {
    if (moduleId === selectedModuleId && !isScanning) return;
    setSelectedModuleId(moduleId);
    setIsScanning(true);
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 300);
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

  return (
    <div className="w-full h-full flex flex-col bg-[#141614] text-[#E2E4DF] font-sans select-none overflow-hidden text-xs">
      {/* Top Application Header Bar */}
      <div className="h-11 px-4 bg-[#181B18] border-b border-[#2A2E29] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-[#C2B280]" />
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest uppercase">
            KAVACH // SYSTEM ANALYSIS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            SYS STATUS: OPERATIONAL
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
            [ ANALYSIS ]
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
                6
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

              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">Service Record</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">SR</span>
              </button>

              {/* System Analysis Item (Highlighted with Muted Olive Accent) */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold shadow-sm">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#C2B280] text-[10px]">◈</span>
                  <span className="truncate">System Analysis</span>
                </span>
                <span className="text-[9px] text-[#C2B280] font-bold shrink-0">
                  {ANALYSIS_MODULES.length}
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

        {/* Column 2: Middle Navigation Pane */}
        <div
          style={{ width: `${listWidth}px` }}
          className="bg-[#1C1F1C] flex flex-col h-full shrink-0 overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Header */}
          <div className="p-3 border-b border-[#2A2E29] bg-[#181B18] shrink-0">
            <div className="text-[10px] font-mono font-bold text-[#C2B280] tracking-wider uppercase flex items-center justify-between">
              <span>ANALYSIS PROTOCOL</span>
              <span className="text-[9px] text-[#708764]">6 MODULES</span>
            </div>
            <p className="text-[9.5px] text-[#73786B] font-mono mt-1">
              ANALYTICAL FRAMEWORK MATRIX
            </p>
          </div>

          {/* Selectable Analysis Modules List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono">
            {ANALYSIS_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod.id)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-all relative border ${
                    isSelected
                      ? "bg-[#344030]/60 border-[#5C6F52]/80 text-[#E2E4DF] shadow-sm"
                      : "border-transparent hover:bg-[#252924] text-[#A8ACA2]"
                  }`}
                >
                  {/* Active Khaki Accent Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C2B280] rounded-r" />
                  )}

                  <div className="flex items-center justify-between text-[9px] mb-0.5 font-bold text-[#8E9B72]">
                    <span>{mod.code}</span>
                    <span className="text-[#7A8274]">ACTIVE</span>
                  </div>

                  <div className="font-bold text-xs text-[#E2E4DF] truncate">
                    ◈ {mod.title}
                  </div>

                  <div className="text-[9.5px] text-[#73786B] truncate mt-0.5">
                    {mod.category}
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
          title="Drag to resize protocol list (Double click to reset)"
        />

        {/* Column 3: Main Analytical Workspace Panel */}
        <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {isScanning ? (
              /* SUBTLE SCANNING / ACCESSING TRANSITION SCREEN */
              <motion.div
                key="accessing-module"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 font-mono space-y-3 text-xs select-none h-full flex flex-col justify-start pt-10"
              >
                <div className="text-[#8E9B72] font-bold tracking-widest flex items-center gap-2 text-xs uppercase">
                  <span>ACCESSING ANALYSIS MODULE...</span>
                  <span className="w-2 h-2 rounded-full bg-[#8E9B72] inline-block animate-ping" />
                </div>

                <div className="w-full border-b border-dashed border-[#2A2E29]" />

                <div className="text-[#C2B280] font-bold tracking-wider text-[11px] uppercase">
                  MODULE IDENTIFIED
                </div>

                <div className="text-xl font-bold text-[#E2E4DF] tracking-tight">
                  {currentModule.code} // {currentModule.title}
                </div>

                <div className="space-y-1.5 text-[#9CA396] pt-2 text-[11px]">
                  <div className="flex gap-4">
                    <span className="w-28 text-[#7A8274]">CATEGORY</span>
                    <span>: {currentModule.category}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-28 text-[#7A8274]">STATUS</span>
                    <span className="text-emerald-400 font-bold uppercase">: ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* DETAILED ANALYSIS MODULE DOSSIER DISPLAY */
              <motion.div
                key={currentModule.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-6 space-y-6 font-mono text-xs"
              >
                {/* Header Title & Subtitle */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#8E9B72] tracking-widest font-bold uppercase flex items-center justify-between">
                    <span>{currentModule.code}</span>
                    <span className="text-[#7A8274]">{currentModule.category}</span>
                  </div>

                  <h1 className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-0.5">
                    {currentModule.title}
                  </h1>

                  <p className="text-xs text-[#C2B280] font-semibold tracking-wide pt-0.5 font-sans italic">
                    "{currentModule.subtitle}"
                  </p>

                  <div className="w-full border-b border-dashed border-[#2A2E29] pt-3" />
                </div>

                {/* Workflow Diagram Section (If Workflow Array Exists) */}
                {currentModule.workflow && (
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#C2B280]" />
                      <span>EXECUTION WORKFLOW</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 text-[11px] shadow-sm">
                      {currentModule.workflow.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-[#141614] border border-[#344030] text-[#E2E4DF] font-bold rounded">
                            {step}
                          </span>
                          {idx < currentModule.workflow.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#5C6F52] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Directive Banner (If Present, e.g. Debugging Directive) */}
                {currentModule.directive && (
                  <div className="bg-[#241A1A]/80 border border-[#8A3333]/60 rounded-lg p-4 space-y-1 text-center shadow-md">
                    <div className="text-[10px] text-[#C95555] font-bold tracking-widest uppercase">
                      ENGINEERING DIRECTIVE
                    </div>
                    <div className="text-sm font-bold text-[#F2B0B0] font-mono tracking-wide">
                      "{currentModule.directive}"
                    </div>
                  </div>
                )}

                {/* System Thinking Specific Flow Diagrams */}
                {currentModule.id === "module-03" && (
                  <div className="space-y-4">
                    {/* Core System Data Flow */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#C2B280]" />
                        <span>CORE DATA EXECUTION PIPELINE</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 text-[11px]">
                        {currentModule.coreFlow.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="px-3 py-1.5 bg-[#141614] border border-[#5C6F52]/60 text-[#C2B280] font-bold rounded">
                              {step}
                            </span>
                            {idx < currentModule.coreFlow.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-[#5C6F52] shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Stack Architectural Layering */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#708764]" />
                        <span>FULL-STACK ARCHITECTURAL LAYERING</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 text-[11px]">
                        {currentModule.stackFlow.map((layer, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="px-3 py-1.5 bg-[#141614] border border-[#3A4034] text-[#E2E4DF] font-bold rounded">
                              {layer}
                            </span>
                            {idx < currentModule.stackFlow.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-[#708764] shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Field Learning Loop Specific Cycle Diagram */}
                {currentModule.id === "module-06" && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-[#708764]" />
                      <span>CONTINUOUS FIELD DEVELOPMENT CYCLE</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 bg-[#191C19] border border-[#2A2E29] rounded-lg p-4 text-[11px]">
                      {currentModule.cycle.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-[#141614] border border-[#5C6F52]/60 text-[#E2E4DF] font-bold rounded">
                            {node}
                          </span>
                          {idx < currentModule.cycle.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#5C6F52] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engineering Decisions Principles Grid (Module 05) */}
                {currentModule.principles && typeof currentModule.principles[0] === "object" ? (
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-[#C2B280]" />
                      <span>DECISION PRINCIPLES</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentModule.principles.map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-[#191C19] border border-[#2A2E29] rounded-lg p-3.5 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] text-[#8E9B72] font-bold">
                            <span>PRINCIPLE // {p.num}</span>
                            <span className="text-[#C2B280]">{p.title}</span>
                          </div>
                          <p className="text-xs text-[#D0D3CB] leading-relaxed pt-1 font-sans">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard List Principles */
                  currentModule.principles && (
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-bold text-[#C2B280] tracking-wider uppercase flex items-center gap-1.5 border-b border-[#2A2E29] pb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#708764]" />
                        <span>OPERATIONAL PRINCIPLES</span>
                      </div>
                      <ul className="space-y-1.5 text-[#D0D3CB]">
                        {currentModule.principles.map((pr, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-sans">
                            <span className="text-[#5C6F52] shrink-0 font-bold">•</span>
                            <span>{pr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}

                {/* System Status Diagnostics Panel (Self-Assessment Matrix) */}
                <div className="bg-[#181C18]/60 border border-[#2D362A] rounded-lg p-4 space-y-3 shadow-sm pt-3">
                  <div className="text-[10px] font-bold text-[#C2B280] tracking-widest uppercase border-b border-[#2D362A] pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#708764]" />
                      SYSTEM ANALYSIS DIAGNOSTICS MATRIX
                    </span>
                    <span className="text-[#708764]">SYS: VERIFIED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[10.5px]">
                    {DIAGNOSTICS.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-[#141614] border border-[#2A2E29] rounded flex items-center justify-between font-mono"
                      >
                        <span className="text-[#7A8274] font-bold">{item.label}</span>
                        <span className="text-emerald-400 font-bold text-[9.5px] uppercase">
                          ● {item.level}
                        </span>
                      </div>
                    ))}
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
