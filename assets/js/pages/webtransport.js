import { showNotification } from '../core/notificationManager.js';

const ECHO_URL = 'https://demo.webtransport.dev';

export default class WebTransportPage {
  constructor() { this._transport = null; this._handlers = []; }

  init() {
    this._log = document.getElementById('wt-log');
    this._on(document.getElementById('wt-connect-btn'), 'click', () => this._connect());
    this._on(document.getElementById('wt-close-btn'), 'click', () => this._close());
    this._on(document.getElementById('wt-send-btn'), 'click', () => this._send());
  }

  _logMsg(msg) { if (this._log) { this._log.textContent += msg + '\n'; this._log.scrollTop = this._log.scrollHeight; } }

  async _connect() {
    if (!window.WebTransport) { showNotification('WebTransport not supported', 'warning'); return; }
    try {
      this._transport = new WebTransport(ECHO_URL);
      this._transport.closed.then(() => { this._logMsg('Connection closed'); this._setConnected(false); }).catch(() => {});
      await this._transport.ready;
      this._logMsg('Connected to ' + ECHO_URL);
      this._setConnected(true);
    } catch (e) { showNotification('WebTransport connect failed: ' + e.message, 'danger'); }
  }

  async _send() {
    const input = document.getElementById('wt-message');
    const text = input?.value; if (!text || !this._transport?.datagrams) return;
    try {
      const writer = this._transport.datagrams.getWriter();
      await writer.write(new TextEncoder().encode(text));
      writer.releaseLock();
      this._logMsg('→ ' + text);
      if (input) input.value = '';
    } catch (e) { showNotification('Send failed: ' + e.message, 'warning'); }
  }

  async _close() { if (this._transport) { try { await this._transport.close(); } catch {} this._transport = null; this._setConnected(false); this._logMsg('Closed'); } }

  _setConnected(on) {
    document.getElementById('wt-connect-btn').disabled = on;
    document.getElementById('wt-close-btn').disabled = !on;
    document.getElementById('wt-send-btn').disabled = !on;
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._close();
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
