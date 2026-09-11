"use client";

import { motion, useDragControls } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

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
  constraintsRef,
  onPositionChange,
  onSizeChange,
  openOrigin,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({
    width: defaultWidth,
    height: defaultHeight,
    x: defaultX,
    y: defaultY,
  });

  const dragControls = useDragControls();
  const windowRef = useRef(null);

  const TOP_BAR_H = 42;
  const BOTTOM_BAR_H = 80;

  const calcCenter = (winW, winH) => {
    if (typeof window === "undefined") return { x: defaultX, y: defaultY };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const usableH = vh - TOP_BAR_H - BOTTOM_BAR_H;
    return {
      x: Math.max(0, Math.floor((vw - winW) / 2)),
      y: TOP_BAR_H + Math.max(0, Math.floor((usableH - winH) / 2)),
    };
  };

  const [position, setPosition] = useState(() => calcCenter(defaultWidth, defaultHeight));
  
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);

  // Re-center whenever the window is opened (isOpen transitions to true)
  const prevIsOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !prevIsOpen.current && !isMaximized) {
      setPosition(calcCenter(width, height));
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // Clamp initial default size to desktop boundaries
  useEffect(() => {
    if (desktopRef && desktopRef.current) {
      const desktopRect = desktopRef.current.getBoundingClientRect();
      const maxW = Math.floor(desktopRect.width * 0.9);
      const maxH = Math.floor(desktopRect.height * 0.85);

      let initialWidth = defaultWidth;
      let initialHeight = defaultHeight;

      if (initialWidth > maxW) initialWidth = maxW;
      if (initialHeight > maxH) initialHeight = maxH;

      initialWidth = Math.max(320, initialWidth);
      initialHeight = Math.max(220, initialHeight);

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

  // Toggle maximize & restore state
  const toggleMaximize = () => {
    if (isMaximized) {
      setWidth(preMaximizeState.width);
      setHeight(preMaximizeState.height);
      setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
      setIsMaximized(false);
    } else {
      setPreMaximizeState({ width, height, x: position.x, y: position.y });
      setIsMaximized(true);
    }
  };

  // Double click titlebar to maximize
  const handleTitleBarDoubleClick = (e) => {
    if (e.target.closest(".window-controls")) return;
    toggleMaximize();
  };

  // 8-Directional Resizing Handler
  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    let currentWidth = startWidth;
    let currentHeight = startHeight;

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      const minWidth = 320;
      const minHeight = 220;

      if (direction.includes("e") || direction.includes("right")) {
        currentWidth = Math.max(minWidth, startWidth + dx);
      }
      if (direction.includes("s") || direction.includes("bottom")) {
        currentHeight = Math.max(minHeight, startHeight + dy);
      }
      if (direction.includes("w")) {
        currentWidth = Math.max(minWidth, startWidth - dx);
      }
      if (direction.includes("n")) {
        currentHeight = Math.max(minHeight, startHeight - dy);
      }

      setWidth(currentWidth);
      setHeight(currentHeight);
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

  const clampPosition = (x, y, winW, winH) => {
    if (typeof window === "undefined") return { x, y };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minX = 0;
    const maxX = Math.max(0, vw - winW);
    const minY = TOP_BAR_H;
    const maxY = Math.max(TOP_BAR_H, vh - BOTTOM_BAR_H - winH);
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  // Compute origin for open/close animation
  const originX = openOrigin ? openOrigin.x - width / 2 : position.x;
  const originY = openOrigin ? openOrigin.y - height / 2 : position.y;

  const openCloseTransition = {
    duration: 0.38,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={!isMaximized ? {
        top: TOP_BAR_H,
        left: 0,
        right: typeof window !== "undefined" ? Math.max(0, window.innerWidth - width) : 9999,
        bottom: typeof window !== "undefined" ? Math.max(TOP_BAR_H, window.innerHeight - BOTTOM_BAR_H - height) : 9999,
      } : false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.55, x: originX, y: originY }}
      animate={
        isMaximized
          ? { 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0, 
              width: "100vw", 
              height: "calc(100vh - 112px)" 
            }
          : { 
              opacity: 1, 
              scale: 1, 
              x: position.x, 
              y: position.y, 
              width: width, 
              height: height 
            }
      }
      exit={{ opacity: 0, scale: 0.55, x: originX, y: originY, transition: openCloseTransition }}
      transition={
        isResizing
          ? { type: "tween", duration: 0 }
          : { type: "tween", duration: 0.38, ease: [0.16, 1, 0.3, 1] }
      }
      onPointerDown={onFocus}
      onDragEnd={(event, info) => {
        if (isMaximized) return;
        if (!windowRef.current) return;
        const rect = windowRef.current.getBoundingClientRect();
        const clamped = clampPosition(rect.left, rect.top, rect.width, rect.height);
        setPosition(clamped);
        if (onPositionChange) {
          onPositionChange(clamped.x, clamped.y);
        }
      }}
      className={`flex flex-col rounded-xl border text-[#D4D5C8] font-mono shadow-2xl overflow-hidden select-none z-30 transition-shadow ${
        isActive
          ? "border-[#8E9B72] bg-[#0A0C09]/98 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          : "border-[#3A4034] bg-[#0A0C09]/95 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
      }`}
      style={{
        zIndex: isActive ? 40 : 30,
        position: "fixed",
        top: isMaximized ? "42px" : "0px",
        left: "0px",
      }}
    >
      {/* Weld Corner Rivets */}
      <span className={`absolute top-[4px] left-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute top-[4px] right-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute bottom-[4px] left-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />
      <span className={`absolute bottom-[4px] right-[4px] w-[2px] h-[2px] rounded-full pointer-events-none z-40 ${isActive ? "bg-[#8E9B72]/70" : "bg-[#3A4034]/70"}`} />

      {/* Window Title Bar */}
      <div
        onPointerDown={(e) => {
          onFocus();
          if (!isMaximized) dragControls.start(e);
        }}
        onDoubleClick={handleTitleBarDoubleClick}
        className={`h-9 flex items-center justify-between px-3 border-b text-[11px] tracking-wider select-none cursor-move ${
          isActive
            ? "border-[#8E9B72]/40 bg-[#121610]/90 text-[#D4D5C8]"
            : "border-[#3A4034]/40 bg-[#0C0E0B]/85 text-[#73786B]"
        }`}
      >
        {/* Window Control Buttons (Close, Minimize, Maximize) */}
        <div className="window-controls flex items-center space-x-2 mr-4 group/controls">
          <button
            className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#E0443E] active:bg-[#C0322C] flex items-center justify-center transition-colors relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            title="Close"
          >
            <X className="w-2 h-2 text-[#4C0000] opacity-0 group-hover/controls:opacity-100 transition-opacity pointer-events-none" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#DEA123] active:bg-[#BE8517] flex items-center justify-center transition-colors relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
              else if (onClose) onClose();
            }}
            title="Minimize"
          >
            <Minus className="w-2 h-2 text-[#5C4000] opacity-0 group-hover/controls:opacity-100 transition-opacity pointer-events-none" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#1AAB29] active:bg-[#128C1E] flex items-center justify-center transition-colors relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 text-[#0B4D10] opacity-0 group-hover/controls:opacity-100 transition-opacity pointer-events-none" />
            ) : (
              <Maximize2 className="w-2 h-2 text-[#0B4D10] opacity-0 group-hover/controls:opacity-100 transition-opacity pointer-events-none" />
            )}
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 text-center font-bold tracking-[0.2em] pointer-events-none select-none uppercase truncate">
          {title}
        </div>

        {/* Tactical Info */}
        <div className="w-16 text-right opacity-40 text-[9px] pointer-events-none select-none font-mono">
          [{isMaximized ? "MAX" : "WIN"}]
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto bg-[#070906]/98 relative cursor-default text-xs font-mono">
        {children || <div className="p-4 text-sm">Window Content</div>}
      </div>

      {/* 8-Directional Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50" onPointerDown={(e) => handleResizeStart(e, "nw")} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50" onPointerDown={(e) => handleResizeStart(e, "ne")} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50" onPointerDown={(e) => handleResizeStart(e, "sw")} />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-[2px]" onPointerDown={(e) => handleResizeStart(e, "bottom-right")}>
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-60 pointer-events-none">
              <line x1="6" y1="0" x2="0" y2="6" stroke={isActive ? "#8E9B72" : "#3A4034"} strokeWidth="1" />
              <line x1="6" y1="3" x2="3" y2="6" stroke={isActive ? "#8E9B72" : "#3A4034"} strokeWidth="1" />
            </svg>
          </div>

          {/* Edges */}
          <div className="absolute top-0 left-3 right-3 h-2 cursor-n-resize z-50" onPointerDown={(e) => handleResizeStart(e, "n")} />
          <div className="absolute bottom-0 left-3 right-3 h-2 cursor-s-resize z-50" onPointerDown={(e) => handleResizeStart(e, "bottom")} />
          <div className="absolute left-0 top-3 bottom-3 w-2 cursor-w-resize z-50" onPointerDown={(e) => handleResizeStart(e, "w")} />
          <div className="absolute right-0 top-3 bottom-3 w-2 cursor-e-resize z-50" onPointerDown={(e) => handleResizeStart(e, "right")} />
        </>
      )}
    </motion.div>
  );
}
