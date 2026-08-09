/* ─── AppTabs ───────────────────────────────────────────────────────────── */
/*
 * Usage:
 *   <app-tabs labels='["Tab A","Tab B"]'>
 *     <div slot="panel-0">Content A</div>
 *     <div slot="panel-1">Content B</div>
 *   </app-tabs>
 */
const CSS = `
  :host { display: block; }
  .tablist {
    display: flex; gap: 4px; border-bottom: 1px solid var(--border, rgba(148,163,184,0.18));
    padding: 0 4px; flex-wrap: wrap;
  }
  button {
    padding: 10px 18px; background: none; border: none; cursor: pointer;
    font-size: 0.9rem; font-weight: 500;
    color: var(--text-muted, #64748b);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.18s, border-color 0.18s;
    border-radius: 8px 8px 0 0;
  }
  button:hover { color: var(--text-primary, #e2e8f0); }
  button[aria-selected="true"] { color: var(--accent, #38bdf8); border-bottom-color: var(--accent, #38bdf8); }
  .panels { padding: 20px 0 0; }
  ::slotted([slot]) { display: none; }
  ::slotted(.active-panel) { display: block; animation: fadePanel 0.22s ease both; }
  @keyframes fadePanel { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
`;

class AppTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._active = 0;
  }

  connectedCallback() { this._render(); }

  _getLabels() {
    try { return JSON.parse(this.getAttribute('labels') || '[]'); }
    catch { return []; }
  }

  _render() {
    const labels = this._getLabels();
    const tabs = labels.map((l, i) => `
      <button role="tab" aria-selected="${i === 0}" aria-controls="panel-${i}" id="tab-${i}">${l}</button>
    `).join('');
    const slots = labels.map((_, i) => `<slot name="panel-${i}"></slot>`).join('');

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="tablist" role="tablist">${tabs}</div>
      <div class="panels">${slots}</div>
    `;

    this._setActive(0);

    this.shadowRoot.querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => this._setActive(i));
      btn.addEventListener('keydown', e => {
        const total = labels.length;
        if (e.key === 'ArrowRight') this._setActive((i + 1) % total);
        if (e.key === 'ArrowLeft')  this._setActive((i - 1 + total) % total);
      });
    });
  }

  _setActive(index) {
    this._active = index;
    const labels = this._getLabels();
    this.shadowRoot.querySelectorAll('button').forEach((btn, i) => {
      btn.setAttribute('aria-selected', i === index);
      btn.tabIndex = i === index ? 0 : -1;
    });
    labels.forEach((_, i) => {
      const slotEl = this.querySelector(`[slot="panel-${i}"]`);
      if (slotEl) slotEl.classList.toggle('active-panel', i === index);
    });
  }
}

customElements.define('app-tabs', AppTabs);
