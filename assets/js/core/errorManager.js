/* ─── Error Manager ─────────────────────────────────────────────────────── */
import { showNotification } from './notificationManager.js';

export const initErrorManager = () => {
  window.addEventListener('error', event => {
    // Ignore cross-origin script errors (no details available)
    if (!event.filename && !event.message) return;
    console.error('[ErrorManager]', event.message, event.filename, event.lineno);
    showNotification('Something went wrong. Please try again.', 'danger');
  });

  window.addEventListener('unhandledrejection', event => {
    console.error('[ErrorManager] Unhandled rejection:', event.reason);
    showNotification('An unexpected error occurred.', 'danger');
  });
};
