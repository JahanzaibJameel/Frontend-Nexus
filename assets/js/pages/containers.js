import { showNotification } from '../core/notificationManager.js';

export default class ContainersPage {
  constructor() { this._handlers = []; }

  init() {
    this._on(document.getElementById('ctr-load-btn'), 'click', () => this._loadContainer());
  }

  async _loadContainer() {
    const out = document.getElementById('ctr-output');
    if (!('containers' in window)) { out.textContent = 'Containers API not supported in this browser.'; return; }
    try {
      const container = await window.containers.open({ url: 'https://example.com' });
      out.innerHTML = '<b>Container opened!</b><br/>Origin: ' + container.origin + '<br/>Ready for messaging.';
      container.addEventListener('message', (e) => out.innerHTML += '<br/>Message: ' + e.data);
      showNotification('Container loaded', 'success');
    } catch (e) { out.textContent = 'Error: ' + e.message; }
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() { this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn)); this._handlers = []; }
}
