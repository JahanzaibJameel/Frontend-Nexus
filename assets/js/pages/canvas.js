import { loadLibrary } from '../core/libraryLoader.js';

export default class CanvasPage {
  constructor() {
    this._drawing   = false;
    this._mode      = 'paint';  // 'paint' | 'erase' | 'generative'
    this._color     = '#38bdf8';
    this._lineWidth = 4;
    this._p5inst    = null;
    this._handlers  = [];
    this._rafId     = null;
  }

  async init() {
    this._initPaintCanvas();
    this._bindControls();
    await this._initGenerative();
  }

  _initPaintCanvas() {
    const canvas = document.getElementById('painting-canvas');
    if (!canvas) return;
    const resize = () => {
      const data = canvas.toDataURL();
      canvas.width  = canvas.offsetWidth;
      canvas.height = 460;
      const img = new Image();
      img.onload = () => canvas.getContext('2d').drawImage(img, 0, 0);
      img.src = data;
    };
    resize();

    const ctx = canvas.getContext('2d');
    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches?.[0] ?? e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    const start = (e) => {
      this._drawing = true;
      ctx.beginPath();
      const p = getPos(e);
      ctx.moveTo(p.x, p.y);
    };
    const draw = (e) => {
      if (!this._drawing) return;
      if (e.cancelable) e.preventDefault();
      const p = getPos(e);
      if (this._mode === 'erase') {
        ctx.clearRect(p.x - 10, p.y - 10, 20, 20);
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = this._color;
        ctx.lineWidth   = this._lineWidth;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      }
    };
    const stop  = () => { this._drawing = false; ctx.beginPath(); };

    for (const [e, fn] of [['mousedown',start],['mousemove',draw],['mouseup',stop],
      ['mouseleave',stop],['touchstart',start],['touchmove',draw],['touchend',stop]]) {
      canvas.addEventListener(e, fn, { passive: false });
      this._handlers.push({ el: canvas, evt: e, fn });
    }
    window.addEventListener('resize', resize, { passive: true });
    this._handlers.push({ el: window, evt: 'resize', fn: resize });
  }

  _bindControls() {
    const colorPicker = document.getElementById('canvas-color');
    const sizePicker  = document.getElementById('canvas-size');
    const clearBtn    = document.getElementById('canvas-clear');
    const saveBtn     = document.getElementById('canvas-save');
    const eraseBtn    = document.getElementById('canvas-erase');
    const paintBtn    = document.getElementById('canvas-paint');
    const genBtn      = document.getElementById('canvas-gen');

    this._on(colorPicker, 'input', e => { this._color = e.target.value; this._mode = 'paint'; });
    this._on(sizePicker,  'input', e => { this._lineWidth = parseInt(e.target.value, 10); });
    this._on(clearBtn,    'click', () => {
      const cv = document.getElementById('painting-canvas');
      if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    });
    this._on(saveBtn,     'click', () => {
      const cv = document.getElementById('painting-canvas');
      if (!cv) return;
      const a = Object.assign(document.createElement('a'), { href: cv.toDataURL(), download: 'artwork.png' });
      a.click();
    });
    this._on(eraseBtn,    'click', () => { this._mode = 'erase'; this._setToolActive('canvas-erase'); });
    this._on(paintBtn,    'click', () => { this._mode = 'paint'; this._setToolActive('canvas-paint'); });
    this._on(genBtn,      'click', () => this._runGenerative());
  }

  _setToolActive(id) {
    ['canvas-paint','canvas-erase'].forEach(bid => {
      const b = document.getElementById(bid);
      if (b) b.classList.toggle('active', bid === id);
    });
  }

  async _initGenerative() {
    try { await loadLibrary('p5'); } catch {}
  }

  _runGenerative() {
    const canvas = document.getElementById('painting-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const colors = ['#38bdf8','#818cf8','#22c55e','#f59e0b','#ef4444','#f472b6'];

    // Generative wave art
    for (let layer = 0; layer < 8; layer++) {
      const hue   = (layer * 44) % 360;
      const amp   = 60 + layer * 15;
      const freq  = 0.01 + layer * 0.005;
      const yBase = h / 2 + (layer - 4) * 20;
      ctx.beginPath();
      ctx.strokeStyle = colors[layer % colors.length];
      ctx.lineWidth   = 2;
      ctx.globalAlpha = 0.6;
      for (let x = 0; x < w; x++) {
        const y = yBase + Math.sin(x * freq + layer) * amp + Math.cos(x * freq * 0.5 + layer * 0.3) * amp * 0.5;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    cancelAnimationFrame(this._rafId);
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
