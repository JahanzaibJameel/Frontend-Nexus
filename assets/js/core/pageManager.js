/* ─── Page Manager ──────────────────────────────────────────────────────── */
import { showNotification } from './notificationManager.js';

export const pageManager = {
  /** Currently active page instance */
  activePage: null,

  /** One-shot cleanup functions registered by page modules */
  cleanupActions: [],

  /**
   * Register a cleanup function that will run before the next page loads.
   * @param {() => void} fn
   */
  addCleanup(fn) {
    if (typeof fn === 'function') this.cleanupActions.push(fn);
  },

  /**
   * Load and initialise a page module.
   * @param {string|undefined} scriptPath  relative path from origin
   */
  async init(scriptPath) {
    if (!scriptPath) return;
    try {
      const url = new URL(scriptPath, location.origin).href;
      const mod = await import(/* @vite-ignore */ url);
      if (mod && typeof mod.default === 'function') {
        this.activePage = new mod.default();
        if (typeof this.activePage.init === 'function') {
          await this.activePage.init();
        }
      }
    } catch (err) {
      console.warn('[PageManager] Failed to load page module:', scriptPath, err);
      showNotification('Something went wrong loading this page.', 'danger');
    }
  },

  /** Tear down the current page cleanly. */
  destroy() {
    // Call the page class destroy if present
    if (this.activePage) {
      try {
        if (typeof this.activePage.destroy === 'function') {
          this.activePage.destroy();
        }
      } catch (err) {
        console.warn('[PageManager] destroy() threw:', err);
      }
      this.activePage = null;
    }

    // Run any extra cleanup callbacks
    for (const fn of this.cleanupActions) {
      try { fn(); } catch (err) { console.warn('[PageManager] cleanup fn threw:', err); }
    }
    this.cleanupActions = [];
  },
};
