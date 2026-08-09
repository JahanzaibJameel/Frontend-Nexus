/* ─── SPA Router ────────────────────────────────────────────────────────── */
import { pageManager } from './pageManager.js';
import { showNotification } from './notificationManager.js';

export const routes = [
  { path: '/',           page: 'pages/home.html',        title: 'Home',           script: 'assets/js/pages/home.js' },
  { path: '/dashboard',  page: 'pages/dashboard.html',   title: 'Dashboard',      script: 'assets/js/pages/dashboard.js' },
  { path: '/charts',     page: 'pages/charts.html',      title: 'Charts',         script: 'assets/js/pages/charts.js' },
  { path: '/forms',      page: 'pages/forms.html',       title: 'Forms',          script: 'assets/js/pages/forms.js' },
  { path: '/tables',     page: 'pages/tables.html',      title: 'Tables',         script: 'assets/js/pages/tables.js' },
  { path: '/gallery',    page: 'pages/gallery.html',     title: 'Gallery',        script: 'assets/js/pages/gallery.js' },
  { path: '/media',      page: 'pages/media.html',       title: 'Media',          script: 'assets/js/pages/media.js' },
  { path: '/maps',       page: 'pages/maps.html',        title: 'Maps',           script: 'assets/js/pages/maps.js' },
  { path: '/pdf',        page: 'pages/pdf.html',         title: 'PDF Studio',     script: 'assets/js/pages/pdf.js' },
  { path: '/upload',     page: 'pages/upload.html',      title: 'File Upload',    script: 'assets/js/pages/upload.js' },
  { path: '/markdown',   page: 'pages/markdown.html',    title: 'Markdown Studio',script: 'assets/js/pages/markdown.js' },
  { path: '/ai',         page: 'pages/ai.html',          title: 'AI Lab',         script: 'assets/js/pages/ai.js' },
  { path: '/three',      page: 'pages/three.html',       title: 'Three.js 3D',    script: 'assets/js/pages/three.js' },
  { path: '/d3',         page: 'pages/d3.html',          title: 'D3.js Deep-Dive', script: 'assets/js/pages/d3.js' },
  { path: '/webgpu',     page: 'pages/webgpu.html',      title: 'WebGPU Compute', script: 'assets/js/pages/webgpu.js' },
  { path: '/webxr',      page: 'pages/webxr.html',       title: 'WebXR',          script: 'assets/js/pages/webxr.js' },
  { path: '/serial',     page: 'pages/serial.html',      title: 'Web Serial',     script: 'assets/js/pages/serial.js' },
  { path: '/webtransport',page:'pages/webtransport.html', title: 'WebTransport',   script: 'assets/js/pages/webtransport.js' },
  { path: '/containers', page: 'pages/containers.html',  title: 'Containers API', script: 'assets/js/pages/containers.js' },
  { path: '/physics',    page: 'pages/physics.html',     title: 'Matter.js Physics', script: 'assets/js/pages/physics.js' },
  { path: '/canvas',     page: 'pages/canvas.html',      title: 'p5.js Canvas',   script: 'assets/js/pages/canvas.js' },
  { path: '/browser-api',page: 'pages/browser-api.html', title: '27 Browser APIs',script: 'assets/js/pages/browser-api.js' },
  { path: '/qr',         page: 'pages/qr.html',          title: 'QR & Barcode',   script: 'assets/js/pages/qr.js' },
  { path: '/kanban',     page: 'pages/kanban.html',      title: 'Kanban Board',   script: 'assets/js/pages/kanban.js' },
  { path: '/libraries',  page: 'pages/libraries.html',   title: '44 Libraries Explorer', script: 'assets/js/pages/libraries.js' },
  { path: '/performance',page: 'pages/performance.html', title: 'Performance Monitor', script: 'assets/js/pages/performance.js' },
  { path: '/settings',   page: 'pages/settings.html',    title: 'Settings',       script: 'assets/js/pages/settings.js' },
  { path: '/about',      page: 'pages/about.html',       title: 'About',          script: 'assets/js/pages/about.js' },
];

const NOT_FOUND_ROUTE = { path: '/404', page: 'pages/404.html', title: 'Page Not Found' };

const getPath = () => {
  const hash = location.hash;
  if (!hash || hash === '#') return '/';
  return hash.replace(/^#/, '') || '/';
};

const doNavigate = async (route) => {
  const app = document.getElementById('app');
  if (!app) return;

  try {
    const response = await fetch(route.page);
    if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${route.page}`);
    const html = await response.text();

    // Destroy current page lifecycle before swapping DOM
    pageManager.destroy();

    // Use View Transitions API if supported and not already running
    if (document.startViewTransition && !document.__vtInProgress) {
      document.__vtInProgress = true;
      try {
        await document.startViewTransition(() => {
          app.innerHTML = html;
        }).ready;
      } catch (e) {
        // Transition was aborted (e.g., rapid navigation); fall back to direct update
        app.innerHTML = html;
      } finally {
        document.__vtInProgress = false;
      }
    } else {
      app.innerHTML = html;
    }

    document.title = `Frontend Nexus — ${route.title}`;

    // Scroll to top
    app.scrollTop = 0;
    window.scrollTo(0, 0);

    // Broadcast route change
    window.dispatchEvent(new CustomEvent('app:routeChange', { detail: route.path }));

    // Load and initialise page module script
    if (route.script) {
      await pageManager.init(route.script);
    }

  } catch (err) {
    console.error('[Router]', err);
    document.__vtInProgress = false;
    showNotification('Failed to load page. Please try again.', 'danger');
  }
};

export const resolveRoute = () => {
  const path = getPath();
  const route = routes.find(r => r.path === path) || NOT_FOUND_ROUTE;
  doNavigate(route);
};

/** Programmatic navigation */
export const navigate = (path) => {
  location.hash = path;
};

window.addEventListener('hashchange', resolveRoute);
window.addEventListener('load', resolveRoute);
