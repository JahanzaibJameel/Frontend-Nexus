/* ─── Notification Manager ──────────────────────────────────────────────── */
let toastRoot;

const createToastRoot = () => {
  if (toastRoot) return;
  toastRoot = document.createElement('div');
  toastRoot.className = 'app-toast-root';
  toastRoot.setAttribute('aria-live', 'polite');
  toastRoot.setAttribute('aria-atomic', 'false');
  toastRoot.setAttribute('role', 'region');
  toastRoot.setAttribute('aria-label', 'Notifications');
  Object.assign(toastRoot.style, {
    position: 'fixed',
    right: '20px',
    bottom: '28px',
    zIndex: '9999',
    display: 'grid',
    gap: '10px',
    maxWidth: '380px',
    width: 'calc(100vw - 40px)',
  });
  document.body.appendChild(toastRoot);
};

const COLORS = {
  info:    { bg: '#2563eb', icon: 'ℹ' },
  success: { bg: '#16a34a', icon: '✓' },
  warning: { bg: '#d97706', icon: '⚠' },
  danger:  { bg: '#dc2626', icon: '✕' },
};

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'info'|'success'|'warning'|'danger'} type
 * @param {number} duration  ms before auto-dismiss (0 = sticky)
 */
export const showNotification = (message, type = 'info', duration = 4500) => {
  createToastRoot();
  const cfg = COLORS[type] || COLORS.info;

  const note = document.createElement('div');
  note.setAttribute('role', 'alert');
  note.setAttribute('aria-atomic', 'true');
  note.className = `app-toast app-toast-${type}`;
  note.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${cfg.icon}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" aria-label="Dismiss notification">×</button>
  `;
  Object.assign(note.style, {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    borderRadius: '14px',
    color: '#ffffff',
    backgroundColor: cfg.bg,
    boxShadow: '0 16px 40px rgba(15,23,42,0.3)',
    opacity: '0',
    transform: 'translateY(8px) scale(0.97)',
    transition: 'opacity 0.22s ease, transform 0.22s ease',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'var(--font-sans, system-ui)',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  });

  const dismiss = () => {
    note.style.opacity = '0';
    note.style.transform = 'translateY(8px) scale(0.97)';
    setTimeout(() => note.remove(), 240);
  };

  note.querySelector('.toast-close').addEventListener('click', e => {
    e.stopPropagation();
    dismiss();
  });
  note.addEventListener('click', dismiss);

  toastRoot.appendChild(note);

  // Force reflow, then animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      note.style.opacity = '1';
      note.style.transform = 'translateY(0) scale(1)';
    });
  });

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
};
