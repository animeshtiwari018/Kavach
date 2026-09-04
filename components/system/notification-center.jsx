"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bell } from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSize";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    app: "System",
    title: "Kavach OS Initialized",
    message: "Welcome to Kavach OS. All systems are operating at optimal capacity.",
    time: "Just now",
    icon: "/images/kavach.svg"
  },
  {
    id: 2,
    app: "Security",
    title: "Firewall Active",
    message: "Network traffic is being monitored. No anomalies detected.",
    time: "2m ago",
    icon: "/images/kavach.svg"
  },
  {
    id: 3,
    app: "Update",
    title: "System Update Available",
    message: "A new intelligence module is ready for download. Click to view details.",
    time: "1h ago",
    icon: "/images/kavach.svg"
  }
];

export default function NotificationCenter({ show, onClose, isDarkMode }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const { isMobile } = useWindowSize();

  const clearAll = () => {
    setNotifications([]);
    setTimeout(() => onClose(), 400);
  };
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const containerVariants = isMobile ? {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 350, damping: 30, staggerChildren: 0.05 }
    },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.2 } }
  } : {
    hidden: { x: 340, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 350, damping: 30, staggerChildren: 0.05 }
    },
    exit: { x: 340, opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { x: 40, opacity: 0, scale: 0.95 },
    visible: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Click away overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-transparent"
            onClick={onClose}
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-[42px] right-4 ${isMobile ? "w-[calc(100%-32px)]" : "w-[320px]"} z-50 flex flex-col gap-3 font-sans select-none origin-right`}
          >
            {/* Header */}
            <motion.div 
              variants={itemVariants}
              className={`rounded-2xl p-4 backdrop-blur-2xl border shadow-xl flex items-center justify-between ${
                isDarkMode ? "bg-[#1a212a]/90 border-white/10 text-white" : "bg-white/80 border-gray-200/50 text-gray-800"
              }`}
            >
              <span className="font-bold text-sm tracking-wide flex items-center gap-2">
                Notification Center
                {notifications.length > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {notifications.length}
                  </span>
                )}
              </span>
              {notifications.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Clear
                </button>
              )}
            </motion.div>

            {/* Notifications List */}
            <motion.div 
              variants={itemVariants}
              className={`rounded-2xl backdrop-blur-2xl border shadow-xl overflow-hidden flex flex-col ${
                isDarkMode ? "bg-[#1a212a]/90 border-white/10" : "bg-white/80 border-gray-200/50"
              }`}
            >
              {notifications.length === 0 ? (
                <div className={`p-8 text-center text-sm font-medium flex flex-col items-center justify-center gap-2 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>
                  <Bell className="w-8 h-8 opacity-50 mb-2" />
                  No new notifications
                </div>
              ) : (
                <div className="p-2 flex flex-col gap-1.5 max-h-[50vh] overflow-y-auto hide-scrollbar">
                  <AnimatePresence initial={false}>
                    {notifications.map(n => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 50, transition: { duration: 0.2 } }}
                        layout
                        className={`relative group p-3 rounded-xl flex gap-3 items-start ${
                          isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                        } transition-colors`}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 shadow-sm border border-white/5 overflow-hidden">
                          <img src={n.icon} alt="Icon" className="w-6 h-6 object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className={`text-xs font-bold truncate pr-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{n.title}</h4>
                            <span className={`text-[10px] flex-shrink-0 ${isDarkMode ? "text-white/40" : "text-black/40"}`}>{n.time}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed line-clamp-2 ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
                            {n.message}
                          </p>
                        </div>
                        
                        <button 
                          onClick={() => dismiss(n.id)}
                          className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer ${
                            isDarkMode ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/10 hover:bg-black/20 text-black"
                          }`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
