/* ─── AppFooter ─────────────────────────────────────────────────────────── */
const CSS = `
  :host {
    display: block;
    background: var(--bg-secondary, #111827);
    border-top: 1px solid var(--border, rgba(148,163,184,0.18));
    padding: 18px 24px;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 1600px;
    margin: 0 auto;
    font-size: 0.82rem;
    color: var(--text-muted, #64748b);
  }
  a { color: var(--accent, #38bdf8); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .right { display: flex; gap: 16px; }
`;

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <footer>
        <span>© ${new Date().getFullYear()} Frontend Nexus — 47 Libraries · 27 Browser APIs · 100+ Demos</span>
        <div class="right">
          <a href="#/about">About</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
