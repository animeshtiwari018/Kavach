"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  GitFork,
  Star,
  BookOpen,
  Users,
  MapPin,
  RefreshCw,
  Code2,
} from "lucide-react";
import { motion } from "motion/react";

const GITHUB_USERNAME = "animeshtiwari018";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function GitHubApp() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch User Profile Data
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!userRes.ok) throw new Error("Could not load GitHub profile");
      const userData = await userRes.json();
      setProfile(userData);

      // Fetch User Public Repos
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
      );
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] text-[#c9d1d9] font-sans text-xs select-none overflow-hidden border-t border-[#30363d]">
      {/* Header Bar */}
      <div className="px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GithubIcon className="w-5 h-5 text-[#f0f6fc]" />
          <span className="font-bold text-[#f0f6fc] text-xs">
            GitHub / <span className="text-[#58a6ff]">{GITHUB_USERNAME}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchGitHubData}
            title="Refresh Data"
            className="p-1.5 hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] rounded transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#58a6ff]" : ""}`} />
          </button>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-[#238636] hover:bg-[#2ea44f] text-white font-medium rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>Open on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117]">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3 py-16 text-[#8b949e]">
            <RefreshCw className="w-6 h-6 animate-spin text-[#58a6ff]" />
            <span className="text-xs font-medium">
              Fetching GitHub telemetry data...
            </span>
          </div>
        ) : error ? (
          <div className="w-full p-4 border border-red-500/30 bg-red-500/10 rounded-md text-center space-y-2">
            <span className="text-red-400 font-bold text-xs block">
              Unable to load GitHub Profile
            </span>
            <span className="text-xs text-[#8b949e]">{error}</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-[#58a6ff] hover:underline"
            >
              Visit github.com/{GITHUB_USERNAME}
            </a>
          </div>
        ) : (
          profile && (
            <>
              {/* Profile Card Header */}
              <div className="p-4 border border-[#30363d] bg-[#161b22] rounded-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={profile.avatar_url}
                  alt={profile.name || GITHUB_USERNAME}
                  className="w-16 h-16 rounded-full border border-[#30363d] object-cover"
                />
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[#f0f6fc]">
                        {profile.name || GITHUB_USERNAME}
                      </h2>
                      <span className="text-xs text-[#8b949e]">
                        {profile.login}
                      </span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 border border-[#8957e5]/50 bg-[#8957e5]/10 text-[#d2a8ff] rounded-full font-medium self-center sm:self-start">
                      Developer Profile
                    </span>
                  </div>

                  {profile.bio && (
                    <p className="text-xs text-[#c9d1d9] pt-1">
                      {profile.bio}
                    </p>
                  )}

                  {/* Stats Counter Row */}
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#8b949e]">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#8b949e]" />
                      <span className="text-[#f0f6fc] font-semibold">{profile.public_repos}</span>
                      <span>repositories</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#8b949e]" />
                      <span className="text-[#f0f6fc] font-semibold">{profile.followers}</span>
                      <span>followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#f0f6fc] font-semibold">{profile.following}</span>
                      <span>following</span>
                    </div>
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8b949e]" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Repositories Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8b949e] font-semibold px-1">
                  <span>Popular Repositories</span>
                  <span>Public</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {repos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="p-3.5 border border-[#30363d] hover:border-[#8b949e] bg-[#161b22] rounded-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#58a6ff] text-xs group-hover:underline flex items-center gap-1.5 truncate">
                            <Code2 className="w-3.5 h-3.5 text-[#8b949e]" />
                            {repo.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 border border-[#30363d] text-[#8b949e] rounded-full">
                            Public
                          </span>
                        </div>
                        {repo.description && (
                          <p className="text-xs text-[#8b949e] line-clamp-2 mt-1.5 leading-relaxed">
                            {repo.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#8b949e] pt-2 border-t border-[#21262d]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6]" />
                          <span>{repo.language || "Code"}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#e3b341]" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5 text-[#8b949e]" />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </>
          )
        )}
      </div>

      {/* Footer Bar */}
      <div className="px-4 py-2 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
        <span>github.com/<strong className="text-[#f0f6fc]">{GITHUB_USERNAME}</strong></span>
        <span className="flex items-center gap-1.5 text-xs">
          Status: <strong className="text-[#3fb950]">Online</strong>
          <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
        </span>
      </div>
    </div>
  );
}
