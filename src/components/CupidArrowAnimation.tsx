import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, X } from 'lucide-react';

interface FlyingHeart {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  emoji: string;
}

export const CupidArrowAnimation: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'aiming' | 'flying' | 'pierced' | 'burst'>('idle');
  const [flyingHearts, setFlyingHearts] = useState<FlyingHeart[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const triggerAnimation = () => {
    if (stage !== 'idle') return;

    setStage('aiming');

    // 1. Aiming: Cupid pulls golden bowstring with sparkling arrow (600ms)
    setTimeout(() => {
      setStage('flying');
    }, 600);

    // 2. Flying arrow strikes and PIERCES the heart (1300ms)
    setTimeout(() => {
      setStage('pierced');
    }, 1300);

    // 3. The pierced heart radiates light and bursts lots of floating hearts around it (2000ms)
    setTimeout(() => {
      setStage('burst');
      generateBurstHearts();
    }, 2000);

    // 4. Return to idle after message and hearts float away (8.5 seconds)
    setTimeout(() => {
      setStage('idle');
      setFlyingHearts([]);
    }, 8500);
  };

  const handleDismiss = () => {
    setStage('idle');
    setFlyingHearts([]);
  };

  const heartEmojis = ['💜', '💖', '💗', '❤️', '💘', '💕', '✨', '💓', '🥰', '😘', '💋'];
  const heartColors = [
    '#c084fc',
    '#e879f9',
    '#f43f5e',
    '#ec4899',
    '#a855f7',
    '#d8b4fe',
    '#ffffff',
    '#fb7185',
  ];

  const generateBurstHearts = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 - 30;
    const hearts: FlyingHeart[] = [];

    for (let i = 0; i < 85; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 8.5;
      hearts.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.8,
        size: 18 + Math.random() * 26,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      });
    }

    let currentHearts = hearts;
    let startTime = Date.now();

    const animateHearts = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > 6000) return;

      currentHearts = currentHearts.map((h) => ({
        ...h,
        x: h.x + h.vx,
        y: h.y + h.vy,
        vy: h.vy + 0.1, // gentle romantic gravity
        rotation: h.rotation + h.rotSpeed,
        opacity: Math.max(0, h.opacity - 0.005),
      }));

      setFlyingHearts([...currentHearts]);
      animFrameRef.current = requestAnimationFrame(animateHearts);
    };

    animFrameRef.current = requestAnimationFrame(animateHearts);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating Cupid Launcher Trigger Button on the Left */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={triggerAnimation}
          disabled={stage !== 'idle'}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_25px_rgba(236,72,153,0.6)] border border-pink-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title="Shoot Cupid's Arrow through the Heart!"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🏹</span>
          <span className="tracking-wide">Shoot Love Arrow</span>
          <span className="text-sm animate-pulse">💘</span>

          {/* Glow ping ring */}
          <span
            className="absolute -inset-1 rounded-full bg-pink-500/20 animate-ping pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
        </button>
      </div>

      {/* Full Screen Cinematic Animation Overlay */}
      {stage !== 'idle' && (
        <div
          ref={containerRef}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center transition-all duration-300 p-4 select-none cursor-pointer"
        >
          {/* Close button hint */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors z-40"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background dreamy radiant aura */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] rounded-full bg-purple-600/25 filter blur-[90px] animate-pulse" />
            <div className="w-[420px] h-[420px] rounded-full bg-pink-600/20 filter blur-[110px]" />
          </div>

          {/* Stage 1 & 2: Cupid's Golden Bow pulling back */}
          {(stage === 'aiming' || stage === 'flying') && (
            <div
              className={`absolute bottom-16 left-6 transition-all duration-500 ease-out z-30 ${
                stage === 'aiming'
                  ? 'scale-115 translate-x-2 -translate-y-2'
                  : 'scale-95 opacity-70'
              }`}
            >
              <div className="relative">
                {/* Cupid Bow SVG */}
                <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-45 drop-shadow-[0_0_20px_#f43f5e]">
                  {/* Golden Bow Arc */}
                  <path
                    d="M 25 15 Q 80 50 25 85"
                    stroke="#fbbf24"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 28 18 Q 78 50 28 82"
                    stroke="#fef08a"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Bow String (stretched when aiming) */}
                  <path
                    d={stage === 'aiming' ? 'M 25 15 L 8 50 L 25 85' : 'M 25 15 L 25 85'}
                    stroke="#e9d5ff"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>

                {/* Cupid's Arrow in Bow */}
                {stage === 'aiming' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 flex items-center">
                    <div className="w-20 h-1.5 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 shadow-[0_0_12px_#f43f5e] rounded-full" />
                    <span className="text-2xl -ml-2 filter drop-shadow-[0_0_8px_#f43f5e]">💖</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage 2: Arrow Flying with glittering star streak */}
          {stage === 'flying' && (
            <div
              className="absolute z-30 pointer-events-none"
              style={{
                animation: 'shootArrowSmooth 0.7s cubic-bezier(0.2, 0.9, 0.4, 1) forwards',
              }}
            >
              <div className="flex items-center -rotate-[35deg]">
                {/* Long sparkling light tail */}
                <div className="w-36 h-2 bg-gradient-to-r from-transparent via-pink-400 to-amber-200 shadow-[0_0_25px_#ec4899] rounded-full" />
                <span className="text-3xl filter drop-shadow-[0_0_20px_#fbbf24] -ml-2">💘</span>
              </div>
            </div>
          )}

          {/* Central Target Heart (Beautiful Glowing Crystal Heart) */}
          <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none max-w-sm w-full mx-auto">
            {/* Pierced Heart Visual */}
            <div
              className={`relative transition-all duration-700 ${
                stage === 'pierced'
                  ? 'scale-110 animate-heartbeat'
                  : stage === 'burst'
                  ? 'scale-105'
                  : 'scale-95 animate-pulse'
              }`}
            >
              {/* Outer Shockwave Ring on impact */}
              {stage === 'pierced' && (
                <div className="absolute inset-0 -m-8 rounded-full border-2 border-pink-400/80 animate-ping opacity-90" />
              )}

              {/* Radiant Heart SVG */}
              <svg
                width="160"
                height="160"
                viewBox="0 0 100 100"
                className="filter drop-shadow-[0_0_35px_rgba(236,72,153,0.9)] drop-shadow-[0_0_65px_rgba(168,85,247,0.8)] overflow-visible"
              >
                <defs>
                  <linearGradient id="magnificentHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fdf2f8" />
                    <stop offset="20%" stopColor="#f472b6" />
                    <stop offset="60%" stopColor="#e11d48" />
                    <stop offset="90%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#581c87" />
                  </linearGradient>

                  <linearGradient id="goldenShaft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>

                  <filter id="radiantGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Heart Shape */}
                <path
                  d="M 50,30 
                     C 50,18  34,14  25,24 
                     C 14,36  16,56  50,82 
                     C 84,56  86,36  75,24 
                     C 66,14  50,18  50,30 Z"
                  fill="url(#magnificentHeart)"
                  stroke="#fce7f3"
                  strokeWidth="2.5"
                  filter="url(#radiantGlow)"
                />

                {/* Heart highlights */}
                <path
                  d="M 50,34 
                     C 50,24  38,20  32,28 
                     C 25,36  26,50  50,70 
                     C 74,50  75,36  68,28 
                     C 62,20  50,24  50,34 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />

                {/* The Golden Cupid Arrow Pierced Directly Through the Heart */}
                {(stage === 'pierced' || stage === 'burst') && (
                  <g className="-rotate-[32deg] origin-[50px_50px]">
                    {/* Arrow Shaft piercing through */}
                    <line
                      x1="-25"
                      y1="50"
                      x2="125"
                      y2="50"
                      stroke="url(#goldenShaft)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      filter="url(#radiantGlow)"
                    />
                    {/* Arrow Feathers (Tail) */}
                    <path
                      d="M -25 50 L -40 38 M -25 50 L -40 62 M -18 50 L -33 38 M -18 50 L -33 62"
                      stroke="#fbcfe8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Arrow Head (Pointy Crystal Heart Piercing Tip) */}
                    <polygon
                      points="125,50 110,40 114,50 110,60"
                      fill="#fef08a"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      filter="url(#radiantGlow)"
                    />
                    {/* Piercing entry/exit wound light sparkles */}
                    <circle cx="28" cy="50" r="3.5" fill="#ffffff" />
                    <circle cx="72" cy="50" r="4" fill="#fde047" />
                  </g>
                )}
              </svg>
            </div>

            {/* The Requested Romantic Message After Piercing */}
            {(stage === 'pierced' || stage === 'burst') && (
              <div className="relative mt-5 text-center animate-fade-in px-4">
                {/* Glowing Banner Box */}
                <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#240a3d]/95 via-[#1a072d]/95 to-[#120320]/95 border-2 border-pink-400/60 shadow-[0_0_35px_rgba(244,114,182,0.6)] backdrop-blur-md">
                  <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs font-semibold mb-2 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>My Heart Belongs To You</span>
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  </div>

                  {/* Main Message */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide leading-relaxed drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]">
                    You have my heart Rahman, handle it with love.
                  </h3>

                  {/* Heart Kiss Emoji Display */}
                  <div className="flex items-center justify-center gap-2 mt-2 text-3xl animate-bounce">
                    <span>😘</span>
                    <span>❤️</span>
                    <span>🫂</span>
                    <span>✨</span>
                  </div>

                  <p className="font-script text-lg sm:text-xl text-purple-200 mt-2 tracking-wider">
                    Forever & always yours, your Karavachi 💜
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Burst Stage: Dozens of Flying Hearts Raining Across the Screen */}
          {stage === 'burst' && (
            <div className="absolute inset-0 pointer-events-none">
              {flyingHearts.map((h) => (
                <div
                  key={h.id}
                  className="absolute pointer-events-none transition-transform"
                  style={{
                    left: `${h.x}px`,
                    top: `${h.y}px`,
                    fontSize: `${h.size}px`,
                    transform: `rotate(${h.rotation}deg)`,
                    opacity: h.opacity,
                    filter: `drop-shadow(0 0 12px ${h.color})`,
                  }}
                >
                  {h.emoji}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Animation Keyframe Style */}
      <style>{`
        @keyframes shootArrowSmooth {
          0% {
            left: 8%;
            bottom: 18%;
            transform: scale(0.6) rotate(-35deg);
            opacity: 0.9;
          }
          40% {
            left: 28%;
            bottom: 34%;
            transform: scale(1.05) rotate(-35deg);
            opacity: 1;
          }
          100% {
            left: 48%;
            bottom: 48%;
            transform: scale(1.25) rotate(-35deg);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
