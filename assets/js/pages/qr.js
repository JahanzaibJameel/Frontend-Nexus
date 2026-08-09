/* ─── QR & Barcode Generator Module ────────────────────────────────────── */
import { loadLibrary } from '../core/libraryLoader.js';
import { showNotification } from '../core/notificationManager.js';

export default class QrPage {
  constructor() {
    this.qrInstance = null;
    this._handlers = [];
  }

  async init() {
    this.qrContainer = document.getElementById('qrcode-container');
    this.qrInput = document.getElementById('qr-input');
    this.downloadBtn = document.getElementById('download-qr-btn');
    this.barcodeSvg = document.getElementById('barcode-svg');
    this.barcodeInput = document.getElementById('barcode-input');
    this.barcodeFormat = document.getElementById('barcode-format');

    await this.initQR();
    await this.initBarcode();

    this._on(this.qrInput, 'input', () => this.updateQR());
    this._on(this.downloadBtn, 'click', () => this.downloadQR());
    this._on(this.barcodeInput, 'input', () => this.updateBarcode());
    this._on(this.barcodeFormat, 'change', () => this.updateBarcode());
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  async initQR() {
    try {
      const QRCode = await loadLibrary('qrcodejs');
      if (!QRCode || !this.qrContainer) return;

      this.qrContainer.innerHTML = '';
      const text = this.qrInput ? this.qrInput.value : 'https://github.com/frontend-nexus';
      this.qrInstance = new QRCode(this.qrContainer, {
        text: text,
        width: 180,
        height: 180,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel ? QRCode.CorrectLevel.H : 2
      });
    } catch (err) {
      console.warn('[QR] QRCode.js load failed:', err);
    }
  }

  updateQR() {
    if (!this.qrInstance || !this.qrInput) return;
    const text = this.qrInput.value.trim() || 'Frontend Nexus';
    this.qrInstance.clear();
    this.qrInstance.makeCode(text);
  }

  downloadQR() {
    const img = this.qrContainer?.querySelector('img');
    const canvas = this.qrContainer?.querySelector('canvas');
    const src = img ? img.src : (canvas ? canvas.toDataURL('image/png') : null);

    if (!src) {
      showNotification('QR image not ready for download.', 'warning');
      return;
    }

    const a = document.createElement('a');
    a.href = src;
    a.download = 'qrcode.png';
    a.click();
    showNotification('QR Code downloaded!', 'success');
  }

  async initBarcode() {
    try {
      const JsBarcode = await loadLibrary('jsbarcode');
      if (!JsBarcode || !this.barcodeSvg) return;
      this.updateBarcode();
    } catch (err) {
      console.warn('[Barcode] JsBarcode load failed:', err);
    }
  }

  updateBarcode() {
    if (!window.JsBarcode || !this.barcodeSvg || !this.barcodeInput) return;
    try {
      const val = this.barcodeInput.value.trim() || '123456789';
      const format = this.barcodeFormat ? this.barcodeFormat.value : 'CODE128';

      window.JsBarcode(this.barcodeSvg, val, {
        format: format,
        lineColor: '#0f172a',
        width: 2,
        height: 70,
        displayValue: true
      });
    } catch (e) {
      // Invalid format input
    }
  }

  destroy() {
    this.qrInstance = null;
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
