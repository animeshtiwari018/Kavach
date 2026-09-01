"use client";

import { useState, useRef } from "react";
import {
  Search,
  Plus,
  Tag,
  Pin,
  Folder,
  Users,
  SquarePen,
  Type,
  Table,
  CheckSquare,
  Paperclip,
  Share2,
  Trash2,
  MoreHorizontal,
  Check,
  ShieldAlert,
  Lock,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_NOTES = [
  {
    id: "about-me",
    title: "About Me",
    category: "PERSONAL",
    tag: "#about",
    created: "2026-09-01",
    isPinned: true,
    isReadOnly: true,
    content: `Hi! I'm Animesh Tiwari — Full Stack Developer & Systems Architecture Enthusiast.

Welcome to my portfolio! I specialize in building fast, secure, modern web applications and intuitive digital experiences.

--------------------------------------------------
🚀 CORE FOCUS & PASSION
--------------------------------------------------
• Crafting modern, responsive web interfaces using React, Next.js, and Tailwind CSS.
• Designing high-throughput, secure REST APIs and microservice backends with Node.js and Express.
• Structuring resilient data pipelines with MongoDB, PostgreSQL, and Redis caching.
• Writing clean, maintainable code guided by solid Data Structures & Algorithms (DSA) in C++.

--------------------------------------------------
💡 MY PHILOSOPHY
--------------------------------------------------
"Focus on user experience, clarity, and precision. Code should be clean, modular, and built to solve real-world problems gracefully."

--------------------------------------------------
🌟 WHAT I'M WORKING ON
--------------------------------------------------
• Kavach Workstation: A macOS-inspired web workstation environment showcasing full-stack capabilities.
• Developer Tools & Microservices: Modular services focused on security, fast routing, and authentication protocols.

Feel free to browse through the other notes or reach out to connect!`,
  },
  {
    id: "skills",
    title: "Skills & Tech Stack",
    category: "TECHNICAL",
    tag: "#skills",
    created: "2026-09-01",
    isPinned: true,
    isReadOnly: true,
    content: `TECHNICAL SKILLS & COMPETENCIES

--------------------------------------------------
💻 FRONTEND DEVELOPMENT
--------------------------------------------------
• Frameworks: React 19, Next.js 15, HTML5, CSS3
• Styling: Tailwind CSS, Framer Motion, Modern UI/UX Design Systems
• Core: JavaScript (ES6+), TypeScript, State Management

--------------------------------------------------
⚙️ BACKEND & SYSTEMS
--------------------------------------------------
• Runtime & Frameworks: Node.js, Express.js
• Architecture: RESTful APIs, JWT Authentication, Middleware, System Design
• Languages: JavaScript, C++, SQL

--------------------------------------------------
🗄️ DATABASES & STORAGE
--------------------------------------------------
• NoSQL: MongoDB, Mongoose ORM
• Caching & Key-Value: Redis
• Relational: PostgreSQL

--------------------------------------------------
🛠️ TOOLS & WORKFLOW
--------------------------------------------------
• Version Control: Git, GitHub
• Containerization: Docker
• OS & Shell: Linux, Bash/Terminal, Windows PowerShell`,
  },
  {
    id: "projects",
    title: "Project Highlights",
    category: "PROJECTS",
    tag: "#projects",
    created: "2026-08-31",
    isPinned: false,
    isReadOnly: true,
    content: `FEATURED PROJECTS

--------------------------------------------------
1. KAVACH WORKSTATION
--------------------------------------------------
• Description: An interactive macOS-style desktop operating environment built on Next.js, React, and Tailwind CSS.
• Features: Window management system, dock magnification, interactive app sandboxes (Terminal, Browser, Notes, FaceTime).

--------------------------------------------------
2. SECURE REST MICROSERVICES
--------------------------------------------------
• Description: Scalable backend routing engine with JWT authentication, role-based access control (RBAC), and rate-limiting.
• Tech Stack: Node.js, Express, Redis, MongoDB.

--------------------------------------------------
3. DSA & PROBLEM SOLVING ENGINE
--------------------------------------------------
• Description: Comprehensive C++ repository implementing optimized algorithms, custom data structures, and graph algorithms.`,
  },
  {
    id: "contact",
    title: "Contact & Connect",
    category: "PERSONAL",
    tag: "#contact",
    created: "2026-08-30",
    isPinned: false,
    isReadOnly: true,
    content: `GET IN TOUCH

--------------------------------------------------
📫 CONTACT INFORMATION
--------------------------------------------------
• Name: Animesh Tiwari
• Role: Full Stack Developer
• Location: New Delhi, India

--------------------------------------------------
🌐 CONNECT WITH ME
--------------------------------------------------
• GitHub: github.com/AnimeshTiwari
• LinkedIn: linkedin.com/in/animeshtiwari
• Portfolio: Kavach Workstation Web App

Open for software engineering opportunities, collaborations, and tech discussions!`,
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
  const [sidebarWidth, setSidebarWidth] = useState(180);
  const [listWidth, setListWidth] = useState(240);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const startResizingSidebar = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(100, Math.min(280, startWidth + deltaX));
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
      const newWidth = Math.max(140, Math.min(420, startWidth + deltaX));
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
    title = "Access Denied",
    message = "You are not allowed to edit this note."
  ) => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setWarning({ title, message });
    warningTimerRef.current = setTimeout(() => {
      setWarning(null);
    }, 3500);
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
      triggerWarning("Access Denied", "You are not allowed to edit this note.");
      return;
    }
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, [field]: value } : n))
    );
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 1500);
  };

  const handleAttemptEdit = () => {
    if (activeNote.isReadOnly) {
      triggerWarning("Access Denied", "You are not allowed to edit this note.");
    }
  };

  const handleCreateNote = () => {
    const newId = `note-${Date.now()}`;
    const newNote = {
      id: newId,
      title: "Untitled Note",
      category: "PERSONAL",
      tag: "#about",
      created: new Date().toISOString().split("T")[0],
      isPinned: false,
      isReadOnly: false,
      content: "Write your note here...",
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newId);
  };

  const handleDeleteNote = (idToDelete) => {
    const target = notes.find((n) => n.id === idToDelete);
    if (target?.isReadOnly) {
      triggerWarning(
        "Access Denied",
        "You are not allowed to delete system notes."
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
    <div className="w-full h-full flex bg-[#1E1E1E] text-[#E0E0E0] font-sans select-none overflow-hidden text-xs">
      {/* Column 1: macOS Folder & Tag Navigation Sidebar */}
      <div
        style={{ width: `${sidebarWidth}px` }}
        className="bg-[#252526] flex flex-col h-full shrink-0 p-3 select-none overflow-hidden"
      >
        {/* iCloud Section */}
        <div className="mb-4">
          <div className="text-[10px] font-bold text-[#858585] tracking-wider uppercase mb-2 px-1">
            ICLOUD
          </div>
          <button
            onClick={() => setSelectedTag("ALL")}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedTag === "ALL"
                ? "bg-[#007ACC] text-white"
                : "text-[#CCCCCC] hover:bg-[#2A2D2E]"
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <Folder className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Notes</span>
            </span>
            <span className="text-[10px] opacity-70 font-semibold shrink-0">
              {notes.length}
            </span>
          </button>

          <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium text-[#858585] hover:bg-[#2A2D2E] transition-colors mt-0.5">
            <span className="flex items-center gap-2 truncate">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Shared</span>
            </span>
            <span className="text-[10px] opacity-70 shrink-0">0</span>
          </button>
        </div>

        {/* Tags Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-[#858585] tracking-wider uppercase mb-2 px-1">
            TAGS
          </div>
          <div className="space-y-1">
            {["#about", "#skills", "#projects", "#contact"].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? "ALL" : tag)
                }
                className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-[11px] transition-colors ${
                  selectedTag === tag
                    ? "bg-[#37373D] text-[#569CD6] font-bold"
                    : "text-[#AAAAAA] hover:bg-[#2A2D2E] hover:text-white"
                }`}
              >
                <Tag className="w-3 h-3 text-[#007ACC] shrink-0" />
                <span className="truncate">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resizer Handle 1 (between Column 1 and Column 2) */}
      <div
        onMouseDown={startResizingSidebar}
        onDoubleClick={() => setSidebarWidth(180)}
        className={`w-1 h-full cursor-col-resize hover:bg-[#007ACC] transition-colors shrink-0 z-30 ${
          isResizingSidebar ? "bg-[#007ACC]" : "bg-[#333333]"
        }`}
        title="Drag to resize sidebar (Double click to reset)"
      />

      {/* Column 2: Note List Pane */}
      <div
        style={{ width: `${listWidth}px` }}
        className="bg-[#252526]/90 flex flex-col h-full shrink-0 overflow-hidden"
      >
        {/* Search Bar & Add Button */}
        <div className="p-2 border-b border-[#333333] flex items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1 px-2 py-1 bg-[#1E1E1E] border border-[#3C3C3C] rounded-md focus-within:border-[#007ACC] transition-colors overflow-hidden">
            <Search className="w-3.5 h-3.5 text-[#858585] shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[#CCCCCC] text-xs placeholder:text-[#6E6E6E] min-w-0"
            />
          </div>
          <button
            onClick={handleCreateNote}
            className="p-1 rounded-md bg-[#2D2D2D] hover:bg-[#3E3E3E] text-[#CCCCCC] border border-[#3C3C3C] transition-colors cursor-pointer shrink-0"
            title="Create Note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Notes Items List */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          {filteredNotes.map((note) => {
            const isActive = note.id === activeNoteId;
            const snippet =
              note.content
                .split("\n")
                .find(
                  (line) =>
                    line.trim().length > 0 &&
                    !line.startsWith("Hi!") &&
                    !line.startsWith("GET IN") &&
                    !line.startsWith("TECHNICAL"),
                ) || note.content.substring(0, 30);

            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-2.5 rounded-lg cursor-pointer transition-all relative border ${
                  isActive
                    ? "bg-[#D0A85C]/20 border-[#D0A85C]/60 text-white shadow-sm"
                    : "border-transparent hover:bg-[#2A2D2E] text-[#CCCCCC]"
                }`}
              >
                {/* Active yellow line accent (macOS Notes style) */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#D0A85C] rounded-r" />
                )}

                <div className="flex items-center justify-between pl-1 gap-1">
                  <span className="font-semibold text-xs text-white truncate flex items-center gap-1 min-w-0">
                    {note.isPinned && (
                      <Pin className="w-3 h-3 text-[#D0A85C] rotate-45 shrink-0" />
                    )}
                    <span className="truncate">{note.title}</span>
                  </span>
                  <span className="text-[10px] text-[#858585] shrink-0">
                    {note.created}
                  </span>
                </div>

                <p className="text-[11px] text-[#9CDCFE]/80 truncate mt-1 pl-1 font-mono">
                  {snippet}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resizer Handle 2 (between Column 2 and Column 3) */}
      <div
        onMouseDown={startResizingList}
        onDoubleClick={() => setListWidth(240)}
        className={`w-1 h-full cursor-col-resize hover:bg-[#007ACC] transition-colors shrink-0 z-30 ${
          isResizingList ? "bg-[#007ACC]" : "bg-[#333333]"
        }`}
        title="Drag to resize note list (Double click to reset)"
      />

      {/* Column 3: Main Note View & Editor Pane */}
      <div className="flex-1 flex flex-col bg-[#1E1E1E] h-full overflow-hidden relative">
        {/* Floating Warning Toast Notification */}
        <AnimatePresence>
          {warning && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="absolute top-14 right-5 z-50 max-w-sm bg-[#2A0E0E]/95 border border-red-500/60 shadow-2xl backdrop-blur-md rounded-xl p-3 flex items-start gap-3 text-red-100 select-none"
            >
              <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="font-semibold text-xs text-red-200 tracking-wide">
                  {warning.title}
                </h4>
                <p className="text-[11px] text-red-300/90 mt-0.5 leading-snug font-medium">
                  {warning.message}
                </p>
              </div>
              <button
                onClick={() => setWarning(null)}
                className="text-red-400 hover:text-white p-1 rounded-md hover:bg-red-500/20 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* macOS Notes Toolbar */}
        <div className="h-11 px-4 border-b border-[#333333] bg-[#252526]/50 flex items-center justify-between select-none">
          <div className="flex items-center gap-3 text-[#A0A0A0]">
            <button
              onClick={handleCreateNote}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="New Note"
            >
              <SquarePen className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Format Text"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Add Table"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Add Checklist"
            >
              <CheckSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Attachment"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#A0A0A0]">
            {activeNote.isReadOnly ? (
              <span className="text-[10px] text-amber-400 flex items-center gap-1 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <Lock className="w-3 h-3 text-amber-400" /> Read-Only
              </span>
            ) : saveStatus ? (
              <span className="text-[10px] text-green-400 flex items-center gap-1 font-medium animate-pulse">
                <Check className="w-3 h-3" /> Saved
              </span>
            ) : null}
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Tag Note"
            >
              <Tag className="w-4 h-4" />
            </button>
            <button
              onClick={handleAttemptEdit}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Share Note"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteNote(activeNote.id)}
              className="p-1 hover:text-red-400 transition-colors cursor-pointer"
              title="Delete Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note Content Header & Textarea */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-3">
          <div className="text-[11px] text-[#858585] text-center font-medium flex items-center justify-center gap-1.5">
            <span>{activeNote.created}</span>
            {activeNote.isReadOnly && (
              <span className="text-[10px] text-amber-400/80 font-mono flex items-center gap-1">
                • <Lock className="w-2.5 h-2.5 inline" /> PROTECTED
              </span>
            )}
          </div>

          <input
            type="text"
            value={activeNote.title}
            readOnly={activeNote.isReadOnly}
            onClick={handleAttemptEdit}
            onKeyDown={handleAttemptEdit}
            onChange={(e) => handleUpdateNote("title", e.target.value)}
            className="w-full bg-transparent border-none outline-none text-2xl font-bold text-white tracking-tight caret-[#D0A85C]"
            placeholder="Note Title"
          />

          <textarea
            value={activeNote.content}
            readOnly={activeNote.isReadOnly}
            onClick={handleAttemptEdit}
            onKeyDown={handleAttemptEdit}
            onChange={(e) => handleUpdateNote("content", e.target.value)}
            className="w-full flex-1 bg-transparent border-none outline-none text-[#D4D4D4] font-sans text-sm leading-relaxed resize-none caret-[#D0A85C] selection:bg-[#264F78]"
            placeholder="Start typing..."
          />
        </div>
      </div>
    </div>
  );
}
