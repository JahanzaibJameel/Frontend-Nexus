/* ─── Library Loader ────────────────────────────────────────────────────── */
import { showNotification } from './notificationManager.js';
import { libraries } from './libraryConfig.js';

/** URLs and named globals already loaded this session */
const loadedUrls = new Set();

/**
 * Inject a <script> tag and wait for it to load.
 * Retries once on failure (total 2 attempts).
 */
const loadResource = (tag, attrs, timeout = 12000) =>
  new Promise((resolve, reject) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v !== null && v !== undefined) el.setAttribute(k, v);
    });
    if (tag === 'script') el.async = true;

    let timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Timeout loading ${attrs.src || attrs.href}`));
    }, timeout);

    const cleanup = () => {
      clearTimeout(timer);
      el.onload = null;
      el.onerror = null;
    };

    el.onload  = () => { cleanup(); resolve(el); };
    el.onerror = () => { cleanup(); reject(new Error(`Failed to load ${attrs.src || attrs.href}`)); };
    document.head.appendChild(el);
  });

/**
 * Load a JS file from a URL.
 * Skip if the URL is already loaded OR if `globalName` is already on window.
 */
export const loadScript = async (url, name = url, integrity = null, globalName = null) => {
  if (loadedUrls.has(url)) return;
  if (globalName && window[globalName] !== undefined) {
    loadedUrls.add(url);
    return;
  }

  const MAX = 2;
  for (let attempt = 1; attempt <= MAX; attempt++) {
    try {
      const attrs = { src: url };
      if (integrity) {
        attrs.integrity = integrity;
        attrs.crossorigin = 'anonymous';
      }
      await loadResource('script', attrs, 12000);
      loadedUrls.add(url);
      return;
    } catch (err) {
      if (attempt < MAX) {
        showNotification(`Failed to load ${name}, retrying…`, 'warning');
        await new Promise(r => setTimeout(r, 800));
      } else {
        showNotification(`Could not load ${name}.`, 'danger');
        throw err;
      }
    }
  }
};

/**
 * Load a CSS stylesheet.
 * Skip if already loaded.
 */
export const loadStyle = async (href, integrity = null) => {
  if (loadedUrls.has(href)) return;
  // Check if a <link> for this href already exists in the document
  if (document.querySelector(`link[href="${href}"]`)) {
    loadedUrls.add(href);
    return;
  }

  const attrs = { rel: 'stylesheet', href };
  if (integrity) {
    attrs.integrity = integrity;
    attrs.crossorigin = 'anonymous';
  }
  await loadResource('link', attrs, 12000);
  loadedUrls.add(href);
};

/**
 * Load a named library from the config registry.
 * Returns the global object if one is defined.
 */
export const loadLibrary = async (key) => {
  const lib = libraries[key];
  if (!lib) throw new Error(`Unknown library key: "${key}". Check libraryConfig.js.`);

  // Already available as a global
  if (lib.global && window[lib.global] !== undefined) {
    return window[lib.global];
  }

  // Load CSS first if needed
  if (lib.css) {
    await loadStyle(lib.css.href, lib.css.integrity || null);
  }

  // Load the script
  await loadScript(lib.url, key, lib.integrity || null, lib.global || null);

  return lib.global ? window[lib.global] : true;
};
