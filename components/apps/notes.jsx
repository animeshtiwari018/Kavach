"use client";

import { useState, useRef } from "react";
import {
  Search,
  Plus,
  Tag,
  Folder,
  Users,
  SquarePen,
  Type,
  Table,
  CheckSquare,
  Paperclip,
  Share2,
  Trash2,
  Check,
  ShieldAlert,
  Lock,
  X,
  Radio,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_NOTES = [
  {
    id: "about-me",
    title: "PERSONNEL DOSSIER",
    code: "DOSSIER // 01",
    category: "PERSONNEL",
    tag: "#dossier",
    created: "2026-09-01",
    isPinned: true,
    isReadOnly: true,
    content: `==================================================
   SERVICE RECORD
==================================================

▪ OPERATIVE:      Animesh Tiwari
▪ CODENAME:       ANIMESH
▪ ROLE:           Full-Stack Developer
▪ PRIMARY UNIT:   Software Engineering
▪ SPECIALIZATION: MERN Stack, Backend Systems & DSA
▪ OPERATING BASE: Rajasthan, India
▪ STATUS:         ACTIVE

--------------------------------------------------
▣ MISSION OVERVIEW
--------------------------------------------------
Focused on engineering resilient, practical, and highly reliable digital systems. Primary duties revolve around architecting end-to-end web software—from responsive frontend user interfaces to high-throughput backend APIs, microservices, and database pipelines.

Approach development systematically: analyze objective, assess technical landscape, formulate execution strategy, deploy with precision, and iterate post-operation.

--------------------------------------------------
△ CURRENT OPERATIONS
--------------------------------------------------
◇ KAVACH WORKSTATION
  macOS-inspired web environment implementing modular sandboxes and workstation interfaces.

◇ SECURE MICROSERVICES
  Modular authentication routing engine with JWT, rate-limiting, and Redis caching layers.

◇ DSA & ALGORITHMIC SOLVING
  Repository of optimized data structures and graph algorithms implemented in C++.

--------------------------------------------------
✦ OPERATIONAL DIRECTIVE
--------------------------------------------------
Build. Learn. Deploy. Improve. Repeat.

--------------------------------------------------
◈ OPERATIONAL PHILOSOPHY
--------------------------------------------------
"Stay curious. Think systematically. Build with purpose."`,
  },
  {
    id: "skills",
    title: "TECHNICAL CAPABILITIES",
    code: "SPECS // 02",
    category: "TECHNICAL",
    tag: "#capabilities",
    created: "2026-09-01",
    isPinned: true,
    isReadOnly: true,
    content: `==================================================
   SYSTEM COMPETENCIES & STACK
==================================================

--------------------------------------------------
▣ FRONTEND ARCHITECTURE
--------------------------------------------------
▪ Frameworks: React 19, Next.js 15, HTML5, CSS3
▪ Styling: Tailwind CSS, Framer Motion, Design Tokens
▪ Core: JavaScript (ES6+), TypeScript, Client State

--------------------------------------------------
⚙️ BACKEND & DISTRIBUTED SYSTEMS
--------------------------------------------------
▪ Runtime: Node.js, Express.js
▪ Architecture: RESTful APIs, JWT Auth, System Design
▪ Languages: JavaScript, C++, SQL

--------------------------------------------------
🗄️ STORAGE & DATA PIPELINES
--------------------------------------------------
▪ NoSQL: MongoDB, Mongoose ORM
▪ Caching: Redis Key-Value Store
▪ Relational: PostgreSQL

--------------------------------------------------
🛠️ TOOLING & ENVIRONMENT
--------------------------------------------------
▪ Version Control: Git, GitHub
▪ Infrastructure: Docker
▪ Shell / OS: Linux, Bash, Windows PowerShell`,
  },
  {
    id: "projects",
    title: "CURRENT OPERATIONS",
    code: "OPS // 03",
    category: "OPERATIONS",
    tag: "#operations",
    created: "2026-08-31",
    isPinned: false,
    isReadOnly: true,
    content: `==================================================
   ACTIVE PROJECTS & DIRECTIVES
==================================================

--------------------------------------------------
1. KAVACH WORKSTATION
--------------------------------------------------
▪ Overview: Interactive workstation environment built with Next.js, React, and Tailwind CSS.
▪ Capabilities: Window manager, dynamic dock magnification, application sandboxes.

--------------------------------------------------
2. SECURE REST MICROSERVICES
--------------------------------------------------
▪ Overview: High-throughput API gateway and routing microservice.
▪ Stack: Node.js, Express, Redis, MongoDB, JWT.

--------------------------------------------------
3. DSA & PROBLEM SOLVING ENGINE
--------------------------------------------------
▪ Overview: Algorithmic toolkit and data structures library in C++.`,
  },
  {
    id: "contact",
    title: "COMMUNICATION CHANNELS",
    code: "COMM // 04",
    category: "COMMUNICATION",
    tag: "#communication",
    created: "2026-08-30",
    isPinned: false,
    isReadOnly: true,
    content: `==================================================
   OPERATIVE CONTACT METADATA
==================================================

--------------------------------------------------
📫 CONTACT MATRIX
--------------------------------------------------
▪ Identity: Animesh Tiwari
▪ Primary Role: Full-Stack Developer
▪ Operating Base: Rajasthan, India

--------------------------------------------------
🌐 CONNECTIVITY CHANNELS
--------------------------------------------------
▪ GitHub: github.com/AnimeshTiwari
▪ LinkedIn: linkedin.com/in/animeshtiwari
▪ Workstation: Kavach Workstation Web App

Open for software engineering opportunities, technical collaborations, and system architecture discussions.`,
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState("about-me");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [saveStatus, setSaveStatus] = useState(false);
  const [warning, setWarning] = useState(null);
  const warningTimerRef = useRef(null);

  // Dynamic Sidebar & List Pane Widths
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(250);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const startResizingSidebar = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(120, Math.min(290, startWidth + deltaX));
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
      const newWidth = Math.max(150, Math.min(420, startWidth + deltaX));
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

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const triggerWarning = (
    title = "CLEARANCE RESTRICTED",
    message = "You are not allowed to edit this classified personnel file.",
  ) => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setWarning({ title, message });
    warningTimerRef.current = setTimeout(() => {
      setWarning(null);
    }, 3800);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesTag = selectedTag === "ALL" || note.tag === selectedTag;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleUpdateNote = (field, value) => {
    if (activeNote.isReadOnly) {
      triggerWarning(
        "CLEARANCE RESTRICTED",
        "You are not allowed to edit this classified personnel file.",
      );
      return;
    }
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, [field]: value } : n)),
    );
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 1500);
  };

  const handleAttemptEdit = () => {
    if (activeNote.isReadOnly) {
      triggerWarning(
        "CLEARANCE RESTRICTED",
        "You are not allowed to edit this classified personnel file.",
      );
    }
  };

  const handleCreateNote = () => {
    const newId = `note-${Date.now()}`;
    const newNote = {
      id: newId,
      title: "FIELD REPORT",
      code: "LOG // NEW",
      category: "PERSONAL",
      tag: "#dossier",
      created: new Date().toISOString().split("T")[0],
      isPinned: false,
      isReadOnly: false,
      content: "◈ FIELD LOG ENTRY\n\nEnter operational notes...",
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newId);
  };

  const handleDeleteNote = (idToDelete) => {
    const target = notes.find((n) => n.id === idToDelete);
    if (target?.isReadOnly) {
      triggerWarning(
        "ACTION RESTRICTED",
        "System personnel dossiers cannot be purged.",
      );
      return;
    }
    if (notes.length <= 1) return;
    const updated = notes.filter((n) => n.id !== idToDelete);
    setNotes(updated);
    if (activeNoteId === idToDelete) {
      setActiveNoteId(updated[0].id);
    }
  };

  return (
    <div className="w-full h-full flex bg-[#141614] text-[#E2E4DF] font-sans select-none overflow-hidden text-xs">
      {/* Column 1: Intelligence Network Navigation Sidebar */}
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
            onClick={() => setSelectedTag("ALL")}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedTag === "ALL"
                ? "bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold"
                : "text-[#A8ACA2] hover:bg-[#222622]"
            }`}
          >
            <span className="flex items-center gap-2 truncate font-mono text-[11px]">
              <Folder className="w-3.5 h-3.5 shrink-0 text-[#C2B280]" />
              <span className="truncate">FIELD NOTES</span>
            </span>
            <span className="text-[10px] font-mono text-[#8C9486] font-bold shrink-0">
              {notes.length}
            </span>
          </button>

          <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium text-[#7A8274] hover:bg-[#222622] transition-colors mt-0.5">
            <span className="flex items-center gap-2 truncate font-mono text-[11px]">
              <Users className="w-3.5 h-3.5 shrink-0 text-[#7A8274]" />
              <span className="truncate">CLASSIFIED FILES</span>
            </span>
            <span className="text-[10px] font-mono text-[#7A8274] shrink-0">
              0
            </span>
          </button>
        </div>

        {/* Tags Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-[#7A8274] tracking-widest uppercase mb-2 px-1 font-mono">
            CATEGORIES
          </div>
          <div className="space-y-1">
            {[
              { tag: "#dossier", label: "Dossiers" },
              { tag: "#capabilities", label: "Specs" },
              { tag: "#operations", label: "Operations" },
              { tag: "#communication", label: "Contact" },
            ].map(({ tag, label }) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? "ALL" : tag)
                }
                className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                  selectedTag === tag
                    ? "bg-[#2D362A] text-[#C2B280] font-bold border border-[#5C6F52]/40"
                    : "text-[#A8ACA2] hover:bg-[#222622] hover:text-[#E2E4DF]"
                }`}
              >
                <Tag className="w-3 h-3 text-[#5C6F52] shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Network Status */}
        <div className="pt-2 border-t border-[#2A2E29] text-[9px] font-mono text-[#7A8274] flex items-center justify-between">
          <span>SYS: ONLINE</span>
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

      {/* Column 2: Classified Files List Pane */}
      <div
        style={{ width: `${listWidth}px` }}
        className="bg-[#1C1F1C] flex flex-col h-full shrink-0 overflow-hidden border-r border-[#2A2E29]"
      >
        {/* Search Bar & Add Button */}
        <div className="p-2 border-b border-[#2A2E29] flex items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1.5 px-2 py-1 bg-[#141614] border border-[#2D322B] rounded-md focus-within:border-[#5C6F52] transition-colors overflow-hidden">
            <Search className="w-3.5 h-3.5 text-[#7A8274] shrink-0" />
            <input
              type="text"
              placeholder="Search dossiers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[#E2E4DF] font-mono text-xs placeholder:text-[#656C60] min-w-0"
            />
          </div>
          <button
            onClick={handleCreateNote}
            className="p-1 rounded-md bg-[#252924] hover:bg-[#344030] text-[#C2B280] border border-[#2D322B] transition-colors cursor-pointer shrink-0"
            title="Create Log Entry"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Classified Personnel Files List */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          {filteredNotes.map((note) => {
            const isActive = note.id === activeNoteId;
            const snippet =
              note.content
                .split("\n")
                .find(
                  (line) =>
                    line.trim().length > 0 &&
                    !line.startsWith("◈") &&
                    !line.startsWith("FILE") &&
                    !line.startsWith("CLEARANCE") &&
                    !line.startsWith("SECURITY") &&
                    !line.startsWith("DATE") &&
                    !line.startsWith("=") &&
                    !line.startsWith("-"),
                ) || note.content.substring(0, 28);

            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-2.5 rounded-lg cursor-pointer transition-all relative border ${
                  isActive
                    ? "bg-[#344030]/60 border-[#5C6F52]/80 text-[#E2E4DF] shadow-sm"
                    : "border-transparent hover:bg-[#252924] text-[#A8ACA2]"
                }`}
              >
                {/* Active khaki line accent */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C2B280] rounded-r" />
                )}

                <div className="flex items-center justify-between pl-1 gap-1">
                  <span className="font-semibold text-xs text-[#E2E4DF] truncate flex items-center gap-1 min-w-0 font-mono">
                    <span className="text-[#C2B280] text-[10px] shrink-0">
                      ◈
                    </span>
                    <span className="truncate tracking-tight">
                      {note.title}
                    </span>
                  </span>
                  <span className="text-[9px] font-mono text-[#7A8274] shrink-0">
                    {note.created}
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
        title="Drag to resize note list (Double click to reset)"
      />

      {/* Column 3: Main Document / Dossier Workspace */}
      <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-hidden relative">
        {/* Floating Restrict Warning Toast Notification */}
        <AnimatePresence>
          {warning && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="absolute top-14 right-5 z-50 max-w-sm bg-[#241A1A]/95 border border-[#8A3333]/70 shadow-2xl backdrop-blur-md rounded-xl p-3 flex items-start gap-3 text-[#E8C4C4] select-none font-mono"
            >
              <div className="p-1.5 rounded-lg bg-[#8A3333]/20 text-[#C95555] shrink-0 mt-0.5">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="font-semibold text-xs text-[#F2B0B0] tracking-wider uppercase">
                  {warning.title}
                </h4>
                <p className="text-[11px] text-[#D8A2A2] mt-0.5 leading-snug font-medium">
                  {warning.message}
                </p>
              </div>
              <button
                onClick={() => setWarning(null)}
                className="text-[#C95555] hover:text-white p-1 rounded-md hover:bg-[#8A3333]/20 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* macOS Style Tactical Toolbar */}
        <div className="h-11 px-4 border-b border-[#2A2E29] bg-[#181B18]/70 flex items-center justify-between select-none font-mono">
          <div className="flex items-center gap-3 text-[#7A8274]">
            <button
              onClick={handleCreateNote}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="New Log File"
            >
              <SquarePen className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Format Document"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Add Data Matrix"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Checklist"
            >
              <CheckSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#7A8274]">
            {activeNote.isReadOnly ? (
              <span className="text-[10px] text-[#C2B280] flex items-center gap-1 font-medium bg-[#2A2B23] px-2 py-0.5 rounded border border-[#4A4736] font-mono">
                <Lock className="w-3 h-3 text-[#C2B280]" /> CLEARANCE: PROTECTED
              </span>
            ) : saveStatus ? (
              <span className="text-[10px] text-[#708764] flex items-center gap-1 font-medium animate-pulse font-mono">
                <Check className="w-3 h-3" /> SAVED
              </span>
            ) : null}
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Classification Tag"
            >
              <Tag className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-[#C2B280] transition-colors cursor-pointer"
              title="Transmit File"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteNote(activeNote.id)}
              className="p-1 hover:text-[#C95555] transition-colors cursor-pointer"
              title="Purge File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Reader & Textarea */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-3 font-mono">
          <div className="text-[11px] text-[#7A8274] text-center font-mono tracking-widest uppercase">
            {activeNote.created}
          </div>

          <input
            type="text"
            value={activeNote.title}
            readOnly={activeNote.isReadOnly}
            onClick={handleAttemptEdit}
            onKeyDown={handleAttemptEdit}
            onChange={(e) => handleUpdateNote("title", e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xl font-bold font-mono tracking-tight text-[#E2E4DF] caret-[#C2B280]"
            placeholder="Document Title"
          />

          <div className="w-full border-b border-dashed border-[#2A2E29] my-1" />

          <textarea
            value={activeNote.content}
            readOnly={activeNote.isReadOnly}
            onClick={handleAttemptEdit}
            onKeyDown={handleAttemptEdit}
            onChange={(e) => handleUpdateNote("content", e.target.value)}
            className="w-full flex-1 bg-transparent border-none outline-none text-[#D0D3CB] font-mono text-xs leading-relaxed resize-none caret-[#C2B280] selection:bg-[#344030]"
            placeholder="Document content..."
          />
        </div>
      </div>
    </div>
  );
}
