/* ─── Home Page Logic ────────────────────────────────────────────────────── */
import { loadLibrary } from '../core/libraryLoader.js';

export default class HomePage {
  constructor() {
    this.intervalIds = [];
  }

  async init() {
    this.animateCounters();
    await this.initGSAP();
    await this.initAOS();
  }

  animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.counter, 10);
      if (isNaN(target)) return;

      if (target === 0) {
        counter.textContent = '0';
        return;
      }

      let count = 0;
      const duration = 1200; // ms
      const stepTime = Math.max(10, Math.floor(duration / target));

      const timer = setInterval(() => {
        count += Math.ceil(target / (duration / 20));
        if (count >= target) {
          counter.textContent = target.toString();
          clearInterval(timer);
        } else {
          counter.textContent = count.toString();
        }
      }, stepTime);

      this.intervalIds.push(timer);
    });
  }

  async initGSAP() {
    try {
      const gsap = await loadLibrary('gsap');
      if (gsap && gsap.from) {
        gsap.from('.hero-stat-card', {
          duration: 0.6,
          y: 20,
          opacity: 0,
          stagger: 0.1,
          ease: 'power2.out'
        });
        gsap.from('.feature-card', {
          duration: 0.5,
          y: 30,
          opacity: 0,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    } catch (e) {
      console.log('[Home] GSAP optional animation skipped:', e);
    }
  }

  async initAOS() {
    try {
      await loadLibrary('aos');
      if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({
          duration: 600,
          easing: 'ease-out-cubic',
          once: true,
          offset: 80,
        });
      }
    } catch (e) {
      console.log('[Home] AOS optional animation skipped:', e);
    }
  }

  destroy() {
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];
  }
}
