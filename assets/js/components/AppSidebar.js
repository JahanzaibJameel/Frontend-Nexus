/* ─── AppSidebar ────────────────────────────────────────────────────────── */
const NAV = [
  { group: 'Core', items: [
    { path: '/',           icon: '🏠', label: 'Home' },
    { path: '/dashboard',  icon: '📊', label: 'Dashboard' },
    { path: '/libraries',  icon: '📚', label: '47 Libraries' },
    { path: '/performance',icon: '⚡', label: 'Performance' },
  ]},
  { group: 'UI Components', items: [
    { path: '/charts',     icon: '📈', label: 'Charts' },
    { path: '/forms',      icon: '📝', label: 'Forms' },
    { path: '/tables',     icon: '🗂️', label: 'Tables' },
    { path: '/kanban',     icon: '📋', label: 'Kanban Board' },
    { path: '/gallery',    icon: '🖼️', label: 'Gallery' },
  ]},
  { group: 'Media & Documents', items: [
    { path: '/media',      icon: '🎬', label: 'Media' },
    { path: '/maps',       icon: '🗺️', label: 'Maps' },
    { path: '/pdf',        icon: '📄', label: 'PDF Studio' },
    { path: '/upload',     icon: '📤', label: 'Upload' },
    { path: '/markdown',   icon: '✍️', label: 'Markdown' },
    { path: '/qr',         icon: '▩',  label: 'QR & Barcode' },
  ]},
  { group: 'Graphics & AI', items: [
    { path: '/ai',         icon: '🤖', label: 'AI Lab' },
    { path: '/three',      icon: '🧊', label: 'Three.js' },
    { path: '/d3',         icon: '📊', label: 'D3.js Deep-Dive' },
    { path: '/webgpu',     icon: '⚡', label: 'WebGPU' },
    { path: '/webxr',      icon: '🥽', label: 'WebXR' },
    { path: '/physics',    icon: '🎱', label: 'Physics' },
    { path: '/canvas',     icon: '🎨', label: 'p5 Canvas' },
    { path: '/browser-api',icon: '🧪', label: '27 Browser APIs' },
  ]},
  { group: 'System', items: [
    { path: '/settings',   icon: '⚙️', label: 'Settings' },
    { path: '/serial',     icon: '🔌', label: 'Web Serial' },
    { path: '/webtransport',icon:'🌐', label: 'WebTransport' },
    { path: '/containers', icon: '📦', label: 'Containers API' },
    { path: '/about',      icon: 'ℹ️', label: 'About' },
  ]},
];

const CSS = `
  :host {
    display: flex;
    flex-direction: column;
    width: var(--sidebar-width, 260px);
    height: 100%;
    background: var(--bg-secondary, #111827);
    border-right: 1px solid var(--border, rgba(148,163,184,0.18));
    overflow-y: auto;
    padding: 16px 0 24px;
    box-sizing: border-box;
  }
  nav { display: grid; gap: 4px; padding: 0 10px; }
  .group-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted, #64748b);
    padding: 16px 10px 6px;
  }
  .group-label:first-child { padding-top: 4px; }
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    text-decoration: none;
    color: var(--text-secondary, #94a3b8);
    font-size: 0.9rem;
    font-weight: 500;
    transition: background 0.18s, color 0.18s;
  }
  a:hover { background: var(--bg-muted, rgba(255,255,255,0.06)); color: var(--text-primary, #e2e8f0); }
  a.active {
    background: rgba(56,189,248,0.12);
    color: var(--accent, #38bdf8);
    font-weight: 600;
  }
  .icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
`;

class AppSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
    this._onRouteChange = this._setActive.bind(this);
    window.addEventListener('app:routeChange', this._onRouteChange);
    window.addEventListener('load', () => this._setActive(), { once: true });
  }

  _render() {
    const items = NAV.map(({ group, items }) => `
      <div class="group-label">${group}</div>
      ${items.map(({ path, icon, label }) => `
        <a href="#${path}" data-path="${path}" aria-label="${label}">
          <span class="icon" aria-hidden="true">${icon}</span>
          ${label}
        </a>
      `).join('')}
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <nav aria-label="Main navigation">${items}</nav>
    `;
  }

  _setActive(e) {
    const currentPath = e?.detail ?? (location.hash.replace(/^#/, '') || '/');
    this.shadowRoot.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.dataset.path === currentPath);
      a.setAttribute('aria-current', a.dataset.path === currentPath ? 'page' : 'false');
    });
  }

  disconnectedCallback() {
    window.removeEventListener('app:routeChange', this._onRouteChange);
  }
}

customElements.define('app-sidebar', AppSidebar);
