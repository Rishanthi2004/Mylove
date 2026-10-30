import React, { useState, useRef } from 'react';
import { GalleryPhoto, MemoryCategory } from '../types';
import { PhotoLightbox } from './PhotoLightbox';
import {
  ChevronLeft,
  Plus,
  Images,
  Camera,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';

interface MemoriesGalleryProps {
  photos: GalleryPhoto[];
  onBackToHub: () => void;
  onAddPhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
}

const CATEGORIES: { id: MemoryCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '💜' },
  { id: 'bus', label: 'College Bus', icon: '🚌' },
  { id: 'park', label: 'Park', icon: '🌳' },
  { id: 'moon', label: 'Moon', icon: '🌙' },
  { id: 'silambam', label: 'Silambam', icon: '🥋' },
  { id: 'bike', label: 'Bike', icon: '🏍️' },
];

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  photos,
  onBackToHub,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | 'all'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [uploadCategory, setUploadCategory] = useState<MemoryCategory>('moon');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select a photo to upload');
      return;
    }

    const newPhoto: GalleryPhoto = {
      id: 'photo_' + Date.now(),
      category: uploadCategory,
      url: previewUrl,
      title: uploadTitle.trim() || 'Our Memory',
      caption: uploadCaption.trim() || undefined,
      date: uploadDate.trim() || undefined,
      timestamp: Date.now(),
    };

    onAddPhoto(newPhoto);
    setIsAddModalOpen(false);
    setPreviewUrl(null);
    setUploadTitle('');
    setUploadCaption('');
    setUploadDate('');
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#08020e] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-purple-900 pb-12">
      {/* Lightbox Viewer */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          photos={filteredPhotos.length > 0 ? filteredPhotos : [lightboxPhoto]}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={(p) => setLightboxPhoto(p)}
          onDelete={onDeletePhoto}
        />
      )}

      {/* Top Mobile Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2 border-b border-purple-500/15 bg-black/40 backdrop-blur-md">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-1.5 text-xs font-medium text-purple-200 py-1.5 px-3 rounded-full bg-purple-950/60 border border-purple-500/30 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4 text-purple-300" />
          <span>Story Hub</span>
        </button>

        <h1 className="font-display text-base font-bold text-white flex items-center gap-1.5">
          <span>Our Memories</span>
          <span className="text-purple-400">📸</span>
        </h1>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white py-1.5 px-3 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </header>

      {/* Category Filter Horizontal Scroller */}
      <div className="relative z-10 px-4 pt-3 pb-2 max-w-md mx-auto w-full">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] border-transparent'
                  : 'bg-[#150927] border border-purple-500/25 text-purple-300/80 hover:text-purple-100 hover:border-purple-400/40'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid View */}
      <main className="relative z-10 flex-1 px-4 py-2 max-w-md mx-auto w-full">
        {filteredPhotos.length === 0 ? (
          /* Clearly Identifiable Placeholder Container */
          <div className="flex flex-col items-center justify-center py-12 px-6 rounded-3xl bg-[#120722]/60 border border-dashed border-purple-500/30 text-center my-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mb-3 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Camera className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-1">
              Personal Memories Vault
            </h3>
            <p className="text-xs text-purple-200/70 font-sans max-w-xs leading-relaxed mb-5">
              {selectedCategory === 'all'
                ? 'No couple photos uploaded yet. Tap below to add your genuine pictures and make this storybook truly ours!'
                : `No real photos added for ${selectedCategory.toUpperCase()} yet. Real photographs can be safely uploaded anytime.`}
            </p>
            <button
              onClick={() => {
                if (selectedCategory !== 'all') {
                  setUploadCategory(selectedCategory);
                }
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Our First Photo</span>
            </button>
          </div>
        ) : (
          /* Photo Grid */
          <div className="grid grid-cols-2 gap-3">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-[#150927] border border-purple-500/25 shadow-md aspect-square cursor-pointer active:scale-95 transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="text-xs font-semibold text-white truncate drop-shadow-sm">
                    {photo.title}
                  </p>
                  <span className="text-[10px] text-purple-300/80 capitalize font-sans">
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#15072a] border border-purple-500/40 rounded-3xl p-5 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-display text-lg font-bold text-white">
                Add Personal Photo
              </h3>
            </div>

            <form onSubmit={handleCreatePhoto} className="space-y-3.5">
              {/* Image Picker */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-2xl p-4 flex flex-col items-center justify-center bg-purple-950/20 text-center transition-colors min-h-[130px]"
              >
                {previewUrl ? (
                  <div className="relative w-full h-28 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-purple-200 px-2 py-0.5 rounded">
                      Change Photo
                    </span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-purple-400 mb-1.5" />
                    <span className="text-xs font-semibold text-purple-200">
                      Tap to select photo
                    </span>
                    <span className="text-[10px] text-purple-400/60 mt-0.5">
                      JPG, PNG, WEBP (Camera or Gallery)
                    </span>
                  </>
                )}
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                  Memory Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as MemoryCategory)}
                  className="w-full bg-[#0d0417] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-100 focus:outline-none focus:border-purple-400"
                >
                  <option value="bus">College Bus 🚌</option>
                  <option value="park">Our Favourite Park 🌳</option>
                  <option value="moon">Moon 🌙</option>
                  <option value="silambam">Silambam 🥋</option>
                  <option value="bike">Shadow Bike 🏍️</option>
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g., That Sunset with You"
                  className="w-full bg-[#0d0417] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-100 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Caption Input */}
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                  Special Note / Caption (Optional)
                </label>
                <input
                  type="text"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="e.g., The day we looked up at the stars together"
                  className="w-full bg-[#0d0417] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-100 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                  Date (Optional)
                </label>
                <input
                  type="text"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  placeholder="e.g., October 14, 2024"
                  className="w-full bg-[#0d0417] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-100 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!previewUrl}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold shadow-md disabled:opacity-50 active:scale-95 transition-all"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
