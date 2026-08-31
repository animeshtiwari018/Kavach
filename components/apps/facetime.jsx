"use client";

import { useState, useEffect, useRef } from "react";
import { Video, VideoOff, Mic, MicOff, PhoneOff, User, Search, RefreshCw } from "lucide-react";

export default function FaceTimeApp() {
  const [permissionStatus, setPermissionStatus] = useState("idle"); // idle, requesting, granted, denied
  const [stream, setStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeCall, setActiveCall] = useState(null); // null or contact object
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const isMountedRef = useRef(true);
  const activeRequestRef = useRef(0);

  const contacts = [
    { id: 1, name: "Animesh Tiwari", role: "Workstation Owner", status: "Available" },
    { id: 2, name: "Operator 2 - Sec Node", role: "Remote Gateway", status: "Offline" },
    { id: 3, name: "Security Control Core", role: "System Host", status: "Available" },
    { id: 4, name: "Quantum Crypt Vault", role: "Security Module", status: "Encrypted" },
  ];

  // Request camera and microphone access
  const startCamera = async () => {
    const requestId = ++activeRequestRef.current;
    setPermissionStatus("requesting");
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // If a newer request has started, or if the component has unmounted, stop this stream immediately
      if (requestId !== activeRequestRef.current || !isMountedRef.current) {
        mediaStream.getTracks().forEach((track) => track.stop());
        return;
      }

      setStream(mediaStream);
      streamRef.current = mediaStream;
      setPermissionStatus("granted");
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      if (requestId === activeRequestRef.current && isMountedRef.current) {
        console.error("Camera access error:", err);
        setPermissionStatus("denied");
      }
    }
  };

  // Start camera feed on component mount
  useEffect(() => {
    isMountedRef.current = true;
    startCamera();

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, []);

  // Sync stream tracks when toggling video/audio
  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = videoEnabled;
      });
    }
  }, [videoEnabled, stream]);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = audioEnabled;
      });
    }
  }, [audioEnabled, stream]);

  // Handle call button click
  const handleCall = (contact) => {
    if (contact.status === "Offline") return;
    setActiveCall(contact);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex bg-[#070906] text-[#D4D5C8] font-mono text-[11px] overflow-hidden select-none">
      {/* FaceTime Sidebar */}
      <div className="w-48 border-r border-[#24291F] flex flex-col bg-[#0A0C09] h-full">
        {/* Search Input */}
        <div className="p-2 border-b border-[#24291F] flex items-center gap-1.5 bg-[#121610]">
          <Search className="w-3.5 h-3.5 text-[#5E6255]" />
          <input
            type="text"
            placeholder="Search operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-[10px] placeholder:text-[#5E6255]"
          />
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-1 space-y-1">
          <div className="text-[9px] text-[#5E6255] font-bold p-1 select-none">SYSTEM CONTACTS</div>
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleCall(contact)}
              className={`p-2 rounded cursor-pointer transition-colors border ${
                activeCall?.id === contact.id
                  ? "bg-[#121610] border-[#8E9B72] text-[#8E9B72]"
                  : "border-transparent hover:bg-[#121610] hover:border-[#24291F]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white block truncate">{contact.name}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    contact.status === "Available"
                      ? "bg-green-500 animate-pulse"
                      : contact.status === "Encrypted"
                      ? "bg-blue-400"
                      : "bg-[#3A4034]"
                  }`}
                />
              </div>
              <span className="text-[9px] text-[#73786B] block truncate">{contact.role}</span>
            </div>
          ))}
        </div>

        {/* Local user control strip */}
        <div className="p-2 border-t border-[#24291F] bg-[#121610] flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white font-bold truncate max-w-[80px]">LOCAL OP</span>
          </div>
          {permissionStatus === "denied" && (
            <button
              onClick={startCamera}
              className="text-[#8E9B72] hover:text-white flex items-center gap-1 cursor-pointer"
              title="Retry access"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* FaceTime Video Stream Canvas */}
      <div className="flex-1 relative flex flex-col items-center justify-center bg-black/90 p-4">
        {permissionStatus === "requesting" && (
          <div className="text-center space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-[#8E9B72] border-t-transparent rounded-full mx-auto" />
            <span className="text-[#8E9B72] font-bold block">INITIATING CAMERA PROTOCOL...</span>
          </div>
        )}

        {permissionStatus === "denied" && (
          <div className="text-center max-w-xs space-y-3 p-4 border border-red-900/50 bg-red-950/20 rounded">
            <span className="text-red-400 font-bold block text-xs">CAMERA SECURITY EXCLUSION</span>
            <p className="text-[10px] text-[#73786B] leading-relaxed">
              Workstation media stream blocked. Please permit camera and microphone access in your browser settings to interface FaceTime.
            </p>
            <button
              onClick={startCamera}
              className="px-3 py-1 bg-red-900/40 hover:bg-red-800/60 text-white rounded font-bold transition-colors cursor-pointer border border-red-700/50"
            >
              REQUEST PROTOCOL ACCESS
            </button>
          </div>
        )}

        {permissionStatus === "granted" && (
          <div className="w-full h-full relative flex items-center justify-center rounded overflow-hidden border border-[#24291F] bg-black">
            {/* The main video container */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />

            {/* Calling Overlay */}
            {activeCall && (
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center animate-fade-in backdrop-blur-sm">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#121610] border-2 border-[#8E9B72] flex items-center justify-center">
                    <User className="w-8 h-8 text-[#8E9B72]" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">{activeCall.name}</h4>
                <span className="text-[9px] text-[#73786B] uppercase mb-6">SECURE CHANNEL INITIATED...</span>

                {/* Local PiP Video box in corner of call */}
                <div className="absolute bottom-20 right-4 w-28 h-20 rounded border border-[#24291F] overflow-hidden bg-black shadow-lg">
                  <video
                    src=""
                    ref={(el) => {
                      if (el && stream) el.srcObject = stream;
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                </div>
              </div>
            )}

            {/* Overlay Glassmorphic FaceTime Controls HUD */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-[#121610]/80 border border-[#24291F] backdrop-blur px-4 py-2 rounded-full shadow-2xl z-20">
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors border ${
                  videoEnabled
                    ? "bg-[#24291F] border-[#3A4034] text-white hover:bg-[#3A4034]"
                    : "bg-red-950/60 border-red-800/50 text-red-400 hover:bg-red-900/60"
                }`}
                title={videoEnabled ? "Mute Video" : "Unmute Video"}
              >
                {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors border ${
                  audioEnabled
                    ? "bg-[#24291F] border-[#3A4034] text-white hover:bg-[#3A4034]"
                    : "bg-red-950/60 border-red-800/50 text-red-400 hover:bg-red-900/60"
                }`}
                title={audioEnabled ? "Mute Microphone" : "Unmute Microphone"}
              >
                {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {activeCall && (
                <button
                  onClick={handleEndCall}
                  className="w-8 h-8 rounded-full bg-red-600 border border-red-500 text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
                  title="Disconnect Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
