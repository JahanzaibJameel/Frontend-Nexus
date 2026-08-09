/* ─── AppDropdown ───────────────────────────────────────────────────────── */
/*
 * Usage:
 *   <app-dropdown label="Options">
 *     <a href="#">Item 1</a>
 *     <a href="#">Item 2</a>
 *   </app-dropdown>
 */
const CSS = `
  :host { position: relative; display: inline-block; }
  button {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 14px; border-radius: 10px;
    background: var(--bg-surface, #1e293b);
    border: 1px solid var(--border, rgba(148,163,184,0.18));
    color: var(--text-primary, #e2e8f0);
    font-size: 0.9rem; font-weight: 500; cursor: pointer;
    transition: background 0.15s;
  }
  button:hover { background: var(--bg-muted, rgba(255,255,255,0.06)); }
  .arrow { transition: transform 0.2s; }
  :host([open]) .arrow { transform: rotate(180deg); }
  .menu {
    position: absolute; top: calc(100% + 6px); left: 0;
    min-width: 180px; background: var(--bg-secondary, #111827);
    border: 1px solid var(--border, rgba(148,163,184,0.18));
    border-radius: 12px; box-shadow: var(--shadow, 0 8px 40px rgba(0,0,0,0.3));
    padding: 6px; z-index: 200;
    animation: dropIn 0.18s ease both;
  }
  @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  :host(:not([open])) .menu { display: none; }
  ::slotted(*) {
    display: block; padding: 9px 14px; border-radius: 8px;
    color: var(--text-secondary, #94a3b8); font-size: 0.88rem;
    text-decoration: none; cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  ::slotted(*:hover) { background: var(--bg-muted, rgba(255,255,255,0.06)); color: var(--text-primary, #e2e8f0); }
`;

class AppDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const label = this.getAttribute('label') || 'Menu';
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <button aria-haspopup="true" aria-expanded="false">
        ${label} <span class="arrow" aria-hidden="true">▾</span>
      </button>
      <div class="menu" role="menu"><slot></slot></div>
    `;
    this._btn = this.shadowRoot.querySelector('button');
    this._btn.addEventListener('click', e => { e.stopPropagation(); this._toggle(); });
    document.addEventListener('click', () => this._close());
  }
  _toggle() {
    const open = this.hasAttribute('open');
    open ? this._close() : this._open();
  }
  _open()  { this.setAttribute('open',''); this._btn.setAttribute('aria-expanded','true'); }
  _close() { this.removeAttribute('open'); this._btn.setAttribute('aria-expanded','false'); }
}

customElements.define('app-dropdown', AppDropdown);
