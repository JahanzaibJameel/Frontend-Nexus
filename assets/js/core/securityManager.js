/* ─── Security Manager ──────────────────────────────────────────────────── */
import { showNotification } from './notificationManager.js';

export const initSecurityManager = () => {
  document.addEventListener('securitypolicyviolation', event => {
    const { blockedURI, violatedDirective } = event;
    const label = blockedURI || 'unknown resource';
    console.warn('[CSP]', violatedDirective, '→', label, event);
    showNotification(`Blocked by security policy: ${label}`, 'warning', 6000);
  });
};
