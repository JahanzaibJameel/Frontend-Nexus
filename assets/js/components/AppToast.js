/* ─── AppToast ──────────────────────────────────────────────────────────── */
/*
 * Programmatic use (re-exports notificationManager):
 *   import { showNotification } from '../core/notificationManager.js';
 *   showNotification('Hello!', 'success');
 */
// This file exists so the component is registered when app.js imports it.
// The actual toast logic lives in notificationManager.js for simplicity.
import { showNotification } from '../core/notificationManager.js';
window.showNotification = showNotification; // optional global helper
