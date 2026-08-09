/* ─── AppLoader ─────────────────────────────────────────────────────────── */
/*
 * Usage: <app-loader></app-loader>
 * Add 'hidden' attribute to hide: <app-loader hidden></app-loader>
 */
const CSS = `
  :host { display: flex; align-items: center; justify-content: center; padding: 48px; }
  :host([hidden]) { display: none; }
  .spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--bg-muted, rgba(255,255,255,0.06));
    border-top-color: var(--accent, #38bdf8);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

class AppLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="spinner" role="status" aria-label="Loading…"></div>
    `;
  }
}

customElements.define('app-loader', AppLoader);
