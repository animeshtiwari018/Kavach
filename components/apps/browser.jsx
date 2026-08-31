"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Search,
  Star,
  Plus,
  X,
  ExternalLink,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";

// Icons for SNS & Frequently Visited
const LinkedInIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GithubIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const YouTubeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const RedditIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.687-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-4.566 3.875a.343.343 0 0 0-.243.585c.627.625 1.65.938 2.559.938.908 0 1.932-.313 2.559-.938a.343.343 0 0 0-.486-.486c-.5.5-.1.353-.7.752-1.572.752 0-1.072-.252-1.572-.752a.34.34 0 0 0-.242-.099z" />
  </svg>
);

const ChatGPTIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 19.0193 19.82a6.0462 6.0462 0 0 0-.7427-7.0988 5.98 5.98 0 0 0 4.0053-2.9001zm-10.2819 12.012a4.4285 4.4285 0 0 1-2.2238-.5986l.1105-.3331 3.6593-2.1128a.8078.8078 0 0 0 .4085-.7078V13.064l1.8344 1.059a.1442.1442 0 0 1 .0721.125v4.618a4.4429 4.4429 0 0 1-3.861 2.9671zm-8.835-5.1018a4.4237 4.4237 0 0 1-.3654-2.268l.3188.1827 3.6593 2.1128a.8078.8078 0 0 0 .817 0l4.343-2.5076v2.118a.1442.1442 0 0 1-.0721.125l-3.9977 2.308a4.4429 4.4429 0 0 1-4.7029-2.0709zm-1.0433-10.222a4.4285 4.4285 0 0 1 1.8584-1.6694l.2082.352 3.6593 2.1128a.8078.8078 0 0 0 .8085 0l4.343-2.5076-1.8344-1.059a.1442.1442 0 0 1-.0721-.125V2.1895a4.4429 4.4429 0 0 1 4.7029 2.0709 4.4285 4.4285 0 0 1 .3654 2.268l-.3188-.1827-3.6593-2.1128a.8078.8078 0 0 0-.817 0l-4.343 2.5076v-2.118a.1442.1442 0 0 1 .0721-.125l3.9977-2.308a4.4429 4.4429 0 0 1 3.861-2.9671z" />
  </svg>
);

const StackOverflowIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.133v6.404h15.009zM6.111 19.731h10.743v-2.134H6.111v2.134zm.307-5.748l10.428 2.593.518-2.069-10.427-2.593-.519 2.069zm1.758-5.385l9.467 5.097.989-1.9-9.467-5.097-.989 1.9zm3.435-4.757l7.747 7.426 1.48-1.545-7.746-7.426-1.481 1.545zm5.776-4.148l-1.922 1.002 5.54 10.638 1.923-1.002-5.541-10.638z" />
  </svg>
);

const SNS_LINKS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/animeshtiwari018",
    color: "#0A66C2",
    tileBg: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]",
    icon: LinkedInIcon,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/animeshtiwari018",
    color: "#24292e",
    tileBg: "bg-purple-900/20 hover:bg-purple-900/30 text-purple-400",
    icon: GithubIcon,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
    color: "#FF0000",
    tileBg: "bg-red-500/10 hover:bg-red-500/20 text-red-500",
    icon: YouTubeIcon,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:animeshtiwari018@gmail.com",
    color: "#0078D4",
    tileBg: "bg-blue-500/15 hover:bg-blue-500/25 text-blue-500",
    icon: Mail,
  },
];

const FREQUENTLY_VISITED = [
  {
    id: "github-freq",
    name: "GitHub",
    url: "https://github.com/animeshtiwari018",
    tileBg: "bg-purple-900/20 hover:bg-purple-900/30 text-purple-400",
    icon: GithubIcon,
  },
  {
    id: "linkedin-freq",
    name: "LinkedIn",
    url: "https://linkedin.com/in/animeshtiwari018",
    tileBg: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]",
    icon: LinkedInIcon,
  },
  {
    id: "youtube-freq",
    name: "YouTube",
    url: "https://youtube.com",
    tileBg: "bg-red-500/10 hover:bg-red-500/20 text-red-500",
    icon: YouTubeIcon,
  },
  {
    id: "reddit",
    name: "Reddit",
    url: "https://reddit.com",
    tileBg: "bg-orange-500/15 hover:bg-orange-500/25 text-orange-500",
    icon: RedditIcon,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com",
    tileBg: "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500",
    icon: ChatGPTIcon,
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    tileBg: "bg-amber-500/15 hover:bg-amber-500/25 text-amber-500",
    icon: StackOverflowIcon,
  },
];

export default function BrowserApp() {
  const [urlInput, setUrlInput] = useState("https://animeshtiwari.dev");
  const [currentUrl, setCurrentUrl] = useState("https://animeshtiwari.dev");
  const [tabs, setTabs] = useState([{ id: 1, title: "Home", url: "https://animeshtiwari.dev" }]);
  const [activeTabId, setActiveTabId] = useState(1);

  const handleNavigate = (url) => {
    setUrlInput(url);
    setCurrentUrl(url);
  };

  const handleTileClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#DCDCDC] text-slate-800 font-sans select-none overflow-hidden border-t border-gray-300">
      {/* Top Safari Chrome Navigation Bar */}
      <div className="px-3 py-2 bg-[#D1D5DB] border-b border-gray-300 flex items-center justify-between gap-3 shadow-xs">
        {/* Navigation Control Buttons */}
        <div className="flex items-center gap-1.5 text-gray-600">
          <button
            onClick={() => handleNavigate("https://animeshtiwari.dev")}
            className="p-1 rounded hover:bg-gray-300/80 text-gray-700 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded opacity-40 text-gray-500 cursor-not-allowed"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavigate(currentUrl)}
            className="p-1 rounded hover:bg-gray-300/80 text-gray-700 transition-colors cursor-pointer"
            title="Reload"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleNavigate("https://animeshtiwari.dev")}
            className="p-1 rounded hover:bg-gray-300/80 text-gray-700 transition-colors cursor-pointer"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Safari Centered Address Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNavigate(urlInput);
          }}
          className="flex-1 max-w-xl mx-auto flex items-center bg-[#E5E7EB] hover:bg-white focus-within:bg-white border border-gray-300 rounded-lg px-3 py-1 transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-gray-800 text-xs font-normal"
          />
          <Star className="w-3.5 h-3.5 text-gray-400 ml-2 cursor-pointer hover:text-amber-500" />
        </form>

        <div className="w-16" />
      </div>

      {/* Safari Tab Bar */}
      <div className="px-3 bg-[#E5E7EB] border-b border-gray-300 flex items-center gap-1 text-xs">
        <div className="px-3 py-1 bg-[#DCDCDC] border-t-2 border-slate-600 text-slate-800 font-semibold flex items-center gap-2 rounded-t shadow-xs">
          <span>Home</span>
          <X className="w-3 h-3 text-gray-500 hover:text-gray-800 cursor-pointer" />
        </div>
        <button
          onClick={() => handleNavigate("https://animeshtiwari.dev")}
          className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
          title="New Tab"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Safari Page Content Body */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#DCDCDC]">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* SNS Links Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              SNS Links
            </h2>

            <div className="flex flex-wrap items-center gap-6">
              {SNS_LINKS.map((link) => {
                const IconComp = link.icon;
                return (
                  <motion.div
                    key={link.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleTileClick(link.url)}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-all border border-gray-300/60 ${link.tileBg}`}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                      {link.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Frequently Visited Section */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Frequently Visited
            </h2>

            <div className="flex flex-wrap items-center gap-6">
              {FREQUENTLY_VISITED.map((item) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleTileClick(item.url)}
                    className="flex flex-col items-center gap-2 cursor-pointer group max-w-[70px] text-center"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-all border border-gray-300/60 ${item.tileBg}`}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 truncate w-full">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
