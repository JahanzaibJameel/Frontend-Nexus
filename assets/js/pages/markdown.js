import { loadLibrary } from '../core/libraryLoader.js';
import { showNotification } from '../core/notificationManager.js';

const DEFAULT_MD = `# Welcome to Frontend Nexus ✍️

This editor uses **Marked.js** for parsing, **DOMPurify** for sanitization,
and **Prism.js** for syntax highlighting.

## Features
- Live preview
- XSS-safe rendering
- Syntax highlighted code blocks

## Code Example

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World'));
\`\`\`

## Table

| Library   | Version | Purpose            |
|-----------|---------|--------------------|
| Marked.js | 13.x    | Markdown parsing   |
| DOMPurify | 3.x     | XSS sanitization   |
| Prism.js  | 1.29    | Syntax highlighting|

> "The web platform is the most powerful IDE ever built." — Frontend Nexus
`;

export default class MarkdownPage {
  constructor() {
    this._handlers = [];
    this._timer = null;
  }

  async init() {
    await Promise.all([
      loadLibrary('marked'),
      loadLibrary('dompurify'),
      loadLibrary('prismjs'),
    ]);

    const input   = document.getElementById('md-input');
    const preview = document.getElementById('md-preview');
    const copy    = document.getElementById('md-copy');
    const clear   = document.getElementById('md-clear');

    if (!input || !preview) return;

    // Configure marked
    if (window.marked) {
      marked.setOptions({ breaks: true, gfm: true });
    }

    const render = () => {
      if (!window.marked || !window.DOMPurify) return;
      const dirty = marked.parse(input.value);
      const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
      preview.innerHTML = clean;
      // Re-highlight code blocks
      if (window.Prism) {
        preview.querySelectorAll('code[class*="language-"]').forEach(el => Prism.highlightElement(el));
      }
    };

    const debounce = () => {
      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(render, 150);
    };

    this._on(input, 'input', debounce);
    this._on(copy, 'click', async () => {
      try { await navigator.clipboard.writeText(input.value); showNotification('Copied to clipboard!', 'success'); }
      catch { showNotification('Copy failed.', 'danger'); }
    });
    this._on(clear, 'click', () => { input.value = ''; render(); });

    // Load default content
    input.value = DEFAULT_MD;
    render();
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
