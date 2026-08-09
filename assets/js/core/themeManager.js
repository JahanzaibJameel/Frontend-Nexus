/* ─── Theme Manager ─────────────────────────────────────────────────────── */
export const THEMES = [
  { id: 'dark',           label: 'Dark' },
  { id: 'light',          label: 'Light' },
  { id: 'blue',           label: 'Blue' },
  { id: 'purple',         label: 'Purple' },
  { id: 'green',          label: 'Green' },
  { id: 'cyberpunk',      label: 'Cyberpunk' },
  { id: 'glassmorphism',  label: 'Glass' },
  { id: 'neumorphism',    label: 'Neumorphic' },
  { id: 'high-contrast',  label: 'High Contrast' },
];

export const themeManager = {
  current: localStorage.getItem('theme') || 'dark',

  /** Apply a theme by name, persisting the choice. */
  setTheme(name) {
    if (!THEMES.find(t => t.id === name)) {
      console.warn(`[ThemeManager] Unknown theme: ${name}`);
      return;
    }
    this.current = name;
    document.documentElement.dataset.theme = name;
    localStorage.setItem('theme', name);
    window.dispatchEvent(new CustomEvent('app:themeChange', { detail: name }));
  },

  getTheme() {
    return this.current;
  },

  /** Apply stored accent colour override (from settings page). */
  applyAccent() {
    const accent = localStorage.getItem('accent-color');
    if (accent) {
      document.documentElement.style.setProperty('--accent', accent);
    }
  },

  /** Initialise on app boot */
  init() {
    document.documentElement.dataset.theme = this.current;
    this.applyAccent();
  },
};
