"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
  Compass,
  ListMusic,
  ExternalLink,
  Search,
  Radio,
  Music,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURED_PLAYLISTS = [
  {
    id: "top-hits",
    title: "Today's Top Hits",
    subtitle: "The biggest hits right now from around the globe",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    embedId: "playlist/37i9dQZF1DXcBWIGoYBM5M",
    spotifyUri: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "Spotify Global Top Hits",
  },
  {
    id: "synthwave",
    title: "Cyberpunk & Synthwave",
    subtitle: "High-octane neon electronic beats for coding",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
    embedId: "playlist/37i9dQZF1DXdLEN7aqioXM",
    spotifyUri: "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "Kavach Cyberpunk Radio",
  },
  {
    id: "lofi-coding",
    title: "Lofi Beats for Focus",
    subtitle: "Chill instrumental beats to study and code to",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    embedId: "playlist/37i9dQZF1DX8Ueb9rFqVvD",
    spotifyUri: "https://open.spotify.com/playlist/37i9dQZF1DX8Ueb9rFqVvD",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "Lofi Workstation Beats",
  },
  {
    id: "deep-focus",
    title: "Deep Focus Ambient",
    subtitle: "Minimalist soundscapes for intense concentration",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    embedId: "playlist/37i9dQZF1DWZeKCadgRdKQ",
    spotifyUri: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artist: "Ambient Focus Telemetry",
  },
];

export default function SpotifyApp() {
  const [activeTab, setActiveTab] = useState("home"); // Default to Home/Browse dashboard
  const [selectedPlaylist, setSelectedPlaylist] = useState(FEATURED_PLAYLISTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback:", err));
    }
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = playlist.audioUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredPlaylists = FEATURED_PLAYLISTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#121212] text-[#B3B3B3] font-sans text-xs select-none overflow-hidden border-t border-[#282828]">
      {/* HTML5 Audio Player for Direct Real Audio Output */}
      <audio
        ref={audioRef}
        src={selectedPlaylist.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top Header Navigation */}
      <div className="px-4 py-2.5 bg-[#000000] border-b border-[#282828] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#1DB954]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C13.5 8.28 7.08 8.1 3.3 9.24c-.6.18-1.26-.18-1.44-.72-.18-.6.18-1.26.72-1.44C6.96 5.82 14.04 6 18.42 8.58c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
            </svg>
            <span className="font-bold text-white text-sm tracking-tight">Spotify</span>
          </div>

          <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-full border border-[#282828]">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "home"
                  ? "bg-[#282828] text-white"
                  : "text-[#B3B3B3] hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse Music</span>
            </button>
            <button
              onClick={() => setActiveTab("embed")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "embed"
                  ? "bg-[#282828] text-white"
                  : "text-[#B3B3B3] hover:text-white"
              }`}
            >
              <ListMusic className="w-3.5 h-3.5" />
              <span>Spotify Web Embed</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={selectedPlaylist.spotifyUri}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full text-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow-md"
          >
            <span>Open in Spotify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto bg-[#121212]">
        {activeTab === "embed" ? (
          <div className="w-full h-full p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3 text-white">
              <span className="font-bold text-sm flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#1DB954]" />
                {selectedPlaylist.title}
              </span>
              <span className="text-xs text-[#B3B3B3]">Official Spotify Web Player</span>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/${selectedPlaylist.embedId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg flex-1 min-h-[360px]"
              title="Spotify Player"
            />
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-[#B3B3B3] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#242424] focus:bg-[#2a2a2a] border border-transparent focus:border-white/20 text-white placeholder:text-[#747474] text-xs rounded-full pl-9 pr-4 py-2 outline-none transition-all"
              />
            </div>

            {/* Featured Hero Player Card */}
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#1E3264] to-[#121212] p-6 flex flex-col md:flex-row items-center gap-6 border border-white/5 shadow-2xl">
              <img
                src={selectedPlaylist.cover}
                alt={selectedPlaylist.title}
                className="w-36 h-36 rounded-md shadow-2xl object-cover"
              />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-widest flex items-center gap-1 justify-center md:justify-start">
                  <Music className="w-3 h-3" /> FEATURED AUDIO STREAM
                </span>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {selectedPlaylist.title}
                </h1>
                <p className="text-xs text-[#B3B3B3] leading-relaxed max-w-md">
                  {selectedPlaylist.subtitle}
                </p>
                <div className="pt-3 flex items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={togglePlay}
                    className="px-6 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow-lg"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>PAUSE AUDIO</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>PLAY MUSIC NOW</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("embed")}
                    className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Open Web Embed
                  </button>
                </div>
              </div>
            </div>

            {/* Playlists Grid */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white">Popular Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredPlaylists.map((pl) => (
                  <motion.div
                    key={pl.id}
                    whileHover={{ y: -4 }}
                    onClick={() => handlePlaylistSelect(pl)}
                    className="p-3.5 bg-[#181818] hover:bg-[#282828] rounded-md transition-all cursor-pointer group space-y-3 relative"
                  >
                    <div className="relative aspect-square rounded-md overflow-hidden shadow-md">
                      <img
                        src={pl.cover}
                        alt={pl.title}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-xs truncate">
                        {pl.title}
                      </h3>
                      <p className="text-[11px] text-[#B3B3B3] line-clamp-2 leading-tight">
                        {pl.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Audio Player Control Bar */}
      <div className="px-4 py-2.5 bg-[#181818] border-t border-[#282828] flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <img
            src={selectedPlaylist.cover}
            alt={selectedPlaylist.title}
            className="w-10 h-10 rounded object-cover"
          />
          <div className="truncate">
            <h4 className="text-xs font-semibold text-white truncate">
              {selectedPlaylist.title}
            </h4>
            <p className="text-[10px] text-[#1DB954] font-semibold truncate flex items-center gap-1">
              {selectedPlaylist.artist}
              {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />}
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="text-[#B3B3B3] hover:text-[#1DB954] transition-colors cursor-pointer ml-1"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-[#1DB954] text-[#1DB954]" : ""}`} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1.5 max-w-md w-full">
          <div className="flex items-center gap-4 text-[#B3B3B3]">
            <button className="hover:text-white transition-colors cursor-pointer">
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-white transition-colors cursor-pointer">
              <SkipBack className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#1DB954] text-black flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button className="hover:text-white transition-colors cursor-pointer">
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
            <button className="hover:text-white transition-colors cursor-pointer">
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full flex items-center gap-2 text-[10px] text-[#B3B3B3]">
            <span>{formatTime(currentTime)}</span>
            <div
              onClick={(e) => {
                if (audioRef.current && duration) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }}
              className="flex-1 h-1 bg-[#4d4d4d] hover:bg-[#1DB954] rounded-full cursor-pointer relative overflow-hidden group"
            >
              <div
                className="h-full bg-white group-hover:bg-[#1DB954] transition-colors"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span>{formatTime(duration || 180)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-[120px] justify-end">
          <Volume2 className="w-4 h-4 text-[#B3B3B3]" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 accent-[#1DB954] h-1 bg-[#4d4d4d] rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
