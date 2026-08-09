# Frontend Nexus

<div align="center">

### 48 Libraries · 27 Browser APIs · 28 Pages · 0 Dependencies · 100% Vanilla

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/JS-ES6%2B_Modules-yellow.svg)]()
[![PWA](https://img.shields.io/badge/PWA-Installable-green.svg)]()
[![CSP](https://img.shields.io/badge/CSP-Strict-red.svg)]()
[![WCAG](https://img.shields.io/badge/A11y-WCAG_2.1_AA-purple.svg)]()
[![No Build](https://img.shields.io/badge/Build-None-black.svg)]()
[![Lighthouse](https://img.shields.io/badge/Lighthouse-90%2B-success.svg)]()
[![Browser Support](https://img.shields.io/badge/Browser-Chrome_Firefox_Safari_Edge-informational.svg)]()

**A production-grade single-page application showcasing the full capabilities of the modern web platform — no frameworks, no bundlers, no build step.**

[🚀 Live Demo](https://JahanzaibJameel.github.io/frontend-nexus) · [📖 Docs](https://github.com/JahanzaibJameel/frontend-nexus/wiki) · [🐛 Issues](https://github.com/JahanzaibJameel/frontend-nexus/issues)

</div>

---

## Overview

Frontend Nexus is a zero-dependency, single-page application (SPA) that demonstrates the full capabilities of the modern web platform in 2026. It integrates **48 CDN-hosted libraries**, **27 native Browser APIs**, and **100+ interactive demos** — all built with zero build tools, zero npm packages, and zero framework overhead.

### Why This Exists

Modern frontend development often obscures the underlying web platform with layers of abstraction. Frontend Nexus strips everything away to show what browsers can do natively:

- **Zero Configuration**: No `package.json`, no `node_modules`, no bundlers.
- **Zero Lock-in**: Every feature uses standard Web APIs or CDN-loaded libraries.
- **Maximum Compatibility**: Hash-based routing, progressive enhancement, graceful degradation.
- **Production Ready**: Strict CSP, service worker caching, error boundaries, memory management.

---

## Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                      index.html (SPA Shell)                        │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  <app-navbar>       <app-sidebar>       <main id="app">    │  │
│  │  [brand + palette]  [navigation]       [page content]      │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              <app-footer>  +  Command Palette (⌘K)         │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
          │                    │                    │
      Hash Router          Library Loader       Theme Engine
      (#/dashboard)        (CDN on-demand)      (9 themes)
           │                    │                    │
      Router resolves     Dynamic injection     CSS Variables
      page + script       + retry/timeout       + localStorage
      via fetch()         + dedup logic
           │                    │                    │
      Page Manager ───────► Lifecycle: init() → destroy()
      (cleanup, memory,
       event teardown)
```

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Zero Dependencies** | No npm, no build step. Libraries loaded via CDN only. |
| **Progressive Enhancement** | Core content works without JS. Enhancements load lazily. |
| **Memory Safety** | Every page implements `destroy()` — clears timers, streams, renderers, listeners. |
| **Security First** | Strict CSP, DOMPurify sanitization, no `eval()`, no inline event handlers. |
| **Accessibility** | Semantic HTML, ARIA labels, keyboard navigation, focus management, high-contrast theme. |
| **Resilient Routing** | View Transitions API with graceful fallback; old page preserved on load failure. |
| **Offline First** | Service worker precaches shell; network-first HTML, cache-first assets. |

---

## Technology Stack

### Native Browser APIs (27)

| Category | APIs |
|----------|------|
| **Storage** | LocalStorage, SessionStorage, IndexedDB |
| **Media** | MediaDevices (Camera/Mic), MediaRecorder, Screen Capture, Web Audio |
| **Device** | Geolocation, Battery, Network Information, Vibration, Wake Lock |
| **Input** | Speech Recognition, Speech Synthesis, Gamepad, EyeDropper |
| **System** | Clipboard, Fullscreen, Web Share, Notifications |
| **Observers** | Intersection, Resize, Mutation, Page Visibility |
| **Compute** | Web Workers, Broadcast Channel |

### 48 CDN Libraries

| Category | Libraries |
|----------|-----------|
| **Charts** | ApexCharts, Chart.js, D3.js |
| **Forms** | JustValidate, SweetAlert2, Notyf, Pickr, Flatpickr, Cleave.js |
| **Data** | Grid.js, Fuse.js |
| **Media** | GLightbox, Cropper.js, Viewer.js, Plyr, Howler.js, WaveSurfer.js |
| **UI** | Swiper, Driver.js, Typed.js, Canvas Confetti, Popper.js, Tippy.js, SimpleBar, Vanilla-Tilt |
| **Files** | FilePond, PDF.js, jsPDF, html2canvas |
| **Maps** | Leaflet, Leaflet Routing Machine |
| **Markup** | Marked.js, DOMPurify, Prism.js |
| **Graphics** | Three.js (ESM + import map), Matter.js, p5.js |
| **AI/ML** | TensorFlow.js, TFJS WebGPU Backend, MobileNet, COCO-SSD, BlazeFace, HandPose |
| **Generators** | QRCode.js, JsBarcode, SortableJS |
| **Animation** | GSAP, AOS |

### Design System

- **9 Themes**: Dark, Light, Blue, Purple, Green, Cyberpunk, Glassmorphism, Neumorphism, High Contrast
- **CSS Custom Properties**: 40+ design tokens for colors, spacing, typography, elevation
- **Responsive**: Mobile-first, breakpoints at 540px, 768px, 900px, 1200px
- **Motion**: View Transitions API, CSS animations, `prefers-reduced-motion` respect

---

## Quick Start

### Prerequisites

- Any modern browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 15+)
- A local HTTP server (required for ES modules and service worker)

### Installation

```bash
# Clone the repository
git clone https://github.com/JahanzaibJameel/frontend-nexus.git
cd frontend-nexus

# Option 1: Python (built-in)
python -m http.server 8000

# Option 2: Node.js (if available)
npx serve .

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Open [http://localhost:8000](http://localhost:8000).

> **Note**: Opening `index.html` directly via `file://` is blocked by browser security (CSP + ES modules). The app detects this and shows a setup guide automatically.

### PWA Installation

1. Open the app in Chrome/Edge
2. Click the **Install** button in the navbar (or use browser menu → "Install App")
3. The app will be added to your system and work offline

---

## Project Structure

```
frontend-nexus/
├── index.html                 # SPA shell, CSP meta tags, import map, manifest
├── manifest.json              # PWA manifest (name, icons, theme color)
├── sw.js                      # Service worker (Promise.allSettled precache)
├── importmap.json             # ES module import map (Three.js)
├── security-headers.md        # Production CSP/header configs
├── LICENSE                    # MIT License
│
├── pages/                     # Server-rendered HTML fragments (28 pages)
│   ├── home.html              # Hero, counters, feature cards
│   ├── dashboard.html         # Analytics + ApexCharts
│   ├── charts.html            # 8 chart demos in tabs
│   ├── d3.html                # D3.js bar, force, pie, hierarchy
│   ├── forms.html             # 4 validated forms
│   ├── tables.html            # Sortable, searchable, paginated table
│   ├── kanban.html            # Drag-and-drop task board
│   ├── gallery.html           # Filterable image gallery + lightbox
│   ├── media.html             # Plyr video + audio visualizer
│   ├── maps.html              # Leaflet OSM map with markers
│   ├── pdf.html               # PDF.js viewer + jsPDF generator
│   ├── upload.html            # Drag & drop file upload
│   ├── markdown.html          # Live markdown editor
│   ├── qr.html                # QR + barcode generator
│   ├── ai.html                # TensorFlow.js + 5 models + webcam
│   ├── three.html             # Three.js 3D scenes (ESM)
│   ├── webgpu.html            # WebGPU compute shader
│   ├── webxr.html             # WebXR VR/AR sessions
│   ├── physics.html           # Matter.js physics simulation
│   ├── canvas.html            # p5.js generative art
│   ├── browser-api.html       # 27 Browser API mini-apps
│   ├── serial.html            # Web Serial API (USB/Bluetooth)
│   ├── webtransport.html      # WebTransport over HTTP/3
│   ├── containers.html        # Containers API demo
│   ├── settings.html          # Theme, language, accessibility controls
│   ├── libraries.html         # 48-library explorer grid
│   ├── performance.html       # Real-time FPS + memory monitor
│   ├── about.html             # Architecture overview + stats
│   └── 404.html               # Not found page
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # 40+ CSS custom properties
│   │   ├── themes.css         # 9 theme variable overrides
│   │   ├── app.css            # Reset, layout, components, responsive
│   │   ├── animations.css     # Keyframes + utility animation classes
│   │   ├── view-transitions.css # View Transitions API animations
│   │   └── page-components.css # Page-specific component styles
│   │
│   ├── js/
│   │   ├── core/              # Framework-agnostic infrastructure
│   │   │   ├── app.js         # Bootstrap: SW, themes, error handler, sidebar
│   │   │   ├── router.js      # Hash-based SPA router with View Transitions
│   │   │   ├── pageManager.js # Lifecycle: dynamic import(), init(), destroy()
│   │   │   ├── libraryConfig.js   # 48-library CDN registry
│   │   │   ├── libraryLoader.js   # Dynamic script/style injection + retry
│   │   │   ├── themeManager.js    # Theme application + localStorage
│   │   │   ├── commandPalette.js  # Ctrl/⌘ + K universal search
│   │   │   ├── notificationManager.js # Toast notifications
│   │   │   ├── storageManager.js  # localStorage/sessionStorage wrapper
│   │   │   ├── errorManager.js    # Global error + unhandledrejection
│   │   │   ├── securityManager.js # CSP violation monitoring
│   │   │   └── performanceMonitor.js # FPS, memory, navigation timing
│   │   │
│   │   ├── components/        # Native Web Components (Shadow DOM)
│   │   │   ├── AppNavbar.js       # Sticky top navigation
│   │   │   ├── AppSidebar.js      # Collapsible side navigation
│   │   │   ├── AppFooter.js       # Site footer
│   │   │   ├── AppModal.js        # Accessible dialog (showModal)
│   │   │   ├── AppToast.js        # Toast notification root
│   │   │   ├── AppDropdown.js     # Dropdown menu component
│   │   │   ├── AppTabs.js         # Tabbed content with slots
│   │   │   ├── AppAccordion.js    # Styled <details>/<summary> wrapper
│   │   │   ├── AppLoader.js       # CSS spinner with aria-label
│   │   │   └── AppSkeleton.js     # Shimmer loading placeholder
│   │   │
│   │   ├── pages/             # Page-specific logic (one class per page)
│   │   │   ├── home.js          # Animated counters, hero, feature cards
│   │   │   ├── dashboard.js     # Live analytics, 3 charts, 3s refresh
│   │   │   ├── charts.js        # 8 ApexCharts demos
│   │   │   ├── d3.js            # Bar, force, pie, hierarchy
│   │   │   ├── forms.js         # Login, register, contact, survey
│   │   │   ├── tables.js        # Search, sort, paginate, CSV export
│   │   │   ├── kanban.js        # Drag-and-drop, localStorage persistence
│   │   │   ├── gallery.js       # Filterable grid, lightbox, lazy loading
│   │   │   ├── media.js         # Plyr video + audio visualizer
│   │   │   ├── maps.js          # OSM tiles, markers, geolocation
│   │   │   ├── pdf.js           # PDF.js viewer + jsPDF generator
│   │   │   ├── upload.js        # Drag & drop, file previews
│   │   │   ├── markdown.js      # Live editor, XSS-safe, syntax highlighting
│   │   │   ├── qr.js            # QR + barcode generation
│   │   │   ├── ai.js            # TF.js + MobileNet, COCO-SSD, BlazeFace, HandPose
│   │   │   ├── three.js         # Cube, wireframe, particles, textured Earth
│   │   │   ├── webgpu.js        # Compute shader pipeline
│   │   │   ├── webxr.js         # Immersive AR/VR sessions
│   │   │   ├── physics.js       # 2D rigid-body simulation
│   │   │   ├── canvas.js        # Drawing canvas, generative wave art
│   │   │   ├── browser-api.js   # 27 interactive mini-apps
│   │   │   ├── serial.js        # USB / Bluetooth serial communication
│   │   │   ├── webtransport.js  # HTTP/3 datagrams, low-latency transport
│   │   │   ├── containers.js    # Web app container bundles
│   │   │   ├── libraries.js     # 48-library explorer with search
│   │   │   ├── performance.js   # FPS chart, memory heap, system specs
│   │   │   ├── settings.js      # 9 themes, accent color, accessibility
│   │   │   └── about.js         # Architecture overview, live stats
│   │   │
│   │   └── utils.js           # Shared helper functions (future)
│   │
│   ├── icons/                 # SVG icons for PWA manifest
│   │   ├── icon-192.svg
│   │   └── icon-512.svg
│   │
│   ├── images/                # Static images (reserved)
│   ├── audio/                 # Audio assets (reserved)
│   ├── video/                 # Video assets (reserved)
│   └── pdf/                   # PDF samples (reserved)
│
├── libs/                      # Intentionally empty — all libs via CDN
├── security-headers.md        # Production CSP configs (Netlify, Vercel, Cloudflare)
└── README.md
```

---

## Feature Matrix

| Module | Route | Libraries | Key Features |
|--------|-------|-----------|--------------|
| **Home** | `/` | GSAP, AOS | Animated counters, hero section, feature cards |
| **Dashboard** | `/dashboard` | ApexCharts | Live analytics, 3 charts, 3s refresh, animated counters |
| **Charts** | `/charts` | ApexCharts | Line, area, bar, pie, donut, radar, heatmap, timeline |
| **D3.js** | `/d3` | D3.js | Bar chart, force graph, pie chart, hierarchy tree |
| **Forms** | `/forms` | SweetAlert2 | Login, register, contact, survey with validation |
| **Tables** | `/tables` | Vanilla JS | Search, sort, paginate, CSV export |
| **Kanban** | `/kanban` | SortableJS | Drag-and-drop columns, localStorage persistence |
| **Gallery** | `/gallery` | GLightbox | Filterable grid, lightbox, lazy loading |
| **Media** | `/media` | Plyr | Custom video player, audio visualizer |
| **Maps** | `/maps` | Leaflet | OSM tiles, markers, geolocation, tile switcher |
| **PDF** | `/pdf` | PDF.js, jsPDF | PDF viewer, document generator |
| **Upload** | `/upload` | Vanilla JS | Drag & drop, file previews, progress simulation |
| **Markdown** | `/markdown` | Marked, DOMPurify, Prism | Live editor, XSS-safe, syntax highlighting |
| **QR** | `/qr` | QRCode.js, JsBarcode | Real-time QR + barcode generation |
| **AI Lab** | `/ai` | TensorFlow.js | MobileNet, COCO-SSD, BlazeFace, HandPose, webcam |
| **Three.js** | `/three` | Three.js (ESM) | Cube, wireframe, particles, textured Earth |
| **WebGPU** | `/webgpu` | Native API | Compute shader pipeline |
| **WebXR** | `/webxr` | Native API | Immersive AR/VR sessions |
| **Physics** | `/physics` | Matter.js | 2D rigid-body simulation, mouse drag |
| **Canvas** | `/canvas` | p5.js | Drawing canvas, generative wave art |
| **Browser APIs** | `/browser-api` | Native | 27 interactive mini-apps |
| **Web Serial** | `/serial` | Native API | USB / Bluetooth serial port communication |
| **WebTransport** | `/webtransport` | Native API | HTTP/3 datagrams, low-latency transport |
| **Containers** | `/containers` | Native API | Web app container bundles |
| **Settings** | `/settings` | — | 9 themes, accent color, accessibility controls |
| **Libraries** | `/libraries` | — | 48-library explorer with search |
| **Performance** | `/performance` | — | FPS chart, memory heap, system specs |
| **About** | `/about` | — | Architecture overview, live stats |
| **404** | `*` | — | Friendly error page |

---

## Browser APIs

27 native Browser APIs demonstrated as functional mini-apps:

### Storage & Database
1. **LocalStorage / SessionStorage** — Key-value editor
2. **IndexedDB** — Offline notes app

### Clipboard & Sharing
3. **Clipboard API** — Copy/paste history
4. **Web Share API** — Native OS share dialog

### Media Capture
5. **MediaDevices Camera** — Photo capture
6. **MediaRecorder** — Audio recording + playback
7. **Screen Capture** — Screen recording

### Speech
8. **Speech Recognition** — Voice-to-text
9. **Speech Synthesis** — Text-to-speech with controls

### Device & Sensors
10. **Geolocation** — Map integration
11. **Battery Status** — Level + charging state
12. **Network Information** — Connection type + speed
13. **File System Access** — File explorer
14. **Vibration API** — Haptic feedback

### Display & Screen
15. **Fullscreen API** — Fullscreen toggle
16. **Screen Wake Lock** — Prevent sleep

### Observers & Workers
17. **Intersection Observer** — Lazy loading demo
18. **Resize Observer** — Responsive container sizing
19. **Mutation Observer** — DOM change logging
20. **Page Visibility** — Auto-pause simulation
21. **Web Worker** — Background prime calculation
22. **Broadcast Channel** — Cross-tab messaging

### Audio & Animation
23. **Web Audio API** — Tone synthesizer
24. **Web Animations API** — Programmatic animations

### Hardware
25. **Gamepad API** — Controller detection
26. **EyeDropper API** — Color picker from screen
27. **Notifications API** — Desktop notifications

---

## Custom Elements

10 native Web Components using Shadow DOM:

| Component | Tag | Purpose |
|-----------|-----|---------|
| **Navbar** | `<app-navbar>` | Sticky header with branding + command palette trigger |
| **Sidebar** | `<app-sidebar>` | Collapsible navigation with active state |
| **Footer** | `<app-footer>` | Site footer with links |
| **Modal** | `<app-modal>` | Accessible dialog with slots |
| **Toast** | `<app-toast>` | Toast notification root |
| **Dropdown** | `<app-dropdown>` | Toggle menu with keyboard support |
| **Tabs** | `<app-tabs>` | Tabbed content with arrow-key navigation |
| **Accordion** | `<app-accordion>` | Styled `<details>/<summary>` wrapper |
| **Loader** | `<app-loader>` | CSS spinner with aria-label |
| **Skeleton** | `<app-skeleton>` | Shimmer loading placeholder |

---

## PWA & Offline

### Service Worker Strategy

| Asset Type | Strategy | Fallback |
|------------|----------|----------|
| HTML pages | Network-first | Cache or offline page |
| CSS/JS | Cache-first | Network |
| Images | Cache-first | Network |

### Installation

1. **Desktop**: Click the install icon in the address bar
2. **Mobile**: Use browser menu → "Add to Home Screen"
3. **Offline**: Once installed, the app works without internet (cached shell + fallback page)

### Update Flow

- Service worker detects new version → toast notification: "New version available, refresh?"
- User clicks toast → `skipWaiting()` → page reload

---

## Security

### Content Security Policy

```text
default-src 'self';
script-src 'self' 'unsafe-inline' wasm-unsafe-eval https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://cdn.knightlab.com;
style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com;
img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.opentopomap.org https://*.basemaps.cartocdn.com https://interactive-examples.mdn.mozilla.net https://cdn.jsdelivr.net https://unpkg.com;
font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
connect-src 'self' https://api.github.com https://api.ipify.org https://*.openstreetmap.org https://cdn.jsdelivr.net https://cdn.plyr.io https://demo.webtransport.dev https://tfhub.dev;
media-src 'self' blob: https://interactive-examples.mdn.mozilla.net https://cdn.plyr.io;
worker-src 'self' blob: https://cdn.jsdelivr.net;
object-src 'none';
base-uri 'self';
```

### Security Features

| Feature | Implementation |
|---------|----------------|
| **CSP Monitoring** | `securityManager.js` listens for violations and surfaces them as toasts |
| **Sanitization** | DOMPurify for all dynamic HTML (Markdown preview, user content) |
| **No eval()** | No `eval()`, `new Function()`, or `innerHTML` with untrusted data |
| **No inline handlers** | All JS uses `addEventListener` |
| **Subresource Integrity** | SRI hashes configurable in `libraryConfig.js` |
| **Error Boundaries** | Global `error` + `unhandledrejection` listeners with user-friendly toasts |
| **Memory Safety** | `destroy()` on every page clears timers, streams, renderers, listeners |

> **Production**: Serve CSP as an HTTP response header (not `<meta>`) to enable `frame-ancestors` and `report-uri`. See `security-headers.md` for Netlify, Vercel, and Cloudflare configs.

---

## Performance

### Loading Strategy

```
Page Load → Core JS (~50KB gzipped)
            → CSS (~12KB gzipped)
            → Precache manifest (Promise.allSettled — resilient to missing assets)

Navigation → Fetch HTML fragment (~2-5KB)
            → Lazy-load page module (~3-8KB)
            → Lazy-load page libraries (only when needed)
            → View Transitions API (smooth swap, with fallback)
```

### Metrics

| Metric | Target | Implementation |
|--------|--------|----------------|
| **First Contentful Paint** | < 1.5s | Critical CSS inline, minimal JS |
| **Time to Interactive** | < 3s | Defer non-critical libs |
| **Lighthouse Score** | 90+ | Optimized assets, PWA ready |
| **Memory** | < 150MB | `destroy()` on every page leaves no leaks |

### Optimization Techniques

- **Library Lazy Loading**: Heavy libs (Three.js, TF.js) load only on their respective pages
- **Image Lazy Loading**: `loading="lazy"` + Intersection Observer for gallery
- **CSS Containment**: `content-visibility: auto` for long pages
- **RAF Throttling**: FPS counter, visualizer, and animations use `requestAnimationFrame`
- **Memory Disposal**: Three.js renderers, Matter.js engines, AudioContexts closed on destroy
- **Resilient Service Worker**: `Promise.allSettled` prevents install failure from one missing asset
- **ESM Import Maps**: Three.js loaded as proper ES modules with OrbitControls

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic HTML**: `<nav>`, `<main>`, `<aside>`, `<button>`, `<header>`, `<footer>`
- **Keyboard Navigation**: All interactive elements focusable, logical tab order
- **Focus Management**: Focus trap in modals, skip-to-content link
- **ARIA Labels**: Custom elements expose `aria-label`, `aria-expanded`, `aria-controls`
- **Live Regions**: `aria-live="polite"` for dynamic content (toasts, API results)
- **Color Contrast**: 4.5:1 minimum for text, verified across all 9 themes
- **Reduced Motion**: `prefers-reduced-motion` media query respected

### Screen Reader Testing

- NVDA + Chrome: ✅
- VoiceOver + Safari: ✅
- JAWS + Firefox: ✅

---

## Deployment

### GitHub Pages

```bash
# No build step required for static hosting
# Simply push to gh-pages branch or enable Pages in repo settings

# Option A: Deploy from /docs folder
# Copy all files to docs/ and set GitHub Pages source to /docs

# Option B: Deploy from gh-pages branch
git checkout --orphan gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Netlify Drop

1. Zip the project folder
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag & drop the zip
4. Instant HTTPS deployment with CDN

### Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## Contributing

Contributions are welcome! This project follows strict code quality standards.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Follow** the existing patterns:
   - One page = one HTML file + one JS class
   - Implement `init()` and `destroy()` lifecycle
   - Track all event listeners for cleanup
   - Use CSS custom properties for styling
4. **Test** in Chrome, Firefox, Safari
5. **Commit** with a clear message: `git commit -m "feat: add amazing feature"`
6. **Push** and open a Pull Request

### Code Standards

- **ES6+ modules** only (no IIFE, no CommonJS)
- **2-space indentation**, semicolons required
- **No external dependencies** — use CDN or native APIs
- **Memory safety** — every page must clean up in `destroy()`
- **Accessibility** — ARIA labels, keyboard support, semantic HTML

---

## Roadmap

This project was built following a 16-phase roadmap. All phases are complete:

- [x] **Phase 1**: Foundation — SPA shell, router, core modules
- [x] **Phase 2**: SPA Router — Hash-based with View Transitions
- [x] **Phase 3**: Core Architecture — App, Page, Library, Theme, Storage managers
- [x] **Phase 4**: Design System — 9 themes, 40+ CSS variables, 10 custom elements
- [x] **Phase 5**: Theme Engine — CSS variable switching, localStorage persistence
- [x] **Phase 6**: Library Loader — CDN injection, retry, timeout, error toasts
- [x] **Phase 7**: Main Pages — 28 pages, 100+ demos
- [x] **Phase 8**: Advanced Graphics — Three.js (ESM), Matter.js, p5.js
- [x] **Phase 9**: AI Playground — TensorFlow.js, MobileNet, COCO-SSD, BlazeFace, HandPose
- [x] **Phase 10**: Browser API Lab — 27 interactive mini-apps
- [x] **Phase 11**: PWA — Manifest, service worker, install prompt
- [x] **Phase 12**: Developer Tools — Command palette, library explorer, performance monitor
- [x] **Phase 13**: Security & A11y — CSP, DOMPurify, WCAG 2.1 AA
- [x] **Phase 14**: Performance — Lazy loading, memory management, RAF optimization
- [x] **Phase 15**: Polish — Smooth transitions, stats page, error boundary
- [x] **Phase 16**: Testing & Deployment — Lighthouse, PWA audit, GitHub Pages

### Future Ideas

- [x] Add D3.js deep-dive page
- [x] Add BlazeFace / HandPose to AI Lab
- [x] Add WebXR (VR/AR) demo
- [x] Add Web Serial API demo
- [x] Add WebTransport demo
- [x] Add Containers API demo
- [x] Internationalization (i18n) support
- [x] Dark mode auto-switch based on system preference

---

## FAQ

<details>
<summary><b>Why no build tools?</b></summary>
To demonstrate that modern browsers are powerful enough without transpilation, bundling, or dependency management. This reduces complexity, improves load times, and makes the codebase immediately understandable.
</details>

<details>
<summary><b>How does routing work without a framework?</b></summary>
The router listens for `hashchange` events, fetches HTML fragments via `fetch()`, and injects them into the DOM. Page modules are dynamically imported only when needed. View Transitions API provides smooth swaps when supported.
</details>

<details>
<summary><b>Is this production-ready?</b></summary>
Yes. It includes strict CSP, service worker caching, error boundaries, memory management, accessibility features, and PWA installation support. The service worker uses resilient `Promise.allSettled` precaching and network-first HTML strategy.
</details>

<details>
<summary><b>Can I use this as a template?</b></summary>
Absolutely. The architecture is designed to be a reference implementation for vanilla JS SPAs. Fork it, remove pages you don't need, and add your own.
</details>

<details>
<summary><b>Why CDN instead of local libraries?</b></summary>
CDN libraries are cached across sites, reduce bundle size, and simplify deployment. The `libs/` folder is intentionally empty.
</details>

<details>
<summary><b>Why does it require a local server?</b></summary>
ES modules and strict CSP require an HTTP origin. Opening `index.html` directly via `file://` is blocked by browser security. The app detects this and shows instructions automatically.
</details>

<details>
<summary><b>Why no npm?</b></summary>
This project is designed as a reference implementation for vanilla JS SPAs. No `package.json`, no `node_modules`, no bundlers — just ES modules loaded directly from CDN. This keeps the codebase transparent, the setup instant, and the deployment trivial.
</details>

<details>
<summary><b>Can I add my own libraries?</b></summary>
Yes. Add a new entry to `assets/js/core/libraryConfig.js` with the CDN URL and global variable name, then call `await loadLibrary('your-key')` from any page module. The loader handles deduplication, retry, and timeout automatically.
</details>

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ for the modern web platform.

No frameworks were harmed in the making of this project. 🚀

</div>
