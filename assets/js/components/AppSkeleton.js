/* ─── AppSkeleton ───────────────────────────────────────────────────────── */
/*
 * Usage: <app-skeleton lines="3" width="100%"></app-skeleton>
 */
const CSS = `
  :host { display: block; }
  .line {
    height: 14px;
    background: linear-gradient(90deg,
      var(--bg-surface, #1e293b) 25%,
      var(--bg-muted, rgba(255,255,255,0.06)) 50%,
      var(--bg-surface, #1e293b) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 999px;
    margin-bottom: 10px;
  }
  .line:last-child { width: 60%; margin-bottom: 0; }
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to   { background-position:  200% 0; }
  }
`;

class AppSkeleton extends HTMLElement {
  connectedCallback() {
    const lines = parseInt(this.getAttribute('lines') || '3', 10);
    const width = this.getAttribute('width') || '100%';
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      ${Array.from({ length: lines }, () => `<div class="line" style="width:${width}" aria-hidden="true"></div>`).join('')}
    `;
    this.setAttribute('aria-busy', 'true');
    this.setAttribute('aria-label', 'Loading content…');
  }
}

customElements.define('app-skeleton', AppSkeleton);
