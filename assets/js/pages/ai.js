import { loadLibrary } from '../core/libraryLoader.js';
import { showNotification } from '../core/notificationManager.js';

const setStatus = (id, text, pct = null) => {
  const bar  = document.getElementById(`bar-${id}`);
  const span = document.getElementById(`status-${id}`);
  if (bar && pct !== null) bar.style.width = pct + '%';
  if (span) span.textContent = text;
};

const setOutput = (text) => {
  const el = document.getElementById('ai-output');
  if (el) el.textContent = text;
};

export default class AIPage {
  constructor() {
    this._mobilenet  = null;
    this._cocossd    = null;
    this._blazeface  = null;
    this._handpose   = null;
    this._webcamStream = null;
    this._handlers   = [];
  }

  init() {
    this._on(document.getElementById('ai-load-models'), 'click', () => this._loadModels());
    this._on(document.getElementById('ai-classify'),    'click', () => this._classify());
    this._on(document.getElementById('ai-detect'),      'click', () => this._detect());
    this._on(document.getElementById('ai-face'),        'click', () => this._detectFace());
    this._on(document.getElementById('ai-hand'),        'click', () => this._detectHand());
    this._on(document.getElementById('ai-webcam-btn'),  'click', () => this._toggleWebcam());
  }

  async _loadModels() {
    const btn = document.getElementById('ai-load-models');
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }

    try {
      setStatus('tf', 'Loading…', 30);
      await loadLibrary('tensorflow');
      setStatus('tf', 'Ready ✓', 100);

      setStatus('mobilenet', 'Loading…', 20);
      await loadLibrary('mobilenet');
      setStatus('mobilenet', 'Loading model…', 50);
      this._mobilenet = await window.mobilenet.load();
      setStatus('mobilenet', 'Ready ✓', 100);

      setStatus('cocossd', 'Loading…', 20);
      await loadLibrary('cocossd');
      setStatus('cocossd', 'Loading model…', 50);
      this._cocossd = await window.cocoSsd.load();
      setStatus('cocossd', 'Ready ✓', 100);

      setStatus('blazeface', 'Loading…', 20);
      await loadLibrary('blazeface');
      setStatus('blazeface', 'Loading model…', 50);
      this._blazeface = await window.blazeface.load();
      setStatus('blazeface', 'Ready ✓', 100);

      setStatus('handpose', 'Loading…', 20);
      await loadLibrary('handpose');
      setStatus('handpose', 'Loading model…', 50);
      this._handpose = await window.handpose.load();
      setStatus('handpose', 'Ready ✓', 100);

      showNotification('AI models loaded!', 'success');
      setOutput('Models ready. Click Classify, Detect, Face, or Hand Pose.');
    } catch (err) {
      showNotification('Failed to load AI models: ' + err.message, 'danger');
      setOutput('Error: ' + err.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '⬇ Load Models'; }
    }
  }

  async _classify() {
    if (!this._mobilenet) { showNotification('Load models first.', 'warning'); return; }
    setOutput('Classifying…');
    try {
      const src = this._webcamStream
        ? document.getElementById('ai-webcam')
        : document.getElementById('ai-img');
      const preds = await this._mobilenet.classify(src);
      setOutput(preds.slice(0, 5).map(p =>
        `${p.className.split(',')[0].trim()}: ${(p.probability * 100).toFixed(1)}%`
      ).join('\n'));
    } catch (err) { setOutput('Classification failed: ' + err.message); }
  }

  async _detect() {
    if (!this._cocossd) { showNotification('Load models first.', 'warning'); return; }
    setOutput('Detecting objects…');
    try {
      const src = this._webcamStream
        ? document.getElementById('ai-webcam')
        : document.getElementById('ai-img');
      const preds = await this._cocossd.detect(src);
      if (!preds.length) { setOutput('No objects detected.'); return; }
      setOutput(preds.map(p =>
        `${p.class}: ${(p.score * 100).toFixed(1)}% (box: [${p.bbox.map(n => n.toFixed(0)).join(', ')}])`
      ).join('\n'));
    } catch (err) { setOutput('Detection failed: ' + err.message); }
  }

  async _detectFace() {
    if (!this._blazeface) { showNotification('Load models first.', 'warning'); return; }
    setOutput('Detecting faces…');
    try {
      const src = this._webcamStream
        ? document.getElementById('ai-webcam')
        : document.getElementById('ai-img');
      const preds = await this._blazeface.estimateFaces(src, false);
      if (!preds.length) { setOutput('No faces detected.'); return; }
      setOutput(preds.map((p, i) => `Face ${i + 1}: ${(p.probability[0] * 100).toFixed(1)}%`).join('\n'));
    } catch (err) { setOutput('Face detection failed: ' + err.message); }
  }

  async _detectHand() {
    if (!this._handpose) { showNotification('Load models first.', 'warning'); return; }
    setOutput('Detecting hands…');
    try {
      const src = this._webcamStream
        ? document.getElementById('ai-webcam')
        : document.getElementById('ai-img');
      const preds = await this._handpose.estimateHands(src);
      if (!preds.length) { setOutput('No hands detected.'); return; }
      setOutput(`Hand detected with ${preds[0].landmarks.length} landmarks.`);
    } catch (err) { setOutput('Hand detection failed: ' + err.message); }
  }

  async _toggleWebcam() {
    if (this._webcamStream) {
      this._stopWebcam();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this._webcamStream = stream;
      const video = document.getElementById('ai-webcam');
      const img   = document.getElementById('ai-img');
      if (video) { video.srcObject = stream; video.style.display = 'block'; }
      if (img)   img.style.display = 'none';
      const btn = document.getElementById('ai-webcam-btn');
      if (btn) btn.textContent = '🚫 Stop Webcam';
    } catch { showNotification('Camera access denied.', 'warning'); }
  }

  _stopWebcam() {
    this._webcamStream?.getTracks().forEach(t => t.stop());
    this._webcamStream = null;
    const video = document.getElementById('ai-webcam');
    const img   = document.getElementById('ai-img');
    if (video) { video.srcObject = null; video.style.display = 'none'; }
    if (img)   img.style.display = 'block';
    const btn = document.getElementById('ai-webcam-btn');
    if (btn) btn.textContent = '📷 Webcam';
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._stopWebcam();
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
