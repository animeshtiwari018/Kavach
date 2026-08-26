"use client";

import { useState, useRef, useEffect } from "react";

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { text: "KAVACH SECURE OS [Version 1.0.4]", type: "system" },
    { text: "(c) 2026 Kavach Corporation. All rights reserved.", type: "system" },
    { text: "Type 'help' to see available system commands.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, { text: `operator@kavach:~$ ${cmdText}`, type: "input" }];

    if (isDecrypting) {
      setHistory([...newHistory, { text: "System is busy decrypting. Please wait...", type: "error" }]);
      return;
    }

    switch (command) {
      case "help":
        setHistory([
          ...newHistory,
          { text: "Available Commands:", type: "system" },
          { text: "  help       - Show this command reference.", type: "system" },
          { text: "  status     - Show security systems integrity status.", type: "system" },
          { text: "  decrypt    - Initiate deep security file decryption.", type: "system" },
          { text: "  clear      - Clear the terminal console buffer.", type: "system" },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "status":
        setHistory([
          ...newHistory,
          { text: "=== KAVACH SECURITY REPORT ===", type: "success" },
          { text: "SYSTEM STATUS: ACTIVE & MONITORING", type: "success" },
          { text: "INTEGRITY DEVIATION: 0.00% (SECTOR OK)", type: "success" },
          { text: "FIREWALL CONFIG: ENFORCED (HIGH)", type: "success" },
          { text: "ACTIVE NODES: NODE_01, NODE_02, NODE_03", type: "success" },
          { text: "THREAT LEVEL: NEGLIGIBLE (0)", type: "success" },
          { text: "==============================", type: "success" },
        ]);
        break;

      case "decrypt":
        setIsDecrypting(true);
        setHistory([
          ...newHistory,
          { text: "[INITIALIZING SECURE DECRYPTION PROTOCOL...]", type: "system" },
          { text: "Targeting block: KAVACH_CORE_SYS_01", type: "system" },
        ]);

        let step = 0;
        const steps = [
          "Bypassing quantum encryption standard layer 1...",
          "Establishing proxy nodes in node cluster...",
          "Injecting decryption payload into memory...",
          "Decrypted memory address range: 0x7FFA84B30000...",
          "Extraction complete: KAVACH_OS_MASTER_KEY found.",
        ];

        const interval = setInterval(() => {
          if (step < steps.length) {
            setHistory((prev) => [...prev, { text: `[+] ${steps[step]}`, type: "system" }]);
            step++;
          } else {
            clearInterval(interval);
            setHistory((prev) => [
              ...prev,
              { text: "DECRYPTION COMPLETE. KEY LOADED IN ENV.", type: "success" },
              { text: "SYSTEM RESTORED TO FULL ACCESS LEVEL.", type: "success" },
            ]);
            setIsDecrypting(false);
          }
        }, 400);
        break;

      default:
        setHistory([
          ...newHistory,
          { text: `bash: ${command}: command not found. Type 'help' for assistance.`, type: "error" },
        ]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-[#8E9B72] p-3 font-mono text-[11px] overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-2 space-y-1.5 scrollbar-thin scrollbar-thumb-[#3A4034]">
        {history.map((entry, index) => {
          let color = "text-[#8E9B72]";
          if (entry.type === "input") color = "text-white";
          if (entry.type === "error") color = "text-red-500 font-semibold";
          if (entry.type === "success") color = "text-green-400";
          if (entry.type === "system") color = "text-[#73786B]";

          return (
            <div key={index} className={`whitespace-pre-wrap ${color}`}>
              {entry.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-1 border-t border-[#24291F] pt-2">
        <span className="text-white select-none">operator@kavach:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDecrypting}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] caret-[#8E9B72]"
          autoFocus
        />
      </form>
    </div>
  );
}
