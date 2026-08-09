/* ─── Command Palette  (Ctrl / ⌘ + K) ──────────────────────────────────── */
import { routes } from './router.js';
import { THEMES, themeManager } from './themeManager.js';

const PAGE_ICONS = {
  '/':            '🏠',
  '/dashboard':   '📊',
  '/charts':      '📈',
  '/forms':       '📝',
  '/tables':      '🗂️',
  '/gallery':     '🖼️',
  '/media':       '🎬',
  '/maps':        '🗺️',
  '/pdf':         '📄',
  '/upload':      '📤',
  '/markdown':    '✍️',
  '/ai':          '🤖',
  '/three':       '🧊',
  '/webgpu':      '⚡',
  '/physics':     '🎱',
  '/canvas':      '🎨',
  '/browser-api': '🧪',
  '/qr':          '▩',
  '/settings':    '⚙️',
  '/about':       'ℹ️',
};

const buildItems = () => {
  const items = [];

  // Page navigation
  for (const r of routes) {
    if (r.path === '/404') continue;
    items.push({
      type: 'page',
      icon: PAGE_ICONS[r.path] || '📄',
      label: r.title,
      hint: `Go to ${r.path}`,
      action: () => { location.hash = r.path; },
    });
  }

  // Theme switching
  for (const t of THEMES) {
    items.push({
      type: 'theme',
      icon: '🎨',
      label: `Theme: ${t.label}`,
      hint: 'Switch theme',
      action: () => themeManager.setTheme(t.id),
    });
  }

  return items;
};

class CommandPalette {
  constructor() {
    this.items = buildItems();
    this.filtered = [];
    this.focusedIndex = 0;
    this.open = false;

    this._onKey     = this._onKey.bind(this);
    this._onInput   = this._onInput.bind(this);
    this._onKeydown = this._onKeydown.bind(this);

    this._build();
    window.addEventListener('keydown', this._onKey);
  }

  _build() {
    const root = document.getElementById('command-palette-root');
    if (!root) return;

    this.dialog = document.createElement('dialog');
    this.dialog.setAttribute('aria-label', 'Command palette');
    this.dialog.innerHTML = `
      <div class="palette-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="search" placeholder="Search pages, themes…" autocomplete="off" spellcheck="false" aria-label="Search commands" />
      </div>
      <div class="palette-results" role="listbox" aria-label="Results"></div>
    `;

    root.appendChild(this.dialog);

    this.input   = this.dialog.querySelector('input');
    this.results = this.dialog.querySelector('.palette-results');

    this.input.addEventListener('input', this._onInput);
    this.input.addEventListener('keydown', this._onKeydown);
    this.dialog.addEventListener('click', e => {
      if (e.target === this.dialog) this.close();
    });
    this.dialog.addEventListener('cancel', () => this.close());
  }

  _onKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.open ? this.close() : this.show();
    }
    if (e.key === 'Escape' && this.open) this.close();
  }

  _onInput() {
    this.focusedIndex = 0;
    this._render(this.input.value.trim());
  }

  _onKeydown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focusedIndex = Math.min(this.focusedIndex + 1, this.filtered.length - 1);
      this._highlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
      this._highlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this._select(this.focusedIndex);
    }
  }

  _render(query) {
    const q = query.toLowerCase();
    this.filtered = q
      ? this.items.filter(it =>
          it.label.toLowerCase().includes(q) || it.hint.toLowerCase().includes(q)
        )
      : this.items.slice(0, 20);

    if (!this.filtered.length) {
      this.results.innerHTML = `<div class="palette-empty">No results for "${query}"</div>`;
      return;
    }

    this.results.innerHTML = this.filtered.map((it, i) => `
      <div class="palette-item${i === this.focusedIndex ? ' focused' : ''}"
           role="option"
           data-index="${i}"
           aria-selected="${i === this.focusedIndex}">
        <span class="pi-icon" aria-hidden="true">${it.icon}</span>
        <span class="pi-label">${it.label}</span>
        <span class="pi-hint">${it.hint}</span>
      </div>
    `).join('');

    this.results.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => this._select(Number(el.dataset.index)));
      el.addEventListener('mouseenter', () => {
        this.focusedIndex = Number(el.dataset.index);
        this._highlight();
      });
    });
  }

  _highlight() {
    this.results.querySelectorAll('.palette-item').forEach((el, i) => {
      const active = i === this.focusedIndex;
      el.classList.toggle('focused', active);
      el.setAttribute('aria-selected', active);
      if (active) el.scrollIntoView({ block: 'nearest' });
    });
  }

  _select(index) {
    const item = this.filtered[index];
    if (!item) return;
    item.action();
    this.close();
  }

  show() {
    if (!this.dialog) return;
    this.open = true;
    this.input.value = '';
    this._render('');
    this.dialog.showModal();
    this.input.focus();
  }

  close() {
    if (!this.dialog) return;
    this.open = false;
    this.dialog.close();
  }

  destroy() {
    window.removeEventListener('keydown', this._onKey);
  }
}

export const commandPalette = new CommandPalette();
