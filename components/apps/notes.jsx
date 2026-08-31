"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Tag,
  Clock,
  ShieldCheck,
  Check,
  AlertTriangle,
  Radio,
  UserCheck,
  Pin,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_RECORDS = [
  {
    id: "001",
    fullId: "KVC-0001",
    title: "ABOUT ME // OPERATOR DOSSIER",
    collection: "PERSONAL",
    status: "VERIFIED",
    created: "31 AUG 2026",
    isPinned: true,
    content: `OPERATOR DOSSIER // ANIMESH TIWARI\n\nROLE: Full Stack Developer & Systems Architect\nLOCATION: New Delhi, India\nCORE FOCUS: High-Performance Web Applications, Systems Architecture, and Microservices Security.\n\nOPERATIONAL BACKGROUND:\nI am a passionate Full Stack Software Engineer focused on crafting high-speed, secure, and intuitive web platforms. Specialized in building modern React/Next.js client applications, scalable Node.js/Express REST microservices, and high-availability database pipelines.\n\nTECHNICAL DOMAINS:\n• Frontend: React 19, Next.js 15, JavaScript (ES6+), Tailwind CSS, Framer Motion\n• Backend: Node.js, Express.js, REST API Architecture, JWT Authentication & RBAC\n• Databases: MongoDB, Redis Caching\n• Systems & Tools: Git/GitHub, Docker, Linux, C++ & Data Structures (DSA)\n\nPHILOSOPHY:\n"Precision over assumptions. Execution over unnecessary activity. Building systems that are reliable, fast, and secure."`,
  },
  {
    id: "047",
    fullId: "KVC-0047",
    title: "BACKEND ROUTING PROTOCOLS",
    collection: "LEARNING",
    status: "ACTIVE",
    created: "31 AUG 2026",
    isPinned: false,
    content: `Routing is the entry point to a server application. A route defines how the system responds to a particular request endpoint (HTTP method + URI pattern).\n\nIn Kavach architecture, all API routes are wrapped in zero-knowledge middleware to guarantee packet integrity and token verification before payload execution.`,
  },
  {
    id: "046",
    fullId: "KVC-0046",
    title: "JWT AUTH PROTOCOL",
    collection: "LEARNING",
    status: "ACTIVE",
    created: "30 AUG 2026",
    isPinned: false,
    content: `JSON Web Tokens (JWT) are used for stateless authentication across security nodes. Tokens are signed with an RS256 private key and verified at the ingress proxy level.`,
  },
  {
    id: "045",
    fullId: "KVC-0045",
    title: "MONGODB CLUSTER SCHEMA",
    collection: "PROJECTS",
    status: "SYNCED",
    created: "28 AUG 2026",
    isPinned: false,
    content: `Primary cluster replica set configuration. Indexes created on user hash keys and session expiration timestamps to ensure automatic TTL cleanup.`,
  },
  {
    id: "044",
    fullId: "KVC-0044",
    title: "KAVACH CORE ARCHITECTURE",
    collection: "PROJECTS",
    status: "ACTIVE",
    created: "25 AUG 2026",
    isPinned: false,
    content: `Kavach Workstation shell interface. Combines macOS-style desktop interactions with tactical military-grade visual telemetry and isolated application execution sandboxes.`,
  },
];

const COLLECTIONS = [
  "ALL RECORDS",
  "PERSONAL",
  "LEARNING",
  "PROJECTS",
  "IDEAS",
];

export default function NotesApp() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [activeRecordId, setActiveRecordId] = useState("001");
  const [selectedCollection, setSelectedCollection] = useState("ALL RECORDS");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);

  const activeRecord =
    records.find((r) => r.id === activeRecordId) || records[0];

  const filteredRecords = records.filter((rec) => {
    const matchesCollection =
      selectedCollection === "ALL RECORDS" ||
      rec.collection === selectedCollection;
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.fullId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  const triggerSecurityWarning = () => {
    setShowSecurityAlert(true);
  };

  const handleCreateNewRecord = () => {
    triggerSecurityWarning();
  };

  const handleUpdateActiveRecord = (field, value) => {
    triggerSecurityWarning();
    setRecords((prev) =>
      prev.map((r) => (r.id === activeRecordId ? { ...r, [field]: value } : r)),
    );
    triggerSavedNotice();
  };

  const triggerSavedNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] select-none overflow-hidden border-t border-[#24291F] relative">
      {/* Sidebar Navigation */}
      <div className="w-60 border-r border-[#24291F] bg-[#0A0C09] flex flex-col h-full shrink-0">
        {/* Search Bar */}
        <div className="p-2 border-b border-[#24291F] bg-[#121610]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0C09] border border-[#24291F] rounded focus-within:border-[#8E9B72] transition-colors">
            <Search className="w-3.5 h-3.5 text-[#8E9B72]" />
            <input
              type="text"
              placeholder="SEARCH NOTES"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255] uppercase"
            />
          </div>
        </div>

        {/* Record List */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          <div className="flex items-center justify-between text-[9px] text-[#5E6255] font-bold px-1 py-0.5 tracking-wider">
            <span>NOTES LIST ({filteredRecords.length})</span>
            <span className="text-[8px] text-[#8E9B72]/80">[UNIT-7]</span>
          </div>

          {filteredRecords.map((rec) => {
            const isActive = rec.id === activeRecordId;
            return (
              <motion.div
                key={rec.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveRecordId(rec.id)}
                className={`p-2 rounded cursor-pointer transition-colors border ${
                  isActive
                    ? "bg-[#121610] border-[#8E9B72] text-[#8E9B72]"
                    : "border-transparent hover:bg-[#121610]/60 hover:border-[#24291F] text-[#73786B]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[10.5px] truncate flex items-center gap-1">
                    {rec.isPinned && <Pin className="w-3 h-3 text-amber-400 rotate-45" />}
                    {rec.title}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[9px] opacity-70">
                  <span className="text-[#8E9B72] font-bold">{rec.collection}</span>
                  <span>{rec.created}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Collections Filter */}
        <div className="p-2 border-t border-[#24291F] bg-[#0C0E0B] space-y-1">
          <div className="text-[9px] text-[#5E6255] font-bold px-1 tracking-wider uppercase">
            COLLECTIONS
          </div>
          <div className="space-y-0.5">
            {COLLECTIONS.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`w-full text-left px-2 py-1 rounded text-[9.5px] font-bold tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                  selectedCollection === col
                    ? "bg-[#121610] text-[#8E9B72] border border-[#8E9B72]/30"
                    : "text-[#73786B] hover:text-white hover:bg-[#121610]/40"
                }`}
              >
                <span>{col}</span>
                {selectedCollection === col && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E9B72]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* New Record Button */}
        <div className="p-2 border-t border-[#24291F] bg-[#0A0C09]">
          <button
            onClick={handleCreateNewRecord}
            className="w-full py-1.5 bg-[#121610] hover:bg-[#1a2016] border border-[#8E9B72]/50 hover:border-[#8E9B72] text-[#8E9B72] hover:text-white rounded text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            [+ NEW NOTE]
          </button>
        </div>
      </div>

      {/* Main Journal Content Area */}
      <div className="flex-1 flex flex-col bg-[#070906] h-full overflow-hidden relative">
        {activeRecord ? (
          <>
            {/* Header Strip */}
            <div className="p-4 border-b border-[#24291F] bg-[#0A0C09]/60 flex flex-col space-y-2 relative">
              <div className="flex items-center justify-between text-[9px] text-[#5E6255] tracking-widest">
                <span className="flex items-center gap-2">
                  <span>RECORD {activeRecord.id}</span>
                  <span className="text-[8px] bg-[#121610] px-1.5 py-0.5 border border-[#3A4034] text-[#8E9B72] rounded font-bold">
                    RESTRICTED
                  </span>
                </span>
                {isSavedNotice && (
                  <span className="text-green-400 flex items-center gap-1 font-bold animate-pulse">
                    <Check className="w-3 h-3" /> AUTO-SAVED
                  </span>
                )}
              </div>

              {/* Title Input */}
              <input
                type="text"
                value={activeRecord.title}
                onKeyDown={triggerSecurityWarning}
                onChange={(e) =>
                  handleUpdateActiveRecord(
                    "title",
                    e.target.value.toUpperCase(),
                  )
                }
                className="bg-transparent border-none outline-none text-white text-base font-bold tracking-wider text-[#8E9B72] caret-[#8E9B72]"
              />

              {/* Metadata Grid */}
              <div className="pt-2 border-t border-[#24291F]/60 grid grid-cols-3 gap-2 text-[10px]">
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-[#5E6255]" />
                  <span className="text-[#5E6255]">CATEGORY:</span>
                  <select
                    value={activeRecord.collection}
                    onMouseDown={triggerSecurityWarning}
                    onChange={(e) =>
                      handleUpdateActiveRecord("collection", e.target.value)
                    }
                    className="bg-[#121610] border border-[#24291F] text-white rounded px-1.5 py-0.5 outline-none cursor-pointer text-[9.5px]"
                  >
                    <option value="PERSONAL">PERSONAL</option>
                    <option value="LEARNING">LEARNING</option>
                    <option value="PROJECTS">PROJECTS</option>
                    <option value="IDEAS">IDEAS</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-[#5E6255]" />
                  <span className="text-[#5E6255]">STATUS:</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {activeRecord.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <Clock className="w-3 h-3 text-[#5E6255]" />
                  <span className="text-[#5E6255]">CREATED:</span>
                  <span className="text-[#D4D5C8] font-bold">
                    {activeRecord.created}
                  </span>
                </div>
              </div>
            </div>

            {/* Note Content Textarea */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#070906] relative">
              <textarea
                value={activeRecord.content}
                onKeyDown={triggerSecurityWarning}
                onChange={(e) =>
                  handleUpdateActiveRecord("content", e.target.value)
                }
                className="w-full h-full bg-transparent border-none outline-none text-[#D4D5C8] font-mono text-xs leading-relaxed resize-none caret-[#8E9B72]"
                placeholder="Write entry data..."
              />
            </div>

            {/* Footer Telemetry Strip */}
            <div className="px-4 py-1.5 border-t border-[#24291F] bg-[#0A0C09] flex items-center justify-between text-[9px] text-[#5E6255]">
              <span>
                RECORD ID:{" "}
                <strong className="text-[#8E9B72]">
                  {activeRecord.fullId}
                </strong>
              </span>
              <span className="flex items-center gap-1 text-[#73786B]">
                <Radio className="w-3 h-3 text-[#8E9B72]" />
                <span>FREQ: 433.92 MHz</span>
              </span>
              <span>
                CHARACTERS:{" "}
                <strong className="text-[#D4D5C8]">
                  {activeRecord.content.length}
                </strong>
              </span>
              <span className="flex items-center gap-1.5">
                SYNC:{" "}
                <strong className="text-green-400">
                  LOCAL SECURED
                </strong>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#5E6255]">
            SELECT OR CREATE A RECORD TO VIEW JOURNAL
          </div>
        )}
      </div>

      {/* Security Warning Modal */}
      <AnimatePresence>
        {showSecurityAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none"
            onClick={() => setShowSecurityAlert(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[300px] border border-red-500/50 bg-[#0B0F17]/95 rounded-lg p-5 shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-xl relative font-mono text-[#D4D5C8] flex flex-col items-center text-center space-y-4"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-red-500/40 bg-red-500/10 mt-1">
                <span className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-30" />
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-red-500 tracking-[0.2em] uppercase">
                  SECURITY PROTOCOL VIOLATION
                </h3>
                <div className="w-12 h-[1px] bg-red-500/30 mx-auto my-1.5" />
              </div>

              <div className="text-[10px] font-bold text-[#D4D5C8] leading-relaxed max-w-[240px] uppercase tracking-wide">
                YOU ARE NOT ALLOWED TO MANIPULATE CRITICAL DATA. YOU WILL BE SHOT DOWN SHORTLY.
              </div>

              <button
                onClick={() => setShowSecurityAlert(false)}
                className="mt-2 w-full py-1.5 bg-red-950/40 hover:bg-red-900/70 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-white rounded text-[10px] font-bold tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)] cursor-pointer"
              >
                [ ACKNOWLEDGE WARNING ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
