"use client";

import { useState, useRef } from "react";
import {
  Radio,
  Folder,
  Send,
  CheckCircle2,
  Shield,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CHANNELS_DATA = [
  {
    id: "recruitment",
    code: "COM // 01",
    name: "MISSION BRIEFING",
    desc: "Proposed job posting & internship dispatch",
  },
  {
    id: "direct-email",
    code: "COM // 02",
    name: "DIRECT DISPATCH",
    desc: "General technical correspondence",
  },
];

export default function ContactApp() {
  const [selectedChannelId, setSelectedChannelId] = useState("recruitment");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [missionType, setMissionType] = useState("FULL-TIME POSTING");
  const [message, setMessage] = useState("");
  const [transmitStatus, setTransmitStatus] = useState("IDLE"); // IDLE | CONNECTING | TRANSMITTING | DELIVERED

  // Dynamic Sidebar & Middle Column Resizing
  const [sidebarWidth, setSidebarWidth] = useState(195);
  const [listWidth, setListWidth] = useState(240);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingList, setIsResizingList] = useState(false);

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setTransmitStatus("CONNECTING");
    setTimeout(() => {
      setTransmitStatus("TRANSMITTING");
      setTimeout(() => {
        setTransmitStatus("DELIVERED");
      }, 1200);
    }, 800);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setMissionType("FULL-TIME POSTING");
    setTransmitStatus("IDLE");
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
          <Shield className="w-3.5 h-3.5 text-[#C2B280]" />
          <span className="text-[#C2B280] font-bold text-[11px] tracking-widest uppercase">
            KAVACH // COMMUNICATIONS & RECRUITMENT
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-[#708764] font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
            RECRUITMENT MATRIX: ACTIVE
          </span>
          <span className="text-[#C2B280] bg-[#2A2B23] border border-[#4A4736] px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
            [ OPEN FOR OFFERS ]
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
                7
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

              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono text-[#A8ACA2] hover:bg-[#222622] transition-colors">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#5C6F52] text-[10px]">◈</span>
                  <span className="truncate">System Analysis</span>
                </span>
                <span className="text-[9px] text-[#7A8274]">INTEL</span>
              </button>

              {/* Contact Item (Highlighted with Muted Olive Accent) */}
              <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-mono bg-[#344030] text-[#E2E4DF] border border-[#5C6F52]/60 font-semibold shadow-sm">
                <span className="flex items-center gap-2 truncate">
                  <span className="text-[#C2B280] text-[10px]">◈</span>
                  <span className="truncate">Contact</span>
                </span>
                <span className="text-[9px] text-[#C2B280] font-bold shrink-0">
                  {CHANNELS_DATA.length}
                </span>
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

        {/* Column 2: Middle Channels Pane */}
        <div
          style={{ width: `${listWidth}px` }}
          className="bg-[#1C1F1C] flex flex-col h-full shrink-0 overflow-hidden border-r border-[#2A2E29]"
        >
          {/* Header */}
          <div className="p-3 border-b border-[#2A2E29] bg-[#181B18] shrink-0">
            <div className="text-[10px] font-mono font-bold text-[#C2B280] tracking-wider uppercase flex items-center justify-between">
              <span>CHANNELS</span>
              <span className="text-[9px] text-[#708764]">2 CHANNELS</span>
            </div>
            <p className="text-[9.5px] text-[#73786B] font-mono mt-1">
              DISPATCH CHANNELS
            </p>
          </div>

          {/* Selectable Communication Channels List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono">
            {CHANNELS_DATA.map((ch) => {
              const isSelected = ch.id === selectedChannelId;
              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannelId(ch.id)}
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
                    <span>{ch.code}</span>
                    <span className="text-[#708764]">OPEN</span>
                  </div>

                  <div className="font-bold text-xs text-[#E2E4DF] truncate">
                    ◈ {ch.name}
                  </div>

                  <div className="text-[9.5px] text-[#73786B] truncate mt-0.5">
                    {ch.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resizer Handle 2 (between Column 2 and Column 3) */}
        <div
          onMouseDown={startResizingList}
          onDoubleClick={() => setListWidth(240)}
          className={`w-1 h-full cursor-col-resize hover:bg-[#5C6F52] transition-colors shrink-0 z-30 ${
            isResizingList ? "bg-[#5C6F52]" : "bg-[#2A2E29]"
          }`}
          title="Drag to resize channel list (Double click to reset)"
        />

        {/* Column 3: Main Contact Form */}
        <div className="flex-1 flex flex-col bg-[#141614] h-full overflow-y-auto relative">
          <div className="p-6 space-y-6 font-mono text-xs">
            {/* Header: Title & Subtitle */}
            <div className="space-y-1">
              <div className="text-[10px] text-[#8E9B72] tracking-widest font-bold uppercase flex items-center justify-between">
                <span>CHANNEL: COM-001 // RECRUITMENT DISPATCH</span>
                <span className="text-[#708764] flex items-center gap-1 font-bold">
                  <Radio className="w-3 h-3 text-[#708764] animate-pulse" />
                  RESPONSE STATUS: ACTIVE
                </span>
              </div>

              <h1 className="text-2xl font-bold text-[#E2E4DF] tracking-tight pt-0.5">
                SECURE COMMUNICATION // MISSION BRIEFING
              </h1>

              <p className="text-xs text-[#C2B280] font-semibold tracking-wide pt-0.5">
                ISSUE A PROPOSED POSTING OR MISSION DIRECTIVE
              </p>

              <div className="w-full border-b border-dashed border-[#2A2E29] pt-3" />
            </div>

            {/* Transmission Status Banner */}
            <AnimatePresence mode="wait">
              {transmitStatus === "DELIVERED" ? (
                <motion.div
                  key="delivered-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#191C19] border border-[#5C6F52] rounded-lg p-5 space-y-3 text-center shadow-md"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
                      MISSION DIRECTIVE RECEIVED
                    </h3>
                    <p className="text-xs text-[#D0D3CB] font-sans">
                      DISPATCH LOGGED • STATUS: OPERATIVE NOTIFIED
                    </p>
                    <p className="text-[11px] text-[#7A8274] font-sans pt-1">
                      Thank you for the briefing. Operative Animesh Tiwari has received your mission directive and will review the proposed posting shortly.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-1.5 bg-[#344030] hover:bg-[#3f4f3b] border border-[#5C6F52] text-[#E2E4DF] rounded text-xs font-bold tracking-wider transition-colors cursor-pointer uppercase font-mono"
                    >
                      [ TRANSMIT ANOTHER BRIEFING ]
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Recruiter Mission Briefing Form */
                <form onSubmit={handleTransmit} className="space-y-4">
                  {/* Recruiter / Organization Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#7A8274] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#C2B280]" />
                      RECRUITER / ORGANIZATION NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name, company, or agency..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={transmitStatus !== "IDLE"}
                      className="w-full bg-[#141614] border border-[#2D322B] focus:border-[#5C6F52] outline-none rounded p-2.5 text-[#E2E4DF] text-xs font-mono placeholder:text-[#656C60] transition-colors"
                    />
                  </div>

                  {/* Communication Email Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#7A8274] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AtSign className="w-3 h-3 text-[#C2B280]" />
                      COMMUNICATION EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter contact email for correspondence..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={transmitStatus !== "IDLE"}
                      className="w-full bg-[#141614] border border-[#2D322B] focus:border-[#5C6F52] outline-none rounded p-2.5 text-[#E2E4DF] text-xs font-mono placeholder:text-[#656C60] transition-colors"
                    />
                  </div>

                  {/* Proposed Posting / Mission Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#7A8274] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3 h-3 text-[#C2B280]" />
                      PROPOSED POSTING / MISSION TYPE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "FULL-TIME POSTING", label: "FULL-TIME ROLE" },
                        { id: "INTERNSHIP DIRECTIVE", label: "INTERNSHIP" },
                        { id: "CONTRACT / FREELANCE", label: "CONTRACT MISSION" },
                        { id: "GENERAL INQUIRY", label: "GENERAL INQUIRY" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setMissionType(t.id)}
                          className={`p-2 rounded border text-[10px] font-bold text-center transition-all ${
                            missionType === t.id
                              ? "bg-[#344030] border-[#5C6F52] text-[#E2E4DF]"
                              : "bg-[#141614] border-[#2A2E29] text-[#7A8274] hover:border-[#4A4736]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Opportunity Details Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#7A8274] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-[#C2B280]" />
                      MISSION BRIEFING / OPPORTUNITY DETAILS
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe the proposed role, tech stack, project scope, or opportunity details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={transmitStatus !== "IDLE"}
                      className="w-full bg-[#141614] border border-[#2D322B] focus:border-[#5C6F52] outline-none rounded p-2.5 text-[#E2E4DF] text-xs font-mono placeholder:text-[#656C60] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={transmitStatus !== "IDLE"}
                    className="px-5 py-2.5 bg-[#344030] hover:bg-[#3f4f3b] border border-[#5C6F52] text-[#E2E4DF] rounded text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md uppercase disabled:opacity-50"
                  >
                    {transmitStatus === "CONNECTING" ? (
                      <span>ESTABLISHING SECURE LINK...</span>
                    ) : transmitStatus === "TRANSMITTING" ? (
                      <span>TRANSMITTING DIRECTIVE...</span>
                    ) : (
                      <>
                        <span>[ TRANSMIT MISSION BRIEFING ]</span>
                        <Send className="w-3.5 h-3.5 text-[#C2B280]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>

            {/* Microcopy Footer */}
            <div className="pt-4 text-center text-[#73786B] font-mono text-[10.5px]">
              "Looking to assign a new software engineering posting, internship, or development mission? Transmit your briefing above."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
