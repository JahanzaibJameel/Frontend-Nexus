/* ─── App Entry Point ───────────────────────────────────────────────────── */
import './router.js';
import './pageManager.js';
import { themeManager }       from './themeManager.js';
import './storageManager.js';
import { showNotification }   from './notificationManager.js';
import { initErrorManager }   from './errorManager.js';
import './performanceMonitor.js';
import { initSecurityManager } from './securityManager.js';
import './commandPalette.js';

// Custom Elements
import '../components/AppNavbar.js';
import '../components/AppSidebar.js';
import '../components/AppFooter.js';
import '../components/AppModal.js';
import '../components/AppToast.js';
import '../components/AppDropdown.js';
import '../components/AppTabs.js';
import '../components/AppAccordion.js';
import '../components/AppLoader.js';
import '../components/AppSkeleton.js';

/* ── PWA state ─────────────────────────────────────────────────────────── */
let installPrompt = null;

/* ── Service Worker ────────────────────────────────────────────────────── */
const registerSW = async () => {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

    // Show "update available" toast when a new SW is waiting
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const toast = showNotification(
            'Update available — click to refresh.',
            'info',
            0,           // sticky
          );
          // Clicking the toast triggers the update
          document.querySelector('.app-toast-root')?.addEventListener('click', () => {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            location.reload();
          }, { once: true });
        }
      });
    });

    console.log('[SW] Registered');
  } catch (err) {
    console.warn('[SW] Registration failed:', err);
  }
};

/* ── Back-to-top button ────────────────────────────────────────────────── */
const initBackToTop = () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.removeAttribute('hidden');

  const app = document.getElementById('app');
  const toggleBtn = () => {
    const scrolled = (app?.scrollTop || window.scrollY) > 280;
    btn.classList.toggle('visible', scrolled);
  };

  (app || window).addEventListener('scroll', toggleBtn, { passive: true });
  btn.addEventListener('click', () => {
    if (app) app.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ── Mobile sidebar overlay ────────────────────────────────────────────── */
const initSidebarToggle = () => {
  const sidebar = document.getElementById('app-sidebar');
  if (!sidebar) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const close = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  const toggle = () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  overlay.addEventListener('click', close);
  window.addEventListener('app:routeChange', close);

  // Listen for hamburger clicks dispatched from the navbar shadow DOM
  window.addEventListener('app:toggleSidebar', toggle);
};

/* ── Install prompt ────────────────────────────────────────────────────── */
const initInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    installPrompt = e;
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="install-app"]');
    if (btn && installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => { installPrompt = null; });
    }
  });
};

/* ── Boot ──────────────────────────────────────────────────────────────── */
const init = () => {
  themeManager.init();
  initErrorManager();
  initSecurityManager();
  registerSW();
  initBackToTop();
  initSidebarToggle();
  initInstallPrompt();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
