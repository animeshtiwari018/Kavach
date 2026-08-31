"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Lock,
  Unlock,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Layers,
  Terminal,
  FileText,
  Activity,
  Image as ImageIcon,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS_DATA = [
  {
    id: "001",
    recordId: "KVC-001",
    title: "STUDENT RESOURCE PORTAL",
    statement: "Centralized digital resource management system for students and academic faculties.",
    category: "COMPLETED",
    status: "COMPLETED",
    classType: "FULL STACK",
    clearance: "PUBLIC",
    date: "31 AUG 2026",
    lastModified: "21:31:04",
    liveUrl: "https://student-resource-portal.example.com",
    repoUrl: "https://github.com/animeshtiwari018/student-resource-portal",
    briefing: {
      objective: "To solve fragmentations in academic resource distribution by engineering a unified digital portal where students access verified course materials, assignments, and real-time announcements.",
      challenge: "Legacy academic portals suffered from high latency during exam peak traffic, unauthorized file uploads, and poor mobile device responsiveness.",
      approach: "Built a stateless Next.js frontend coupled with an Express REST API. Utilized MongoDB indexing for fast queries and implemented JWT middleware with role-based access control (RBAC).",
      result: "Achieved 99.9% operational uptime during semester finals, reduced resource retrieval latency by 68%, and served over 3,000 active concurrent student sessions.",
    },
    photographs: [
      {
        id: "cap-01",
        label: "CAPTURE 01",
        title: "AUTHENTICATION & RBAC MODULE",
        timestamp: "2026-08-31 14:22:00",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "cap-02",
        label: "CAPTURE 02",
        title: "RESOURCE DASHBOARD & FILTERING",
        timestamp: "2026-08-31 14:25:30",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "cap-03",
        label: "CAPTURE 03",
        title: "RESPONSIVE MOBILE VIEWPORT",
        timestamp: "2026-08-31 14:30:12",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      },
    ],
    arsenal: [
      { name: "REACT 19", role: "FRONTEND INTERACTION & STATE COMPOSITION LAYER" },
      { name: "NODE.JS", role: "ASYNCHRONOUS SERVER RUNTIME ENVIRONMENT" },
      { name: "EXPRESS.JS", role: "RESTFUL API ROUTING AND MIDDLEWARE PIPELINE" },
      { name: "MONGODB", role: "DOCUMENT STORE FOR ACADEMIC SCHEMAS & INDEXES" },
      { name: "TAILWIND CSS", role: "UTILITY-FIRST DESIGN SYSTEM & LAYOUT TOKENS" },
    ],
    timeline: [
      { step: "01 DISCOVERY", detail: "Analyzed student pain points and gathered faculty requirements." },
      { step: "02 ARCHITECTURE", detail: "Designed REST endpoint schemas, JWT security, and ER diagrams." },
      { step: "03 DEVELOPMENT", detail: "Constructed modular components, API controllers, and DB pipelines." },
      { step: "04 TESTING", detail: "Executed stress testing, load simulation, and cross-browser audits." },
      { step: "05 DEPLOYMENT", detail: "Pushed production bundle to Cloudflare Vercel infrastructure." },
    ],
    aar: {
      worked: "Using Next.js App Router for server-rendered page shells dramatically boosted initial page load speed.",
      failed: "Initial unoptimized file upload handling caused memory spikes on large PDF submissions under heavy traffic.",
      lesson: "Implemented chunked stream uploads and cloud storage presigned URLs directly from client to S3 bucket.",
      nextVersion: "Integrate full-text elastic search indexing for instant document querying across all course modules.",
    },
  },
  {
    id: "002",
    recordId: "KVC-002",
    title: "KAVACH OS PORTFOLIO",
    statement: "Defense-inspired operating-system portfolio interface built for security workstations.",
    category: "ACTIVE",
    status: "ACTIVE",
    classType: "SYSTEM ARCH",
    clearance: "RESTRICTED",
    date: "31 AUG 2026",
    lastModified: "22:04:12",
    liveUrl: "https://kavach.security",
    repoUrl: "https://github.com/animeshtiwari018/Kavach",
    briefing: {
      objective: "To create an immersive, highly technical personal portfolio engineered as a web-based operating system shell instead of a traditional linear webpage.",
      challenge: "Balancing complex window management (drag, resize, focus, minimize) with smooth 60fps animations without breaking mobile responsiveness.",
      approach: "Architected a custom React state engine in Next.js using Framer Motion (`motion/react`) drag physics and dynamic window z-index layering.",
      result: "Delivered a fully interactive desktop workstation complete with terminal, web browser, webcam telemetry, and field journal apps.",
    },
    photographs: [
      {
        id: "cap-04",
        label: "CAPTURE 01",
        title: "DESKTOP CANVAS & DOCK INTERFACE",
        timestamp: "2026-08-31 18:10:00",
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "cap-05",
        label: "CAPTURE 02",
        title: "FIELD JOURNAL & NOTES WORKSPACE",
        timestamp: "2026-08-31 18:15:20",
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      },
    ],
    arsenal: [
      { name: "NEXT.JS 15", role: "CORE REACT FRAMEWORK AND ROUTING INFRASTRUCTURE" },
      { name: "FRAMER MOTION", role: "PHYSICS-BASED WINDOW DRAG AND RESIZE ANIMATIONS" },
      { name: "LUCIDE REACT", role: "TECHNICAL VECTOR ICONOMETRY AND GRAPHICS" },
      { name: "TAILWIND CSS", role: "MILITARY-GRADE MATTE PALETTE & GRID LAYOUT TOKENS" },
    ],
    timeline: [
      { step: "01 DISCOVERY", detail: "Defined tactical OS user experience and information architecture." },
      { step: "02 ARCHITECTURE", detail: "Built dynamic z-index coordinator and drag constraint bounds." },
      { step: "03 DEVELOPMENT", detail: "Created modular desktop apps: FaceTime, Notes, Browser, Terminal." },
      { step: "04 TESTING", detail: "Audited fast refresh state persistence and touch event handling." },
      { step: "05 DEPLOYMENT", detail: "Continuous integration deployment to production edge network." },
    ],
    aar: {
      worked: "Separating component state from static element instantiations solved React Fast Refresh hot reload latency.",
      failed: "Initial window resize handlers caused frame drops during pointer capture drag cycles.",
      lesson: "Switched resize motion transitions dynamically from spring physics to duration-zero tween during active drags.",
      nextVersion: "Add persistent localStorage desktop state saving so window positions persist across browser restarts.",
    },
  },
  {
    id: "003",
    recordId: "KVC-003",
    title: "BACKEND API GATEWAY",
    statement: "Zero-knowledge high-throughput backend microservice gateway with rate limiting.",
    category: "COMPLETED",
    status: "COMPLETED",
    classType: "BACKEND ARCH",
    clearance: "PUBLIC",
    date: "25 AUG 2026",
    lastModified: "19:14:02",
    liveUrl: "https://api-gateway.example.com",
    repoUrl: "https://github.com/animeshtiwari018/backend-api-gateway",
    briefing: {
      objective: "Engineered an enterprise ingress proxy to manage microservice authentication, request routing, rate limiting, and telemetry logging.",
      challenge: "Preventing DDoS spikes and credential stuffing attacks without adding proxy latency overhead to legitimate client requests.",
      approach: "Used Node.js cluster mode with Redis sliding-window token bucket algorithm for real-time IP rate limiting and JWT validation.",
      result: "Processed over 10,000 requests per minute with an average gateway routing delay under 4 milliseconds.",
    },
    photographs: [
      {
        id: "cap-06",
        label: "CAPTURE 01",
        title: "MICROSERVICE METRICS & TELEMETRY",
        timestamp: "2026-08-25 12:00:00",
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      },
    ],
    arsenal: [
      { name: "NODE.JS", role: "NON-BLOCKING ASYNCHRONOUS EVENT-DRIVEN CORE" },
      { name: "REDIS", role: "IN-MEMORY SLIDING WINDOW RATE LIMITING & CACHING" },
      { name: "DOCKER", role: "CONTAINERIZED ISOLATION AND MICROSERVICE SCALING" },
    ],
    timeline: [
      { step: "01 DISCOVERY", detail: "Identified proxy throughput limits and security attack vectors." },
      { step: "02 ARCHITECTURE", detail: "Designed token bucket algorithm and Redis cluster data models." },
      { step: "03 DEVELOPMENT", detail: "Implemented HTTP reverse proxy and security headers middleware." },
      { step: "04 TESTING", detail: "Ran Apache Bench & Artillery load tests up to 15k req/sec." },
      { step: "05 DEPLOYMENT", detail: "Deployed Docker multi-container cluster behind nginx load balancer." },
    ],
    aar: {
      worked: "Sliding window token buckets in Redis prevented traffic bursts while keeping memory usage under 40MB.",
      failed: "Single-thread Node event loop bottlenecked when parsing large JSON payloads synchronously.",
      lesson: "Implemented worker thread pools for payload decryption and schema validation tasks.",
      nextVersion: "Migrate proxy routing core to Rust or Go for ultra-low latency sub-millisecond execution.",
    },
  },
  {
    id: "004",
    recordId: "KVC-004",
    title: "CLASSIFIED NEURAL CORE",
    statement: "Autonomous threat telemetry & kernel anomaly detection system.",
    category: "CLASSIFIED",
    status: "CLASSIFIED",
    classType: "AI SECURITY",
    clearance: "TOP SECRET",
    date: "15 AUG 2026",
    lastModified: "11:00:00",
    isClassifiedSealed: true,
    liveUrl: "https://classified.example.com",
    repoUrl: "https://github.com/animeshtiwari018/neural-core",
    briefing: {
      objective: "Autonomous machine learning model trained on low-level system call sequences to identify zero-day kernel exploits.",
      challenge: "Extracting kernel event logs in real-time without introducing CPU overhead or kernel panic triggers.",
      approach: "Utilized eBPF probes in Linux kernel space connected to a lightweight PyTorch anomaly detector model.",
      result: "Successfully detected 99.4% of simulated shellcode injection attacks in isolated sandbox test environments.",
    },
    photographs: [
      {
        id: "cap-07",
        label: "CAPTURE 01",
        title: "EBPF KERNEL TELEMETRY MATRIX",
        timestamp: "2026-08-15 10:00:00",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      },
    ],
    arsenal: [
      { name: "PYTHON / PYTORCH", role: "ANOMALY DETECTION MODEL TRAINING & INFERENCE" },
      { name: "EBPF / C", role: "KERNEL SPACE SYSTEM CALL IN-MEMORY TELEMETRY HOOKS" },
      { name: "DOCKER", role: "ISOLATED EXPLOIT SANDBOX ENVIRONMENT" },
    ],
    timeline: [
      { step: "01 DISCOVERY", detail: "Analyzed Linux syscall patterns during zero-day exploit execution." },
      { step: "02 ARCHITECTURE", detail: "Designed eBPF ring buffer event passing pipeline." },
      { step: "03 DEVELOPMENT", detail: "Trained autoencoder model on benign baseline telemetry." },
      { step: "04 TESTING", detail: "Tested against automated exploit payloads in isolated sandbox." },
      { step: "05 DEPLOYMENT", detail: "Compiled static binary for security kernel deployment." },
    ],
    aar: {
      worked: "eBPF allowed zero-overhead event capturing directly inside Linux kernel space.",
      failed: "High false-positive rate during system updates when new legitimate syscall sequences occurred.",
      lesson: "Added online incremental learning adaptation to update benign baseline profiles automatically.",
      nextVersion: "Expand model architecture to analyze network packet inspection frames concurrently.",
    },
  },
];

const CATEGORIES = ["ALL OPERATIONS", "COMPLETED", "ACTIVE", "ARCHIVED", "CLASSIFIED"];

export default function MissionArchiveApp() {
  const [selectedProjectId, setSelectedProjectId] = useState("001");
  const [selectedCategory, setSelectedCategory] = useState("ALL OPERATIONS");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccessingAnimation, setIsAccessingAnimation] = useState(false);
  const [unlockedClassifiedIds, setUnlockedClassifiedIds] = useState([]);

  const currentProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Filter projects by category and search query
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCategory =
      selectedCategory === "ALL OPERATIONS" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.statement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectProject = (projectId) => {
    if (projectId === selectedProjectId) return;
    setIsAccessingAnimation(true);
    setSelectedProjectId(projectId);
    setTimeout(() => {
      setIsAccessingAnimation(false);
    }, 500);
  };

  const handleAuthorizeAccess = (projectId) => {
    setUnlockedClassifiedIds([...unlockedClassifiedIds, projectId]);
  };

  const isCurrentSealed =
    currentProject.isClassifiedSealed && !unlockedClassifiedIds.includes(currentProject.id);

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F] relative">
      {/* Sidebar Navigation Area */}
      <div className="w-64 border-r border-[#24291F] bg-[#0A0C09] flex flex-col h-full shrink-0">
        {/* Sidebar Header */}
        <div className="p-3 border-b border-[#24291F] bg-[#0C0E0B] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-white text-xs tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#8E9B72]" />
            <span>OPERATIONS</span>
          </div>
          <span className="text-[9px] text-[#73786B] tracking-widest">[ KVC-ARCH ]</span>
        </div>

        {/* Search Input Box */}
        <div className="p-2 border-b border-[#24291F] bg-[#121610]">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0A0C09] border border-[#24291F] rounded focus-within:border-[#8E9B72]/60 transition-colors">
            <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
            <input
              type="text"
              placeholder="◉ Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255] uppercase tracking-wider"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-2 border-b border-[#24291F] bg-[#0A0C09] space-y-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-2 py-1 rounded text-[9.5px] font-bold tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#121610] text-[#8E9B72] border border-[#8E9B72]/30"
                  : "text-[#73786B] hover:text-white hover:bg-[#121610]/50"
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B72]" />
              )}
            </button>
          ))}
        </div>

        {/* Missions List */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          <div className="text-[9px] text-[#5E6255] font-bold px-1 py-0.5 tracking-wider uppercase">
            MISSION RECORDS ({filteredProjects.length})
          </div>
          {filteredProjects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            const isSealed = proj.isClassifiedSealed && !unlockedClassifiedIds.includes(proj.id);
            return (
              <motion.div
                key={proj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectProject(proj.id)}
                className={`p-2 rounded cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#121610] border-[#8E9B72] text-[#8E9B72]"
                    : "border-transparent hover:bg-[#121610]/60 hover:border-[#24291F] text-[#73786B]"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] mb-0.5 opacity-80">
                  <span className="font-bold">MISSION {proj.id}</span>
                  <span>{proj.recordId}</span>
                </div>
                <div className="font-bold text-white text-[10.5px] truncate">
                  {isSealed ? "████████████" : proj.title}
                </div>
                <div className="flex items-center justify-between mt-1 text-[9px]">
                  <span className="flex items-center gap-1 font-bold">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        proj.status === "COMPLETED"
                          ? "bg-green-400"
                          : proj.status === "ACTIVE"
                          ? "bg-[#8E9B72]"
                          : "bg-red-500"
                      }`}
                    />
                    <span
                      className={
                        proj.status === "COMPLETED"
                          ? "text-green-400"
                          : proj.status === "ACTIVE"
                          ? "text-[#8E9B72]"
                          : "text-red-400"
                      }
                    >
                      ● {proj.status}
                    </span>
                  </span>
                  <span>{proj.classType}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar Footer Metrics */}
        <div className="p-2.5 border-t border-[#24291F] bg-[#0C0E0B] text-[9px] text-[#5E6255] space-y-1">
          <div className="flex justify-between">
            <span>TOTAL OPERATIONS:</span>
            <strong className="text-[#8E9B72]">04</strong>
          </div>
          <div className="flex justify-between">
            <span>SUCCESS RATE:</span>
            <strong className="text-green-400">100%</strong>
          </div>
        </div>
      </div>

      {/* Main Content Area (Selected Mission File) */}
      <div className="flex-1 flex flex-col bg-[#070906] h-full overflow-hidden relative">
        {/* Top Window Sub-Header Strip */}
        <div className="px-4 py-1.5 bg-[#0A0C09] border-b border-[#24291F] flex items-center justify-between text-[9px] text-[#73786B]">
          <span className="font-bold text-white tracking-widest uppercase">
            MISSION ARCHIVE
          </span>
          <div className="flex items-center gap-3 font-bold text-[8.5px]">
            <span className="text-[#8E9B72]">[ PRIVATE NET ]</span>
            <span className="text-green-400">[ SECURE ]</span>
            <span className="text-[#5E6255]">[ WIN ]</span>
          </div>
        </div>

        {/* Content View Workspace */}
        <div className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {isAccessingAnimation ? (
              /* Short Restrained Accessing Record Scanner Animation */
              <motion.div
                key="accessing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full h-full flex flex-col items-center justify-center space-y-3 p-8 text-center bg-[#070906]"
              >
                <div className="w-12 h-12 rounded border border-[#8E9B72]/40 bg-[#121610] flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#8E9B72] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase">
                    ACCESSING RECORD
                  </div>
                  <div className="text-sm font-bold text-white tracking-widest">
                    {currentProject.recordId}
                  </div>
                  <div className="text-[10px] text-[#73786B] tracking-wider">
                    VERIFYING ARCHIVE...
                  </div>
                </div>
                <div className="w-48 h-1.5 bg-[#121610] border border-[#24291F] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full bg-[#8E9B72]"
                  />
                </div>
                <div className="text-[9px] text-green-400 font-bold tracking-widest">
                  ACCESS GRANTED
                </div>
              </motion.div>
            ) : isCurrentSealed ? (
              /* Sealed Classified Dossier Access Gate */
              <motion.div
                key="sealed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center p-6 bg-[#070906]"
              >
                <div className="max-w-md w-full border border-red-500/40 bg-[#0A0C09] rounded-lg p-6 text-center space-y-4 relative shadow-2xl">
                  {/* Weld Corner Brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/60" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/60" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500/60" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/60" />

                  <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 mx-auto flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-500" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-red-500 tracking-widest uppercase">
                      RECORD SEALED
                    </h3>
                    <p className="text-xs text-[#D4D5C8] font-bold tracking-wider">
                      CLEARANCE REQUIRED // LEVEL TOP SECRET
                    </p>
                    <p className="text-[10px] text-[#73786B] leading-relaxed pt-1">
                      This operational dossier is encrypted under classified protocol. Operational clearance authentication is required to decrypt mission files.
                    </p>
                  </div>

                  <button
                    onClick={() => handleAuthorizeAccess(currentProject.id)}
                    className="w-full py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-white rounded text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.15)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>[ AUTHORIZE ACCESS ]</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Full Unlocked Mission File Dossier */
              <motion.div
                key="dossier"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 space-y-6 max-w-4xl mx-auto"
              >
                {/* Mission Header & Top Metadata Grid */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#24291F] pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#8E9B72]" />
                      <span className="font-bold text-[#8E9B72] text-xs tracking-widest">
                        MISSION FILE
                      </span>
                    </div>
                    <span className="font-bold text-white text-xs tracking-widest">
                      {currentProject.recordId}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
                    <div className="bg-[#121610] p-2 border border-[#24291F] rounded space-y-0.5">
                      <span className="text-[#5E6255] font-bold block">STATUS</span>
                      <span className="font-bold text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {currentProject.status}
                      </span>
                    </div>
                    <div className="bg-[#121610] p-2 border border-[#24291F] rounded space-y-0.5">
                      <span className="text-[#5E6255] font-bold block">CLASS</span>
                      <span className="font-bold text-white">{currentProject.classType}</span>
                    </div>
                    <div className="bg-[#121610] p-2 border border-[#24291F] rounded space-y-0.5">
                      <span className="text-[#5E6255] font-bold block">CLEARANCE</span>
                      <span className="font-bold text-[#8E9B72]">{currentProject.clearance}</span>
                    </div>
                    <div className="bg-[#121610] p-2 border border-[#24291F] rounded space-y-0.5">
                      <span className="text-[#5E6255] font-bold block">DATE</span>
                      <span className="font-bold text-white">{currentProject.date}</span>
                    </div>
                  </div>

                  {/* Large Project Title & One-line Statement */}
                  <div className="pt-2 space-y-1.5">
                    <h1 className="text-xl font-bold text-white tracking-wide">
                      {currentProject.title}
                    </h1>
                    <p className="text-xs text-[#8E9B72] font-semibold italic border-l-2 border-[#8E9B72] pl-3 py-0.5">
                      "{currentProject.statement}"
                    </p>
                  </div>
                </div>

                {/* Section 1: MISSION BRIEFING */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4">
                  <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase border-b border-[#24291F] pb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#8E9B72]" />
                    <span>MISSION BRIEFING</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
                    <div className="bg-[#121610] p-3 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-white text-[10px] tracking-wider uppercase text-[#8E9B72]">
                        OBJECTIVE
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.briefing.objective}</p>
                    </div>

                    <div className="bg-[#121610] p-3 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-white text-[10px] tracking-wider uppercase text-amber-400">
                        CHALLENGE
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.briefing.challenge}</p>
                    </div>

                    <div className="bg-[#121610] p-3 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-white text-[10px] tracking-wider uppercase text-cyan-400">
                        APPROACH
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.briefing.approach}</p>
                    </div>

                    <div className="bg-[#121610] p-3 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-white text-[10px] tracking-wider uppercase text-green-400">
                        RESULT
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.briefing.result}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: FIELD PHOTOGRAPHS */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4">
                  <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase border-b border-[#24291F] pb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#8E9B72]" />
                    <span>FIELD PHOTOGRAPHS</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentProject.photographs.map((photo) => (
                      <div
                        key={photo.id}
                        className="border border-[#24291F] bg-[#121610] rounded overflow-hidden flex flex-col space-y-2 group"
                      >
                        <div className="relative aspect-video overflow-hidden bg-black">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/80 border border-[#24291F] text-[8.5px] font-bold text-[#8E9B72] rounded">
                            {photo.label}
                          </div>
                        </div>
                        <div className="p-2.5 space-y-1">
                          <h4 className="font-bold text-white text-[10px] truncate">
                            {photo.title}
                          </h4>
                          <span className="text-[8.5px] text-[#73786B] block">
                            TIMESTAMP: {photo.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: TECHNICAL ARSENAL */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4">
                  <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase border-b border-[#24291F] pb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#8E9B72]" />
                    <span>TECHNICAL ARSENAL</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentProject.arsenal.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 border border-[#24291F] bg-[#121610] rounded flex flex-col justify-between space-y-1"
                      >
                        <span className="font-bold text-white text-xs tracking-wider">
                          {item.name}
                        </span>
                        <span className="text-[9.5px] text-[#8E9B72] font-semibold tracking-wide">
                          ROLE: {item.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: MISSION TIMELINE */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4">
                  <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase border-b border-[#24291F] pb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#8E9B72]" />
                    <span>MISSION TIMELINE</span>
                  </h2>

                  <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#24291F]">
                    {currentProject.timeline.map((stage, idx) => (
                      <div key={idx} className="flex items-start gap-4 relative pl-8">
                        <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-[#0A0C09] border-2 border-[#8E9B72] flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-[#8E9B72]" />
                        </div>
                        <div className="flex-1 bg-[#121610] p-2.5 border border-[#24291F] rounded space-y-0.5">
                          <h4 className="font-bold text-white text-[10.5px] tracking-wider">
                            {stage.step}
                          </h4>
                          <p className="text-[10px] text-[#73786B]">{stage.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: AFTER ACTION REPORT (AAR) */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg space-y-4">
                  <h2 className="text-xs font-bold text-[#8E9B72] tracking-widest uppercase border-b border-[#24291F] pb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8E9B72]" />
                    <span>AFTER ACTION REPORT (AAR)</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
                    <div className="bg-[#121610] p-3.5 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-green-400 text-[10px] tracking-wider uppercase">
                        ✓ WHAT WORKED
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.aar.worked}</p>
                    </div>

                    <div className="bg-[#121610] p-3.5 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-red-400 text-[10px] tracking-wider uppercase">
                        ⚠ WHAT FAILED
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.aar.failed}</p>
                    </div>

                    <div className="bg-[#121610] p-3.5 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-[#8E9B72] text-[10px] tracking-wider uppercase">
                        ★ LESSON LEARNED
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.aar.lesson}</p>
                    </div>

                    <div className="bg-[#121610] p-3.5 border border-[#24291F] rounded space-y-1">
                      <h3 className="font-bold text-cyan-400 text-[10px] tracking-wider uppercase">
                        🚀 NEXT DEPLOYMENT
                      </h3>
                      <p className="text-[#D4D5C8]">{currentProject.aar.nextVersion}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Telemetry Strip */}
                <div className="p-5 border border-[#24291F] bg-[#0A0C09] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#121610] hover:bg-[#1a2016] border border-[#8E9B72]/60 hover:border-[#8E9B72] text-[#8E9B72] hover:text-white rounded text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>[ OPEN LIVE SYSTEM ]</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={currentProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#121610] hover:bg-[#1a2016] border border-[#24291F] hover:border-white/40 text-[#D4D5C8] hover:text-white rounded text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>[ VIEW SOURCE CODE ]</span>
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-[9.5px] text-[#73786B] font-mono space-y-0.5 text-right w-full sm:w-auto">
                    <div>RECORD ID: <strong className="text-[#8E9B72]">{currentProject.recordId}</strong></div>
                    <div>LAST MODIFIED: <strong className="text-white">{currentProject.lastModified}</strong></div>
                    <div className="flex items-center justify-end gap-1 text-green-400 font-bold">
                      <span>SYNC: LOCAL SECURED</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
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
