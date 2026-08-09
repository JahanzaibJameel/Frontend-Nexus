/* ─── AppAccordion ──────────────────────────────────────────────────────── */
/*
 * Usage:
 *   <app-accordion>
 *     <details>
 *       <summary>Question?</summary>
 *       <p>Answer</p>
 *     </details>
 *   </app-accordion>
 */
const CSS = `
  :host { display: block; }
  ::slotted(details) {
    border-bottom: 1px solid var(--border, rgba(148,163,184,0.18));
  }
  ::slotted(details[open]) summary { color: var(--accent, #38bdf8); }
  ::slotted(summary) {
    list-style: none;
    padding: 14px 0;
    cursor: pointer;
    font-weight: 600;
    color: var(--text-primary, #e2e8f0);
    font-size: 0.95rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }
  ::slotted(summary)::-webkit-details-marker { display: none; }
`;

class AppAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${CSS}</style><slot></slot>`;
  }
}

customElements.define('app-accordion', AppAccordion);
