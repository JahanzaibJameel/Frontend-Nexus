import { showNotification } from '../core/notificationManager.js';

export default class WebXRPage {
  constructor() { this._session = null; this._handlers = []; }

  init() {
    this._on(document.getElementById('xr-enter-btn'), 'click', () => this._enter());
    this._on(document.getElementById('xr-end-btn'), 'click', () => this._end());
  }

  async _enter() {
    const out = document.getElementById('xr-output');
    if (!navigator.xr) { out.textContent = 'WebXR not supported in this browser.'; return; }
    try {
      const supported = await navigator.xr.isSessionSupported('immersive-ar');
      if (!supported) { out.textContent = 'Immersive AR not supported on this device.'; return; }
      this._session = await navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['local'] });
      out.textContent = 'Session started — look around!';
      document.getElementById('xr-enter-btn').disabled = true;
      document.getElementById('xr-end-btn').disabled = false;
      this._session.addEventListener('end', () => { this._session = null; out.textContent = 'Session ended.'; document.getElementById('xr-enter-btn').disabled = false; document.getElementById('xr-end-btn').disabled = true; });
    } catch (e) { out.textContent = 'Failed to start XR session: ' + e.message; }
  }

  async _end() { if (this._session) { await this._session.end(); this._session = null; } }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() { this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn)); this._handlers = []; }
}
