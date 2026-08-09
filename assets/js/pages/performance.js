/* ─── Real-Time Performance Monitor Module ─────────────────────────────── */
export default class PerformancePage {
  constructor() {
    this.fpsHistory = new Array(50).fill(60);
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.animId = null;
    this.intervalId = null;
  }

  init() {
    this.fpsValEl = document.getElementById('perf-fps-val');
    this.memValEl = document.getElementById('perf-mem-val');
    this.memBarEl = document.getElementById('mem-progress-bar');
    this.memUsedStrEl = document.getElementById('mem-used-str');
    this.memLimitStrEl = document.getElementById('mem-limit-str');
    this.canvas = document.getElementById('fps-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.renderMetrics();
    this.startFpsLoop();
    this.intervalId = setInterval(() => this.updateMemory(), 1000);
  }

  renderMetrics() {
    // Navigation timing
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav) {
      document.getElementById('dom-interactive-val').textContent = `${Math.round(nav.domInteractive)} ms`;
      document.getElementById('dom-complete-val').textContent = `${Math.round(nav.domComplete)} ms`;
    }

    document.getElementById('active-route-val').textContent = location.hash || '/performance';
    document.getElementById('online-status-val').textContent = navigator.onLine ? 'Online' : 'Offline';

    // System Environment
    document.getElementById('sys-ua').textContent = navigator.userAgent;
    document.getElementById('sys-screen').textContent = `${window.screen.width} × ${window.screen.height} (${window.devicePixelRatio}x dpr)`;
    document.getElementById('sys-cores').textContent = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('sys-ram').textContent = navigator.deviceMemory ? `~${navigator.deviceMemory}` : 'N/A';
  }

  startFpsLoop() {
    const loop = (now) => {
      this.frameCount++;
      const delta = now - this.lastTime;
      if (delta >= 500) {
        const fps = Math.round((this.frameCount * 1000) / delta);
        if (this.fpsValEl) this.fpsValEl.textContent = `${fps} FPS`;

        this.fpsHistory.shift();
        this.fpsHistory.push(Math.min(60, fps));
        this.drawFpsCanvas();

        this.frameCount = 0;
        this.lastTime = now;
      }
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  drawFpsCanvas() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    const step = w / (this.fpsHistory.length - 1);
    this.fpsHistory.forEach((fps, i) => {
      const y = h - (fps / 60) * h;
      const x = i * step;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });

    this.ctx.stroke();
  }

  updateMemory() {
    if (performance.memory) {
      const usedMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      const limitMB = Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024));
      const pct = Math.min(100, Math.round((usedMB / limitMB) * 100));

      if (this.memValEl) this.memValEl.textContent = `${usedMB} MB`;
      if (this.memBarEl) this.memBarEl.style.width = `${pct}%`;
      if (this.memUsedStrEl) this.memUsedStrEl.textContent = `Used: ${usedMB} MB`;
      if (this.memLimitStrEl) this.memLimitStrEl.textContent = `Limit: ${limitMB} MB`;
    } else {
      if (this.memValEl) this.memValEl.textContent = 'N/A';
      if (this.memUsedStrEl) this.memUsedStrEl.textContent = 'Performance.memory not exposed';
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.intervalId) clearInterval(this.intervalId);
    this.animId = null;
    this.intervalId = null;
  }
}
