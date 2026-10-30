import songAssetUrl from '../assets/something_song.mp3';

// Romantic audio engine with default "Something Something" movie track
export const DEFAULT_SONG_URL = songAssetUrl;

class RomanticAudio {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private customTrackUrl: string = songAssetUrl;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.setupAudio(this.customTrackUrl);
  }

  private setupAudio(url: string) {
    if (typeof window === 'undefined') return;

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
    }

    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = 0.85;

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      this.notify();
    });

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public setCustomTrack(url: string) {
    const wasPlaying = this.isPlaying;
    this.customTrackUrl = url;
    this.setupAudio(url);
    if (wasPlaying && this.audioElement) {
      this.audioElement.play().catch(() => {});
    }
  }

  public play(): Promise<void> {
    if (!this.audioElement) {
      this.setupAudio(this.customTrackUrl);
    }
    if (this.audioElement) {
      this.isPlaying = true;
      return this.audioElement.play().catch((err) => {
        console.warn('Audio play error:', err);
      });
    }
    return Promise.resolve();
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public getCurrentTime(): number {
    return this.audioElement?.currentTime || 0;
  }

  public getDuration(): number {
    return this.audioElement?.duration || 0;
  }

  public seek(time: number) {
    if (this.audioElement && Number.isFinite(time)) {
      this.audioElement.currentTime = time;
    }
  }

  public getAudioElement(): HTMLAudioElement | null {
    return this.audioElement;
  }
}

export const romanticAudio = new RomanticAudio();
