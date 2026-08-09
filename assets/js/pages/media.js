import { loadLibrary } from '../core/libraryLoader.js';

export default class MediaPage {
  constructor() {
    this._plyr = null;
    this._audioCtx = null;
    this._analyser = null;
    this._rafId = null;
    this._handlers = [];
  }

  async init() {
    await this._initVideo();
    this._initAudioVisualizer();
  }

  async _initVideo() {
    try {
      await loadLibrary('plyr');
      const el = document.getElementById('plyr-video');
      if (el && window.Plyr) {
        this._plyr = new Plyr(el, {
          controls: ['play-large','play','progress','current-time','mute','volume','fullscreen'],
        });
      }
    } catch (err) {
      console.warn('[Media] Plyr failed:', err);
    }
  }

  _initAudioVisualizer() {
    const audio  = document.getElementById('audio-player');
    const canvas = document.getElementById('audio-visualizer');
    if (!audio || !canvas) return;

    const ctx2d = canvas.getContext('2d');
    let connected = false;

    const connect = () => {
      if (connected) return;
      connected = true;
      this._audioCtx = new AudioContext();
      const source   = this._audioCtx.createMediaElementSource(audio);
      this._analyser = this._audioCtx.createAnalyser();
      this._analyser.fftSize = 128;
      source.connect(this._analyser);
      this._analyser.connect(this._audioCtx.destination);
      this._drawVisualizer(ctx2d, canvas);
    };

    const onPlay = () => {
      if (this._audioCtx?.state === 'suspended') this._audioCtx.resume();
      connect();
    };

    audio.addEventListener('play', onPlay);
    this._handlers.push({ el: audio, evt: 'play', fn: onPlay });
  }

  _drawVisualizer(ctx2d, canvas) {
    if (!this._analyser) return;
    const bufLen = this._analyser.frequencyBinCount;
    const data   = new Uint8Array(bufLen);

    const draw = () => {
      this._rafId = requestAnimationFrame(draw);
      this._analyser.getByteFrequencyData(data);
      const w = canvas.offsetWidth; const h = canvas.height;
      canvas.width = w;
      ctx2d.clearRect(0, 0, w, h);
      const barW = (w / bufLen) * 2.2;
      let x = 0;
      data.forEach(val => {
        const barH = (val / 255) * h;
        const hue = (val / 255) * 180 + 180;
        ctx2d.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx2d.fillRect(x, h - barH, barW - 1, barH);
        x += barW;
      });
    };
    draw();
  }

  destroy() {
    cancelAnimationFrame(this._rafId);
    if (this._audioCtx) { this._audioCtx.close(); this._audioCtx = null; }
    if (this._plyr) { this._plyr.destroy(); this._plyr = null; }
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
