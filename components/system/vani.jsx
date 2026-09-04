"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mic, MicOff, Send, Sparkles, Terminal, Shield, Folder, User, Cpu, Volume2 } from "lucide-react";
import KavachAssistant from "./kavach-assistant";

export function VaniOrb({ isListening, isThinking, isSpeaking, state: stateProp, audioLevel = 0, size = "md", onClick, logoSrc }) {
  const currentState = stateProp || (isListening ? "listening" : isThinking ? "thinking" : isSpeaking ? "speaking" : "idle");
  return (
    <KavachAssistant
      state={currentState}
      audioLevel={audioLevel}
      size={size}
      onClick={onClick}
      logoSrc={logoSrc || "/images/kavach1.png"}
    />
  );
}


export default function VaniAssistant({ isOpen, onClose, onExecuteAction, isDarkMode }) {
  const [messages, setMessages] = useState([
    {
      sender: "vani",
      text: "Greetings, Operative. I am VANI, your Kavach AI Assistant. How can I assist your workstation operations today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((res) => res[0].transcript)
            .join("");
          setInputText(transcript);
        };

        recognition.onerror = (err) => {
          console.error("Speech recognition error", err);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser environment. You can type your command below!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputText("");
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    // Process AI Response after short delay
    setTimeout(() => {
      const response = generateVaniResponse(query, onExecuteAction);
      setMessages((prev) => [
        ...prev,
        {
          sender: "vani",
          text: response.text,
          actionName: response.actionName,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsThinking(false);

      if (response.actionToRun) {
        response.actionToRun();
      }
    }, 750);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className={`fixed top-12 right-6 z-[120] w-[380px] sm:w-[420px] h-[520px] rounded-2xl border shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col overflow-hidden font-mono select-none ${
          isDarkMode
            ? "bg-[#0b0d0a]/92 border-[#8E9B72]/40 text-[#D4D5C8]"
            : "bg-white/92 border-gray-300 text-gray-800"
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 border-b border-[#24291F] bg-[#121610]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VaniOrb size="sm" isListening={isListening} isThinking={isThinking} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-white">VANI AI</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
                  {isListening ? "LISTENING..." : isThinking ? "PROCESSING" : "ONLINE"}
                </span>
              </div>
              <p className="text-[9.5px] text-[#73786B]">Kavach Intelligence Voice Core</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1A1F17] hover:bg-[#283223] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Siri Listening Hero Banner */}
        <div className="py-4 px-6 bg-gradient-to-b from-[#141a12]/60 to-transparent flex flex-col items-center justify-center border-b border-[#24291F]/50 relative">
          <VaniOrb
            size="lg"
            isListening={isListening}
            isThinking={isThinking}
            onClick={toggleVoiceInput}
          />
          <p className="text-[11px] font-semibold mt-3 text-center text-[#8E9B72]">
            {isListening
              ? 'Listening... Speak your command now'
              : isThinking
              ? 'Processing query...'
              : 'Tap Orb or Mic to speak with VANI'}
          </p>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#8E9B72] text-[#070906] font-semibold rounded-br-xs shadow-md"
                    : "bg-[#141A12] border border-[#24291F] text-[#D4D5C8] rounded-bl-xs shadow-md"
                }`}
              >
                {msg.sender === "vani" && (
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#8E9B72] font-bold mb-1 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    VANI ASSISTANT
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.actionName && (
                  <div className="mt-2 pt-1.5 border-t border-[#3A4034]/50 flex items-center gap-1.5 text-[10px] text-green-400 font-bold">
                    <span>⚡ EXECUTED: {msg.actionName}</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-[#5E6255] mt-1 px-1">{msg.time}</span>
            </motion.div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-[#8E9B72] bg-[#141A12] p-3 rounded-xl border border-[#24291F] w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>VANI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-[#0e120d] border-t border-[#24291F] flex items-center gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
          <button
            onClick={() => handleSendMessage("Open Terminal")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161C14] hover:bg-[#242F21] border border-[#2A3426] text-[#D4D5C8] whitespace-nowrap cursor-pointer transition-colors"
          >
            <Terminal className="w-3 h-3 text-green-400" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => handleSendMessage("Show System Analysis")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161C14] hover:bg-[#242F21] border border-[#2A3426] text-[#D4D5C8] whitespace-nowrap cursor-pointer transition-colors"
          >
            <Cpu className="w-3 h-3 text-blue-400" />
            <span>Analysis</span>
          </button>

          <button
            onClick={() => handleSendMessage("View Projects")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161C14] hover:bg-[#242F21] border border-[#2A3426] text-[#D4D5C8] whitespace-nowrap cursor-pointer transition-colors"
          >
            <Folder className="w-3 h-3 text-amber-400" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => handleSendMessage("Who is Animesh?")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#161C14] hover:bg-[#242F21] border border-[#2A3426] text-[#D4D5C8] whitespace-nowrap cursor-pointer transition-colors"
          >
            <User className="w-3 h-3 text-purple-400" />
            <span>About Me</span>
          </button>
        </div>

        {/* Input Control Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#0B0E0A] border-t border-[#24291F] flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                : "bg-[#161C14] hover:bg-[#222B1E] border border-[#2A3426] text-[#8E9B72]"
            }`}
            title={isListening ? "Stop Listening" : "Start Voice Input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            placeholder={isListening ? "Listening to your voice..." : "Ask VANI anything or command workstation..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#141A12] border border-[#24291F] focus:border-[#8E9B72] rounded-xl px-3 py-2 text-xs text-[#D4D5C8] placeholder:text-[#5E6255] outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-xl bg-[#8E9B72] hover:bg-[#a1b082] disabled:opacity-40 disabled:hover:bg-[#8E9B72] text-[#070906] font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

// Intelligent Knowledge Engine for VANI
function generateVaniResponse(query, onExecuteAction) {
  const q = query.toLowerCase();

  if (q.includes("terminal") || q.includes("command prompt") || q.includes("console")) {
    return {
      text: "Launching Terminal Console. Workstation shell access initialized.",
      actionName: "OPEN TERMINAL",
      actionToRun: () => onExecuteAction && onExecuteAction("terminal"),
    };
  }

  if (q.includes("setting") || q.includes("theme") || q.includes("preference")) {
    return {
      text: "Opening System Settings window. You can customize themes, security protocols, and desktop overlays.",
      actionName: "OPEN SETTINGS",
      actionToRun: () => onExecuteAction && onExecuteAction("settings"),
    };
  }

  if (q.includes("project") || q.includes("mission") || q.includes("archive") || q.includes("portfolio")) {
    return {
      text: "Accessing Mission Archive (Projects). Displaying featured defense & web engineering repositories.",
      actionName: "OPEN PROJECTS ARCHIVE",
      actionToRun: () => onExecuteAction && onExecuteAction("mission-archive"),
    };
  }

  if (q.includes("analysis") || q.includes("stat") || q.includes("analytics") || q.includes("intel")) {
    return {
      text: "Opening Intelligence System Analysis dashboard.",
      actionName: "OPEN SYSTEM ANALYSIS",
      actionToRun: () => onExecuteAction && onExecuteAction("system-analysis"),
    };
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return {
      text: "Opening Skill Intelligence Report. Animesh's tech stack includes React, Next.js, Python, Tailwind, Cybersecurity, and AI Agent Architecture.",
      actionName: "OPEN SKILLS REPORT",
      actionToRun: () => onExecuteAction && onExecuteAction("skills"),
    };
  }

  if (q.includes("animesh") || q.includes("who is") || q.includes("author") || q.includes("about")) {
    return {
      text: "Animesh Tiwari is a Computer Science Engineer specializing in Full-Stack Web Development, System Architecture, Defense Tech, and AI Agents. Opening Field Journal (About Me).",
      actionName: "OPEN ABOUT ME",
      actionToRun: () => onExecuteAction && onExecuteAction("notes"),
    };
  }

  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("message")) {
    return {
      text: "Opening Communications // Contact app. You can send encrypted messages directly to Animesh.",
      actionName: "OPEN CONTACT APP",
      actionToRun: () => onExecuteAction && onExecuteAction("contact"),
    };
  }

  if (q.includes("experience") || q.includes("record") || q.includes("career")) {
    return {
      text: "Opening Kavach Service Record (Experience).",
      actionName: "OPEN EXPERIENCE RECORD",
      actionToRun: () => onExecuteAction && onExecuteAction("service-record"),
    };
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("vani")) {
    return {
      text: "Hello Operative! I am online and ready to assist you. You can ask me to open apps, show projects, explain Animesh's skills, or execute commands.",
    };
  }

  return {
    text: `Command recognized: "${query}". I have analyzed your request. You can explore apps directly or ask me to open Terminal, Projects, Analysis, Skills, or System Settings!`,
  };
}
