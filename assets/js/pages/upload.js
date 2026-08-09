export default class UploadPage {
  constructor() {
    this._handlers = [];
    this._timers = [];
  }

  init() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('upload-input');
    const list  = document.getElementById('upload-list');

    this._on(zone, 'click', () => input?.click());
    this._on(zone, 'dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    this._on(zone, 'dragleave', () => zone.classList.remove('drag-over'));
    this._on(zone, 'drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      this._processFiles(e.dataTransfer.files, list);
    });
    this._on(input, 'change', () => { this._processFiles(input.files, list); input.value = ''; });
    this._on(zone, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input?.click(); } });
  }

  _processFiles(files, list) {
    Array.from(files).forEach(file => {
      const li = document.createElement('li');
      li.className = 'upload-item';

      const isImage = file.type.startsWith('image/');
      const iconEl = document.createElement(isImage ? 'img' : 'div');
      if (isImage) {
        iconEl.className = 'upload-item-preview';
        iconEl.alt = file.name;
        const reader = new FileReader();
        reader.onload = e => { iconEl.src = e.target.result; };
        reader.readAsDataURL(file);
      } else {
        iconEl.className = 'upload-item-icon';
        iconEl.textContent = this._fileIcon(file.type);
        iconEl.setAttribute('aria-hidden', 'true');
      }

      const size = file.size < 1048576
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / 1048576).toFixed(1)} MB`;

      const info = document.createElement('div');
      info.innerHTML = `
        <div style="font-weight:600;font-size:0.88rem;color:var(--text-primary)">${this._escape(file.name)}</div>
        <div style="font-size:0.78rem;color:var(--text-muted)">${size} — ${file.type || 'unknown type'}</div>
        <div class="upload-progress"><div class="upload-progress-bar" style="width:0%"></div></div>
      `;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-secondary btn-sm';
      removeBtn.textContent = '×';
      removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
      removeBtn.onclick = () => li.remove();

      li.append(iconEl, info, removeBtn);
      list?.appendChild(li);

      const bar = info.querySelector('.upload-progress-bar');
      let pct = 0;
      const timer = setInterval(() => {
        pct += Math.random() * 25 + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(timer);
          bar.style.background = 'var(--success)';
        }
        bar.style.width = pct + '%';
      }, 250);
      this._timers.push(timer);
    });
  }

  _fileIcon(type) {
    if (type.includes('pdf'))   return '📄';
    if (type.includes('video')) return '🎬';
    if (type.includes('audio')) return '🎵';
    if (type.includes('zip') || type.includes('archive')) return '🗜️';
    return '📎';
  }

  _escape(str) { return str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;' }[c])); }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._timers.forEach(id => clearInterval(id));
    this._timers = [];
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
