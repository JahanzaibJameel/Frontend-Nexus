import { setLanguage, getCurrentLang } from '../core/i18n.js';

export default class SettingsPage {
  constructor() {
    this._handlers = [];
    this._mq = null;
  }

  async init() {
    const themeSelect = document.getElementById('theme-select');
    const langSelect = document.getElementById('lang-select');
    const autoTheme = document.getElementById('auto-theme');

    if (themeSelect) {
      themeSelect.value = localStorage.getItem('fn_theme') || 'dark';
      this._on(themeSelect, 'change', () => {
        const theme = themeSelect.value;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('fn_theme', theme);
      });
    }

    if (langSelect) {
      langSelect.value = getCurrentLang();
      this._on(langSelect, 'change', () => setLanguage(langSelect.value));
    }

    if (autoTheme) {
      autoTheme.checked = localStorage.getItem('fn_auto_theme') === 'true';
      this._on(autoTheme, 'change', () => this._applyAutoTheme(autoTheme.checked));
    }
  }

  _applyAutoTheme(checked) {
    localStorage.setItem('fn_auto_theme', checked ? 'true' : 'false');
    if (checked) {
      this._mq = window.matchMedia('(prefers-color-scheme: dark)');
      const apply = () => document.documentElement.setAttribute('data-theme', this._mq.matches ? 'dark' : 'light');
      apply();
      this._mq.addEventListener('change', apply);
    } else {
      if (this._mq) { this._mq.removeEventListener('change', this._applyAutoTheme); this._mq = null; }
      document.documentElement.setAttribute('data-theme', localStorage.getItem('fn_theme') || 'dark');
    }
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
