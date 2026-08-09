/* ─── 47 Libraries Explorer Page ───────────────────────────────────────── */
import { libraries } from '../core/libraryConfig.js';
import { showNotification } from '../core/notificationManager.js';
import { navigate } from '../core/router.js';

const LIB_DETAILS = [
  { key: 'apexcharts', name: 'ApexCharts', category: 'Charts', desc: 'Modern interactive SVG charts with responsive animations.', docs: 'https://apexcharts.com/', targetPage: '/charts' },
  { key: 'chartjs', name: 'Chart.js', category: 'Charts', desc: 'Flexible HTML5 Canvas charting library.', docs: 'https://www.chartjs.org/', targetPage: '/charts' },
  { key: 'd3', name: 'D3.js', category: 'Charts', desc: 'Data-driven document manipulation and visualization framework.', docs: 'https://d3js.org/', targetPage: '/charts' },

  { key: 'justvalidate', name: 'JustValidate', category: 'Forms', desc: 'Lightweight form validation library in pure JavaScript.', docs: 'https://just-validate.dev/', targetPage: '/forms' },
  { key: 'sweetalert2', name: 'SweetAlert2', category: 'Forms', desc: 'Beautiful, responsive, customizable popup modals.', docs: 'https://sweetalert2.github.io/', targetPage: '/forms' },
  { key: 'notyf', name: 'Notyf', category: 'Forms', desc: 'Minimalist responsive toast notification library.', docs: 'https://carlosioso.com/notyf/', targetPage: '/forms' },
  { key: 'pickr', name: 'Pickr', category: 'Forms', desc: 'Flat, simple, multi-theme color picker widget.', docs: 'https://github.com/Simonwep/pickr', targetPage: '/settings' },
  { key: 'flatpickr', name: 'Flatpickr', category: 'Forms', desc: 'Lightweight date and time picker.', docs: 'https://flatpickr.js.org/', targetPage: '/forms' },
  { key: 'cleave', name: 'Cleave.js', category: 'Forms', desc: 'Format input text content while typing (phone, credit card, date).', docs: 'https://nosir.github.io/cleave.js/', targetPage: '/forms' },

  { key: 'gridjs', name: 'Grid.js', category: 'Tables', desc: 'Advanced HTML table grid with search, sort & pagination.', docs: 'https://gridjs.io/', targetPage: '/tables' },
  { key: 'fuse', name: 'Fuse.js', category: 'Tables', desc: 'Powerful, lightweight fuzzy-search library.', docs: 'https://www.fusejs.io/', targetPage: '/tables' },

  { key: 'glightbox', name: 'GLightbox', category: 'Media', desc: 'Pure JavaScript lightbox component with mobile touch support.', docs: 'https://biati-digital.github.io/glightbox/', targetPage: '/gallery' },
  { key: 'cropper', name: 'Cropper.js', category: 'Media', desc: 'JavaScript image cropper with visual preview controls.', docs: 'https://fengyuochen.github.io/cropperjs/', targetPage: '/gallery' },
  { key: 'viewerjs', name: 'Viewer.js', category: 'Media', desc: 'Modal image viewer with zoom, rotate & flip controls.', docs: 'https://fengyuochen.github.io/viewerjs/', targetPage: '/gallery' },
  { key: 'plyr', name: 'Plyr', category: 'Media', desc: 'Simple, accessible HTML5 video and audio player wrapper.', docs: 'https://plyr.io/', targetPage: '/media' },
  { key: 'howler', name: 'Howler.js', category: 'Media', desc: 'Audio library for modern web apps & Web Audio API.', docs: 'https://howlerjs.com/', targetPage: '/media' },
  { key: 'wavesurfer', name: 'WaveSurfer.js', category: 'Media', desc: 'Navigable audio waveform generator using Web Audio & Canvas.', docs: 'https://wavesurfer.xyz/', targetPage: '/media' },

  { key: 'swiper', name: 'Swiper', category: 'UI', desc: 'Touch-enabled modern slider and carousel engine.', docs: 'https://swiperjs.com/', targetPage: '/gallery' },
  { key: 'driverjs', name: 'Driver.js', category: 'UI', desc: 'Feature walkthrough popover overlay engine.', docs: 'https://driverjs.com/', targetPage: '/dashboard' },
  { key: 'typed', name: 'Typed.js', category: 'UI', desc: 'Animated typewriter text effect generator.', docs: 'https://mattboldt.com/demos/typed-js/', targetPage: '/home' },
  { key: 'confetti', name: 'Canvas Confetti', category: 'UI', desc: 'Performant canvas confetti explosion animations.', docs: 'https://www.npmjs.com/package/canvas-confetti', targetPage: '/forms' },
  { key: 'popper', name: 'Popper.js', category: 'UI', desc: 'Tooltip & popover positioning engine.', docs: 'https://popper.js.org/', targetPage: '/forms' },
  { key: 'tippy', name: 'Tippy.js', category: 'UI', desc: 'Complete tooltip solution powered by Popper.', docs: 'https://atomiks.github.io/tippyjs/', targetPage: '/forms' },
  { key: 'simplebar', name: 'SimpleBar', category: 'UI', desc: 'Custom scrollbar plugin in pure JS with native scroll physics.', docs: 'https://grabbou.github.io/Plugin-SimpleBar/', targetPage: '/dashboard' },
  { key: 'vanillatilt', name: 'Vanilla-Tilt', category: 'UI', desc: 'Smooth 3D tilt effect on mouse hover.', docs: 'https://micku7zu.github.io/vanilla-tilt.js/', targetPage: '/home' },

  { key: 'filepond', name: 'FilePond', category: 'Files', desc: 'Flexible file upload library with drag & drop preview.', docs: 'https://pqina.nl/filepond/', targetPage: '/upload' },
  { key: 'pdfjs', name: 'PDF.js', category: 'Files', desc: 'Mozilla PDF parsing and rendering platform in JavaScript.', docs: 'https://mozilla.github.io/pdf.js/', targetPage: '/pdf' },
  { key: 'jspdf', name: 'jsPDF', category: 'Files', desc: 'Client-side PDF document generator.', docs: 'https://parallax.github.io/jsPDF/', targetPage: '/pdf' },
  { key: 'html2canvas', name: 'html2canvas', category: 'Files', desc: 'Capture web page screenshots via HTML canvas rendering.', docs: 'https://html2canvas.hertzen.com/', targetPage: '/pdf' },

  { key: 'leaflet', name: 'Leaflet', category: 'Maps', desc: 'Mobile-friendly interactive map tile viewer.', docs: 'https://leafletjs.com/', targetPage: '/maps' },
  { key: 'routingmachine', name: 'Leaflet Routing Machine', category: 'Maps', desc: 'Route calculation and path rendering for Leaflet.', docs: 'http://www.maproom.de/routing/', targetPage: '/maps' },

  { key: 'marked', name: 'Marked.js', category: 'Markdown', desc: 'Fast markdown parser and compiler built for speed.', docs: 'https://marked.js.org/', targetPage: '/markdown' },
  { key: 'dompurify', name: 'DOMPurify', category: 'Markdown', desc: 'Ultra-fast XSS sanitizer for HTML and SVG.', docs: 'https://github.com/cure53/DOMPurify', targetPage: '/markdown' },
  { key: 'prismjs', name: 'Prism.js', category: 'Markdown', desc: 'Lightweight, extensible syntax highlighter.', docs: 'https://prismjs.com/', targetPage: '/markdown' },

  { key: 'qrcodejs', name: 'QRCode.js', category: 'Files', desc: 'Cross-browser JavaScript QR code generator.', docs: 'https://davidshimjs.github.io/qrcodejs/', targetPage: '/qr' },
  { key: 'jsbarcode', name: 'JsBarcode', category: 'Files', desc: 'Universal barcode generator supporting multiple formats.', docs: 'https://lindell.me/JsBarcode/', targetPage: '/qr' },

  { key: 'sortablejs', name: 'SortableJS', category: 'UI', desc: 'Reorderable drag-and-drop lists and Kanban grids.', docs: 'https://sortablejs.github.io/Sortable/', targetPage: '/kanban' },

  { key: 'three', name: 'Three.js', category: '3D', desc: 'WebGL 3D engine for rendering complex 3D meshes & scenes.', docs: 'https://threejs.org/', targetPage: '/three' },
  { key: 'matterjs', name: 'Matter.js', category: '3D', desc: '2D rigid body physics engine for web browsers.', docs: 'https://brm.io/matter-js/', targetPage: '/physics' },
  { key: 'p5', name: 'p5.js', category: '3D', desc: 'Creative coding and generative canvas art library.', docs: 'https://p5js.org/', targetPage: '/canvas' },

  { key: 'tensorflow', name: 'TensorFlow.js', category: 'AI', desc: 'Machine learning framework in JS for training and deploying models.', docs: 'https://www.tensorflow.org/js', targetPage: '/ai' },
  { key: 'mobilenet', name: 'MobileNet', category: 'AI', desc: 'Pre-trained deep learning neural network for image classification.', docs: 'https://github.com/tensorflow/tfjs-models/tree/master/mobilenet', targetPage: '/ai' },
  { key: 'cocossd', name: 'COCO-SSD', category: 'AI', desc: 'Object detection model capable of identifying 80 object classes.', docs: 'https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd', targetPage: '/ai' },
  { key: 'blazeface', name: 'BlazeFace', category: 'AI', desc: 'Lightweight face detection model optimized for mobile.', docs: 'https://github.com/tensorflow/tfjs-models/tree/master/blazeface', targetPage: '/ai' },
  { key: 'handpose', name: 'HandPose', category: 'AI', desc: 'Hand tracking and landmark detection model.', docs: 'https://github.com/tensorflow/tfjs-models/tree/master/handpose', targetPage: '/ai' },

  { key: 'gsap', name: 'GSAP', category: 'Animation', desc: 'Professional-grade JavaScript animation engine for high-performance motion.', docs: 'https://gsap.com/', targetPage: '/home' },
  { key: 'aos', name: 'AOS', category: 'Animation', desc: 'Animate On Scroll library for smooth viewport entrance effects.', docs: 'https://michalsnik.github.io/aos/', targetPage: '/home' },
];

export default class LibrariesPage {
  constructor() {
    this.activeCategory = 'all';
    this.searchQuery = '';
  }

  init() {
    this.gridContainer = document.getElementById('libraries-grid');
    this.searchInput = document.getElementById('lib-search');
    this.filterButtons = document.querySelectorAll('.filter-btn');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', e => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGrid();
      });
    }

    if (this.filterButtons) {
      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeCategory = btn.dataset.category;
          this.renderGrid();
        });
      });
    }

    this.renderGrid();
  }

  renderGrid() {
    if (!this.gridContainer) return;

    const filtered = LIB_DETAILS.filter(lib => {
      const matchCat = this.activeCategory === 'all' || lib.category === this.activeCategory;
      const matchSearch = !this.searchQuery ||
        lib.name.toLowerCase().includes(this.searchQuery) ||
        lib.desc.toLowerCase().includes(this.searchQuery) ||
        lib.category.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: var(--bg-surface); border-radius: 12px; border: 1px dashed var(--border);">
          <p style="font-size: 1.1rem; color: var(--text-muted);">No libraries match your search criteria.</p>
        </div>
      `;
      return;
    }

    this.gridContainer.innerHTML = filtered.map(item => {
      const config = libraries[item.key] || {};
      const cdnUrl = config.url || 'CDN loading';

      return `
        <article class="lib-card" style="background: var(--bg-surface); border-radius: 16px; border: 1px solid var(--border); padding: 20px; display: flex; flex-direction: column; justify-space-between; transition: transform 0.2s, border-color 0.2s;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">${item.name}</h3>
              <span class="badge" style="background: rgba(56,189,248,0.12); color: var(--accent); font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px;">${item.category}</span>
            </div>
            <p style="margin: 0 0 16px 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${item.desc}</p>
          </div>

          <div style="margin-top: auto; pt: 16px; border-top: 1px solid var(--border); padding-top: 12px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-sm copy-cdn-btn" data-cdn="${cdnUrl}" style="background: var(--bg-muted); color: var(--text-secondary); font-size: 0.8rem; border-radius: 8px; padding: 6px 12px; border: 1px solid var(--border); cursor: pointer;">
                📋 Copy CDN
              </button>
              <a href="${item.docs}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background: var(--bg-muted); color: var(--text-secondary); font-size: 0.8rem; border-radius: 8px; padding: 6px 12px; border: 1px solid var(--border); text-decoration: none;">
                📖 Docs ↗
              </a>
              <button class="btn btn-sm launch-demo-btn" data-path="${item.targetPage}" style="background: var(--accent); color: #0f172a; font-weight: 600; font-size: 0.8rem; border-radius: 8px; padding: 6px 12px; border: none; cursor: pointer; margin-left: auto;">
                Demo →
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach button listeners
    this.gridContainer.querySelectorAll('.copy-cdn-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.cdn);
        showNotification('Copied CDN URL to clipboard!', 'success');
      });
    });

    this.gridContainer.querySelectorAll('.launch-demo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigate(btn.dataset.path);
      });
    });
  }

  destroy() {
    this.gridContainer = null;
  }
}
