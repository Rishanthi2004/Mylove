import React, { useState, useRef } from 'react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

export const CuteDogsSection: React.FC = () => {
  const [hasAnsweredYes, setHasAnsweredYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [showHeartsBurst, setShowHeartsBurst] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Playful dodge logic for the NO button
  const dodgeNoButton = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    setNoHoverCount((prev) => prev + 1);

    // Random safe offsets that stay comfortably inside container without screen overflow
    const maxRangeX = 75;
    const maxRangeY = 40;

    // Pick a new position that doesn't overlap the original (0,0) or the YES button
    let newX = (Math.random() - 0.5) * 2 * maxRangeX;
    let newY = (Math.random() - 0.5) * 2 * maxRangeY;

    // Ensure it noticeably jumps
    if (Math.abs(newX) < 25) newX = newX < 0 ? -40 : 40;
    if (Math.abs(newY) < 15) newY = newY < 0 ? -25 : 25;

    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setHasAnsweredYes(true);
    setShowHeartsBurst(true);
    setTimeout(() => {
      setShowHeartsBurst(false);
    }, 3000);
  };

  const handleReset = () => {
    setHasAnsweredYes(false);
    setNoButtonPos({ x: 0, y: 0 });
    setNoHoverCount(0);
  };

  const teaseMessages = [
    'NO 🙈',
    'Too slow! 💨',
    'Nope! 🐾',
    'Try again! 🐶',
    'Almost! 😜',
    'Only YES! 💜',
  ];
  const currentTease = teaseMessages[noHoverCount % teaseMessages.length];

  return (
    <div className="relative mt-8 pt-5 pb-6 px-4 rounded-3xl bg-gradient-to-b from-[#140827]/90 via-[#190932]/95 to-[#0e041d] border border-purple-500/30 shadow-[0_4px_30px_rgba(168,85,247,0.18)] overflow-hidden">
      {/* Background Romantic Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/15 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 right-4 w-36 h-36 bg-pink-500/15 rounded-full filter blur-2xl pointer-events-none" />

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="absolute top-4 left-6 text-purple-300/40 text-xs animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          💜
        </span>
        <span
          className="absolute top-10 right-8 text-pink-300/50 text-sm animate-pulse"
          style={{ animationDuration: '2.5s' }}
        >
          💗
        </span>
        <span
          className="absolute bottom-6 left-10 text-purple-200/40 text-[10px] animate-bounce"
          style={{ animationDuration: '4s' }}
        >
          ✨
        </span>
        {showHeartsBurst && (
          <>
            <span className="absolute top-1/2 left-1/4 text-2xl animate-ping">💖</span>
            <span className="absolute top-1/3 right-1/4 text-2xl animate-ping" style={{ animationDelay: '0.2s' }}>💜</span>
            <span className="absolute top-2/3 left-1/3 text-xl animate-ping" style={{ animationDelay: '0.4s' }}>🐶</span>
            <span className="absolute top-1/4 left-1/2 text-2xl animate-bounce">🥰</span>
          </>
        )}
      </div>

      {/* Section Header */}
      <div className="text-center relative z-10 mb-2">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[11px] font-medium backdrop-blur-sm mb-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Puppy Love</span>
          <span className="text-xs">🐾</span>
        </div>
      </div>

      {/* Animated Cartoon Puppies Stage */}
      <div className="relative z-10 flex items-center justify-center py-2 h-[155px]">
        {/* Big Heart Appearing When YES is Clicked */}
        {hasAnsweredYes && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 animate-bounce">
            <div className="relative">
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500 filter drop-shadow-[0_0_12px_rgba(244,114,182,0.9)]" />
              <Heart className="w-5 h-5 text-purple-300 fill-purple-300 absolute -top-1 -right-2 animate-pulse" />
            </div>
            <span className="text-[10px] font-script text-pink-200 tracking-wider text-center mt-0.5">
              Forever!
            </span>
          </div>
        )}

        <div className="flex items-end justify-center gap-1 sm:gap-2">
          {/* BOY PUPPY (Left - represents Him) */}
          <div
            className={`transition-all duration-700 ease-out flex flex-col items-center ${
              hasAnsweredYes
                ? 'translate-x-4 rotate-3 scale-105'
                : 'hover:scale-105'
            }`}
          >
            <svg
              width="105"
              height="115"
              viewBox="0 0 100 110"
              className="overflow-visible"
            >
              <defs>
                <filter id="pupShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Tail Wagging Animation */}
              <g
                className="origin-[25px_80px]"
                style={{
                  animation: hasAnsweredYes
                    ? 'tailWagFast 0.35s ease-in-out infinite alternate'
                    : 'tailWagSlow 1.2s ease-in-out infinite alternate',
                }}
              >
                <path
                  d="M 25 80 Q 8 68 12 55"
                  stroke="#c28b58"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="12" cy="55" r="4.5" fill="#f5d0a9" />
              </g>

              {/* Body */}
              <ellipse cx="50" cy="80" rx="26" ry="24" fill="#d99b66" />
              {/* Chest patch */}
              <ellipse cx="50" cy="82" rx="15" ry="17" fill="#fae4cf" />

              {/* Purple Bandana with tiny gold star */}
              <path
                d="M 33 65 Q 50 78 67 65 Q 50 82 33 65 Z"
                fill="#7e22ce"
                stroke="#a855f7"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="73" r="2.5" fill="#fde047" />

              {/* Head */}
              <circle cx="50" cy="45" r="24" fill="#d99b66" filter="url(#pupShadow)" />

              {/* Left Floppy Ear */}
              <path
                d="M 32 30 C 18 30 18 55 28 60 C 35 60 36 40 32 30 Z"
                fill="#a36e40"
              />
              {/* Right Floppy Ear */}
              <path
                d="M 68 30 C 82 30 82 55 72 60 C 65 60 64 40 68 30 Z"
                fill="#a36e40"
              />

              {/* Face Snout */}
              <ellipse cx="50" cy="50" rx="13" ry="10" fill="#fae4cf" />
              {/* Nose */}
              <ellipse cx="50" cy="46" rx="4.5" ry="3.5" fill="#2d1810" />

              {/* Eyes */}
              {hasAnsweredYes ? (
                // Happy closed curved eyes (^ ^)
                <g stroke="#2d1810" strokeWidth="2.5" strokeLinecap="round" fill="none">
                  <path d="M 40 40 Q 43 35 46 40" />
                  <path d="M 54 40 Q 57 35 60 40" />
                </g>
              ) : (
                // Big puppy eyes with shine
                <g>
                  <circle cx="43" cy="38" r="4.5" fill="#2d1810" />
                  <circle cx="41.5" cy="36.5" r="1.8" fill="#ffffff" />
                  <circle cx="57" cy="38" r="4.5" fill="#2d1810" />
                  <circle cx="55.5" cy="36.5" r="1.8" fill="#ffffff" />
                </g>
              )}

              {/* Mouth */}
              <path
                d="M 46 51 Q 50 54 54 51"
                stroke="#2d1810"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Pink tongue when smiling */}
              {hasAnsweredYes && (
                <path
                  d="M 48 53 Q 50 58 52 53 Z"
                  fill="#f472b6"
                />
              )}

              {/* Cheerful Blush */}
              <circle cx="35" cy="49" r="4" fill="#f472b6" opacity="0.65" />
              <circle cx="65" cy="49" r="4" fill="#f472b6" opacity="0.65" />

              {/* Front Paws */}
              <ellipse cx="40" cy="100" rx="7" ry="5" fill="#fae4cf" stroke="#d99b66" strokeWidth="1" />
              <ellipse cx="60" cy="100" rx="7" ry="5" fill="#fae4cf" stroke="#d99b66" strokeWidth="1" />
            </svg>
            <span className="text-[11px] font-semibold text-purple-300 font-sans mt-0.5 flex items-center gap-0.5">
              <span>Him</span>
              <span className="text-[10px]">💜</span>
            </span>
          </div>

          {/* Little Floating Center Sparkles */}
          <div className="flex flex-col items-center justify-center pb-8 px-0.5">
            <span className="text-purple-300 text-xs animate-pulse">✦</span>
          </div>

          {/* GIRL PUPPY (Right - represents Her) */}
          <div
            className={`transition-all duration-700 ease-out flex flex-col items-center ${
              hasAnsweredYes
                ? '-translate-x-4 -rotate-3 scale-105'
                : 'hover:scale-105'
            }`}
          >
            <svg
              width="105"
              height="115"
              viewBox="0 0 100 110"
              className="overflow-visible"
            >
              <defs>
                <filter id="pupShadow2" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Tail Wagging Animation */}
              <g
                className="origin-[75px_80px]"
                style={{
                  animation: hasAnsweredYes
                    ? 'tailWagFast 0.35s ease-in-out infinite alternate 0.1s'
                    : 'tailWagSlow 1.2s ease-in-out infinite alternate 0.2s',
                }}
              >
                <path
                  d="M 75 80 Q 92 68 88 55"
                  stroke="#fcdcc3"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="88" cy="55" r="4.5" fill="#fff" />
              </g>

              {/* Body */}
              <ellipse cx="50" cy="80" rx="25" ry="23" fill="#faece1" />
              {/* Chest patch */}
              <ellipse cx="50" cy="82" rx="14" ry="16" fill="#ffffff" />

              {/* Pink Collar with Heart Charm */}
              <path
                d="M 34 65 Q 50 72 66 65"
                stroke="#ec4899"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="70" r="3" fill="#f472b6" />

              {/* Head */}
              <circle cx="50" cy="45" r="23" fill="#faece1" filter="url(#pupShadow2)" />

              {/* Left Floppy Ear */}
              <path
                d="M 33 30 C 20 30 19 55 29 60 C 36 60 37 40 33 30 Z"
                fill="#f7dac5"
              />
              {/* Right Floppy Ear */}
              <path
                d="M 67 30 C 80 30 81 55 71 60 C 64 60 63 40 67 30 Z"
                fill="#f7dac5"
              />

              {/* Cute Pink Blossom Flower behind left ear */}
              <g transform="translate(25, 23)">
                <circle cx="0" cy="0" r="4" fill="#f472b6" />
                <circle cx="-3" cy="-3" r="3" fill="#fbcfe8" />
                <circle cx="3" cy="-3" r="3" fill="#fbcfe8" />
                <circle cx="-3" cy="3" r="3" fill="#fbcfe8" />
                <circle cx="3" cy="3" r="3" fill="#fbcfe8" />
                <circle cx="0" cy="0" r="2" fill="#fef08a" />
              </g>

              {/* Face Snout */}
              <ellipse cx="50" cy="50" rx="12" ry="9" fill="#ffffff" />
              {/* Nose */}
              <ellipse cx="50" cy="46" rx="4" ry="3" fill="#831843" />

              {/* Eyes */}
              {hasAnsweredYes ? (
                // Happy closed curved eyes (^ ^) with eyelashes
                <g stroke="#4a1525" strokeWidth="2.2" strokeLinecap="round" fill="none">
                  <path d="M 40 40 Q 43 35 46 40" />
                  <path d="M 54 40 Q 57 35 60 40" />
                  <line x1="39" y1="38" x2="36" y2="36" />
                  <line x1="61" y1="38" x2="64" y2="36" />
                </g>
              ) : (
                // Big sparkly eyes with eyelashes
                <g>
                  <circle cx="43" cy="38" r="4.2" fill="#2d1810" />
                  <circle cx="41.5" cy="36.5" r="1.8" fill="#ffffff" />
                  <circle cx="44.2" cy="39.2" r="0.9" fill="#ffffff" />
                  {/* Eyelash */}
                  <line x1="46" y1="34" x2="48" y2="32" stroke="#2d1810" strokeWidth="1.2" strokeLinecap="round" />

                  <circle cx="57" cy="38" r="4.2" fill="#2d1810" />
                  <circle cx="55.5" cy="36.5" r="1.8" fill="#ffffff" />
                  <circle cx="58.2" cy="39.2" r="0.9" fill="#ffffff" />
                  {/* Eyelash */}
                  <line x1="60" y1="34" x2="62" y2="32" stroke="#2d1810" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              )}

              {/* Mouth */}
              <path
                d="M 46 51 Q 50 54 54 51"
                stroke="#4a1525"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Pink tongue */}
              {hasAnsweredYes && (
                <path
                  d="M 48 53 Q 50 58 52 53 Z"
                  fill="#f472b6"
                />
              )}

              {/* Rosy Pink Blush Cheeks */}
              <circle cx="34" cy="49" r="4.5" fill="#f472b6" opacity="0.8" />
              <circle cx="66" cy="49" r="4.5" fill="#f472b6" opacity="0.8" />

              {/* Front Paws */}
              <ellipse cx="41" cy="100" rx="6.5" ry="5" fill="#ffffff" stroke="#faece1" strokeWidth="1" />
              <ellipse cx="59" cy="100" rx="6.5" ry="5" fill="#ffffff" stroke="#faece1" strokeWidth="1" />
            </svg>
            <span className="text-[11px] font-semibold text-pink-300 font-sans mt-0.5 flex items-center gap-0.5">
              <span>Her</span>
              <span className="text-[10px]">🌸</span>
            </span>
          </div>
        </div>
      </div>

      {/* The Romantic Question or Success Message */}
      <div className="text-center relative z-10 my-3">
        {hasAnsweredYes ? (
          <div className="animate-fade-in py-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(216,180,254,0.9)]">
              Yay! I knew it! 💜🐶
            </h3>
            <p className="text-xs text-purple-300/80 font-sans mt-1">
              You're my forever favourite person in the whole universe ✨
            </p>
          </div>
        ) : (
          <div className="py-1">
            <h3 className="font-display text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(233,213,255,0.7)] flex items-center justify-center gap-2">
              <span>Do you love me?</span>
              <span className="inline-block animate-pulse">🥺💗</span>
            </h3>
            <p className="text-[11px] text-purple-400/70 font-sans mt-0.5">
              Choose carefully, darling...
            </p>
          </div>
        )}
      </div>

      {/* Interactive Buttons Container */}
      <div
        ref={containerRef}
        className="relative z-10 flex items-center justify-center min-h-[70px] mt-2"
      >
        {hasAnsweredYes ? (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-purple-300/80 hover:text-purple-100 py-2 px-4 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask me again 🐾</span>
            </button>
          </div>
        ) : (
          <div className="relative flex items-center justify-center gap-4 w-full max-w-xs mx-auto">
            {/* YES 💜 BUTTON - Always stable, visible, glowing, and easy to tap */}
            <button
              onClick={handleYesClick}
              className="relative z-10 min-h-[46px] min-w-[120px] px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(216,180,254,0.8)] animate-pulse active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>YES</span>
              <span>💜</span>
            </button>

            {/* NO 🙈 BUTTON - Moves playfully whenever cursor or touch comes close */}
            <div
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="relative inline-block"
            >
              <button
                type="button"
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onPointerDown={dodgeNoButton}
                onClick={dodgeNoButton}
                className="min-h-[46px] min-w-[100px] px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-purple-200/90 font-medium text-sm shadow-md active:scale-95 select-none whitespace-nowrap cursor-pointer touch-none transition-colors hover:border-pink-500/50"
              >
                {currentTease}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes tailWagSlow {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(18deg); }
        }
        @keyframes tailWagFast {
          0% { transform: rotate(-25deg); }
          100% { transform: rotate(28deg); }
        }
      `}</style>
    </div>
  );
};
