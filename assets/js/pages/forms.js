import { loadLibrary } from '../core/libraryLoader.js';

const setFeedback = (id, msg, type) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `form-feedback form-feedback-${type}`;
};

const clearFeedback = (id) => {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.className = 'form-feedback'; }
};

const validate = (form) => {
  const errors = [];
  form.querySelectorAll('[required]').forEach(el => {
    if (!el.value.trim()) errors.push(`${el.labels?.[0]?.textContent || el.id || 'Field'} is required.`);
    else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value))
      errors.push('Please enter a valid email address.');
  });
  return errors;
};

export default class FormsPage {
  constructor() { this._handlers = []; }

  async init() {
    await loadLibrary('sweetalert2');
    this._initLogin();
    this._initRegister();
    this._initContact();
    this._initSurvey();
  }

  _on(el, evt, fn) {
    if (!el) return;
    el.addEventListener(evt, fn);
    this._handlers.push({ el, evt, fn });
  }

  _initLogin() {
    const form = document.getElementById('form-login');
    this._on(form, 'submit', async e => {
      e.preventDefault();
      clearFeedback('login-feedback');
      const errs = validate(form);
      if (errs.length) { setFeedback('login-feedback', errs[0], 'danger'); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Signing in…';
      await new Promise(r => setTimeout(r, 900));
      btn.disabled = false; btn.textContent = 'Sign In';
      if (window.Swal) {
        Swal.fire({ title: 'Welcome back!', text: 'You have signed in successfully.', icon: 'success', confirmButtonColor: '#38bdf8', background: 'var(--bg-secondary)', color: 'var(--text-primary)' });
      } else {
        setFeedback('login-feedback', '✓ Signed in successfully!', 'success');
      }
      form.reset();
    });
  }

  _initRegister() {
    const form = document.getElementById('form-register');
    const passEl = document.getElementById('reg-pass');
    const bar = document.getElementById('pass-strength-bar');

    this._on(passEl, 'input', () => {
      const v = passEl.value;
      let score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      const widths = ['0%','25%','50%','75%','100%'];
      const colors = ['','#ef4444','#f59e0b','#22c55e','#38bdf8'];
      if (bar) { bar.style.width = widths[score]; bar.style.background = colors[score]; }
    });

    this._on(form, 'submit', async e => {
      e.preventDefault();
      clearFeedback('register-feedback');
      const errs = validate(form);
      const pass = document.getElementById('reg-pass')?.value;
      const confirm = document.getElementById('reg-pass-confirm')?.value;
      if (pass !== confirm) errs.push('Passwords do not match.');
      if (errs.length) { setFeedback('register-feedback', errs[0], 'danger'); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Creating…';
      await new Promise(r => setTimeout(r, 900));
      btn.disabled = false; btn.textContent = 'Create Account';
      if (window.Swal) {
        Swal.fire({ title: 'Account Created!', text: 'Welcome to Frontend Nexus.', icon: 'success', confirmButtonColor: '#38bdf8', background: 'var(--bg-secondary)', color: 'var(--text-primary)' });
      } else {
        setFeedback('register-feedback', '✓ Account created!', 'success');
      }
      form.reset();
    });
  }

  _initContact() {
    const form = document.getElementById('form-contact');
    this._on(form, 'submit', async e => {
      e.preventDefault();
      clearFeedback('contact-feedback');
      const errs = validate(form);
      if (errs.length) { setFeedback('contact-feedback', errs[0], 'danger'); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending…';
      await new Promise(r => setTimeout(r, 800));
      btn.disabled = false; btn.textContent = 'Send Message';
      setFeedback('contact-feedback', '✓ Message sent! We\'ll get back to you soon.', 'success');
      form.reset();
    });
  }

  _initSurvey() {
    const form = document.getElementById('form-survey');
    const range = document.getElementById('survey-rating');
    const rVal = document.getElementById('survey-rating-val');
    this._on(range, 'input', () => { if (rVal) rVal.textContent = `${range.value} / 5`; });
    this._on(form, 'submit', async e => {
      e.preventDefault();
      clearFeedback('survey-feedback');
      const role = document.getElementById('survey-role')?.value;
      if (!role) { setFeedback('survey-feedback', 'Please select your role.', 'danger'); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Submitting…';
      await new Promise(r => setTimeout(r, 700));
      btn.disabled = false; btn.textContent = 'Submit Survey';
      setFeedback('survey-feedback', '✓ Thank you for your feedback!', 'success');
    });
  }

  destroy() {
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
