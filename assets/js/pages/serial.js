import { showNotification } from '../core/notificationManager.js';

export default class SerialPage {
  constructor() { this._port = null; this._reader = null; this._handlers = []; }

  init() {
    this._log = document.getElementById('serial-log');
    this._on(document.getElementById('serial-connect-btn'), 'click', () => this._connect());
    this._on(document.getElementById('serial-disconnect-btn'), 'click', () => this._disconnect());
    this._on(document.getElementById('serial-send-btn'), 'click', () => this._send());
  }

  _logMsg(msg) { if (this._log) { this._log.textContent += msg + '\n'; this._log.scrollTop = this._log.scrollHeight; } }

  async _connect() {
    if (!navigator.serial) { showNotification('Web Serial not supported', 'warning'); return; }
    try {
      this._port = await navigator.serial.requestPort();
      await this._port.open({ baudRate: 9600 });
      this._logMsg('Connected at 9600 baud');
      document.getElementById('serial-connect-btn').disabled = true;
      document.getElementById('serial-disconnect-btn').disabled = false;
      document.getElementById('serial-send-btn').disabled = false;
      this._readLoop();
    } catch (e) { showNotification('Serial connect failed: ' + e.message, 'warning'); }
  }

  async _readLoop() {
    if (!this._port) return;
    const decoder = new TextDecoderStream();
    this._reader = this._port.readable.pipeThrough(decoder).getReader();
    while (true) { const { value, done } = await this._reader.read(); if (done) break; this._logMsg('← ' + value); }
  }

  async _send() {
    const input = document.getElementById('serial-data');
    const text = input?.value; if (!text || !this._port) return;
    const writer = this._port.writable.getWriter();
    await writer.write(new TextEncoder().encode(text));
    writer.releaseLock();
    this._logMsg('→ ' + text);
    if (input) input.value = '';
  }

  async _disconnect() {
    if (this._reader) { try { await this._reader.cancel(); } catch {} this._reader = null; }
    if (this._port) { try { await this._port.close(); } catch {} this._port = null; }
    this._logMsg('Disconnected');
    document.getElementById('serial-connect-btn').disabled = false;
    document.getElementById('serial-disconnect-btn').disabled = true;
    document.getElementById('serial-send-btn').disabled = true;
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._disconnect();
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
