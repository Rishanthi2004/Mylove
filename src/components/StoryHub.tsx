import React, { useState } from 'react';
import { MemoryChapter } from '../types';
import { BookOpen, Images, Sparkles, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { CuteDogsSection } from './CuteDogsSection';
import { SecretLoveLetter } from './SecretLoveLetter';

interface StoryHubProps {
  memories: MemoryChapter[];
  onStartJourney: (startIndex?: number) => void;
  onOpenGallery: () => void;
  onResetHeart: () => void;
}

export const StoryHub: React.FC<StoryHubProps> = ({
  memories,
  onStartJourney,
  onOpenGallery,
  onResetHeart,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  const toggleAudio = () => {
    const active = romanticAudio.toggle();
    setIsAudioPlaying(active);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#08020e] text-slate-100 flex flex-col justify-between overflow-x-hidden pb-10 selection:bg-purple-900">
      {/* Dreamy Purple Background Glows & Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/15 filter blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-pink-700/12 filter blur-[100px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-indigo-900/20 filter blur-[100px]" />

        {/* Ambient floating twinkling stars */}
        <span className="absolute top-16 left-8 text-purple-300/40 text-xs animate-pulse">✦</span>
        <span className="absolute top-28 right-10 text-pink-300/50 text-sm animate-ping" style={{ animationDuration: '4s' }}>✨</span>
        <span className="absolute top-80 left-6 text-purple-200/30 text-[10px]">✦</span>
        <span className="absolute bottom-40 right-8 text-purple-300/40 text-xs animate-pulse">✦</span>
      </div>

      {/* Top Mobile Bar */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={onResetHeart}
          className="flex items-center gap-1.5 text-xs text-purple-300/80 hover:text-purple-100 transition-colors py-1.5 px-2.5 rounded-full bg-purple-950/40 border border-purple-500/20 backdrop-blur-md active:scale-95"
          title="Back to Heartbeat"
        >
          <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
          <span>Heartbeat</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1 text-xs text-purple-200 bg-purple-950/50 border border-purple-500/30 px-3 py-1.5 rounded-full backdrop-blur-md active:scale-95 transition-transform"
            aria-label="Toggle ambient music"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                <span className="text-[11px] font-medium text-purple-200">Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-purple-400/60" />
                <span className="text-[11px] text-purple-400/60">Muted</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-5 pt-3 pb-6 flex flex-col justify-start max-w-md mx-auto w-full animate-fade-in">
        {/* Title Header with Soft Purple Glow */}
        <div className="text-center mt-2 mb-6">
          <div className="inline-flex items-center justify-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Forever & Always</span>
            <Sparkles className="w-3 h-3 text-purple-400" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
            Our Beautiful{' '}
            <span className="bg-gradient-to-r from-purple-200 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]">
              Love Story
            </span>{' '}
            <span className="text-purple-400 inline-block">💜</span>
          </h1>

          <p className="font-sans text-sm text-purple-200/80 italic max-w-xs mx-auto leading-relaxed">
            "Every love story is special, but ours is my favourite."
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onStartJourney(0)}
            className="group relative overflow-hidden flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br from-purple-900/60 via-purple-950/70 to-black border border-purple-500/40 shadow-[0_4px_24px_rgba(147,51,234,0.25)] hover:border-purple-400 transition-all active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/15 rounded-full filter blur-xl group-hover:bg-purple-400/25 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center mb-3 text-purple-200 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-purple-300" />
            </div>
            <span className="font-display text-base font-semibold text-white mb-0.5">
              Our Story
            </span>
            <span className="text-xs text-purple-300/70 leading-tight">
              Begin our interactive memory journey
            </span>
          </button>

          <button
            onClick={onOpenGallery}
            className="group relative overflow-hidden flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br from-pink-950/40 via-purple-950/70 to-black border border-pink-500/30 shadow-[0_4px_24px_rgba(236,72,153,0.15)] hover:border-pink-400 transition-all active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/15 rounded-full filter blur-xl group-hover:bg-pink-400/25 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-pink-600/30 border border-pink-400/40 flex items-center justify-center mb-3 text-pink-200 group-hover:scale-110 transition-transform">
              <Images className="w-5 h-5 text-pink-300" />
            </div>
            <span className="font-display text-base font-semibold text-white mb-0.5">
              Our Memories
            </span>
            <span className="text-xs text-pink-300/70 leading-tight">
              Explore photo vault & gallery
            </span>
          </button>
        </div>

        {/* Cute Couple Section 💜 */}
        <CuteDogsSection />

        {/* Secret Love Letter For Rahman (Password: 1420) 💌 */}
        <SecretLoveLetter />
      </main>

      {/* Romantic Footer Note */}
      <footer className="relative z-10 text-center px-6 pt-2">
        <p className="text-xs text-purple-400/60 font-script text-lg">
          Crafted with love for my darling 💜
        </p>
      </footer>
    </div>
  );
};
