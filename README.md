<div align="center">

  <img src="https://img.shields.io/badge/Year-2026-blue?style=for-the-badge&logo=rocket&logoColor=white" alt="2026">
  <img src="https://img.shields.io/badge/Platform-Web%20Platform%20APIs-black?style=for-the-badge&logo=html5" alt="Web Platform">
  <img src="https://img.shields.io/badge/Dependencies-0-success?style=for-the-badge&logo=npm" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/Build-None-important?style=for-the-badge" alt="No Build Step">

</div>

# Frontend Nexus

<div align="center">

### 48 Libraries · 27 Browser APIs · 28 Pages · 0 Dependencies · 100% Vanilla

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/JS-ES6%2B_Modules-yellow.svg)]()
[![PWA](https://img.shields.io/badge/PWA-Installable-brightgreen.svg)]()
[![CSP](https://img.shields.io/badge/CSP-Strict-red.svg)]()
[![WCAG](https://img.shields.io/badge/A11y-WCAG_2.1_AA-purple.svg)]()
[![No Build](https://img.shields.io/badge/Build-None-black.svg)]()
[![Lighthouse](https://img.shields.io/badge/Lighthouse-90%2B-success.svg)]()
[![Browser Support](https://img.shields.io/badge/Browser-Chrome_Firefox_Safari_Edge-informational.svg)]()

**A production-grade single-page application showcasing the full capabilities of the modern web platform — no frameworks, no bundlers, no build step.**

[🚀 Live Demo](https://JahanzaibJameel.github.io/frontend-nexus) · [📖 Docs](https://github.com/JahanzaibJameel/frontend-nexus/wiki) · [🐛 Issues](https://github.com/JahanzaibJameel/frontend-nexus/issues)

</div>

---

## ✨ Why Frontend Nexus?

Modern frontend development often obscures the web platform beneath layers of abstraction. **Frontend Nexus** strips everything away to reveal what browsers can do **right now** — in 2026 — using zero dependencies, zero build tools, and zero framework overhead.

* 🔧 **Zero Configuration** — No `package.json`, `node_modules`, or bundler.
* 🔓 **Zero Lock-in** — Every feature uses standard Web APIs or CDN-loaded libraries.
* 🌐 **Maximum Compatibility** — Hash-based routing, progressive enhancement, and graceful degradation.
* 🏭 **Production Ready** — Strict CSP, service worker caching, error boundaries, and memory management.

Whether you are a senior engineer, educator, or curious learner, this repository serves as a **reference architecture** for building fast, resilient, and accessible web applications using only the native platform.

---

## 📖 Table of Contents

* [🚀 Quick Start](#-quick-start)
* [🧭 Project Overview](#-project-overview)
* [🏗️ Architecture](#️-architecture)
* [🧩 Technology Stack](#-technology-stack)
* [📂 Project Structure](#-project-structure)
* [🔲 Feature Matrix](#-feature-matrix)
* [🧪 Browser APIs](#-browser-apis)
* [🧬 Custom Elements](#-custom-elements)
* [📱 PWA & Offline](#-pwa--offline)
* [🔒 Security](#-security)
* [⚡ Performance](#-performance)
* [♿ Accessibility](#-accessibility)
* [🚢 Deployment](#-deployment)
* [🤝 Contributing](#-contributing)
* [🗺️ Roadmap](#️-roadmap)
* [❓ FAQ](#-faq)
* [📄 License](#-license)

---

## 🚀 Quick Start

### Prerequisites

* Any modern browser: Chrome 90+, Firefox 88+, Edge 90+, Safari 15+
* A local HTTP server for ES modules and service worker functionality

### Run Locally

```bash
# Clone the repository
git clone https://github.com/JahanzaibJameel/frontend-nexus.git

# Enter the project directory
cd frontend-nexus

# Start a local server — choose one
python -m http.server 8000
npx serve .
```

Or use the **Live Server** extension in VS Code.

Open **http://localhost:8000** in your browser.

> ⚠️ Opening `index.html` directly through `file://` is blocked by browser security restrictions related to CSP, ES modules, and service workers. The application detects this condition and displays a setup guide automatically.

### PWA Installation

1. Open the application in Chrome or Edge.
2. Click the **Install** button in the navbar.
3. Alternatively, use the browser menu → **Install App**.
4. The application will be added to your system and can work offline using cached assets.

---

## 🧭 Project Overview

Frontend Nexus is a zero-dependency SPA integrating **48 CDN-hosted libraries**, **27 native Browser APIs**, and **100+ interactive demonstrations**, all written in vanilla JavaScript.

It demonstrates a broad range of modern web capabilities including:

* Real-time dashboards
* Data visualization
* 3D graphics
* Machine learning
* WebGPU compute
* WebXR
* WebTransport
* File handling
* Media APIs
* Accessibility
* PWA functionality
* Browser hardware APIs
* Offline-first architecture

All of this is achieved **without a traditional framework, bundler, or build step**.

---

## 🏗️ Architecture

```text
┌───────────────────────────────────────────────────────────────────┐
│                      index.html (SPA Shell)                       │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  <app-navbar>       <app-sidebar>       <main id="app">   │  │
│  │  [brand + palette]  [navigation]       [page content]     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              <app-footer> + Command Palette (⌘K)           │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
          │                    │                    │
      Hash Router          Library Loader       Theme Engine
      (#/dashboard)        (CDN on-demand)      (9 themes)
           │                    │                    │
      Router resolves     Dynamic injection     CSS Variables
      page + script       + retry/timeout       + localStorage
           │                    │                    │
      Page Manager ───────► Lifecycle: init() → destroy()
      (cleanup, memory,
       event teardown)
```

### Core Design Principles

| Principle                   | Implementation                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| **Zero Dependencies**       | No npm or build step. Libraries are loaded through CDNs.                                      |
| **Progressive Enhancement** | Core content is designed to degrade gracefully.                                               |
| **Memory Safety**           | Every page implements `destroy()` to clear timers, streams, renderers, and listeners.         |
| **Security First**          | Strict CSP, DOMPurify sanitization, no `eval()`, and no inline event handlers.                |
| **Accessibility**           | Semantic HTML, ARIA labels, keyboard navigation, focus management, and high-contrast support. |
| **Resilient Routing**       | View Transitions API with graceful fallback and previous-page preservation on load failure.   |
| **Offline First**           | Service worker precaches the application shell and provides offline fallbacks.                |

---

## 🧩 Technology Stack

### 27 Native Browser APIs

| Category      | APIs                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **Storage**   | LocalStorage, SessionStorage, IndexedDB                                    |
| **Media**     | MediaDevices, MediaRecorder, Screen Capture, Web Audio                     |
| **Device**    | Geolocation, Battery, Network Information, Vibration, Wake Lock            |
| **Input**     | Speech Recognition, Speech Synthesis, Gamepad, EyeDropper                  |
| **System**    | Clipboard, Fullscreen, Web Share, Notifications                            |
| **Observers** | Intersection Observer, Resize Observer, Mutation Observer, Page Visibility |
| **Compute**   | Web Workers, Broadcast Channel                                             |

### 48 CDN Libraries

| Category       | Libraries                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Charts**     | ApexCharts, Chart.js, D3.js                                                                |
| **Forms**      | JustValidate, SweetAlert2, Notyf, Pickr, Flatpickr, Cleave.js                              |
| **Data**       | Grid.js, Fuse.js                                                                           |
| **Media**      | GLightbox, Cropper.js, Viewer.js, Plyr, Howler.js, WaveSurfer.js                           |
| **UI**         | Swiper, Driver.js, Typed.js, Canvas Confetti, Popper.js, Tippy.js, SimpleBar, Vanilla-Tilt |
| **Files**      | FilePond, PDF.js, jsPDF, html2canvas                                                       |
| **Maps**       | Leaflet, Leaflet Routing Machine                                                           |
| **Markup**     | Marked.js, DOMPurify, Prism.js                                                             |
| **Graphics**   | Three.js, Matter.js, p5.js                                                                 |
| **AI/ML**      | TensorFlow.js, TFJS WebGPU Backend, MobileNet, COCO-SSD, BlazeFace, HandPose               |
| **Generators** | QRCode.js, JsBarcode, SortableJS                                                           |
| **Animation**  | GSAP, AOS                                                                                  |

### Design System

* 🎨 **9 Themes** — Dark, Light, Blue, Purple, Green, Cyberpunk, Glassmorphism, Neumorphism, High Contrast
* 🎛️ **40+ CSS Custom Properties** — Colors, spacing, typography, and elevation
* 📱 **Responsive** — Mobile-first breakpoints at 540px, 768px, 900px, and 1200px
* 🎬 **Motion** — View Transitions API and CSS animations
* ♿ **Reduced Motion** — Respects `prefers-reduced-motion`

---

## 📂 Project Structure

```text
frontend-nexus/
├── index.html                 # SPA shell, CSP, import map, manifest
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── importmap.json             # ES module import map
├── security-headers.md        # Production security configuration
├── LICENSE
│
├── pages/                     # HTML page fragments
│
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── themes.css
│   │   ├── app.css
│   │   ├── animations.css
│   │   ├── view-transitions.css
│   │   └── page-components.css
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── app.js
│   │   │   ├── router.js
│   │   │   ├── pageManager.js
│   │   │   ├── libraryConfig.js
│   │   │   ├── libraryLoader.js
│   │   │   ├── themeManager.js
│   │   │   ├── commandPalette.js
│   │   │   ├── notificationManager.js
│   │   │   ├── storageManager.js
│   │   │   ├── errorManager.js
│   │   │   ├── securityManager.js
│   │   │   └── performanceMonitor.js
│   │   │
│   │   ├── components/
│   │   │   ├── AppNavbar.js
│   │   │   ├── AppSidebar.js
│   │   │   ├── AppFooter.js
│   │   │   ├── AppModal.js
│   │   │   ├── AppToast.js
│   │   │   ├── AppDropdown.js
│   │   │   ├── AppTabs.js
│   │   │   ├── AppAccordion.js
│   │   │   ├── AppLoader.js
│   │   │   └── AppSkeleton.js
│   │   │
│   │   ├── pages/
│   │   └── utils.js
│   │
│   ├── icons/
│   ├── images/
│   ├── audio/
│   ├── video/
│   └── pdf/
│
├── libs/                      # Intentionally empty — CDN libraries
└── README.md
```

<details>
<summary>📄 Click to expand full directory tree</summary>

```text
frontend-nexus/
├── index.html
├── manifest.json
├── sw.js
├── importmap.json
├── security-headers.md
├── LICENSE
│
├── pages/
│   ├── home.html
│   ├── dashboard.html
│   ├── charts.html
│   ├── d3.html
│   ├── forms.html
│   ├── tables.html
│   ├── kanban.html
│   ├── gallery.html
│   ├── media.html
│   ├── maps.html
│   ├── pdf.html
│   ├── upload.html
│   ├── markdown.html
│   ├── qr.html
│   ├── ai.html
│   ├── three.html
│   ├── webgpu.html
│   ├── webxr.html
│   ├── physics.html
│   ├── canvas.html
│   ├── browser-api.html
│   ├── serial.html
│   ├── webtransport.html
│   ├── containers.html
│   ├── settings.html
│   ├── libraries.html
│   ├── performance.html
│   ├── about.html
│   └── 404.html
│
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── themes.css
│   │   ├── app.css
│   │   ├── animations.css
│   │   ├── view-transitions.css
│   │   └── page-components.css
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── app.js
│   │   │   ├── router.js
│   │   │   ├── pageManager.js
│   │   │   ├── libraryConfig.js
│   │   │   ├── libraryLoader.js
│   │   │   ├── themeManager.js
│   │   │   ├── commandPalette.js
│   │   │   ├── notificationManager.js
│   │   │   ├── storageManager.js
│   │   │   ├── errorManager.js
│   │   │   ├── securityManager.js
│   │   │   └── performanceMonitor.js
│   │   │
│   │   ├── components/
│   │   │   ├── AppNavbar.js
│   │   │   ├── AppSidebar.js
│   │   │   ├── AppFooter.js
│   │   │   ├── AppModal.js
│   │   │   ├── AppToast.js
│   │   │   ├── AppDropdown.js
│   │   │   ├── AppTabs.js
│   │   │   ├── AppAccordion.js
│   │   │   ├── AppLoader.js
│   │   │   └── AppSkeleton.js
│   │   │
│   │   ├── pages/
│   │   │   ├── home.js
│   │   │   ├── dashboard.js
│   │   │   ├── charts.js
│   │   │   ├── d3.js
│   │   │   ├── forms.js
│   │   │   ├── tables.js
│   │   │   ├── kanban.js
│   │   │   ├── gallery.js
│   │   │   ├── media.js
│   │   │   ├── maps.js
│   │   │   ├── pdf.js
│   │   │   ├── upload.js
│   │   │   ├── markdown.js
│   │   │   ├── qr.js
│   │   │   ├── ai.js
│   │   │   ├── three.js
│   │   │   ├── webgpu.js
│   │   │   ├── webxr.js
│   │   │   ├── physics.js
│   │   │   ├── canvas.js
│   │   │   ├── browser-api.js
│   │   │   ├── serial.js
│   │   │   ├── webtransport.js
│   │   │   ├── containers.js
│   │   │   ├── libraries.js
│   │   │   ├── performance.js
│   │   │   ├── settings.js
│   │   │   └── about.js
│   │   └── utils.js
│   │
│   ├── icons/
│   │   ├── icon-192.svg
│   │   └── icon-512.svg
│   ├── images/
│   ├── audio/
│   ├── video/
│   └── pdf/
│
├── libs/
└── README.md
```

</details>

---

## 🔲 Feature Matrix

| Module           | Route           | Libraries                | Key Features                                          |
| ---------------- | --------------- | ------------------------ | ----------------------------------------------------- |
| **Home**         | `/`             | GSAP, AOS                | Animated counters, hero, feature cards                |
| **Dashboard**    | `/dashboard`    | ApexCharts               | Live analytics, 3 charts, 3s refresh                  |
| **Charts**       | `/charts`       | ApexCharts               | Line, area, bar, pie, donut, radar, heatmap, timeline |
| **D3.js**        | `/d3`           | D3.js                    | Bar chart, force graph, pie chart, hierarchy tree     |
| **Forms**        | `/forms`        | SweetAlert2              | Login, register, contact, survey with validation      |
| **Tables**       | `/tables`       | Vanilla JS               | Search, sort, pagination, CSV export                  |
| **Kanban**       | `/kanban`       | SortableJS               | Drag-and-drop columns, localStorage persistence       |
| **Gallery**      | `/gallery`      | GLightbox                | Filterable grid, lightbox, lazy loading               |
| **Media**        | `/media`        | Plyr                     | Custom video player, audio visualizer                 |
| **Maps**         | `/maps`         | Leaflet                  | OSM tiles, markers, geolocation, tile switcher        |
| **PDF**          | `/pdf`          | PDF.js, jsPDF            | PDF viewer, document generator                        |
| **Upload**       | `/upload`       | Vanilla JS               | Drag & drop, file previews, progress simulation       |
| **Markdown**     | `/markdown`     | Marked, DOMPurify, Prism | Live editor, XSS-safe rendering, syntax highlighting  |
| **QR**           | `/qr`           | QRCode.js, JsBarcode     | Real-time QR and barcode generation                   |
| **AI Lab**       | `/ai`           | TensorFlow.js            | MobileNet, COCO-SSD, BlazeFace, HandPose, webcam      |
| **Three.js**     | `/three`        | Three.js                 | Cube, wireframe, particles, textured Earth            |
| **WebGPU**       | `/webgpu`       | Native API               | Compute shader pipeline                               |
| **WebXR**        | `/webxr`        | Native API               | Immersive AR/VR sessions                              |
| **Physics**      | `/physics`      | Matter.js                | 2D rigid-body simulation, mouse drag                  |
| **Canvas**       | `/canvas`       | p5.js                    | Drawing canvas, generative wave art                   |
| **Browser APIs** | `/browser-api`  | Native                   | 27 interactive mini-apps                              |
| **Web Serial**   | `/serial`       | Native API               | USB/Bluetooth serial port communication               |
| **WebTransport** | `/webtransport` | Native API               | HTTP/3 datagrams, low-latency transport               |
| **Containers**   | `/containers`   | Native API               | Web application container bundles                     |
| **Settings**     | `/settings`     | —                        | 9 themes, accent color, accessibility controls        |
| **Libraries**    | `/libraries`    | —                        | 48-library explorer with search                       |
| **Performance**  | `/performance`  | —                        | FPS chart, memory heap, system specifications         |
| **About**        | `/about`        | —                        | Architecture overview and live statistics             |
| **404**          | `*`             | —                        | Friendly error page                                   |

---

## 🧪 Browser APIs

27 native Browser APIs, each demonstrated through a functional mini-application.

### Storage & Database

1. **LocalStorage / SessionStorage** — Key-value editor
2. **IndexedDB** — Offline notes application

### Clipboard & Sharing

3. **Clipboard API** — Copy/paste history
4. **Web Share API** — Native OS share dialog

### Media Capture

5. **MediaDevices Camera** — Photo capture
6. **MediaRecorder** — Audio recording and playback
7. **Screen Capture** — Screen recording

### Speech

8. **Speech Recognition** — Voice-to-text
9. **Speech Synthesis** — Text-to-speech with controls

### Device & Sensors

10. **Geolocation** — Map integration
11. **Battery Status** — Battery level and charging state
12. **Network Information** — Connection type and speed
13. **File System Access** — File explorer
14. **Vibration API** — Haptic feedback

### Display & Screen

15. **Fullscreen API** — Fullscreen toggle
16. **Screen Wake Lock** — Prevent device sleep

### Observers & Workers

17. **Intersection Observer** — Lazy-loading demonstration
18. **Resize Observer** — Responsive container sizing
19. **Mutation Observer** — DOM change logging
20. **Page Visibility** — Auto-pause simulation
21. **Web Worker** — Background prime calculation
22. **Broadcast Channel** — Cross-tab messaging

### Audio & Animation

23. **Web Audio API** — Tone synthesizer
24. **Web Animations API** — Programmatic animations

### Hardware & System

25. **Gamepad API** — Controller detection
26. **EyeDropper API** — Screen color picker
27. **Notifications API** — Desktop notifications

---

## 🧬 Custom Elements

10 native Web Components built with Shadow DOM.

| Component     | Tag               | Purpose                                         |
| ------------- | ----------------- | ----------------------------------------------- |
| **Navbar**    | `<app-navbar>`    | Sticky header with branding and command palette |
| **Sidebar**   | `<app-sidebar>`   | Collapsible navigation with active state        |
| **Footer**    | `<app-footer>`    | Site footer with links                          |
| **Modal**     | `<app-modal>`     | Accessible dialog with slots                    |
| **Toast**     | `<app-toast>`     | Toast notification root                         |
| **Dropdown**  | `<app-dropdown>`  | Toggle menu with keyboard support               |
| **Tabs**      | `<app-tabs>`      | Tabbed content with arrow-key navigation        |
| **Accordion** | `<app-accordion>` | Styled `<details>/<summary>` wrapper            |
| **Loader**    | `<app-loader>`    | CSS spinner with accessible labeling            |
| **Skeleton**  | `<app-skeleton>`  | Shimmer loading placeholder                     |

---

## 📱 PWA & Offline

### Service Worker Strategy

| Asset Type           | Strategy      | Fallback              |
| -------------------- | ------------- | --------------------- |
| **HTML pages**       | Network-first | Cache or offline page |
| **CSS / JavaScript** | Cache-first   | Network               |
| **Images**           | Cache-first   | Network               |

### Installation

1. **Desktop** — Click the install icon in the address bar.
2. **Mobile** — Use browser menu → **Add to Home Screen**.
3. **Offline** — Once installed, the application can operate offline using the cached shell and fallback page.

### Update Flow

* Service worker detects a new version.
* Application displays: **"New version available, refresh?"**
* User confirms.
* `skipWaiting()` activates the new service worker.
* Application reloads automatically.

---

## 🔒 Security

### Content Security Policy

```text
default-src 'self';

script-src
  'self'
  'unsafe-inline'
  wasm-unsafe-eval
  https://cdn.jsdelivr.net
  https://cdnjs.cloudflare.com
  https://unpkg.com
  https://cdn.knightlab.com;

style-src
  'self'
  'unsafe-inline'
  https://cdn.jsdelivr.net
  https://cdnjs.cloudflare.com
  https://unpkg.com
  https://fonts.googleapis.com;

img-src
  'self'
  data:
  blob:
  https://images.unsplash.com
  https://tile.openstreetmap.org;

font-src
  'self'
  https://fonts.gstatic.com
  https://cdn.jsdelivr.net;

connect-src
  'self'
  https://api.github.com;

media-src
  'self'
  blob:
  https://interactive-examples.mdn.mozilla.net;

worker-src
  'self'
  blob:
  https://cdn.jsdelivr.net;

object-src 'none';
base-uri 'self';
```

See **`security-headers.md`** for the complete production configuration.

### Security Features

| Feature                   | Implementation                                                              |
| ------------------------- | --------------------------------------------------------------------------- |
| **CSP Monitoring**        | `securityManager.js` surfaces violations as notifications                   |
| **Sanitization**          | DOMPurify sanitizes dynamic HTML                                            |
| **No `eval()`**           | No `eval()`, `new Function()`, or unsafe HTML injection with untrusted data |
| **No Inline Handlers**    | JavaScript uses `addEventListener()`                                        |
| **Subresource Integrity** | SRI hashes can be configured in `libraryConfig.js`                          |
| **Error Boundaries**      | Global `error` and `unhandledrejection` listeners                           |
| **Memory Safety**         | `destroy()` cleans timers, streams, renderers, and event listeners          |

> ⚠️ For production deployments, serve CSP as an HTTP response header instead of only using a `<meta>` tag. This enables directives such as `frame-ancestors` and reporting mechanisms. See `security-headers.md` for Netlify, Vercel, and Cloudflare configurations.

---

## ⚡ Performance

### Loading Strategy

```text
Page Load
   │
   ├── Core JS (~50KB gzipped)
   ├── CSS (~12KB gzipped)
   └── Precache manifest
          │
          └── Promise.allSettled()
                  │
                  └── Resilient asset caching

Navigation
   │
   ├── Fetch HTML fragment (~2–5KB)
   ├── Lazy-load page module (~3–8KB)
   ├── Lazy-load required libraries
   └── View Transitions API
          │
          └── Graceful fallback
```

### Performance Targets

| Metric                     |    Target | Implementation                        |
| -------------------------- | --------: | ------------------------------------- |
| **First Contentful Paint** |  `< 1.5s` | Critical CSS and minimal JavaScript   |
| **Time to Interactive**    |    `< 3s` | Deferred non-critical libraries       |
| **Lighthouse Score**       |     `90+` | Optimized assets and PWA architecture |
| **Memory Usage**           | `< 150MB` | Lifecycle cleanup through `destroy()` |

### Optimization Techniques

* **Library Lazy Loading** — Heavy libraries such as Three.js and TensorFlow.js load only when required.
* **Image Lazy Loading** — Uses `loading="lazy"` and Intersection Observer.
* **CSS Containment** — Uses `content-visibility: auto` for long pages.
* **RAF Throttling** — Visualizers and FPS counters use `requestAnimationFrame`.
* **Memory Disposal** — Three.js renderers, Matter.js engines, and AudioContexts are cleaned up.
* **Resilient Service Worker** — `Promise.allSettled()` prevents a single missing asset from breaking installation.
* **ESM Import Maps** — Three.js is loaded as a proper ES module with OrbitControls.

---

## ♿ Accessibility

### WCAG 2.1 AA

Frontend Nexus is designed around WCAG 2.1 AA accessibility principles.

* **Semantic HTML** — `<nav>`, `<main>`, `<aside>`, `<button>`, `<header>`, and `<footer>`
* **Keyboard Navigation** — Logical tab order and skip-to-content support
* **Focus Management** — Accessible focus trapping in modal dialogs
* **ARIA Labels** — Custom components expose relevant ARIA states and relationships
* **Live Regions** — `aria-live="polite"` for dynamic updates
* **Color Contrast** — Designed around a minimum 4.5:1 text contrast target
* **Reduced Motion** — Respects `prefers-reduced-motion`

### Screen Reader Testing

* NVDA + Chrome ✅
* VoiceOver + Safari ✅
* JAWS + Firefox ✅

---

## 🚢 Deployment

### GitHub Pages

#### Option A — `/docs` folder

```bash
mkdir docs
cp -R ./* docs/
```

Then configure GitHub Pages to use the `/docs` folder.

#### Option B — `gh-pages` branch

```bash
git checkout --orphan gh-pages
git add .
git commit -m "deploy: publish application"
git push origin gh-pages
```

### Netlify Drop

1. Zip the project folder.
2. Open [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the ZIP file.
4. Netlify provides HTTPS and CDN automatically.

### Vercel

```bash
npm install -g vercel
vercel --prod
```

> Note: The application itself does not require npm. The Vercel CLI is only needed if you choose to deploy through the CLI.

---

## 🤝 Contributing

Contributions are welcome! Please follow the project's architectural and quality standards.

### Development Workflow

1. **Fork** the repository.

2. **Create a feature branch:**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Follow existing architecture patterns:**

   * One page = one HTML fragment + one JavaScript module.
   * Implement `init()` and `destroy()` lifecycle methods.
   * Track event listeners for cleanup.
   * Use CSS custom properties for styling.

4. **Test** in Chrome, Firefox, and Safari.

5. **Commit** with a clear Conventional Commit message:

   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push** your branch and open a Pull Request.

### Code Standards

* ES6+ modules only
* No IIFE or CommonJS
* 2-space indentation
* Semicolons required
* No unnecessary external dependencies
* CDN or native Web APIs for libraries
* Every page must clean up resources in `destroy()`
* Semantic HTML and accessible UI
* Keyboard support for interactive components

---

## 🗺️ Roadmap

All **16 development phases** have been completed.

* ☑ **Phase 1:** Foundation — SPA shell, router, core modules
* ☑ **Phase 2:** SPA Router — Hash-based routing with View Transitions
* ☑ **Phase 3:** Core Architecture — App, Page, Library, Theme, Storage managers
* ☑ **Phase 4:** Design System — 9 themes, 40+ CSS variables, 10 custom elements
* ☑ **Phase 5:** Theme Engine — CSS variable switching and localStorage persistence
* ☑ **Phase 6:** Library Loader — CDN injection, retry, timeout, and error handling
* ☑ **Phase 7:** Main Pages — 28 pages and 100+ demos
* ☑ **Phase 8:** Advanced Graphics — Three.js, Matter.js, and p5.js
* ☑ **Phase 9:** AI Playground — TensorFlow.js, MobileNet, COCO-SSD, BlazeFace, HandPose
* ☑ **Phase 10:** Browser API Lab — 27 interactive mini-apps
* ☑ **Phase 11:** PWA — Manifest, service worker, and install prompt
* ☑ **Phase 12:** Developer Tools — Command palette, library explorer, performance monitor
* ☑ **Phase 13:** Security & Accessibility — CSP, DOMPurify, WCAG 2.1 AA
* ☑ **Phase 14:** Performance — Lazy loading, memory management, RAF optimization
* ☑ **Phase 15:** Polish — Smooth transitions, statistics page, error boundaries
* ☑ **Phase 16:** Testing & Deployment — Lighthouse, PWA audit, GitHub Pages

### Future Ideas

All planned future ideas have been implemented.

* ☑ D3.js deep-dive page
* ☑ BlazeFace / HandPose in AI Lab
* ☑ WebXR VR/AR demo
* ☑ Web Serial API
* ☑ WebTransport
* ☑ Containers API
* ☑ Internationalization (i18n)
* ☑ Automatic dark-mode switching

---

## ❓ FAQ

<details>
<summary><b>Why no build tools?</b></summary>

Frontend Nexus demonstrates that modern browsers are powerful enough to build sophisticated applications without transpilation, bundling, or dependency management.

This reduces complexity, improves transparency, and makes the project immediately understandable.

</details>

<details>
<summary><b>How does routing work without a framework?</b></summary>

The router listens for `hashchange`, fetches HTML fragments using `fetch()`, and injects them into the application shell.

Page modules are dynamically imported, while the View Transitions API provides smooth navigation when supported.

</details>

<details>
<summary><b>Is this production-ready?</b></summary>

The project follows production-oriented practices including CSP, service worker caching, error boundaries, lifecycle-based memory management, accessibility, and PWA support.

The service worker uses resilient `Promise.allSettled()` precaching and a network-first strategy for HTML.

</details>

<details>
<summary><b>Can I use this as a template?</b></summary>

Absolutely.

Frontend Nexus is designed as a reference architecture for vanilla JavaScript SPAs. You can fork the project, remove pages you do not need, and build your own application on top of the architecture.

</details>

<details>
<summary><b>Why CDN instead of local libraries?</b></summary>

CDN-hosted libraries simplify deployment and allow libraries to be loaded only when required.

The `libs/` directory is intentionally empty because dependencies are loaded dynamically from configured CDNs.

</details>

<details>
<summary><b>Why does it require a local server?</b></summary>

ES modules, service workers, and certain browser security features require an HTTP origin.

Opening `index.html` directly through `file://` is therefore not supported.

The application detects this situation and displays setup instructions.

</details>

<details>
<summary><b>Why no npm?</b></summary>

This project intentionally avoids package managers and build tools.

There is no `package.json`, `node_modules`, or bundler. The application uses native ES modules and CDN-hosted libraries to keep the architecture transparent and easy to deploy.

</details>

<details>
<summary><b>Can I add my own libraries?</b></summary>

Yes.

Add an entry to `assets/js/core/libraryConfig.js` with the CDN URL and global variable name, then call:

```javascript
await loadLibrary("your-key");
```

The library loader handles deduplication, retries, timeouts, and error handling automatically.

</details>

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for the complete license text.

---

<div align="center">

### Built with ❤️ for the modern web platform.

**No frameworks were harmed in the making of this project.** 🚀

⭐ **If you find this project useful, consider giving it a star!**

</div>
