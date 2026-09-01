"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Radio } from "lucide-react";

const VIRTUAL_FS = {
  "": {
    dirs: ["personnel", "arsenal", "missions", "service", "intelligence", "communications"],
    files: {},
  },
  personnel: {
    dirs: [],
    files: {
      "profile.txt": `PERSONNEL DOSSIER
────────────────────────────────────────────
OPERATIVE ID    : KVC-07-AN
NAME            : ANIMESH TIWARI
ROLE            : FULL-STACK DEVELOPER & SYSTEMS ENGINEER
CLEARANCE       : LEVEL-4 PROTECTED
STATUS          : ACTIVE & OPERATIONAL
SPECIALIZATION  : NEXT.JS, REACT, NODE.JS MICROSERVICES, DATA ENGINES`,
      "clearance.txt": `SECURITY CLEARANCE RECORD
────────────────────────────────────────────
CLEARANCE LEVEL : LEVEL 4 (UNRESTRICTED)
FILE STATUS     : VERIFIED
LAST AUDIT      : 2026
AUTHORIZATION   : KAVACH COMMAND MATRIX`,
    },
  },
  arsenal: {
    dirs: [],
    files: {
      "frontend.txt": `TECHNICAL ARSENAL // FRONTEND
────────────────────────────────────────────
STACK       : NEXT.JS 15, REACT 19, TAILWIND CSS, FRAMER MOTION, JAVASCRIPT ES6+
ARCHITECTURE: MODULAR DESIGN TOKENS, RESPONSIVE OS SHELL, DRAG/RESIZE PHYSICS`,
      "backend.txt": `TECHNICAL ARSENAL // BACKEND
────────────────────────────────────────────
STACK       : NODE.JS, EXPRESS, REDIS, JWT, MONGOOSE
ARCHITECTURE: REST APIS, HIGH-THROUGHPUT RATE LIMITING, MICROSERVICES`,
      "database.txt": `TECHNICAL ARSENAL // DATABASE & INFRASTRUCTURE
────────────────────────────────────────────
DATA STORE  : MONGODB, REDIS CACHE, POSTGRESQL
DEPLOYMENT  : VERCEL, DOCKER, GIT CI/CD`,
    },
  },
  missions: {
    dirs: ["active"],
    files: {
      "completed.txt": `MISSION LOG // COMPLETED OPERATIONS
────────────────────────────────────────────
• OPERATION // 001 : STUDENT RESOURCE PORTAL (FULL-STACK ACADEMIC ENGINE)
• OPERATION // 002 : REDIS RATE LIMITER MICROSERVICE
• OPERATION // 003 : KAVACH WORKSTATION PORTFOLIO SHELL`,
    },
  },
  "missions/active": {
    dirs: [],
    files: {
      "active.txt": `ACTIVE OPERATION // KAVACH WORKSTATION
────────────────────────────────────────────
OBJECTIVE   : DEVELOP HIGH-RELIABILITY WORKSTATION ENVIRONMENT & SYSTEM ARCHITECTURE
STATUS      : IN PROGRESS / OPERATIONAL
METRICS     : 100% MODULE INTEGRITY`,
    },
  },
  service: {
    dirs: [],
    files: {
      "record.txt": `SERVICE RECORD // CAREER PROGRESSION
────────────────────────────────────────────
STEP 01     : CADET (FULL-STACK WEB DEVELOPER INTERN — 2024–PRESENT)
STEP 02     : FIELD OPERATIVE (FUTURE DIRECTIVE — LOCKED)
STEP 03     : TECHNICAL OFFICER (FUTURE DIRECTIVE — LOCKED)
STEP 04     : COMMAND LEVEL (FUTURE DIRECTIVE — LOCKED)`,
      "rank.txt": `CURRENT OPERATIVE RANK
────────────────────────────────────────────
RANK        : STEP 01 CADET / ACTIVE INTERNSHIP
STATUS      : OPERATIONAL`,
    },
  },
  intelligence: {
    dirs: [],
    files: {
      "methodology.txt": `SYSTEM ANALYSIS // METHODOLOGY
────────────────────────────────────────────
PROTOCOL 01 : RECONNAISSANCE (OBSERVE → IDENTIFY → GATHER CONTEXT → DEFINE PROBLEM)
PROTOCOL 02 : PROBLEM DECOMPOSITION (SYSTEM → COMPONENTS → EXECUTABLE TASKS)
PROTOCOL 03 : SYSTEM THINKING (INPUT → PROCESS → LOGIC → STATE → OUTPUT)`,
      "debugging.txt": `DEBUGGING PROTOCOL DIRECTIVE
────────────────────────────────────────────
DIRECTIVE   : "DO NOT GUESS THE BUG. REPRODUCE IT."
WORKFLOW    : DETECT → REPRODUCE → ISOLATE → TRACE → FIX → VERIFY`,
    },
  },
  communications: {
    dirs: [],
    files: {
      "contact.txt": `COMMUNICATIONS CHANNEL
────────────────────────────────────────────
CHANNEL     : COM-001 (RECRUITMENT & MISSION BRIEFING)
EMAIL       : ANIMESHTIWARI.DEV@GMAIL.COM
STATUS      : OPEN FOR OFFERS / DIRECTIVES`,
    },
  },
};

const VALID_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "service",
  "analysis",
  "contact",
  "status",
  "whoami",
  "ls",
  "cd",
  "pwd",
  "cat",
  "open",
  "clear",
  "history",
  "secret",
];

const QUICK_SUGGESTIONS = [
  "help",
  "ls",
  "cd missions",
  "cat profile.txt",
  "status",
  "whoami",
  "clear",
];

export default function TerminalApp() {
  const [currentPath, setCurrentPath] = useState("");
  const [history, setHistory] = useState([
    { text: "KAVACH SECURE OS [Version 2.6.0]", type: "system" },
    { text: "Type 'help' or click a command suggestion below.", type: "system" },
    { text: "", type: "system" },
  ]);

  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getPathPrompt = () => {
    return currentPath === "" ? "~" : `~/${currentPath}`;
  };

  const parsePath = (target) => {
    if (!target || target === "~" || target === "/") return "";
    let clean = target.replace(/^~\/?/, "").replace(/^\//, "").replace(/\/$/, "");
    if (clean === "..") {
      if (!currentPath) return "";
      const parts = currentPath.split("/");
      parts.pop();
      return parts.join("/");
    }
    if (currentPath && !target.startsWith("/") && !target.startsWith("~")) {
      return `${currentPath}/${clean}`;
    }
    return clean;
  };

  const executeCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { path: getPathPrompt(), cmd: "", args: "", type: "prompt-only" },
      ]);
      return;
    }

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    const promptEntry = {
      path: getPathPrompt(),
      cmd: parts[0],
      args: args,
      type: "input-line",
    };

    const newEntries = [promptEntry];

    switch (command) {
      case "help":
        newEntries.push({
          type: "system",
          text: `AVAILABLE COMMANDS
────────────────────────────────────────────
about       Open personnel dossier
skills      Access technical arsenal
projects    Open mission log
service     View service record
analysis    Open system analysis
contact     Open communication channel
status      Display system status matrix
whoami      Identify current operative
ls          List directory contents
cd          Navigate directories (e.g. cd missions)
pwd         Show current location
cat         Read file contents (e.g. cat profile.txt)
clear       Clear terminal screen
history     Show command history`,
        });
        break;

      case "whoami":
        newEntries.push({
          type: "success",
          text: `ANIMESH TIWARI
FULL-STACK DEVELOPER & SYSTEMS ENGINEER
STATUS: ACTIVE & OPERATIONAL`,
        });
        break;

      case "status":
        newEntries.push({
          type: "success",
          text: `KAVACH SYSTEM STATUS MATRIX
────────────────────────────────────────────
CORE SYSTEM       ● OPERATIONAL
NETWORK           ● SECURE
TERMINAL          ● ONLINE
PERSONNEL FILE    ● VERIFIED
MISSION LOG       ● ACTIVE

SYSTEM STATUS: NOMINAL`,
        });
        break;

      case "about":
      case "personnel":
        newEntries.push({
          type: "system",
          text: `OPERATIVE DOSSIER // ANIMESH TIWARI
FULL-STACK DEVELOPER & SYSTEMS ENGINEER
Specializing in Next.js, React, Node.js microservices, and high-performance web applications.`,
        });
        break;

      case "skills":
      case "arsenal":
        newEntries.push({
          type: "system",
          text: `TECHNICAL ARSENAL // CORE COMPETENCIES
Frontend : Next.js 15, React 19, Tailwind CSS, Framer Motion, ES6+
Backend  : Node.js, Express, REST APIs, Redis, JWT
Database : MongoDB, Mongoose, PostgreSQL
Tools    : Git, Docker, Vercel, VS Code`,
        });
        break;

      case "projects":
      case "missions":
        newEntries.push({
          type: "system",
          text: `MISSION LOG // PROJECTS
• Student Resource Portal (Full-stack academic engine)
• Redis Rate Limiter Microservice
• Kavach Workstation Portfolio Shell`,
        });
        break;

      case "service":
        newEntries.push({
          type: "system",
          text: `SERVICE RECORD // RANK PROGRESSION
STEP 01 : CADET (Full-Stack Web Developer Intern — Active)
STEP 02 : FIELD OPERATIVE (Future Directive)
STEP 03 : TECHNICAL OFFICER (Future Directive)
STEP 04 : COMMAND LEVEL (Future Directive)`,
        });
        break;

      case "analysis":
        newEntries.push({
          type: "system",
          text: `SYSTEM ANALYSIS // METHODOLOGY
1. RECONNAISSANCE     : Observe → Identify → Gather Context → Define Problem
2. DECOMPOSITION     : System → Components → Executable Tasks
3. DEBUGGING         : "Do not guess the bug. Reproduce it."`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "system",
          text: `COMMUNICATIONS // DISPATCH
Channel : COM-001 (Recruitment & Mission Briefing)
Email   : animeshtiwari.dev@gmail.com
Status  : Open for job postings & internship directives`,
        });
        break;

      case "open":
        if (!args) {
          newEntries.push({
            type: "warning",
            text: "Usage: open [about|skills|projects|service|analysis|contact]",
          });
        } else {
          newEntries.push({
            type: "success",
            text: `Navigating to module [${args.toUpperCase()}]... Verified.`,
          });
        }
        break;

      case "ls":
        const targetDirKey = parsePath(args || currentPath);
        const node = VIRTUAL_FS[targetDirKey];
        if (node) {
          const dirList = node.dirs.map((d) => ({ name: `${d}/`, isDir: true }));
          const fileList = Object.keys(node.files).map((f) => ({ name: f, isDir: false }));
          const allItems = [...dirList, ...fileList];

          if (allItems.length === 0) {
            newEntries.push({ type: "muted", text: "(directory empty)" });
          } else {
            newEntries.push({ type: "ls-output", items: allItems });
          }
        } else {
          newEntries.push({
            type: "error",
            text: `ls: directory not found: ${args}`,
          });
        }
        break;

      case "cd":
        if (!args || args === "~" || args === "/") {
          setCurrentPath("");
        } else {
          const newPath = parsePath(args);
          if (VIRTUAL_FS[newPath] !== undefined) {
            setCurrentPath(newPath);
          } else {
            newEntries.push({
              type: "error",
              text: `cd: directory not found: ${args}`,
            });
          }
        }
        break;

      case "pwd":
        newEntries.push({
          type: "path-output",
          text: currentPath === "" ? "/" : `/${currentPath}`,
        });
        break;

      case "cat":
        if (!args) {
          newEntries.push({ type: "warning", text: "Usage: cat [filename]" });
        } else {
          const currentNode = VIRTUAL_FS[currentPath];
          if (currentNode && currentNode.files[args]) {
            newEntries.push({ type: "system", text: currentNode.files[args] });
          } else {
            newEntries.push({
              type: "error",
              text: `cat: file not found: ${args}`,
            });
          }
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "history":
        newEntries.push({
          type: "system",
          text: cmdHistory.map((c, i) => ` ${i + 1}  ${c}`).join("\n"),
        });
        break;

      case "sudo":
        newEntries.push({
          type: "error",
          text: "ACCESS DENIED // CLEARANCE LEVEL REQUIRED",
        });
        break;

      case "secret":
        newEntries.push({
          type: "warning",
          text: "CLASSIFIED FILE // ACCESS RESTRICTED",
        });
        break;

      default:
        newEntries.push({
          type: "error",
          text: `command not found: ${command}. Type 'help' for available directives.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    // Ctrl + L -> Clear screen
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
      return;
    }

    // Ctrl + C -> Cancel input line
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        { path: getPathPrompt(), cmd: input, args: "^C", type: "input-line" },
      ]);
      setInput("");
      return;
    }

    // History Arrow Up
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx] || "");
      return;
    }

    // History Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx] || "");
      }
      return;
    }

    // Tab Autocomplete
    if (e.key === "Tab" || e.key === "ArrowRight") {
      const trimmed = input.trimStart();
      const parts = trimmed.split(/\s+/);

      if (parts.length === 1 && parts[0]) {
        const match = VALID_COMMANDS.find((c) => c.startsWith(parts[0]));
        if (match) {
          e.preventDefault();
          setInput(match + " ");
          return;
        }
      } else if (parts.length === 2 && (parts[0] === "cd" || parts[0] === "ls")) {
        const currentNode = VIRTUAL_FS[currentPath];
        if (currentNode) {
          const match = currentNode.dirs.find((d) => d.startsWith(parts[1]));
          if (match) {
            e.preventDefault();
            setInput(`${parts[0]} ${match}`);
            return;
          }
        }
      } else if (parts.length === 2 && parts[0] === "cat") {
        const currentNode = VIRTUAL_FS[currentPath];
        if (currentNode) {
          const match = Object.keys(currentNode.files).find((f) => f.startsWith(parts[1]));
          if (match) {
            e.preventDefault();
            setInput(`cat ${match}`);
            return;
          }
        }
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  // Ghost autocomplete hint calculation
  const getGhostSuggestion = () => {
    if (!input.trim()) return "";
    const trimmed = input.trimStart();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      const match = VALID_COMMANDS.find((c) => c.startsWith(parts[0]));
      if (match && match !== parts[0]) {
        return match.slice(parts[0].length);
      }
    }
    return "";
  };

  const ghostHint = getGhostSuggestion();

  const handleQuickCommandClick = (cmdText) => {
    executeCommand(cmdText);
    focusInput();
  };

  // Syntax colors split
  const parseInputColors = () => {
    if (!input) return { cmdPart: "", argPart: "" };
    const firstSpaceIndex = input.search(/\s/);
    if (firstSpaceIndex === -1) {
      return { cmdPart: input, argPart: "" };
    }
    return {
      cmdPart: input.slice(0, firstSpaceIndex),
      argPart: input.slice(firstSpaceIndex),
    };
  };

  const { cmdPart, argPart } = parseInputColors();

  return (
    <div
      onClick={focusInput}
      className="w-full h-full flex flex-col bg-[#141614] text-[#E2E4DF] font-mono text-xs select-none overflow-hidden"
    >
      {/* Top Application Header Bar */}
      <div className="h-11 px-4 bg-[#181B18] border-b border-[#2A2E29] flex items-center justify-between font-mono shrink-0 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#C2B280]" />
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest uppercase">
            KAVACH TERMINAL
          </span>
          <span className="text-[9.5px] text-[#7A8274] uppercase">SECURE SHELL</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            ONLINE
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
            [ SECURE ]
          </span>
        </div>
      </div>

      {/* Main Terminal Buffer Screen */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 leading-relaxed scrollbar-thin scrollbar-thumb-[#2A2E29]">
        {history.map((entry, idx) => {
          if (entry.type === "input-line") {
            return (
              <div key={idx} className="flex flex-wrap items-center gap-1.5 font-mono">
                <span className="text-[#A8ACA2]">kavach@workstation:</span>
                <span className="text-[#8E9B72] font-bold">{entry.path}</span>
                <span className="text-[#A8ACA2]">$</span>
                <span className="text-[#E2E4DF] font-semibold">{entry.cmd}</span>
                {entry.args && <span className="text-emerald-400 font-bold">{entry.args}</span>}
              </div>
            );
          }

          if (entry.type === "prompt-only") {
            return (
              <div key={idx} className="flex items-center gap-1.5 font-mono">
                <span className="text-[#A8ACA2]">kavach@workstation:</span>
                <span className="text-[#8E9B72] font-bold">{entry.path}</span>
                <span className="text-[#A8ACA2]">$</span>
              </div>
            );
          }

          if (entry.type === "ls-output") {
            return (
              <div key={idx} className="flex flex-wrap gap-4 py-0.5">
                {entry.items.map((item, i) => (
                  <span
                    key={i}
                    className={`font-mono ${
                      item.isDir ? "text-[#8E9B72] font-bold" : "text-[#E2E4DF]"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            );
          }

          if (entry.type === "path-output") {
            return (
              <div key={idx} className="text-[#8E9B72] font-bold">
                {entry.text}
              </div>
            );
          }

          let style = "text-[#D0D3CB]";
          if (entry.type === "error") style = "text-[#C95555] font-semibold";
          if (entry.type === "warning") style = "text-amber-400 font-semibold";
          if (entry.type === "success") style = "text-emerald-400 font-semibold";
          if (entry.type === "system") style = "text-[#7A8274]";
          if (entry.type === "muted") style = "text-[#656C60] italic";

          return (
            <div key={idx} className={`whitespace-pre-wrap ${style}`}>
              {entry.text}
            </div>
          );
        })}

        {/* Quick Command Suggestions Chips Bar */}
        <div className="pt-2 pb-1 border-t border-[#2A2E29]/60 flex items-center gap-2 flex-wrap font-mono text-[10px] select-none">
          <span className="text-[#7A8274] font-bold">SUGGESTIONS:</span>
          {QUICK_SUGGESTIONS.map((cmdText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickCommandClick(cmdText)}
              className="px-2 py-0.5 bg-[#191C19] border border-[#2A2E29] hover:border-[#5C6F52] text-[#8E9B72] hover:text-[#E2E4DF] rounded text-[9.5px] transition-all cursor-pointer font-mono font-semibold"
            >
              [ {cmdText} ]
            </button>
          ))}
        </div>

        {/* Live Prompt Input Line */}
        <form onSubmit={onSubmit} className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[#A8ACA2] shrink-0">kavach@workstation:</span>
          <span className="text-[#8E9B72] font-bold shrink-0">{getPathPrompt()}</span>
          <span className="text-[#A8ACA2] shrink-0">$</span>

          <div className="flex-1 flex items-center relative min-w-0">
            {/* Syntax Highlighted Input Overlay */}
            <div className="absolute inset-0 flex items-center pointer-events-none whitespace-pre overflow-hidden font-mono">
              <span className="text-[#E2E4DF] font-semibold">{cmdPart}</span>
              <span className="text-emerald-400 font-bold">{argPart}</span>
              {ghostHint && <span className="text-[#656C60]">{ghostHint}</span>}
              <span className="w-2 h-4 bg-emerald-400 opacity-90 inline-block animate-pulse ml-0.5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-transparent caret-transparent font-mono text-xs z-10"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
