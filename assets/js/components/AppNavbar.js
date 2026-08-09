/* ─── AppNavbar ─────────────────────────────────────────────────────────── */
const CSS = `
  :host {
    display: block;
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--bg-secondary, #111827);
    border-bottom: 1px solid var(--border, rgba(148,163,184,0.18));
    height: var(--navbar-height, 64px);
  }
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 24px;
    height: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }
  .left  { display: flex; align-items: center; gap: 12px; }
  .right { display: flex; align-items: center; gap: 8px; }
  .brand {
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.03em;
    color: var(--text-primary, #e2e8f0);
    text-decoration: none;
    white-space: nowrap;
  }
  .brand span { color: var(--accent, #38bdf8); }
  button {
    border: none;
    border-radius: 10px;
    padding: 8px 14px;
    color: var(--text-secondary, #94a3b8);
    background: transparent;
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 500;
    transition: background 0.18s, color 0.18s;
    white-space: nowrap;
  }
  button:hover { background: var(--bg-muted, rgba(255,255,255,0.06)); color: var(--text-primary, #e2e8f0); }
  .btn-palette {
    display: flex; align-items: center; gap: 8px;
    border: 1px solid var(--border, rgba(148,163,184,0.18));
    border-radius: 10px;
  }
  .kbd {
    font-size: 0.75rem;
    background: var(--bg-surface, #1e293b);
    border-radius: 5px;
    padding: 2px 6px;
    color: var(--text-muted, #64748b);
    font-family: monospace;
  }
  .hamburger { display: none; }
  @media (max-width: 900px) {
    .hamburger { display: flex; padding: 8px; font-size: 1.3rem; }
    .btn-palette .palette-label { display: none; }
    .btn-palette .kbd { display: none; }
  }
`;

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <nav class="bar" aria-label="Application navigation">
        <div class="left">
          <button class="hamburger" aria-label="Toggle sidebar" aria-expanded="false" aria-controls="app-sidebar">☰</button>
          <a class="brand" href="#/">Frontend <span>Nexus</span></a>
        </div>
        <div class="right">
          <button class="btn-palette" aria-label="Open command palette (Ctrl+K)" title="Command palette (Ctrl+K)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span class="palette-label">Search</span>
            <kbd class="kbd">Ctrl K</kbd>
          </button>
          <button data-action="install-app" aria-label="Install app as PWA" title="Install app" style="display:none" id="install-btn">
            ⬇ Install
          </button>
        </div>
      </nav>
    `;

    this.shadowRoot.querySelector('.hamburger').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('app:toggleSidebar'));
    });

    this.shadowRoot.querySelector('.btn-palette').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('app:openPalette'));
      // Also trigger the global keydown handler
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });

    window.addEventListener('beforeinstallprompt', () => {
      const btn = this.shadowRoot.getElementById('install-btn');
      if (btn) btn.style.display = '';
    });
  }
}

customElements.define('app-navbar', AppNavbar);
