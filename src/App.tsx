import React, { useState, useEffect } from 'react';
import { ScreenType, MemoryChapter, GalleryPhoto } from './types';
import { OpeningHeart } from './components/OpeningHeart';
import { StoryHub } from './components/StoryHub';
import { MemoryJourney } from './components/MemoryJourney';
import { MemoriesGallery } from './components/MemoriesGallery';
import {
  INITIAL_MEMORIES,
  loadStoryCustomizations,
  getGalleryPhotos,
  saveGalleryPhoto,
  deleteGalleryPhoto,
} from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('heartbeat');
  const [memories, setMemories] = useState<MemoryChapter[]>(INITIAL_MEMORIES);
  const [activeMemoryIndex, setActiveMemoryIndex] = useState(0);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  // Load customizations and saved photos from IndexedDB/localStorage on mount
  useEffect(() => {
    async function loadData() {
      try {
        const customizations = await loadStoryCustomizations();
        setMemories((prev) =>
          prev.map((m) => {
            if (customizations[m.id]) {
              return {
                ...m,
                customStory: customizations[m.id].customStory,
                photoUrl: customizations[m.id].photoUrl,
              };
            }
            return m;
          })
        );

        const savedPhotos = await getGalleryPhotos();
        setPhotos(savedPhotos);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    }
    loadData();
  }, []);

  // Handler when heart is touched to open
  const handleOpenHeart = () => {
    setScreen('hub');
  };

  // Handler to start story journey from specific chapter
  const handleStartJourney = (startIndex = 0) => {
    setActiveMemoryIndex(startIndex);
    setScreen('journey');
  };

  // Handler to open gallery
  const handleOpenGallery = () => {
    setScreen('gallery');
  };

  // Handler to reset back to opening heartbeat screen
  const handleResetHeart = () => {
    setScreen('heartbeat');
  };

  // Handler to update story text and custom photo for a memory
  const handleUpdateMemory = (id: string, text: string, photoUrl?: string) => {
    setMemories((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            customStory: text,
            photoUrl: photoUrl,
          };
        }
        return m;
      })
    );
  };

  // Handler to add photo to gallery
  const handleAddPhoto = async (photo: GalleryPhoto) => {
    await saveGalleryPhoto(photo);
    setPhotos((prev) => [photo, ...prev]);
  };

  // Handler to delete photo from gallery
  const handleDeletePhoto = async (id: string) => {
    await deleteGalleryPhoto(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-[100dvh] w-full bg-black text-slate-100 flex flex-col items-center justify-center overflow-x-hidden">
      {/* Screen 1: Pure Black Heartbeat Screen */}
      {screen === 'heartbeat' && (
        <OpeningHeart onOpen={handleOpenHeart} />
      )}

      {/* Screen 2: Beautiful Love Story Main Hub */}
      {screen === 'hub' && (
        <div className="w-full min-h-[100dvh]">
          <StoryHub
            memories={memories}
            onStartJourney={handleStartJourney}
            onOpenGallery={handleOpenGallery}
            onResetHeart={handleResetHeart}
          />
        </div>
      )}

      {/* Screen 3: Step-by-Step Memory Journey */}
      {screen === 'journey' && (
        <div className="w-full min-h-[100dvh]">
          <MemoryJourney
            memories={memories}
            currentIndex={activeMemoryIndex}
            onNavigateIndex={(idx) => setActiveMemoryIndex(idx)}
            onBackToHub={() => setScreen('hub')}
            onOpenGallery={handleOpenGallery}
            onUpdateMemory={handleUpdateMemory}
          />
        </div>
      )}

      {/* Screen 4: Our Memories Gallery */}
      {screen === 'gallery' && (
        <div className="w-full min-h-[100dvh]">
          <MemoriesGallery
            photos={photos}
            onBackToHub={() => setScreen('hub')}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
          />
        </div>
      )}
    </div>
  );
}
