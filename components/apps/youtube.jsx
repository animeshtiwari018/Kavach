"use client";

import { useState } from "react";
import { Search, MonitorPlay } from "lucide-react";

export default function YouTubeApp() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("jfKfPfyJRdk"); // Default to Lofi Girl

  const handleLoad = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    
    // Extract video ID from URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    
    if (match && match[2].length === 11) {
      setVideoId(match[2]);
    } else {
      // If it looks like an 11-char ID directly
      if (videoUrl.trim().length === 11) {
        setVideoId(videoUrl.trim());
      } else {
        // Fallback or search (we can't easily embed a youtube search, so we just alert or do nothing)
        alert("Please enter a valid YouTube Video URL");
      }
    }
    setVideoUrl("");
  };

  const PLAYLIST = [
    { id: "jfKfPfyJRdk", title: "lofi hip hop radio - beats to relax/study to" },
    { id: "M7lc1UVf-VE", title: "YouTube Developers Live" },
    { id: "bMknfKXIFA8", title: "React Crash Course for Beginners" },
    { id: "8ma8gNqQnB0", title: "Cybersecurity Full Course" },
    { id: "0sOvCWFmrtA", title: "Next.js App Router Crash Course" },
    { id: "8xebjX0Yv1A", title: "The Perfect Developer Workspace" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0f0f0f] text-white overflow-hidden font-sans select-none">
      {/* YouTube Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-[#272727] shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <MonitorPlay className="w-7 h-7 text-red-600" />
          <span className="font-bold tracking-tighter text-xl mt-[-2px]">YouTube</span>
        </div>
        
        <form onSubmit={handleLoad} className="flex-1 max-w-xl mx-6 flex items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 py-2 focus-within:border-[#1c62b9] transition-colors shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
            <input 
              type="text" 
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube Video URL..." 
              className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 font-sans"
            />
          </div>
          <button type="submit" className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-6 py-2 hover:bg-[#303030] transition-colors cursor-pointer">
            <Search className="w-4 h-4 text-zinc-300" />
          </button>
        </form>
        
        <div className="w-8 shrink-0" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Video Player Area */}
        <div className="flex-1 bg-black flex flex-col overflow-y-auto">
          <div className="w-full aspect-video bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-5 font-sans">
            <h1 className="text-xl font-bold text-white mb-2">
              {PLAYLIST.find(v => v.id === videoId)?.title || "YouTube Video Stream"}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                <span className="font-bold text-sm text-zinc-400">KV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Kavach System</span>
                <span className="text-xs text-zinc-400">1.2M subscribers</span>
              </div>
              <button className="ml-4 bg-white text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className="w-full md:w-80 bg-[#0f0f0f] flex flex-col shrink-0 border-l border-[#272727]">
          <div className="px-4 py-3 font-bold text-base border-b border-[#272727]">
            Up next
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {PLAYLIST.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setVideoId(vid.id)}
                className={`flex gap-2 rounded-lg cursor-pointer transition-colors ${videoId === vid.id ? 'bg-[#272727] p-2 -mx-2' : 'hover:bg-[#272727] p-2 -mx-2'}`}
              >
                <div className="w-[120px] aspect-video bg-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <img src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`} alt={vid.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-[10px] rounded font-bold">PLAY</div>
                </div>
                <div className="flex flex-col py-0.5 overflow-hidden">
                  <span className="text-sm font-semibold line-clamp-2 leading-snug">{vid.title}</span>
                  <span className="text-[11px] text-zinc-400 mt-1 line-clamp-1">Kavach System</span>
                  <span className="text-[11px] text-zinc-400">Recommended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
