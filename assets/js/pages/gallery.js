const PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', tag: 'nature',  caption: 'Mountain Summit' },
  { id: 2, url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', tag: 'city',    caption: 'City Skyline' },
  { id: 3, url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', tag: 'travel',  caption: 'Hotel Pool' },
  { id: 4, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', tag: 'nature',  caption: 'Forest Path' },
  { id: 5, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', tag: 'city',    caption: 'NYC at Dusk' },
  { id: 6, url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', tag: 'nature',  caption: 'Rolling Hills' },
  { id: 7, url: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800', tag: 'abstract',caption: 'Light Trails' },
  { id: 8, url: 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=800', tag: 'travel',  caption: 'Desert Dunes' },
  { id: 9, url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', tag: 'travel',  caption: 'Nordic Ice' },
  { id:10, url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800', tag: 'abstract',caption: 'Code Screen' },
  { id:11, url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800', tag: 'nature',  caption: 'Starry Night' },
  { id:12, url: 'https://images.unsplash.com/photo-1435224668334-0f82ec57b605?w=800', tag: 'city',    caption: 'Street Art' },
];

export default class GalleryPage {
  constructor() { this._handlers = []; this._activeTag = 'all'; }

  init() {
    this._renderFilters();
    this._renderGrid('all');
    this._initLightbox();
  }

  _renderFilters() {
    const tags = ['all', 'nature', 'city', 'travel', 'abstract'];
    const bar = document.getElementById('gallery-filters');
    if (!bar) return;
    bar.innerHTML = tags.map(t => `<button class="btn-secondary btn-sm ${t === 'all' ? 'active' : ''}" data-filter="${t}" aria-pressed="${t === 'all'}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('');
    bar.querySelectorAll('button').forEach(btn => {
      this._on(btn, 'click', () => {
        bar.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
        this._activeTag = btn.dataset.filter;
        this._renderGrid(this._activeTag);
      });
    });
  }

  _renderGrid(tag) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const photos = tag === 'all' ? PHOTOS : PHOTOS.filter(p => p.tag === tag);
    grid.innerHTML = photos.map((p, i) => `
      <figure class="gallery-item" data-index="${i}" data-id="${p.id}" role="button" tabindex="0" aria-label="View ${p.caption}">
        <img src="${p.url}&q=60&auto=format" alt="${p.caption}" loading="lazy" decoding="async" width="400" height="300" />
        <figcaption>${p.caption}</figcaption>
      </figure>
    `).join('');
    this._current = photos;
    grid.querySelectorAll('.gallery-item').forEach(el => {
      this._on(el, 'click', () => this._openLightbox(parseInt(el.dataset.index, 10)));
      this._on(el, 'keydown', e => { if (e.key === 'Enter') this._openLightbox(parseInt(el.dataset.index, 10)); });
    });
  }

  _initLightbox() {
    const dlg = document.getElementById('gallery-lightbox');
    if (!dlg) return;
    this._dlg = dlg;
    const btnClose = dlg.querySelector('#lb-close');
    const btnPrev  = dlg.querySelector('#lb-prev');
    const btnNext  = dlg.querySelector('#lb-next');
    this._on(btnClose, 'click', () => dlg.close());
    this._on(btnPrev,  'click', () => this._lbNav(-1));
    this._on(btnNext,  'click', () => this._lbNav(1));
    this._on(dlg, 'click', e => { if (e.target === dlg) dlg.close(); });
    this._on(document, 'keydown', e => {
      if (!dlg.open) return;
      if (e.key === 'ArrowLeft')  this._lbNav(-1);
      if (e.key === 'ArrowRight') this._lbNav(1);
      if (e.key === 'Escape')     dlg.close();
    });
  }

  _openLightbox(index) {
    if (!this._dlg) return;
    this._lbIndex = index;
    this._lbUpdate();
    this._dlg.showModal();
  }

  _lbNav(dir) {
    this._lbIndex = (this._lbIndex + dir + this._current.length) % this._current.length;
    this._lbUpdate();
  }

  _lbUpdate() {
    const p = this._current[this._lbIndex];
    if (!p) return;
    const img = this._dlg.querySelector('#lb-img');
    const cap = this._dlg.querySelector('#lb-caption');
    if (img) { img.src = p.url + '&q=80&auto=format'; img.alt = p.caption; }
    if (cap) cap.textContent = `${p.caption}  (${this._lbIndex + 1} / ${this._current.length})`;
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
