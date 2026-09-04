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
  logoSrc = "/images/kavach1.png",
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
    if (state === "listening" && typeof window !== "undefined" && navigator.mediaDevices) {
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
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
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
    const particleCount = state === "listening" ? 36 : state === "thinking" ? 44 : 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * sizePx * 0.8,
      y: (Math.random() - 0.5) * sizePx * 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * (sizePx * 0.32) + sizePx * 0.12,
      orbitSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
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

      // 1. Draw Volumetric Gradient Aura Background
      const auraRadius = sizePx * 0.45 + (state === "listening" ? effectiveAudioLevel * sizePx * 0.15 : 0);
      const auraGradient = ctx.createRadialGradient(cx, cy, sizePx * 0.05, cx, cy, Math.max(1, auraRadius));

      if (state === "thinking") {
        auraGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        auraGradient.addColorStop(0.35, "rgba(16, 185, 129, 0.35)");
        auraGradient.addColorStop(0.7, "rgba(217, 119, 6, 0.25)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state === "listening" || state === "speaking") {
        const pulseAlpha = 0.3 + effectiveAudioLevel * 0.45;
        auraGradient.addColorStop(0, `rgba(255, 255, 255, ${pulseAlpha})`);
        auraGradient.addColorStop(0.4, `rgba(16, 185, 129, ${pulseAlpha * 0.8})`);
        auraGradient.addColorStop(0.75, `rgba(245, 158, 11, ${pulseAlpha * 0.4})`);
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        // Idle state breathing aura
        const breathe = Math.sin(elapsed * 1.2) * 0.05 + 0.25;
        auraGradient.addColorStop(0, "rgba(255, 255, 255, 0.35)");
        auraGradient.addColorStop(0.45, `rgba(142, 155, 114, ${breathe})`);
        auraGradient.addColorStop(0.8, `rgba(16, 185, 129, ${breathe * 0.5})`);
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Organic Energy Ribbons (Thinking & Speaking)
      if (state === "thinking" || state === "speaking") {
        const ribbonCount = state === "thinking" ? 3 : 2;
        ctx.save();
        ctx.lineWidth = Math.max(1, sizePx * 0.02);

        for (let r = 0; r < ribbonCount; r++) {
          const speed = (r % 2 === 0 ? 1 : -1) * (0.8 + r * 0.3);
          const offsetAngle = elapsed * speed;
          const radiusX = sizePx * (0.34 + r * 0.04);
          const radiusY = sizePx * (0.26 + r * 0.03);

          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.1) {
            const wave = Math.sin(a * 4 + elapsed * 3) * (sizePx * 0.015);
            const px = cx + Math.cos(a + offsetAngle) * (radiusX + wave);
            const py = cy + Math.sin(a + offsetAngle) * (radiusY + wave);

            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const ribbonGrad = ctx.createLinearGradient(0, 0, sizePx, sizePx);
          if (r % 2 === 0) {
            ribbonGrad.addColorStop(0, "rgba(16, 185, 129, 0.7)");
            ribbonGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.8)");
            ribbonGrad.addColorStop(1, "rgba(16, 185, 129, 0.1)");
          } else {
            ribbonGrad.addColorStop(0, "rgba(245, 158, 11, 0.7)");
            ribbonGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
            ribbonGrad.addColorStop(1, "rgba(16, 185, 129, 0.1)");
          }

          ctx.strokeStyle = ribbonGrad;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Draw Particles
      if (state === "activating") {
        activationProgress = Math.min(1, activationProgress + 0.025);
      } else {
        activationProgress = 0;
      }

      particles.forEach((p) => {
        if (state === "activating") {
          const targetDist = p.orbitRadius * (1 - activationProgress);
          p.x = Math.cos(p.orbitAngle) * targetDist;
          p.y = Math.sin(p.orbitAngle) * targetDist;
        } else if (state === "thinking") {
          p.orbitAngle += p.orbitSpeed;
          p.x = Math.cos(p.orbitAngle) * p.orbitRadius;
          p.y = Math.sin(p.orbitAngle) * (p.orbitRadius * 0.75);
        } else if (state === "listening") {
          const speed = 0.4 + effectiveAudioLevel * 1.4;
          p.x += Math.cos(p.orbitAngle) * speed;
          p.y += Math.sin(p.orbitAngle) * speed;
          if (Math.hypot(p.x, p.y) > sizePx * 0.45) {
            p.x = (Math.random() - 0.5) * (sizePx * 0.1);
            p.y = (Math.random() - 0.5) * (sizePx * 0.1);
            p.orbitAngle = Math.random() * Math.PI * 2;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (Math.hypot(p.x, p.y) > sizePx * 0.4) {
            p.x = -p.x * 0.8;
            p.y = -p.y * 0.8;
          }
        }

        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color === "gold" ? `rgba(245, 158, 11, ${p.alpha})` : `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();
      });

      // 4. Draw Animated Kavach Logo PNG directly on Canvas
      const img = logoImageRef.current;
      if (img && img.complete) {
        ctx.save();

        // Calculate state-based scale and floating y-offset
        let logoScale = 1;
        let floatY = 0;
        let alpha = 1;

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
          alpha = activationProgress;
        }

        const logoDrawSize = sizePx * 0.58 * logoScale;
        const logoX = cx - logoDrawSize / 2;
        const logoY = cy - logoDrawSize / 2 + floatY;

        ctx.globalAlpha = alpha;
        ctx.shadowColor = state === "thinking" || state === "speaking" ? "rgba(245, 158, 11, 0.8)" : "rgba(16, 185, 129, 0.7)";
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
