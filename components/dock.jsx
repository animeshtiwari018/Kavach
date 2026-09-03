"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

// App list config
const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/images/kavach.svg", component: "Launchpad", isSystem: true },
  { id: "safari", title: "Safari", icon: "/images/browser.svg", component: "Safari" },
  { id: "settings", title: "Settings", icon: "/settings.png", component: "Settings" },
  { id: "vscode", title: "VS Code", icon: "/images/vscode.svg", component: "VSCode" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "facetime", title: "FaceTime", icon: "/facetime.png", component: "FaceTime" },
  { id: "terminal", title: "Terminal", icon: "/images/Terminal.svg", component: "Terminal" },
  { id: "github", title: "GitHub", icon: "/images/github.svg", component: "GitHub" },
  { id: "youtube", title: "YouTube", icon: "/images/youtube.svg", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/images/spotify.svg", component: "Spotify" },
];

const emojiFallback = {
  launchpad: "🚀",
  safari: "🌐",
  settings: "⚙️",
  mail: "✉️",
  vscode: "💻",
  notes: "📝",
  facetime: "📞",
  terminal: "📟",
  github: "🐙",
  youtube: "📺",
  spotify: "🎵",
};

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds = [], isDarkMode }) {
  const [mouseX, setMouseX] = useState(null);
  const dockRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imgError, setImgError] = useState({});

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!showMobileMenu) return;

    const handleClickOutside = (event) => {
      if (dockRef.current && !dockRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  const handleAppClick = (app) => {
    if (app.id === "launchpad") {
      onLaunchpadClick();
      return;
    }

    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 100 + 80, y: Math.random() * 30 + 15 },
      size: { width: 700, height: 460 },
    });

    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const handleMouseMove = (e) => {
    if (dockRef.current && !isMobile) {
      const rect = dockRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setMouseX(x);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  // Calculate scale for each icon based on distance from mouse (magnification effect)
  const getIconScale = (index, iconCount) => {
    if (mouseX === null || isMobile) return 1;

    const dockWidth = dockRef.current?.offsetWidth || 0;
    const iconWidth = dockWidth / iconCount;
    const iconPosition = iconWidth * (index + 0.5); // Center of the icon

    const distance = Math.abs(mouseX - iconPosition);
    const maxScale = 2;
    const maxDistance = iconWidth * 2.5;

    if (distance > maxDistance) return 1;

    // Smooth parabolic scaling curve
    const scale = 1 + (maxScale - 1) * Math.pow(1 - distance / maxDistance, 2);
    return scale;
  };

  const visibleApps = isMobile ? dockApps.slice(0, 4) : dockApps;
  const hiddenApps = isMobile ? dockApps.slice(4) : [];

  return (
    <div ref={dockRef} className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      {/* Mobile expanded overflow menu */}
      {isMobile && showMobileMenu && (
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[280px] backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-4 mb-2
          ${isDarkMode ? "bg-white/20" : "bg-white/90"}`}
        >
          <div className="grid grid-cols-4 gap-4">
            {hiddenApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  {imgError[app.id] ? (
                    <div className="w-12 h-12 flex items-center justify-center text-3xl font-sans">
                      {emojiFallback[app.id] || "📦"}
                    </div>
                  ) : (
                    <img
                      src={app.icon || "/placeholder.svg"}
                      alt={app.title}
                      className="w-12 h-12 object-contain"
                      draggable="false"
                      onError={() => setImgError(prev => ({ ...prev, [app.id]: true }))}
                    />
                  )}
                </div>
                <span className={`text-xs mt-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{app.title}</span>
                {activeAppIds.includes(app.id) && <div className="w-1.5 h-1.5 bg-[#8E9B72] rounded-full mt-1"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main dock container */}
      <div
        className={`px-3 py-2 rounded-2xl backdrop-blur-xl border border-white/20 flex items-end shadow-lg
          ${isDarkMode ? "bg-white/20" : "bg-white/60"}
          ${isMobile ? "h-20" : "h-16"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {visibleApps.map((app, index) => {
          const scale = getIconScale(index, visibleApps.length);
          const hasError = imgError[app.id];

          return (
            <div
              key={app.id}
              className={`flex flex-col items-center justify-end h-full ${isMobile ? "px-3" : "px-2"}`}
              style={{
                transform: isMobile ? "none" : `translateY(${(scale - 1) * -8}px)`,
                zIndex: scale > 1 ? 10 : 1,
                transition: mouseX === null ? "transform 0.2s ease-out" : "none",
              }}
              onClick={() => handleAppClick(app)}
            >
              <div
                className="relative cursor-pointer"
                style={{
                  transform: isMobile ? "none" : `scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                }}
              >
                {hasError ? (
                  <div className={`flex items-center justify-center select-none font-sans ${isMobile ? "w-14 h-14 text-3.5xl" : "w-12 h-12 text-3xl"}`}>
                    {emojiFallback[app.id] || "📦"}
                  </div>
                ) : (
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={app.title}
                    className={`object-contain ${isMobile ? "w-14 h-14" : "w-12 h-12"}`}
                    draggable="false"
                    onError={() => setImgError(prev => ({ ...prev, [app.id]: true }))}
                  />
                )}

                {/* Desktop tooltip on hover */}
                {!isMobile && scale > 1.5 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/80 text-white text-[10px] rounded whitespace-nowrap font-sans">
                    {app.title}
                  </div>
                )}

                {/* Indicator dot for running apps */}
                {activeAppIds.includes(app.id) && (
                  <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#8E9B72] rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}

        {/* More/Overflow button for mobile viewports */}
        {isMobile && (
          <div
            className="flex flex-col items-center justify-end h-full px-3"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center 
                ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} 
                ${showMobileMenu ? (isDarkMode ? "bg-blue-700" : "bg-blue-200") : ""}`}
              >
                <MoreHorizontal className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-800"}`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
