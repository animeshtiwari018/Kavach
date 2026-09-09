"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * KavachAssistant Component
 *
 * Uses Canvas 2D Engine to draw and animate the Kavach PNG logo (/images/kavach1.png)
 * alongside volumetric glowing aura fields, organic energy ribbons, and particles.
 *
 * States:
 *  - "idle"       : breathing scale, gentle floating, soft glow oscillation
 *  - "listening"  : audio-reactive scale and outward particle emission via Web Audio API
 *  - "thinking"   : organic flowing emerald & gold energy ribbons around stable PNG logo
 *  - "speaking"   : audio-reactive pulse distortion and wave aura
 *  - "activating" : converging particle vortex, logo scale-in transition (~800ms)
 */

export function KavachAssistant({
  state = "idle",
  audioLevel = 0,
  isActive = true,
  size = "md",
  logoSrc = "/images/vani.svg",
  onClick,
  className = "",
}) {
  const canvasRef = useRef(null);
  const logoImageRef = useRef(null);
  const [micAudioLevel, setMicAudioLevel] = useState(0);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Size mapping (in pixels)
  const sizeMap = {
    xs: 28,
    sm: 36,
    md: 64,
    lg: 110,
    xl: 160,
    dock: 48,
  };
  const sizePx = typeof size === "number" ? size : sizeMap[size] || 64;

  // Preload Kavach PNG logo image
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = logoSrc;
      img.onload = () => {
        logoImageRef.current = img;
      };
    }
  }, [logoSrc]);

  // Web Audio API microphone setup for listening state
  useEffect(() => {
    if (
      state === "listening" &&
      typeof window !== "undefined" &&
      navigator.mediaDevices
    ) {
      let isMounted = true;
      let animId;

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (!isMounted) return;
          mediaStreamRef.current = stream;

          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;

          const audioCtx = new AudioContext();
          audioContextRef.current = audioCtx;

          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateVolume = () => {
            if (!isMounted) return;
            analyser.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            const normalizedLevel = Math.min(1, Math.max(0, avg / 128));

            setMicAudioLevel(normalizedLevel);
            animId = requestAnimationFrame(updateVolume);
          };

          updateVolume();
        })
        .catch((err) => {
          console.warn("Microphone input notice:", err);
        });

      return () => {
        isMounted = false;
        if (animId) cancelAnimationFrame(animId);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (
          audioContextRef.current &&
          audioContextRef.current.state !== "closed"
        ) {
          audioContextRef.current.close();
        }
      };
    } else {
      setMicAudioLevel(0);
    }
  }, [state]);

  const effectiveAudioLevel = Math.max(audioLevel, micAudioLevel);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let startTime = performance.now();
    let activationProgress = 0;

    // Canvas particle system
    const particleCount =
      state === "listening" ? 36 : state === "thinking" ? 44 : 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * sizePx * 0.8,
      y: (Math.random() - 0.5) * sizePx * 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * (sizePx * 0.32) + sizePx * 0.12,
      orbitSpeed:
        (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.4 ? "emerald" : "gold",
    }));

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== sizePx * dpr || canvas.height !== sizePx * dpr) {
        canvas.width = sizePx * dpr;
        canvas.height = sizePx * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, sizePx, sizePx);
      const cx = sizePx / 2;
      const cy = sizePx / 2;

      // 1-3. Background animations (Aura, Ribbons, Particles) removed per request.

      // 4. Draw Animated Kavach Logo PNG directly on Canvas
      const img = logoImageRef.current;
      if (img && img.complete) {
        ctx.save();

        // Calculate state-based scale and floating y-offset
        let logoScale = 1;
        let floatY = 0;
        let alpha = 0.5;

        if (state === "idle") {
          logoScale = 1 + Math.sin(elapsed * 1.2) * 0.025; // 1 -> 1.025 -> 1
          floatY = Math.sin(elapsed * 1.5) * 2; // subtle float
        } else if (state === "listening") {
          logoScale = 1 + effectiveAudioLevel * 0.18;
        } else if (state === "thinking") {
          logoScale = 1 + Math.sin(elapsed * 2) * 0.02;
        } else if (state === "speaking") {
          logoScale = 1 + effectiveAudioLevel * 0.22;
          floatY = Math.sin(elapsed * 8) * 1.5;
        } else if (state === "activating") {
          logoScale = 0.5 + activationProgress * 0.5;
          alpha = activationProgress * 0.5;
        }

        const logoDrawSize = sizePx * 0.85 * logoScale;
        const logoX = cx - logoDrawSize / 2;
        const logoY = cy - logoDrawSize / 2 + floatY;

        ctx.globalAlpha = alpha;
        ctx.shadowColor =
          state === "thinking" || state === "speaking"
            ? "rgba(245, 158, 11, 0.8)"
            : "rgba(16, 185, 129, 0.7)";
        ctx.shadowBlur = Math.max(6, sizePx * 0.15 + effectiveAudioLevel * 15);

        ctx.drawImage(img, logoX, logoY, logoDrawSize, logoDrawSize);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [state, effectiveAudioLevel, sizePx]);

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      role="button"
      aria-label="Kavach AI Assistant"
      tabIndex={0}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      />
    </div>
  );
}

export default KavachAssistant;
