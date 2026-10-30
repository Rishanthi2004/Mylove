import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Sparkles, Heart } from 'lucide-react';
import songAssetUrl from '../assets/something_song.mp3';

export const OurSongSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleError = (e: any) => {
      console.warn('Audio element error:', e);
      setLoadError('Audio loading, tap Play to start');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // In mobile browsers, calling .load() first if not loaded ensures readiness
      if (audio.readyState === 0) {
        audio.load();
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setLoadError(null);
        })
        .catch((err) => {
          console.warn('Playback initiation error:', err);
          // Try user-triggered play again
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio && Number.isFinite(newTime)) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative mt-8 pt-5 pb-6 px-4 rounded-3xl bg-gradient-to-b from-[#19082d]/90 via-[#230c3d]/95 to-[#120421] border border-purple-500/35 shadow-[0_4px_30px_rgba(168,85,247,0.22)] overflow-hidden">
      {/* Mounted DOM Audio element pointing directly to Vite audio/mpeg asset */}
      <audio
        ref={audioRef}
        src={songAssetUrl}
        preload="auto"
        loop
        playsInline
      >
        <source src={songAssetUrl} type="audio/mpeg" />
        <source src="/src/assets/something_song.mp3" type="audio/mpeg" />
      </audio>

      {/* Atmospheric Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-600/15 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="text-center relative z-10 mb-4">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-[11px] font-medium backdrop-blur-sm mb-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Our Special Song</span>
          <span className="text-xs">🎵</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(233,213,255,0.7)]">
          Something Something 💜
        </h3>
        <p className="text-xs text-purple-300/80 font-sans mt-0.5">
          Unakkum Enakkum — Our official romantic track
        </p>
      </div>

      {/* Vinyl Record & Sound Equalizer Visualizer */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-4">
        <div className="relative mb-3 flex items-center justify-center">
          {/* Animated Spinning Vinyl Record */}
          <div
            onClick={togglePlay}
            className={`w-28 h-28 rounded-full bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 border-4 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-700 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4.5s' }}
            title="Tap to Play / Pause"
          >
            {/* Record grooves */}
            <div className="w-20 h-20 rounded-full border border-purple-400/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-purple-400/30 flex items-center justify-center">
                {/* Center Heart Label */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold shadow-inner">
                  <Heart className={`w-4 h-4 fill-white text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Floating musical note elements when playing */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute -top-2 left-2 text-purple-300 text-sm animate-bounce" style={{ animationDuration: '1.8s' }}>
                ♪
              </span>
              <span className="absolute -top-3 right-3 text-pink-300 text-base animate-pulse" style={{ animationDuration: '1.5s' }}>
                ♫
              </span>
              <span className="absolute bottom-0 -right-2 text-purple-200 text-sm animate-bounce" style={{ animationDuration: '2.1s' }}>
                ♬
              </span>
            </div>
          )}
        </div>

        {/* Dancing Equalizer Waveform Bars */}
        <div className="flex items-end justify-center gap-1 h-6 mb-3">
          {[40, 75, 50, 90, 60, 100, 70, 85, 45, 95, 65, 80].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-purple-500 to-pink-400 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-40'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height * (i % 2 === 0 ? 0.9 : 1.2)) % 100)}%` : '20%',
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Progress & Scrub Bar */}
        <div className="w-full max-w-xs mb-3 px-2">
          <input
            type="range"
            min={0}
            max={duration || 28}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-purple-950/80 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex items-center justify-between text-[11px] text-purple-300/80 font-mono mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 28)}</span>
          </div>
        </div>

        {/* Large Prominent Play / Pause Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.7)] active:scale-95 transition-all cursor-pointer hover:shadow-[0_0_35px_rgba(236,72,153,0.9)]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Song</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>Play Something Something 🎵</span>
              </>
            )}
          </button>
        </div>

        {loadError && (
          <p className="text-[10px] text-purple-300/60 font-sans mt-2">
            {loadError}
          </p>
        )}
      </div>

      {/* Song Lyrics Card with Romantic Typography */}
      <div className="relative z-10 rounded-2xl bg-[#110521]/80 border border-purple-500/30 p-4 sm:p-5 text-center shadow-inner">
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 uppercase tracking-widest mb-3">
          <Music className="w-3.5 h-3.5 text-purple-400" />
          <span>Song Lyrics</span>
        </div>

        <div className="space-y-3 font-display text-sm sm:text-base text-purple-100/90 leading-relaxed italic">
          <p className="drop-shadow-[0_0_10px_rgba(216,180,254,0.4)]">
            "Yaar kaiyil vanthu<br />
            Yaar sernthirupom<br />
            Yaar solvathithai<br />
            <span className="font-semibold text-pink-300">God decides something…</span>"
          </p>

          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto my-2" />

          <p className="drop-shadow-[0_0_10px_rgba(216,180,254,0.4)]">
            "Latcham perai paarthirupom<br />
            Summa pesi sendrirupom<br />
            Yaaro oruvar meedhu mattum<br />
            <span className="font-semibold text-purple-300">Etho vanthaal something… 💜</span>"
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-purple-500/20">
          <p className="text-[11px] text-purple-400/80 font-sans">
            In a world of millions, my heart found you, Rahman ✨
          </p>
        </div>
      </div>
    </div>
  );
};
