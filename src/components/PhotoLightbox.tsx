import React from 'react';
import { GalleryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Trash2, Calendar, Tag } from 'lucide-react';

interface PhotoLightboxProps {
  photo: GalleryPhoto;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNavigate: (photo: GalleryPhoto) => void;
  onDelete?: (id: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
  onDelete,
}) => {
  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onNavigate(photos[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) {
      onNavigate(photos[currentIndex + 1]);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 selection:bg-purple-900 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs text-purple-300/80 font-sans px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
          {currentIndex + 1} of {photos.length}
        </span>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Delete this photo from memories?')) {
                  onDelete(photo.id);
                  onClose();
                }
              }}
              className="p-2.5 rounded-full bg-black/60 border border-red-500/30 text-red-400 hover:text-red-200 transition-colors"
              title="Delete Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 border border-purple-500/30 text-purple-200 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image View */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex-1 flex items-center justify-center my-auto overflow-hidden max-w-xl mx-auto w-full"
      >
        <img
          src={photo.url}
          alt={photo.title}
          className="max-h-[72dvh] w-auto max-w-full object-contain rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.25)] border border-purple-500/20"
        />

        {/* Previous / Next buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-purple-200 border border-purple-500/30 active:scale-95 transition-all"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex < photos.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-purple-200 border border-purple-500/30 active:scale-95 transition-all"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#120722]/90 border border-purple-500/30 p-4 rounded-2xl max-w-md mx-auto w-full text-center"
      >
        <h3 className="font-display text-lg font-semibold text-white mb-1">
          {photo.title}
        </h3>
        {photo.caption && (
          <p className="text-sm text-purple-200/80 font-sans italic mb-2">
            "{photo.caption}"
          </p>
        )}
        <div className="flex items-center justify-center gap-3 text-xs text-purple-400/70">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3 text-purple-400" />
            <span className="capitalize">{photo.category}</span>
          </span>
          {photo.date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-purple-400" />
              <span>{photo.date}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
