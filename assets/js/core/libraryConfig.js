/* ─── Library Registry ──────────────────────────────────────────────────── */
/**
 * Each entry: { url, global?, integrity?, css?: { href, integrity? } }
 * CDN: cdn.jsdelivr.net / unpkg.com — all versions pinned for stability.
 */
export const libraries = {
  /* ── 1. Analytics & Charts ────────────────────────────── */
  apexcharts: {
    url: 'https://cdn.jsdelivr.net/npm/apexcharts@3.54.0/dist/apexcharts.min.js',
    global: 'ApexCharts',
    css: { href: 'https://cdn.jsdelivr.net/npm/apexcharts@3.54.0/dist/apexcharts.css' }
  },
  chartjs: {
    url: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
    global: 'Chart',
  },
  d3: {
    url: 'https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js',
    global: 'd3',
  },

  /* ── 2. Forms & Inputs ────────────────────────────────── */
  justvalidate: {
    url: 'https://cdn.jsdelivr.net/npm/just-validate@4.3.0/dist/just-validate.production.min.js',
    global: 'JustValidate',
  },
  sweetalert2: {
    url: 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js',
    global: 'Swal',
    css: { href: 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css' }
  },
  notyf: {
    url: 'https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js',
    global: 'Notyf',
    css: { href: 'https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css' }
  },
  pickr: {
    url: 'https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/pickr.min.js',
    global: 'Pickr',
    css: { href: 'https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/themes/nano.min.css' }
  },
  flatpickr: {
    url: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js',
    global: 'flatpickr',
    css: { href: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css' }
  },
  cleave: {
    url: 'https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/cleave.min.js',
    global: 'Cleave',
  },

  /* ── 3. Data Tables & Search ──────────────────────────── */
  gridjs: {
    url: 'https://cdn.jsdelivr.net/npm/gridjs@6.2.0/dist/gridjs.umd.js',
    global: 'gridjs',
    css: { href: 'https://cdn.jsdelivr.net/npm/gridjs@6.2.0/dist/theme/mermaid.min.css' }
  },
  fuse: {
    url: 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.basic.min.js',
    global: 'Fuse',
  },

  /* ── 4. Media & Gallery ───────────────────────────────── */
  glightbox: {
    url: 'https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js',
    global: 'GLightbox',
    css: { href: 'https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css' }
  },
  cropper: {
    url: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js',
    global: 'Cropper',
    css: { href: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css' }
  },
  viewerjs: {
    url: 'https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js',
    global: 'Viewer',
    css: { href: 'https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css' }
  },
  plyr: {
    url: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.polyfilled.min.js',
    global: 'Plyr',
    css: { href: 'https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.css' }
  },
  howler: {
    url: 'https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js',
    global: 'Howl',
  },
  wavesurfer: {
    url: 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7.8.7/dist/wavesurfer.min.js',
    global: 'WaveSurfer',
  },

  /* ── 5. Carousel & UI Enhancements ───────────────────── */
  swiper: {
    url: 'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
    global: 'Swiper',
    css: { href: 'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css' }
  },
  driverjs: {
    url: 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.iife.js',
    global: 'driver',
    css: { href: 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css' }
  },
  typed: {
    url: 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js',
    global: 'Typed',
  },
  confetti: {
    url: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js',
    global: 'confetti',
  },
  popper: {
    url: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
    global: 'Popper',
  },
  tippy: {
    url: 'https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.umd.min.js',
    global: 'tippy',
    css: { href: 'https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.css' }
  },
  simplebar: {
    url: 'https://cdn.jsdelivr.net/npm/simplebar@6.2.7/dist/simplebar.min.js',
    global: 'SimpleBar',
    css: { href: 'https://cdn.jsdelivr.net/npm/simplebar@6.2.7/dist/simplebar.min.css' }
  },
  vanillatilt: {
    url: 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js',
    global: 'VanillaTilt',
  },

  /* ── 6. Upload & Files ───────────────────────────────── */
  filepond: {
    url: 'https://cdn.jsdelivr.net/npm/filepond@4.31.5/dist/filepond.min.js',
    global: 'FilePond',
    css: { href: 'https://cdn.jsdelivr.net/npm/filepond@4.31.5/dist/filepond.min.css' }
  },
  pdfjs: {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    global: 'pdfjsLib',
  },
  jspdf: {
    url: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
    global: 'jspdf',
  },
  html2canvas: {
    url: 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
    global: 'html2canvas',
  },

  /* ── 7. Maps & Geolocation ────────────────────────────── */
  leaflet: {
    url: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
    global: 'L',
    css: { href: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css' }
  },
  routingmachine: {
    url: 'https://cdn.jsdelivr.net/npm/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js',
    css: { href: 'https://cdn.jsdelivr.net/npm/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css' }
  },

  /* ── 8. Markdown & Syntax ─────────────────────────────── */
  marked: {
    url: 'https://cdn.jsdelivr.net/npm/marked@13.0.3/marked.min.js',
    global: 'marked',
  },
  dompurify: {
    url: 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js',
    global: 'DOMPurify',
  },
  prismjs: {
    url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js',
    global: 'Prism',
    css: { href: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css' }
  },

  /* ── 9. QR Code & Barcode ─────────────────────────────── */
  qrcodejs: {
    url: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
    global: 'QRCode',
  },
  jsbarcode: {
    url: 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js',
    global: 'JsBarcode',
  },

  /* ── 10. Drag & Drop ──────────────────────────────────── */
  sortablejs: {
    url: 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.3/Sortable.min.js',
    global: 'Sortable',
  },

  /* ── 11. 3D, Physics & Canvas ─────────────────────────── */
  three: {
    url: 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.min.js',
    global: 'THREE',
  },
  matterjs: {
    url: 'https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js',
    global: 'Matter',
  },
  p5: {
    url: 'https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js',
    global: 'p5',
  },

  /* ── 12. AI & Machine Learning ────────────────────────── */
  tensorflow: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js',
    global: 'tf',
  },
  tfjsWebgpuBackend: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgpu@4.22.0/dist/tf-backend-webgpu.min.js',
  },
  mobilenet: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js',
    global: 'mobilenet',
  },
  cocossd: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js',
    global: 'cocoSsd',
  },
  blazeface: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.1.0/dist/blazeface.min.js',
    global: 'blazeface',
  },
  handpose: {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose@0.0.7/dist/handpose.min.js',
    global: 'handpose',
  },

  /* ── 13. Animations & Scroll Reveals ─────────────────── */
  gsap: {
    url: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    global: 'gsap',
  },
  aos: {
    url: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js',
    global: 'AOS',
    css: { href: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css' }
  },
};
