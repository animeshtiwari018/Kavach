"use client";

import { motion, useDragControls } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function Window({
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  defaultWidth = 600,
  defaultHeight = 400,
  defaultX = 100,
  defaultY = 100,
  desktopRef,
  onPositionChange,
  onSizeChange,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const windowRef = useRef(null);

  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);

  // Clamp the default size of the window on mount to fit the desktop container
  useEffect(() => {
    if (desktopRef && desktopRef.current) {
      const desktopRect = desktopRef.current.getBoundingClientRect();
      const maxW = Math.floor(desktopRect.width * 0.9);
      const maxH = Math.floor(desktopRect.height * 0.85);

      let initialWidth = defaultWidth;
      let initialHeight = defaultHeight;

      if (initialWidth > maxW) {
        initialWidth = maxW;
      }
      if (initialHeight > maxH) {
        initialHeight = maxH;
      }

      initialWidth = Math.max(300, initialWidth);
      initialHeight = Math.max(200, initialHeight);

      setWidth(initialWidth);
      setHeight(initialHeight);

      if ((initialWidth !== defaultWidth || initialHeight !== defaultHeight) && onSizeChange) {
        onSizeChange(initialWidth, initialHeight);
      }
    } else {
      setWidth(defaultWidth);
      setHeight(defaultHeight);
    }
  }, [defaultWidth, defaultHeight, desktopRef]);

  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    let currentWidth = startWidth;
    let currentHeight = startHeight;

    const handlePointerMove = (moveEvent) => {
      if (direction === "right" || direction === "bottom-right") {
        const deltaX = moveEvent.clientX - startX;
        currentWidth = Math.max(300, startWidth + deltaX);
        setWidth(currentWidth);
      }
      if (direction === "bottom" || direction === "bottom-right") {
        const deltaY = moveEvent.clientY - startY;
        currentHeight = Math.max(200, startHeight + deltaY);
        setHeight(currentHeight);
      }
    };

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      setIsResizing(false);
      if (onSizeChange) {
        onSizeChange(currentWidth, currentHeight);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={desktopRef}
      dragElastic={0.05}
      initial={{ opacity: 0, scale: 0.95, x: defaultX, y: defaultY }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        width: isMaximized ? "100%" : width,
        height: isMaximized ? "calc(100vh - 40px - 50px)" : height, // Subtract top bar & dock height
      }}
      transition={
        isResizing
          ? { type: "tween", duration: 0 }
          : { type: "spring", stiffness: 350, damping: 26 }
      }
      onPointerDown={onFocus}
      onDragEnd={(event, info) => {
        if (isMaximized) return;
        const desktopRect = desktopRef.current?.getBoundingClientRect();
        if (desktopRect && windowRef.current) {
          const rect = windowRef.current.getBoundingClientRect();
          const relativeX = rect.left - desktopRect.left;
          const relativeY = rect.top - desktopRect.top;
          if (onPositionChange) {
            onPositionChange(relativeX, relativeY);
          }
        }
      }}
      className={`absolute flex flex-col rounded-md border text-[#D4D5C8] font-mono shadow-2xl overflow-hidden select-none z-30 ${
        isActive 
          ? "border-[#8E9B72] bg-[#0A0C09]/98 shadow-[#8E9B72]/5" 
          : "border-[#3A4034] bg-[#0A0C09]/95"
      }`}
      style={{
        zIndex: isActive ? 40 : 30,
        position: isMaximized ? "fixed" : "absolute",
        top: isMaximized ? "40px" : "0px", // Height of the Menubar
        left: isMaximized ? "0px" : "0px",
      }}
    >
      {/* Weld Corner Rivets (Cohesive Tactical Design) */}
      <span className={`absolute top-[4px] left-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute top-[4px] right-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute bottom-[4px] left-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute bottom-[4px] right-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />

      {/* Window Title Bar */}
      <div
        onPointerDown={(e) => {
          onFocus();
          dragControls.start(e);
        }}
        className={`flex items-center justify-between px-4 py-2 border-b text-[11px] tracking-wider select-none cursor-move ${
          isActive 
            ? "border-[#8E9B72]/40 bg-[#121610]/80 text-[#D4D5C8]" 
            : "border-[#3A4034]/40 bg-[#0C0E0B]/80 text-[#73786B]"
        }`}
      >
        {/* macOS-like Window Controls (Left side) */}
        <div className="flex items-center gap-2 group/controls w-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#E0443E] flex items-center justify-center cursor-pointer transition-colors relative"
            title="Close"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] text-[#4C0002] font-extrabold select-none pointer-events-none">
              ×
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#DEA123] flex items-center justify-center cursor-pointer transition-colors relative"
            title="Minimize"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 text-[7px] text-[#5C3E00] font-extrabold select-none pointer-events-none -mt-[1px]">
              -
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
            className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#1A9F2C] flex items-center justify-center cursor-pointer transition-colors relative"
            title="Maximize"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 text-[6px] text-[#004D02] font-extrabold select-none pointer-events-none">
              +
            </span>
          </button>
        </div>

        {/* Window Title (Center) */}
        <div className="flex-1 text-center font-bold tracking-[0.2em] pointer-events-none select-none uppercase">
          {title}
        </div>

        {/* Tactical Corner Info (Right side) */}
        <div className="w-20 text-right opacity-40 text-[9px] pointer-events-none select-none font-mono">
          [ {isMaximized ? "MAX" : "WIN"} ]
        </div>
      </div>

      {/* Window Content Area */}
      <div className="flex-1 overflow-auto bg-[#070906]/98 relative cursor-default text-xs font-mono">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Right edge handle */}
          <div
            className="absolute top-0 right-0 w-[6px] h-full cursor-ew-resize z-50 select-none hover:bg-[#8E9B72]/10 active:bg-[#8E9B72]/20 transition-colors"
            onPointerDown={(e) => handleResizeStart(e, "right")}
          />
          {/* Bottom edge handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-[6px] cursor-ns-resize z-50 select-none hover:bg-[#8E9B72]/10 active:bg-[#8E9B72]/20 transition-colors"
            onPointerDown={(e) => handleResizeStart(e, "bottom")}
          />
          {/* Bottom-right corner handle with decoration */}
          <div
            className="absolute bottom-0 right-0 w-[14px] h-[14px] cursor-nwse-resize z-50 select-none hover:bg-[#8E9B72]/20 active:bg-[#8E9B72]/40 transition-colors flex items-end justify-end p-[2px]"
            onPointerDown={(e) => handleResizeStart(e, "bottom-right")}
          >
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-60 pointer-events-none">
              <line x1="6" y1="0" x2="0" y2="6" stroke={isActive ? "#8E9B72" : "#3A4034"} strokeWidth="1" />
              <line x1="6" y1="3" x2="3" y2="6" stroke={isActive ? "#8E9B72" : "#3A4034"} strokeWidth="1" />
            </svg>
          </div>
        </>
      )}
    </motion.div>
  );
}
