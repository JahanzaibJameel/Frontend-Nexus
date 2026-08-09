/* ─── About Page Module ─────────────────────────────────────────────────── */
import { libraries } from '../core/libraryConfig.js';
import { routes } from '../core/router.js';

const API_COUNT = 27;
const ELEM_COUNT = 10;

export default class AboutPage {
  init() {
    const libCount = Object.keys(libraries).length;
    const pageCount = routes.length;

    const libEl = document.getElementById('stats-lib-count');
    const pageEl = document.getElementById('stats-page-count');
    const apiEl = document.getElementById('stats-api-count');
    const elemEl = document.getElementById('stats-elem-count');

    if (libEl) libEl.textContent = libCount.toString();
    if (pageEl) pageEl.textContent = pageCount.toString();
    if (apiEl) apiEl.textContent = API_COUNT.toString();
    if (elemEl) elemEl.textContent = ELEM_COUNT.toString();
  }

  destroy() {}
}
