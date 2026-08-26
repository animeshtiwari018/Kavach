"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function Homepage() {
  return (
    <div className="min-h-screen w-full bg-black text-[#D4D5C8] font-mono selection:bg-[#8E9B72]/30 selection:text-transparent flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl w-full flex flex-col items-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-[10px] tracking-[0.4em] text-[#8E9B72] uppercase font-bold"
        >
          // SYSTEM ACCESS GRANTED //
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-center text-white select-none">
          KAVACH TERMINAL
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          className="h-[1px] w-32 bg-[#3A4034] origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs text-[#73786B] text-center tracking-wider max-w-md leading-relaxed"
        >
          Welcome to the primary operator console. Awaiting instruction.
        </motion.p>
      </motion.div>
    </div>
  );
}
