import { MemoryChapter, GalleryPhoto } from '../types';

const DB_NAME = 'LoveStoryDB';
const DB_VERSION = 1;
const STORE_PHOTOS = 'gallery_photos';
const STORE_STORIES = 'memory_stories';

export const INITIAL_MEMORIES: MemoryChapter[] = [
  {
    id: 'memory-bus',
    category: 'bus',
    number: 1,
    title: 'Where Our Story Began',
    location: 'Our College Bus',
    defaultStory:
      'This is where our beautiful story began — on our college bus. A simple place that became a special part of our lives.',
    themeColor: '#C084FC',
    iconName: 'Bus',
  },
  {
    id: 'memory-park',
    category: 'park',
    number: 2,
    title: 'Our Little World',
    location: 'Our Favourite Park',
    defaultStory:
      'A beautiful place, countless little moments, and memories that will always stay in our hearts.',
    themeColor: '#A855F7',
    iconName: 'Trees',
  },
  {
    id: 'memory-moon',
    category: 'moon',
    number: 3,
    title: 'Our Favourite Place',
    location: 'Moon — Our Special Memory',
    defaultStory:
      'Some places become special because of the memories we create there.',
    themeColor: '#D8B4FE',
    iconName: 'Moon',
  },
  {
    id: 'memory-silambam',
    category: 'silambam',
    number: 4,
    title: 'Silambam — His Passion, Our Memory',
    location: 'Silambaras',
    defaultStory:
      'Silambam is more than a passion. It is a part of his life, his strength, and something that makes our story unique.',
    themeColor: '#9333EA',
    iconName: 'Sword',
  },
  {
    id: 'memory-bike',
    category: 'bike',
    number: 5,
    title: 'His Favourite Ride',
    location: 'Shadow Bike',
    defaultStory:
      'Every ride under the night sky felt like a timeless journey with you by my side. The thrill of the wind, the quiet streets, and our shared unspoken bond.',
    themeColor: '#C084FC',
    iconName: 'Bike',
  },
];

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        db.createObjectStore(STORE_PHOTOS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_STORIES)) {
        db.createObjectStore(STORE_STORIES, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save custom story edits for a chapter
export async function saveStoryText(chapterId: string, customStory: string, photoUrl?: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_STORIES, 'readwrite');
    const store = tx.objectStore(STORE_STORIES);
    store.put({ id: chapterId, customStory, photoUrl, updatedAt: Date.now() });
  } catch {
    // Fallback to localStorage
    const saved = JSON.parse(localStorage.getItem('love_story_custom') || '{}');
    saved[chapterId] = { customStory, photoUrl };
    localStorage.setItem('love_story_custom', JSON.stringify(saved));
  }
}

// Load custom story edits
export async function loadStoryCustomizations(): Promise<Record<string, { customStory?: string; photoUrl?: string }>> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_STORIES, 'readonly');
    const store = tx.objectStore(STORE_STORIES);
    const request = store.getAll();
    return new Promise((resolve) => {
      request.onsuccess = () => {
        const records = request.result || [];
        const map: Record<string, { customStory?: string; photoUrl?: string }> = {};
        for (const r of records) {
          map[r.id] = { customStory: r.customStory, photoUrl: r.photoUrl };
        }
        resolve(map);
      };
      request.onerror = () => {
        const saved = JSON.parse(localStorage.getItem('love_story_custom') || '{}');
        resolve(saved);
      };
    });
  } catch {
    const saved = JSON.parse(localStorage.getItem('love_story_custom') || '{}');
    return saved;
  }
}

// Save gallery photo
export async function saveGalleryPhoto(photo: GalleryPhoto): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PHOTOS, 'readwrite');
    const store = tx.objectStore(STORE_PHOTOS);
    store.put(photo);
  } catch {
    const photos: GalleryPhoto[] = JSON.parse(localStorage.getItem('love_story_photos') || '[]');
    photos.unshift(photo);
    localStorage.setItem('love_story_photos', JSON.stringify(photos.slice(0, 10)));
  }
}

// Get all gallery photos
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PHOTOS, 'readonly');
    const store = tx.objectStore(STORE_PHOTOS);
    const request = store.getAll();
    return new Promise((resolve) => {
      request.onsuccess = () => {
        const items = (request.result || []) as GalleryPhoto[];
        items.sort((a, b) => b.timestamp - a.timestamp);
        resolve(items);
      };
      request.onerror = () => {
        const photos: GalleryPhoto[] = JSON.parse(localStorage.getItem('love_story_photos') || '[]');
        resolve(photos);
      };
    });
  } catch {
    const photos: GalleryPhoto[] = JSON.parse(localStorage.getItem('love_story_photos') || '[]');
    return photos;
  }
}

// Delete gallery photo
export async function deleteGalleryPhoto(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PHOTOS, 'readwrite');
    tx.objectStore(STORE_PHOTOS).delete(id);
  } catch {
    const photos: GalleryPhoto[] = JSON.parse(localStorage.getItem('love_story_photos') || '[]');
    const filtered = photos.filter((p) => p.id !== id);
    localStorage.setItem('love_story_photos', JSON.stringify(filtered));
  }
}
