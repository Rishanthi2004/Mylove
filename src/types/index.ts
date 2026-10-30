export type ScreenType = 'heartbeat' | 'hub' | 'journey' | 'gallery';

export type MemoryCategory = 'bus' | 'park' | 'moon' | 'silambam' | 'bike';

export interface MemoryChapter {
  id: string;
  category: MemoryCategory;
  number: number;
  title: string;
  location: string;
  defaultStory: string;
  customStory?: string;
  photoUrl?: string; // Real uploaded photo data URL
  photoCaption?: string;
  themeColor: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  category: MemoryCategory;
  url: string;
  title: string;
  caption?: string;
  date?: string;
  timestamp: number;
}
