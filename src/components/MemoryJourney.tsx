import React, { useState, useRef } from 'react';
import { MemoryChapter } from '../types';
import {
  CollegeBusScene,
  ParkScene,
  MoonScene,
  SilambamScene,
  ShadowBikeScene,
} from './RomanticScenes';
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Check,
  X,
  Camera,
  RotateCcw,
  BookOpen,
  Images,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { saveStoryText } from '../utils/storage';

interface MemoryJourneyProps {
  memories: MemoryChapter[];
  currentIndex: number;
  onNavigateIndex: (index: number) => void;
  onBackToHub: () => void;
  onOpenGallery: () => void;
  onUpdateMemory: (id: string, text: string, photoUrl?: string) => void;
}

export const MemoryJourney: React.FC<MemoryJourneyProps> = ({
  memories,
  currentIndex,
  onNavigateIndex,
  onBackToHub,
  onOpenGallery,
  onUpdateMemory,
}) => {
  const currentMemory = memories[currentIndex];

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(
    currentMemory.customStory || currentMemory.defaultStory
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync edit text when slide changes
  React.useEffect(() => {
    setIsEditing(false);
    setEditText(currentMemory.customStory || currentMemory.defaultStory);
  }, [currentIndex, currentMemory]);

  const handleSaveText = async () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    await saveStoryText(currentMemory.id, trimmed, currentMemory.photoUrl);
    onUpdateMemory(currentMemory.id, trimmed, currentMemory.photoUrl);
    setIsEditing(false);
  };

  const handleResetToDefault = async () => {
    await saveStoryText(currentMemory.id, currentMemory.defaultStory, currentMemory.photoUrl);
    onUpdateMemory(currentMemory.id, currentMemory.defaultStory, currentMemory.photoUrl);
    setEditText(currentMemory.defaultStory);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const textToKeep = currentMemory.customStory || currentMemory.defaultStory;
      await saveStoryText(currentMemory.id, textToKeep, dataUrl);
      onUpdateMemory(currentMemory.id, textToKeep, dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = async () => {
    const textToKeep = currentMemory.customStory || currentMemory.defaultStory;
    await saveStoryText(currentMemory.id, textToKeep, undefined);
    onUpdateMemory(currentMemory.id, textToKeep, undefined);
  };

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && currentIndex < memories.length - 1) {
      onNavigateIndex(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      onNavigateIndex(currentIndex - 1);
    }
    touchStartX.current = null;
  };

  // Render thematic scene
  const renderVisualScene = () => {
    switch (currentMemory.category) {
      case 'bus':
        return <CollegeBusScene />;
      case 'park':
        return <ParkScene />;
      case 'moon':
        return <MoonScene />;
      case 'silambam':
        return <SilambamScene />;
      case 'bike':
        return <ShadowBikeScene />;
      default:
        return <MoonScene />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[100dvh] w-full bg-[#08020e] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-purple-900"
    >
      {/* Hidden File Input for Real Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Atmospheric Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-600/10 filter blur-[90px]" />
      </div>

      {/* Top Mobile Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2 border-b border-purple-500/15 bg-black/40 backdrop-blur-md">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-1.5 text-xs font-medium text-purple-200 py-1.5 px-3 rounded-full bg-purple-950/60 border border-purple-500/30 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4 text-purple-300" />
          <span>Story Hub</span>
        </button>

        {/* Memory Counter Badge */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>
            Memory {currentIndex + 1} of {memories.length}
          </span>
        </div>

        <button
          onClick={onOpenGallery}
          className="flex items-center gap-1 text-xs text-purple-300/80 hover:text-purple-100 py-1.5 px-2.5 rounded-full bg-purple-950/40 border border-purple-500/20 active:scale-95"
          title="Open Gallery"
        >
          <Images className="w-3.5 h-3.5 text-purple-300" />
          <span className="hidden sm:inline">Gallery</span>
        </button>
      </header>

      {/* Main Memory Content Area */}
      <main className="relative z-10 flex-1 px-4 py-3 flex flex-col max-w-md mx-auto w-full">
        {/* Memory Location & Title Header */}
        <div className="mb-2 text-center">
          <span className="text-[11px] font-medium uppercase tracking-widest text-purple-400/80 font-sans">
            {currentMemory.location}
          </span>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight leading-tight mt-0.5">
            {currentMemory.title}
          </h2>
        </div>

        {/* Visual Scene & Real Couple Photo Frame Area */}
        <div className="relative mb-3">
          {/* Main Visual Display */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30">
            {currentMemory.photoUrl ? (
              <div className="relative w-full h-[260px] bg-black">
                <img
                  src={currentMemory.photoUrl}
                  alt={currentMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-red-500/40 text-red-300 hover:text-red-200 transition-colors"
                  title="Remove uploaded photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-purple-200">
                  <span className="bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                    Real Photo Added 💜
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-black/80 px-2.5 py-1 rounded-md border border-purple-400/40 text-purple-200 hover:text-white"
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                {renderVisualScene()}
                {/* Upload Photo Overlay Prompt */}
                <div className="absolute bottom-2.5 right-2.5">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 border border-purple-400/40 text-purple-200 text-xs font-medium shadow-lg backdrop-blur-md active:scale-95 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5 text-purple-300" />
                    <span>Upload Our Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Story Text Box (Editable Card) */}
        <div className="relative flex-1 bg-[#120722]/90 rounded-2xl p-4 border border-purple-500/30 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400/80">
                Memory Note
              </span>

              {!isEditing ? (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditText(
                      currentMemory.customStory || currentMemory.defaultStory
                    );
                  }}
                  className="flex items-center gap-1 text-xs text-purple-300/80 hover:text-purple-100 py-1 px-2.5 rounded-lg bg-purple-900/40 border border-purple-500/30 active:scale-95 transition-transform"
                >
                  <Edit3 className="w-3 h-3 text-purple-300" />
                  <span>Edit Story</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleResetToDefault}
                    className="p-1 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white"
                    title="Reset to original text"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
                    title="Cancel"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleSaveText}
                    className="flex items-center gap-1 text-xs bg-purple-600 hover:bg-purple-500 text-white font-medium py-1 px-2.5 rounded-md shadow-sm active:scale-95"
                  >
                    <Check className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
                className="w-full bg-[#0d0417] text-purple-100 text-sm p-3 rounded-xl border border-purple-400/60 focus:outline-none focus:ring-1 focus:ring-purple-400 font-sans leading-relaxed resize-none selection:bg-purple-800"
                placeholder="Write your special love story memory here..."
                autoFocus
              />
            ) : (
              <p className="font-sans text-sm text-purple-100/90 leading-relaxed italic selection:bg-purple-900">
                "{currentMemory.customStory || currentMemory.defaultStory}"
              </p>
            )}
          </div>

          {/* Quick Chapter Navigation Dots */}
          <div className="flex items-center justify-center gap-2 pt-3 mt-2 border-t border-purple-500/15">
            {memories.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => onNavigateIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIdx === currentIndex
                    ? 'w-6 bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_8px_#c084fc]'
                    : 'w-2 bg-purple-800/60 hover:bg-purple-600/60'
                }`}
                aria-label={`Go to memory ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar (Natural Thumb Reach Zone) */}
      <footer className="relative z-20 px-4 py-3 bg-[#0d0417]/90 border-t border-purple-500/20 backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={() => onNavigateIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={`min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-purple-950/20 border border-purple-900/30 text-purple-400'
                : 'bg-purple-950/70 border border-purple-500/40 text-purple-200 hover:bg-purple-900/60 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Next Button or View Gallery */}
          {currentIndex < memories.length - 1 ? (
            <button
              onClick={() => onNavigateIndex(currentIndex + 1)}
              className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenGallery}
              className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Our Gallery</span>
              <Images className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
