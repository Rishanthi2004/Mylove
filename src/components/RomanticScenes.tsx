import React from 'react';

// College Bus Romantic Scene
export const CollegeBusScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#1b0a2a] via-[#2a133d] to-[#0d0417] flex items-center justify-center border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
      {/* Golden hour sunset window rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(251,191,36,0.25)_0%,rgba(216,180,254,0.15)_40%,transparent_70%)]" />

      {/* Floating dust and subtle hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 left-1/6 text-purple-300/40 text-xs animate-float-slow" style={{ animationDelay: '0s' }}>💜</span>
        <span className="absolute top-1/3 right-1/4 text-pink-300/30 text-xs animate-float-slow" style={{ animationDelay: '2.5s' }}>✨</span>
        <span className="absolute bottom-1/3 left-1/3 text-purple-200/50 text-[10px] animate-float-slow" style={{ animationDelay: '4s' }}>💜</span>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] object-cover" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="45%" stopColor="#831843" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="busBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="50%" stopColor="#2e1065" />
            <stop offset="100%" stopColor="#0f0728" />
          </linearGradient>

          <linearGradient id="busGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#fbcfe8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.15" />
          </linearGradient>

          <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Scenic window background (sunset landscape through bus window) */}
        <rect x="35" y="30" width="330" height="175" rx="16" fill="url(#sunsetSky)" />
        {/* Rolling hills outside */}
        <path d="M 35 170 Q 120 130 200 155 T 365 160 L 365 205 L 35 205 Z" fill="#3b0764" opacity="0.6" />
        <path d="M 35 185 Q 160 150 260 170 T 365 175 L 365 205 L 35 205 Z" fill="#1e1035" opacity="0.8" />

        {/* Distant trees silhouettes */}
        <circle cx="110" cy="140" r="14" fill="#2e1065" opacity="0.7" />
        <circle cx="130" cy="145" r="11" fill="#2e1065" opacity="0.7" />
        <circle cx="280" cy="155" r="16" fill="#2e1065" opacity="0.7" />

        {/* Golden sun setting */}
        <circle cx="300" cy="90" r="28" fill="#fef08a" opacity="0.85" filter="url(#purpleGlow)" />
        <circle cx="300" cy="90" r="42" fill="#fde047" opacity="0.25" />

        {/* Bus window frame & pillars */}
        <rect x="25" y="20" width="350" height="195" rx="20" fill="none" stroke="#581c87" strokeWidth="8" />
        <rect x="195" y="20" width="10" height="195" fill="#3b0764" />
        <rect x="25" y="195" width="350" height="18" fill="#1e1b4b" opacity="0.9" />

        {/* Glass reflection streaks */}
        <polygon points="60,30 110,30 45,190 25,190" fill="url(#busGlass)" />
        <polygon points="220,30 270,30 190,190 170,190" fill="url(#busGlass)" />

        {/* Bus interior seats in front of window */}
        {/* Seat 1 (couple's seat silhouette) */}
        <path d="M 80 230 C 80 180, 110 170, 150 170 L 165 170 C 175 170, 185 180, 185 210 L 185 280 L 70 280 Z" fill="#2e1065" />
        <rect x="75" y="235" width="115" height="40" rx="8" fill="#3b0764" />
        {/* Headrest */}
        <rect x="95" y="160" width="70" height="24" rx="12" fill="#581c87" />

        {/* Adjacent seat */}
        <path d="M 230 230 C 230 180, 260 170, 300 170 L 315 170 C 325 170, 335 180, 335 210 L 335 280 L 220 280 Z" fill="#1f0a38" />
        <rect x="245" y="160" width="70" height="24" rx="12" fill="#3b0764" />

        {/* Heart engraved on the bus window frame */}
        <path
          d="M 200 115 C 200 105, 185 105, 185 118 C 185 130, 200 142, 200 142 C 200 142, 215 130, 215 118 C 215 105, 200 105, 200 115 Z"
          fill="#c084fc"
          opacity="0.9"
          filter="url(#purpleGlow)"
        />

        {/* Warm light wash on bottom */}
        <rect x="0" y="250" width="400" height="50" fill="url(#busBody)" />
      </svg>
    </div>
  );
};

// Our Favourite Park Romantic Scene
export const ParkScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#091811] via-[#12231c] to-[#090b14] flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.12)]">
      {/* Golden twilight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,180,254,0.18)_0%,rgba(16,185,129,0.12)_45%,transparent_75%)]" />

      {/* Floating fireflies/stars */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7] animate-ping" style={{ animationDuration: '3s' }} />
        <span className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_10px_#c084fc] animate-pulse" />
        <span className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde047] animate-ping" style={{ animationDuration: '4s' }} />
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] object-cover" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1035" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="parkPath" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="400" height="300" fill="url(#twilightSky)" />

        {/* Distant trees & silhouettes */}
        <path d="M 0 160 Q 90 120 180 145 T 400 130 L 400 300 L 0 300 Z" fill="#062e24" />

        {/* Romantic winding walking path */}
        <path d="M 185 140 Q 200 180 150 220 T 210 300 L 260 300 Q 210 230 225 180 T 205 140 Z" fill="#134e4a" opacity="0.6" />
        <path d="M 195 140 Q 205 180 165 220 T 225 300 L 245 300 Q 195 230 215 180 T 200 140 Z" fill="#2dd4bf" opacity="0.25" />

        {/* Bench under tree */}
        <rect x="235" y="195" width="42" height="6" rx="3" fill="#a855f7" filter="url(#softGlow)" />
        <rect x="238" y="201" width="4" height="12" fill="#64748b" />
        <rect x="270" y="201" width="4" height="12" fill="#64748b" />
        <rect x="235" y="188" width="42" height="4" rx="2" fill="#c084fc" />

        {/* Large graceful willow tree canopy */}
        <path d="M -20 0 Q 70 80 120 0 Z" fill="#047857" opacity="0.8" />
        <path d="M 280 0 Q 350 110 420 0 Z" fill="#065f46" opacity="0.8" />

        {/* Hanging wisteria / lavender floral vine drapery */}
        <g stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          <path d="M 40 10 Q 45 40 40 65" />
          <path d="M 70 5 Q 75 45 70 80" />
          <path d="M 100 15 Q 95 50 100 70" />
          <path d="M 310 10 Q 305 45 310 75" />
          <path d="M 345 5 Q 350 50 345 90" />
          <path d="M 375 15 Q 370 45 375 70" />
        </g>
        {/* Floral blossom droplets */}
        <circle cx="40" cy="67" r="4" fill="#e9d5ff" filter="url(#softGlow)" />
        <circle cx="70" cy="82" r="5" fill="#f472b6" filter="url(#softGlow)" />
        <circle cx="100" cy="72" r="4" fill="#e9d5ff" />
        <circle cx="310" cy="77" r="4" fill="#e9d5ff" />
        <circle cx="345" cy="92" r="5" fill="#f472b6" filter="url(#softGlow)" />
        <circle cx="375" cy="72" r="4" fill="#e9d5ff" />

        {/* Vintage park lamppost with warm romantic glow */}
        <path d="M 140 160 L 142 225 L 138 225 Z" fill="#0f172a" />
        <circle cx="140" cy="155" r="7" fill="#fef08a" filter="url(#softGlow)" />
        <circle cx="140" cy="155" r="22" fill="#fde047" opacity="0.2" />

        {/* Couple heart above the bench */}
        <path
          d="M 256 168 C 256 160, 246 160, 246 169 C 246 177, 256 185, 256 185 C 256 185, 266 177, 266 169 C 266 160, 256 160, 256 168 Z"
          fill="#f472b6"
          filter="url(#softGlow)"
        />
      </svg>
    </div>
  );
};

// Moon — Our Special Memory Scene
export const MoonScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a0217] via-[#15072e] to-[#05010c] flex items-center justify-center border border-purple-500/30 shadow-[0_0_35px_rgba(192,132,252,0.2)]">
      {/* Cosmic nebula radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(192,132,252,0.22)_0%,rgba(147,51,234,0.12)_50%,transparent_80%)]" />

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-white animate-pulse" />
        <span className="absolute top-[25%] right-[22%] w-1.5 h-1.5 rounded-full bg-purple-200 animate-ping" style={{ animationDuration: '3.5s' }} />
        <span className="absolute top-[45%] left-[12%] w-1 h-1 rounded-full bg-pink-200" />
        <span className="absolute bottom-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
        <span className="absolute top-[30%] left-[80%] text-[8px] text-purple-200/60">✦</span>
        <span className="absolute top-[65%] left-[25%] text-[10px] text-purple-200/50">✨</span>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] object-cover" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f3e8ff" />
            <stop offset="85%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
          </radialGradient>

          <radialGradient id="moonAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0a0217" stopOpacity="0" />
          </radialGradient>

          <filter id="moonFilter">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Aura around moon */}
        <circle cx="200" cy="115" r="105" fill="url(#moonAura)" />
        <circle cx="200" cy="115" r="75" fill="url(#moonAura)" opacity="0.6" />

        {/* The Romantic Glowing Moon */}
        <circle cx="200" cy="115" r="54" fill="url(#moonGlow)" filter="url(#moonFilter)" />

        {/* Subtle moon surface crater contours */}
        <g fill="#c084fc" opacity="0.25">
          <ellipse cx="185" cy="100" rx="9" ry="7" />
          <ellipse cx="218" cy="120" rx="12" ry="9" />
          <ellipse cx="195" cy="138" rx="8" ry="6" />
          <ellipse cx="178" cy="122" rx="6" ry="5" />
        </g>

        {/* Starry constellation lines */}
        <g stroke="#e9d5ff" strokeWidth="0.8" opacity="0.4" strokeDasharray="2,3">
          <line x1="60" y1="50" x2="110" y2="70" />
          <line x1="110" y1="70" x2="140" y2="40" />
          <line x1="280" y1="50" x2="330" y2="75" />
          <line x1="330" y1="75" x2="360" y2="45" />
        </g>
        <circle cx="60" cy="50" r="2" fill="#fff" />
        <circle cx="110" cy="70" r="2.5" fill="#fbcfe8" />
        <circle cx="140" cy="40" r="2" fill="#fff" />
        <circle cx="280" cy="50" r="2" fill="#fff" />
        <circle cx="330" cy="75" r="2.5" fill="#fbcfe8" />
        <circle cx="360" cy="45" r="2" fill="#fff" />

        {/* Ethereal dreamy clouds drifting across moon */}
        <path
          d="M 120 155 Q 160 135 210 150 Q 250 140 290 160 Q 240 175 190 168 Q 150 175 120 155 Z"
          fill="#3b0764"
          opacity="0.55"
        />
        <path
          d="M 145 142 Q 185 128 230 138 Q 265 130 295 148 Q 250 155 205 150 Q 170 155 145 142 Z"
          fill="#7e22ce"
          opacity="0.3"
        />

        {/* Dark romantic silhouette horizon */}
        <path d="M 0 240 Q 100 220 200 235 T 400 225 L 400 300 L 0 300 Z" fill="#090114" />
        <path d="M 0 260 Q 130 245 250 258 T 400 250 L 400 300 L 0 300 Z" fill="#040008" />
      </svg>
    </div>
  );
};

// Silambam — Martial Art & Passion Scene
export const SilambamScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#180527] via-[#240a3d] to-[#0c0214] flex items-center justify-center border border-purple-500/30 shadow-[0_0_35px_rgba(147,51,234,0.22)]">
      {/* Dynamic kinetic light burst */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(245,158,11,0.2)_0%,rgba(168,85,247,0.25)_40%,transparent_75%)]" />

      {/* Floating golden and purple sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 right-1/4 text-amber-300 text-xs animate-ping" style={{ animationDuration: '2.5s' }}>✦</span>
        <span className="absolute bottom-1/3 left-1/4 text-purple-300 text-xs animate-pulse">✦</span>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] object-cover" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="staffTrail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.2" />
          </linearGradient>

          <filter id="silambamGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic motion rings (spinning staff arc) */}
        <ellipse cx="205" cy="140" rx="110" ry="65" fill="none" stroke="url(#staffTrail)" strokeWidth="3" opacity="0.75" transform="rotate(-18 205 140)" />
        <ellipse cx="205" cy="140" rx="125" ry="45" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" transform="rotate(25 205 140)" />

        {/* Golden energy particles along staff path */}
        <circle cx="110" cy="100" r="3.5" fill="#fde047" filter="url(#silambamGlow)" />
        <circle cx="300" cy="180" r="4" fill="#fbbf24" filter="url(#silambamGlow)" />
        <circle cx="280" cy="95" r="3" fill="#e9d5ff" />

        {/* The Bamboo Staff (Silambam Kambu) */}
        <line x1="85" y1="215" x2="320" y2="70" stroke="#fef08a" strokeWidth="4.5" strokeLinecap="round" filter="url(#silambamGlow)" />
        <line x1="85" y1="215" x2="320" y2="70" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

        {/* Silambam Warrior Silhouette */}
        {/* Head */}
        <circle cx="200" cy="105" r="14" fill="#170629" />
        {/* Traditional head tie headband fluttering */}
        <path d="M 212 105 Q 235 100 248 108" stroke="#a855f7" strokeWidth="2.5" fill="none" filter="url(#silambamGlow)" />

        {/* Torso & Athletic posture */}
        <path d="M 188 120 L 214 120 L 218 165 L 184 165 Z" fill="#170629" />

        {/* Dynamic Arms gripping staff */}
        {/* Front arm extending high right */}
        <path d="M 212 124 L 245 110 L 260 100" stroke="#170629" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Back arm grounded low left */}
        <path d="M 188 128 L 160 148 L 140 180" stroke="#170629" strokeWidth="10" strokeLinecap="round" fill="none" />

        {/* Martial arts stance legs (Aalidham stance) */}
        {/* Left forward leg bent */}
        <path d="M 188 165 L 165 200 L 145 235 L 130 235" stroke="#170629" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Right back leg extended for balance */}
        <path d="M 214 165 L 245 195 L 275 235 L 290 235" stroke="#170629" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Traditional waist dhoti wrap with purple sash */}
        <path d="M 180 162 L 222 162 L 212 188 L 190 188 Z" fill="#581c87" />
        <path d="M 198 162 L 195 210 L 205 210 Z" fill="#9333ea" />

        {/* Love Story connector: Glowing Purple Heart pulsing over the warrior's chest */}
        <path
          d="M 201 127 C 201 122, 194 122, 194 128 C 194 134, 201 140, 201 140 C 201 140, 208 134, 208 128 C 208 122, 201 122, 201 127 Z"
          fill="#d8b4fe"
          filter="url(#silambamGlow)"
        />

        {/* Ground shadow & stage reflections */}
        <ellipse cx="205" cy="242" rx="90" ry="12" fill="#080110" opacity="0.9" />
        <ellipse cx="205" cy="242" rx="60" ry="6" fill="#7e22ce" opacity="0.3" filter="url(#silambamGlow)" />
      </svg>
    </div>
  );
};

// Shadow Bike — His Favourite Ride Scene
export const ShadowBikeScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e031a] via-[#16062a] to-[#06010d] flex items-center justify-center border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
      {/* Night highway mist and purple neon glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(168,85,247,0.22)_0%,rgba(126,34,206,0.15)_40%,transparent_75%)]" />

      {/* Floating neon specks */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-[20%] right-[30%] text-[8px] text-purple-300 animate-pulse">✦</span>
        <span className="absolute top-[35%] left-[20%] text-[10px] text-pink-300/60 animate-ping" style={{ animationDuration: '3s' }}>✨</span>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] object-cover" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="neonGlowUnder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#a855f7" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#d8b4fe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#c084fc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
          </linearGradient>

          <filter id="bikeNeon">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Distant city highway lights bokeh */}
        <circle cx="50" cy="100" r="12" fill="#7e22ce" opacity="0.3" filter="url(#bikeNeon)" />
        <circle cx="120" cy="85" r="8" fill="#a855f7" opacity="0.25" />
        <circle cx="340" cy="95" r="14" fill="#c084fc" opacity="0.2" filter="url(#bikeNeon)" />
        <circle cx="280" cy="110" r="6" fill="#f472b6" opacity="0.3" />

        {/* Headlight beam shooting forward right */}
        <polygon points="265,138 395,115 395,215 265,150" fill="url(#headlightBeam)" />

        {/* Wet road surface & asphalt reflections */}
        <rect x="0" y="210" width="400" height="90" fill="#080210" />
        <ellipse cx="200" cy="245" rx="160" ry="14" fill="url(#neonGlowUnder)" filter="url(#bikeNeon)" />
        {/* Road divider dashes with purple tint */}
        <line x1="20" y1="270" x2="80" y2="270" stroke="#7e22ce" strokeWidth="2.5" opacity="0.5" />
        <line x1="160" y1="270" x2="240" y2="270" stroke="#7e22ce" strokeWidth="2.5" opacity="0.5" />
        <line x1="320" y1="270" x2="380" y2="270" stroke="#7e22ce" strokeWidth="2.5" opacity="0.5" />

        {/* Sports Motorcycle Silhouette */}
        {/* Rear Wheel & Disc brake */}
        <circle cx="115" cy="205" r="35" fill="#120622" stroke="#4c1d95" strokeWidth="4" />
        <circle cx="115" cy="205" r="24" fill="#0c0417" stroke="#6b21a8" strokeWidth="2" />
        <circle cx="115" cy="205" r="10" fill="#a855f7" opacity="0.8" />

        {/* Front Wheel & Disc brake */}
        <circle cx="285" cy="205" r="35" fill="#120622" stroke="#4c1d95" strokeWidth="4" />
        <circle cx="285" cy="205" r="24" fill="#0c0417" stroke="#6b21a8" strokeWidth="2" />
        <circle cx="285" cy="205" r="10" fill="#a855f7" opacity="0.8" />

        {/* Swingarm and Rear suspension */}
        <line x1="115" y1="205" x2="175" y2="190" stroke="#3b0764" strokeWidth="6" />
        <line x1="150" y1="185" x2="165" y2="165" stroke="#f472b6" strokeWidth="4" />

        {/* Engine and Chassis core */}
        <polygon points="150,170 215,165 210,210 160,215" fill="#1e0b36" />
        {/* Exhaust pipe with chrome-violet sheen */}
        <path d="M 170 210 Q 185 220 220 215 L 210 205" stroke="#c084fc" strokeWidth="4" fill="none" />

        {/* Fuel tank & sharp aerodynamic sports fairing */}
        <path
          d="M 140 160 Q 155 130 195 130 Q 235 130 255 135 L 268 140 L 255 170 L 220 170 L 190 180 L 150 175 Z"
          fill="#2e1065"
          stroke="#9333ea"
          strokeWidth="1.5"
        />

        {/* Aerodynamic purple neon accent stripe on fairing */}
        <path d="M 165 145 Q 200 142 245 152" stroke="#d8b4fe" strokeWidth="2.5" fill="none" filter="url(#bikeNeon)" />

        {/* Rider Seat & Tail Cowl (Aggressive upswept tail) */}
        <path d="M 105 145 L 145 160 L 165 160 L 135 150 Z" fill="#0f051c" />
        <path d="M 105 145 L 138 135 L 155 155 Z" fill="#3b0764" />
        {/* Tail LED light */}
        <line x1="105" y1="145" x2="108" y2="142" stroke="#f43f5e" strokeWidth="4" filter="url(#bikeNeon)" />

        {/* Front Forks & Clip-on Handlebars */}
        <line x1="285" y1="205" x2="250" y2="125" stroke="#581c87" strokeWidth="5" />
        <circle cx="248" cy="122" r="5" fill="#d8b4fe" />
        <path d="M 245 122 L 235 125" stroke="#a855f7" strokeWidth="3" />

        {/* Dual LED Headlight Core */}
        <polygon points="266,138 274,142 268,146" fill="#ffffff" filter="url(#bikeNeon)" />

        {/* Windscreen */}
        <path d="M 248 122 Q 258 112 265 135 Z" fill="#7e22ce" opacity="0.6" />

        {/* Romantic Emblem on the bike tank */}
        <circle cx="210" cy="145" r="4" fill="#f472b6" filter="url(#bikeNeon)" />
      </svg>
    </div>
  );
};
