// Romantic ambient audio generator using Web Audio API
class RomanticAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    let step = 0;
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major 7
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 261.63, 329.63, 392.00], // F maj7
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    const playChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const currentChord = chords[Math.floor(step / 4) % chords.length];
      const freq = currentChord[step % currentChord.length];

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.3);

      step++;
      const nextDelay = (step % 4 === 0 ? 1200 : 650) + Math.random() * 200;
      this.timer = window.setTimeout(playChime, nextDelay);
    };

    playChime();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
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
}

export const romanticAudio = new RomanticAudio();
