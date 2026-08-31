"use client";

import { useState } from "react";
import {
  Search,
  ExternalLink,
  Shield,
  Layers,
  CheckCircle2,
  Radio,
  FileText,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MISSIONS = [
  {
    id: "001",
    code: "MISSION 001",
    recordId: "KVC-RECORD-001",
    title: "STUDENT RESOURCE PORTAL",
    statement: "Centralized academic resource distribution and verified course materials platform.",
    classType: "FULL STACK WEB",
    status: "COMPLETED",
    clearance: "PUBLIC",
    date: "31 AUG 2026",
    techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://student-resource-portal.example.com",
    repoUrl: "https://github.com/animeshtiwari018/student-resource-portal",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    briefing: "Engineered a high-availability digital portal to eliminate fragmentation in academic resource distribution. Replaced slow legacy servers with a stateless Next.js architecture and indexed MongoDB document query pipeline.",
    highlights: [
      "Role-Based Access Control (RBAC) separating student and faculty clearances",
      "Instant multi-filter search indexing across 500+ course PDFs",
      "JWT authentication pipeline with automated token rotation",
      "Achieved 99.9% uptime and reduced resource fetch latency by 68%",
    ],
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
    title: "KAVACH OS PORTFOLIO",
    statement: "Defense-inspired operating-system workstation portfolio built for security workstations.",
    classType: "SYSTEMS ARCH",
    status: "ACTIVE OPERATIONAL",
    clearance: "RESTRICTED",
    date: "31 AUG 2026",
    techStack: ["Next.js 15", "React 19", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kavach.security",
    repoUrl: "https://github.com/animeshtiwari018/Kavach",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    briefing: "Architected a web-based operating system workstation shell for personal portfolio presentation. Combines 60fps window management (drag, resize, focus) with FaceTime webcam telemetry and Field Journal apps.",
    highlights: [
      "Custom drag & edge-resize physics window management engine",
      "Zero-latency Fast Refresh dynamic state evaluation loop",
      "Integrated FaceTime webcam telemetry & Field Journal notes app",
      "Clean military matte aesthetic tailored for security workstations",
    ],
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
    title: "BACKEND API GATEWAY",
    statement: "High-throughput microservice proxy with sliding-window rate limiting & Redis caching.",
    classType: "BACKEND PROXY",
    status: "COMPLETED",
    clearance: "PUBLIC",
    date: "25 AUG 2026",
    techStack: ["Node.js", "Redis", "Docker", "Express", "REST API"],
    liveUrl: "https://api-gateway.example.com",
    repoUrl: "https://github.com/animeshtiwari018/backend-api-gateway",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    briefing: "Deployed an enterprise ingress reverse proxy managing microservice authentication, request routing, IP rate limiting, and telemetry logging to stop DDoS attacks.",
    highlights: [
      "Redis sliding-window token bucket rate limiting for DDoS defense",
      "Sub-4 millisecond average gateway proxy routing delay",
      "Processed 10,000+ requests/min under peak load benchmark testing",
      "Dockerized container pipeline with Nginx load balancer",
    ],
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
    title: "NEURAL THREAT CORE",
    statement: "Autonomous Linux kernel system call anomaly detection system.",
    classType: "AI SECURITY",
    status: "COMPLETED",
    clearance: "TOP SECRET",
    date: "15 AUG 2026",
    techStack: ["Python", "PyTorch", "eBPF", "Linux C", "Docker"],
    liveUrl: "https://classified.example.com",
    repoUrl: "https://github.com/animeshtiwari018/neural-core",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    briefing: "Constructed an autonomous threat detection core inspecting low-level Linux kernel system call sequences to intercept zero-day exploits in real-time.",
    highlights: [
      "Zero-overhead eBPF ring buffer event capture inside Linux kernel space",
      "99.4% detection accuracy for simulated shellcode injection attacks",
      "Autoencoder PyTorch neural network model for anomaly inference",
      "Static binary compilation for containerized security deployments",
    ],
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

  const currentMission = MISSIONS.find((m) => m.id === selectedId) || MISSIONS[0];

  const filteredMissions = MISSIONS.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.classType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F]">
      {/* Sidebar: Army Operations Mission List */}
      <div className="w-64 border-r border-[#24291F] bg-[#0A0C09] flex flex-col h-full shrink-0">
        {/* Header */}
        <div className="p-3 border-b border-[#24291F] bg-[#0C0E0B] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
            <Shield className="w-4 h-4 text-[#8E9B72]" />
            <span>MISSION ARCHIVE</span>
          </div>
          <span className="text-[9px] text-[#8E9B72] bg-[#121610] px-1.5 py-0.5 border border-[#24291F] rounded font-bold">
            {MISSIONS.length} MISSIONS
          </span>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-[#24291F] bg-[#121610]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0C09] border border-[#24291F] rounded focus-within:border-[#8E9B72]/60 transition-colors">
            <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255] uppercase tracking-wider font-bold"
            />
          </div>
        </div>

        {/* Missions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredMissions.map((m) => {
            const isSelected = m.id === selectedId;
            return (
              <motion.div
                key={m.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedId(m.id)}
                className={`p-2.5 rounded cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#121610] border-[#8E9B72] text-[#8E9B72] shadow-sm"
                    : "border-transparent hover:bg-[#121610]/50 text-[#73786B] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] mb-0.5 font-bold text-[#8E9B72]">
                  <span>{m.code}</span>
                  <span>{m.recordId}</span>
                </div>
                <div className="font-bold text-white text-xs truncate">
                  {m.title}
                </div>
                <div className="flex items-center justify-between mt-1 text-[9.5px]">
                  <span className="text-[#73786B] font-semibold">{m.classType}</span>
                  <span className="text-green-400 font-bold">● {m.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t border-[#24291F] bg-[#0C0E0B] text-[9px] text-[#5E6255] space-y-1">
          <div className="flex justify-between font-bold">
            <span>OPERATIONAL STATUS:</span>
            <strong className="text-green-400">ACTIVE & SECURED</strong>
          </div>
        </div>
      </div>

      {/* Main Mission Dossier Panel */}
      <div className="flex-1 flex flex-col bg-[#070906] h-full overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-2.5 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-xs tracking-wider">
            <Target className="w-4 h-4 text-[#8E9B72]" />
            <span>{currentMission.code}</span>
            <span className="text-[#5E6255]">|</span>
            <span className="text-[#8E9B72]">{currentMission.recordId}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={currentMission.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1 bg-[#121610] hover:bg-[#1a2016] border border-[#8E9B72]/60 hover:border-[#8E9B72] text-[#8E9B72] hover:text-white rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md uppercase"
            >
              <span>[ LIVE DEPLOYMENT ]</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={currentMission.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1 bg-[#121610] hover:bg-[#1a2016] border border-[#24291F] hover:border-white/40 text-white rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer uppercase"
            >
              <span>[ SOURCE CODE ]</span>
              <GithubIcon className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mission File Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Mission Dossier Header Card */}
          <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3 relative shadow-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-[#121610] border border-[#8E9B72]/40 text-[#8E9B72] font-bold text-[9.5px] rounded uppercase">
                CLASS: {currentMission.classType}
              </span>
              <span className="px-2 py-0.5 bg-[#121610] border border-[#3A4034] text-[#D4D5C8] font-bold text-[9.5px] rounded uppercase">
                CLEARANCE: {currentMission.clearance}
              </span>
              <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-[9.5px] rounded uppercase">
                ● STATUS: {currentMission.status}
              </span>
            </div>

            <h1 className="text-xl font-bold text-white tracking-wide">
              {currentMission.title}
            </h1>
            <p className="text-xs text-[#8E9B72] font-semibold italic border-l-2 border-[#8E9B72] pl-3 py-0.5">
              "{currentMission.statement}"
            </p>
          </div>

          {/* Screenshot Reconnaissance Frame */}
          <div className="border border-[#24291F] bg-[#0A0C09] rounded-lg overflow-hidden space-y-2 p-2 shadow-lg">
            <div className="aspect-video w-full rounded overflow-hidden bg-black border border-[#24291F]">
              <img
                src={currentMission.cover}
                alt={currentMission.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-2 py-1 flex items-center justify-between text-[9.5px] text-[#73786B] font-bold">
              <span>FIELD RECONNAISSANCE CAPTURE</span>
              <span>TIMESTAMP: {currentMission.date}</span>
            </div>
          </div>

          {/* Mission Briefing & Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mission Briefing */}
            <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2 tracking-widest uppercase">
                <FileText className="w-3.5 h-3.5 text-[#8E9B72]" />
                MISSION BRIEFING
              </h3>
              <p className="text-xs text-[#D4D5C8] leading-relaxed pt-1">
                {currentMission.briefing}
              </p>
            </div>

            {/* Highlights */}
            <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2 tracking-widest uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                OPERATIONAL HIGHLIGHTS
              </h3>
              <ul className="space-y-1.5 pt-1">
                {currentMission.highlights.map((item, idx) => (
                  <li key={idx} className="text-xs text-[#D4D5C8] flex items-start gap-2">
                    <span className="text-[#8E9B72] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Arsenal & Telemetry Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tech Stack Arsenal */}
            <div className="md:col-span-2 p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2 tracking-widest uppercase">
                <Layers className="w-3.5 h-3.5 text-[#8E9B72]" />
                TECHNICAL ARSENAL
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentMission.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#121610] border border-[#24291F] text-[#8E9B72] font-bold text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2 tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-green-400" />
                AFTER ACTION TELEMETRY
              </h3>
              <div className="space-y-1.5 pt-1 text-[10px]">
                {Object.entries(currentMission.telemetry).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-[#24291F]/40 pb-1">
                    <span className="text-[#73786B] uppercase font-bold">{key}:</span>
                    <span className="text-green-400 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
