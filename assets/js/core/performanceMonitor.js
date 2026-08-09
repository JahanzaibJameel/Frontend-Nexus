/* ─── Performance Monitor ───────────────────────────────────────────────── */
export const performanceMonitor = {
  _startTime: performance.now(),
  _frameCount: 0,
  _fps: 0,
  _rafId: null,
  _lastFrameTime: performance.now(),

  /** One-second rolling FPS counter. */
  startFpsCounter() {
    const step = (now) => {
      this._frameCount++;
      if (now - this._lastFrameTime >= 1000) {
        this._fps = this._frameCount;
        this._frameCount = 0;
        this._lastFrameTime = now;
      }
      this._rafId = requestAnimationFrame(step);
    };
    this._rafId = requestAnimationFrame(step);
  },

  stopFpsCounter() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  },

  getFPS() { return this._fps; },

  getLoadTime() {
    return Math.round(performance.now() - this._startTime);
  },

  /** Chrome-only: approximate JS heap usage in MB. */
  getMemoryMB() {
    if (performance.memory) {
      return (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
    }
    return null;
  },

  /** Navigation timing summary */
  getTimings() {
    const nav = performance.getEntriesByType('navigation')[0];
    if (!nav) return null;
    return {
      dns:      Math.round(nav.domainLookupEnd - nav.domainLookupStart),
      tcp:      Math.round(nav.connectEnd - nav.connectStart),
      ttfb:     Math.round(nav.responseStart - nav.requestStart),
      domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      load:     Math.round(nav.loadEventEnd - nav.startTime),
    };
  },
};
