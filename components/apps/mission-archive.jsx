"use client";

import { useState } from "react";
import {
  Search,
  ExternalLink,
  FolderGit2,
  Code2,
  Sparkles,
  Layers,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS = [
  {
    id: "01",
    title: "Student Resource Portal",
    subtitle: "Centralized academic resource management & study materials platform.",
    category: "Full Stack Web App",
    status: "Completed",
    techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://student-resource-portal.example.com",
    repoUrl: "https://github.com/animeshtiwari018/student-resource-portal",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    overview: "A high-performance portal built for students to access verified course materials, lecture notes, and assignments without server latency.",
    keyFeatures: [
      "Role-Based Access Control (RBAC) for Students and Faculty",
      "Instant search & category indexing for 500+ course PDFs",
      "JWT authentication with secure token rotation",
      "Reduced server load times by 68% during peak exam traffic",
    ],
  },
  {
    id: "02",
    title: "Kavach OS Portfolio",
    subtitle: "Interactive workstation portfolio designed as a web operating system.",
    category: "Systems & UI/UX",
    status: "Active System",
    techStack: ["Next.js 15", "React 19", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kavach.security",
    repoUrl: "https://github.com/animeshtiwari018/Kavach",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    overview: "A tactical web-based operating system shell hosting interactive apps, camera telemetry, browser, and project archives.",
    keyFeatures: [
      "Custom drag & edge-resize physics window management engine",
      "Zero-latency Fast Refresh state architecture",
      "Integrated FaceTime telemetry & Field Journal notes app",
      "Clean dark tactical aesthetic tailored for security workstations",
    ],
  },
  {
    id: "03",
    title: "Backend API Gateway",
    subtitle: "High-throughput microservice proxy with rate limiting & Redis caching.",
    category: "Backend Microservices",
    status: "Completed",
    techStack: ["Node.js", "Redis", "Docker", "Express", "REST API"],
    liveUrl: "https://api-gateway.example.com",
    repoUrl: "https://github.com/animeshtiwari018/backend-api-gateway",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    overview: "An enterprise API gateway handling authentication, IP rate limiting, and request distribution across microservices.",
    keyFeatures: [
      "Redis sliding-window token bucket algorithm for DDoS protection",
      "Sub-4ms average gateway proxy routing delay",
      "Processed 10,000+ requests per minute under peak benchmark testing",
      "Dockerized container pipeline with Nginx load balancer",
    ],
  },
  {
    id: "04",
    title: "Neural Threat Core",
    subtitle: "Autonomous Linux kernel system call anomaly detection system.",
    category: "AI & Cyber Security",
    status: "Completed",
    techStack: ["Python", "PyTorch", "eBPF", "Linux C", "Docker"],
    liveUrl: "https://classified.example.com",
    repoUrl: "https://github.com/animeshtiwari018/neural-core",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    overview: "Machine learning threat detection core inspecting low-level Linux kernel syscalls to stop zero-day exploits in real-time.",
    keyFeatures: [
      "Zero-overhead eBPF ring buffer event capture inside Linux kernel space",
      "99.4% detection accuracy for simulated shellcode injection attacks",
      "Autoencoder PyTorch model for real-time anomaly inference",
      "Static binary compilation for containerized security deployments",
    ],
  },
];

export default function MissionArchiveApp() {
  const [selectedId, setSelectedId] = useState("01");
  const [searchQuery, setSearchQuery] = useState("");

  const currentProject = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F]">
      {/* Sidebar: Projects List */}
      <div className="w-64 border-r border-[#24291F] bg-[#0A0C09] flex flex-col h-full shrink-0">
        {/* Header */}
        <div className="p-3 border-b border-[#24291F] bg-[#0C0E0B] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-xs">
            <FolderGit2 className="w-4 h-4 text-[#8E9B72]" />
            <span>MY PROJECTS</span>
          </div>
          <span className="text-[9px] text-[#8E9B72] bg-[#121610] px-1.5 py-0.5 border border-[#24291F] rounded font-bold">
            {PROJECTS.length} TOTAL
          </span>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-[#24291F] bg-[#121610]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0C09] border border-[#24291F] rounded">
            <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255]"
            />
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredProjects.map((proj) => {
            const isSelected = proj.id === selectedId;
            return (
              <motion.div
                key={proj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedId(proj.id)}
                className={`p-2.5 rounded cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#121610] border-[#8E9B72] text-[#8E9B72] shadow-sm"
                    : "border-transparent hover:bg-[#121610]/50 text-[#73786B] hover:text-white"
                }`}
              >
                <div className="font-bold text-white text-xs truncate">
                  {proj.title}
                </div>
                <div className="flex items-center justify-between mt-1 text-[9.5px]">
                  <span className="text-[#8E9B72]">{proj.category}</span>
                  <span className="text-green-400 font-bold">● {proj.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Panel */}
      <div className="flex-1 flex flex-col bg-[#070906] h-full overflow-hidden">
        {/* Top Bar */}
        <div className="px-5 py-2.5 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between">
          <span className="font-bold text-white text-xs tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#8E9B72]" />
            {currentProject.title}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#121610] hover:bg-[#1a2016] border border-[#8E9B72]/60 hover:border-[#8E9B72] text-[#8E9B72] hover:text-white rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={currentProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#121610] hover:bg-[#1a2016] border border-[#24291F] hover:border-white/40 text-white rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>SOURCE CODE</span>
              <GithubIcon className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Project Details Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Banner */}
          <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-[#121610] border border-[#8E9B72]/40 text-[#8E9B72] font-bold text-[9.5px] rounded">
                {currentProject.category}
              </span>
              <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-[9.5px] rounded">
                ● {currentProject.status}
              </span>
            </div>

            <h1 className="text-xl font-bold text-white tracking-wide">
              {currentProject.title}
            </h1>
            <p className="text-xs text-[#8E9B72] leading-relaxed">
              {currentProject.subtitle}
            </p>
          </div>

          {/* Screenshot Preview Frame */}
          <div className="border border-[#24291F] bg-[#0A0C09] rounded-lg overflow-hidden space-y-2 p-2">
            <div className="aspect-video w-full rounded overflow-hidden bg-black border border-[#24291F]">
              <img
                src={currentProject.cover}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-2 py-1 flex items-center justify-between text-[9.5px] text-[#73786B]">
              <span>PROJECT PREVIEW SCREENSHOT</span>
              <span>KAVACH WORKSTATION ARCHIVE</span>
            </div>
          </div>

          {/* Overview & Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Overview */}
            <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8E9B72]" />
                OVERVIEW
              </h3>
              <p className="text-xs text-[#D4D5C8] leading-relaxed pt-1">
                {currentProject.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-2">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                KEY HIGHLIGHTS
              </h3>
              <ul className="space-y-1.5 pt-1">
                {currentProject.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-[#D4D5C8] flex items-start gap-2">
                    <span className="text-[#8E9B72] font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Used */}
          <div className="p-4 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-3">
            <h3 className="font-bold text-white text-xs flex items-center gap-1.5 border-b border-[#24291F] pb-2">
              <Layers className="w-3.5 h-3.5 text-[#8E9B72]" />
              TECHNOLOGIES USED
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {currentProject.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#121610] border border-[#24291F] text-[#8E9B72] font-bold text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
