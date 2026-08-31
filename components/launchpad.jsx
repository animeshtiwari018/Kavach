"use client";

import { useState, useEffect } from "react";

// App list config (Launchpad displays all installed applications, excluding itself)
const launchpadApps = [
  { id: "mission-archive", title: "Mission Archive", icon: "/images/kavach.png", component: "MissionArchive" },
  { id: "safari", title: "Safari", icon: "/images/browser.png", component: "Safari" },
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail" },
  { id: "vscode", title: "VS Code", icon: "/images/vscode.png", component: "VSCode" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "facetime", title: "FaceTime", icon: "/facetime.png", component: "FaceTime" },
  { id: "terminal", title: "Terminal", icon: "/images/Terminal.png", component: "Terminal" },
  { id: "github", title: "GitHub", icon: "/images/github.png", component: "GitHub" },
  { id: "youtube", title: "YouTube", icon: "/images/youtube.png", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/images/spotify.png", component: "Spotify" },
  { id: "snake", title: "Snake", icon: "/snake.png", component: "Snake" },
  { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather" },
];

const emojiFallback = {
  safari: "🌐",
  mail: "✉️",
  vscode: "💻",
  notes: "📝",
  facetime: "📞",
  terminal: "📟",
  github: "🐙",
  youtube: "📺",
  spotify: "🎵",
  snake: "🐍",
  weather: "☀️",
};

export default function Launchpad({ onAppClick, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApps, setFilteredApps] = useState(launchpadApps);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    // Triggers slide-up & fade-in animation on mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Filter apps based on search input
    if (searchTerm) {
      setFilteredApps(launchpadApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredApps(launchpadApps);
    }
  }, [searchTerm]);

  const handleAppClick = (app) => {
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 100 + 80, y: Math.random() * 30 + 15 },
      size: { width: 700, height: 460 },
    });
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition animation to complete before removing from DOM
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex flex-col items-center justify-center
        transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-4xl px-8 py-12 transition-transform duration-300 
          ${isVisible ? "translate-y-0" : "translate-y-10"}`}
        onClick={(e) => e.stopPropagation()} // Prevents closing Launchpad when clicking inside the content grid
      >
        
        {/* Search Bar section */}
        <div className="relative w-64 mx-auto mb-12">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2 pl-10 pr-4 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 font-sans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Responsive App Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-8">
          {filteredApps.map((app) => {
            const hasError = imgError[app.id];

            return (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center cursor-pointer group"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2 rounded-xl group-hover:bg-white/20 transition-colors">
                  {hasError ? (
                    <div className="text-3xl font-sans select-none">
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
                <span className="text-white text-sm text-center font-medium drop-shadow font-sans">{app.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
