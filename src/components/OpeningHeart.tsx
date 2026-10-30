import React, { useState, useEffect, useRef } from 'react';
import { romanticAudio } from '../utils/audio';

interface OpeningHeartProps {
  onOpen: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
}

export const OpeningHeart: React.FC<OpeningHeartProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const colors = [
    '#E9D5FF', // lavender light
    '#C084FC', // lavender glow
    '#A855F7', // bright neon purple
    '#9333EA', // deep purple
    '#F472B6', // romantic pink
    '#FFFFFF', // pure sparkle
  ];

  // Particle explosion on touch
  const triggerBurst = (centerX: number, centerY: number) => {
    const count = 90;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8.5;
      newParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }

    particlesRef.current = newParticles;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particlesRef.current) {
        if (p.alpha <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // subtle gravity
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;

        // Draw diamond/heart sparkle
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.7, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.7, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      if (alive) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio init & play
    try {
      romanticAudio.play();
    } catch {
      // Audio autoplay policy fallback
    }

    // Get touch or click coordinates
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    triggerBurst(clientX, clientY);

    // Transition smoothly after glowing expansion
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div
      onClick={handleTouch}
      onTouchStart={handleTouch}
      className={`fixed inset-0 z-50 w-full h-[100dvh] bg-black flex flex-col items-center justify-center cursor-pointer transition-opacity duration-1000 select-none overflow-hidden touch-manipulation ${
        isOpening ? 'opacity-95' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#000000',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
      />

      {/* Background Soft Aura Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[260px] h-[260px] rounded-full bg-purple-600/15 filter blur-3xl transition-transform duration-700 ${
            isOpening ? 'scale-[2.8] opacity-60 bg-purple-500/30' : 'animate-aura-1'
          }`}
        />
        <div
          className={`absolute w-[340px] h-[340px] rounded-full bg-fuchsia-600/10 filter blur-3xl transition-transform duration-700 ${
            isOpening ? 'scale-[3.2] opacity-80' : 'animate-aura-2'
          }`}
        />
      </div>

      {/* Screen Container */}
      <div className="relative z-20 flex flex-col items-center justify-between h-[72dvh] max-w-sm px-6 py-4">
        {/* Top Text: "Hi Darling 💜" */}
        <div
          className={`transition-all duration-700 text-center ${
            isOpening ? 'opacity-0 -translate-y-6 scale-95' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-script text-4xl sm:text-5xl text-purple-200 tracking-wide animate-text-glow drop-shadow-[0_0_15px_rgba(216,180,254,0.8)]">
            Hi Darling
            <span className="inline-block ml-2 text-3xl filter drop-shadow-[0_0_10px_#a855f7]">💜</span>
          </p>
        </div>

        {/* Center: Glowing Heartbeat */}
        <div className="relative flex items-center justify-center my-auto">
          {/* Intense Glow Halo */}
          <div
            className={`absolute w-36 h-36 rounded-full bg-purple-500/25 filter blur-2xl transition-all duration-700 ${
              isOpening ? 'scale-[2.5] bg-purple-400/60 opacity-100' : 'opacity-70'
            }`}
          />

          {/* SVG Heart */}
          <div
            className={`relative transition-all duration-700 ease-out transform ${
              isOpening
                ? 'scale-[1.85] filter drop-shadow-[0_0_40px_rgba(233,213,255,1)] drop-shadow-[0_0_80px_rgba(168,85,247,0.95)]'
                : 'animate-heartbeat hover:scale-105 active:scale-95'
            }`}
          >
            <svg
              width="150"
              height="150"
              viewBox="0 0 100 100"
              className="overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Vivid Neon Purple Gradient */}
                <linearGradient id="neonHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3e8ff" />
                  <stop offset="30%" stopColor="#d8b4fe" />
                  <stop offset="65%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>

                {/* Inner Highlight Gradient */}
                <linearGradient id="innerGlowGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f3e8ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>

                {/* Neon Drop Shadow Filter */}
                <filter id="neonPurpleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer soft aura stroke */}
              <path
                d="M 50,30 
                   C 50,18  34,14  25,24 
                   C 14,36  16,56  50,82 
                   C 84,56  86,36  75,24 
                   C 66,14  50,18  50,30 Z"
                fill="none"
                stroke="#d8b4fe"
                strokeWidth="6"
                strokeOpacity="0.4"
                filter="url(#neonPurpleGlow)"
              />

              {/* Main Heart Fill */}
              <path
                d="M 50,30 
                   C 50,18  34,14  25,24 
                   C 14,36  16,56  50,82 
                   C 84,56  86,36  75,24 
                   C 66,14  50,18  50,30 Z"
                fill="url(#neonHeartGrad)"
                stroke="#e9d5ff"
                strokeWidth="1.2"
                filter="url(#neonPurpleGlow)"
              />

              {/* Inner luminous highlight crest */}
              <path
                d="M 50,34 
                   C 50,23  37,20  30,28 
                   C 22,37  24,52  50,72 
                   C 76,52  78,37  70,28 
                   C 63,20  50,23  50,34 Z"
                fill="url(#innerGlowGrad)"
              />

              {/* Center radiant star sparkle */}
              <circle cx="50" cy="46" r="3" fill="#ffffff" opacity="0.9" filter="url(#neonPurpleGlow)" />
            </svg>
          </div>
        </div>

        {/* Bottom Text: "Touch to Open ✨" */}
        <div
          className={`transition-all duration-700 text-center ${
            isOpening ? 'opacity-0 translate-y-6 scale-95' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-display italic text-lg sm:text-xl text-purple-200 tracking-wider animate-text-glow">
            Touch to Open ✨
          </p>
          <p className="text-[11px] text-purple-400/60 mt-1 uppercase tracking-widest font-sans">
            A journey made for you
          </p>
        </div>
      </div>
    </div>
  );
};
