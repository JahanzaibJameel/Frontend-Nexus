/* ─── AppModal ──────────────────────────────────────────────────────────── */
/*
 * Usage:
 *   <app-modal id="my-modal" title="Hello">
 *     <p slot="body">Content here</p>
 *     <button slot="footer" data-close>Close</button>
 *   </app-modal>
 *
 *   document.getElementById('my-modal').show();
 *   document.getElementById('my-modal').hide();
 */
const CSS = `
  dialog {
    border: 1px solid var(--border, rgba(148,163,184,0.18));
    border-radius: var(--radius-lg, 24px);
    background: var(--bg-secondary, #111827);
    color: var(--text-primary, #e2e8f0);
    padding: 0;
    width: min(92vw, 540px);
    box-shadow: var(--shadow-lg, 0 24px 80px rgba(0,0,0,0.4));
    animation: scaleIn 0.22s ease both;
  }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
  dialog::backdrop { background: rgba(0,0,0,0.55); backdrop-filter: blur(8px); }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 0;
  }
  h2 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0; }
  .close {
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-muted, #64748b);
    font-size: 1.4rem;
    padding: 4px 8px;
    border-radius: 8px;
    line-height: 1;
    transition: background 0.15s;
  }
  .close:hover { background: var(--bg-muted, rgba(255,255,255,0.06)); color: var(--text-primary, #e2e8f0); }
  .body { padding: 16px 24px 20px; }
  .footer {
    padding: 0 24px 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

class AppModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title') || '';
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <dialog>
        <div class="header">
          <h2>${title}</h2>
          <button class="close" aria-label="Close modal">×</button>
        </div>
        <div class="body"><slot name="body"></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </dialog>
    `;
    this._dialog = this.shadowRoot.querySelector('dialog');
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.hide());
    this._dialog.addEventListener('click', e => {
      if (e.target === this._dialog) this.hide();
    });
    this._dialog.addEventListener('cancel', () => this.hide());
  }

  show() { this._dialog.showModal(); }
  hide() { this._dialog.close(); }
}

customElements.define('app-modal', AppModal);
