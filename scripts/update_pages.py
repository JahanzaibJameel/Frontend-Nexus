import os
import textwrap

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
html_dir = os.path.join(base_dir, 'pages')
js_dir = os.path.join(base_dir, 'assets', 'js', 'pages')

html_pages = {
    'home.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header">
            <h1>Frontend Nexus</h1>
            <p>A modern vanilla JavaScript showcase built with browser APIs, PWA support, and secure loading patterns.</p>
          </div>
          <div class="feature-grid">
            <article class="feature-card"><h2>AI</h2><p>TensorFlow.js with WebGPU fallback and image classification.</p><a href="#/ai">Open AI Lab</a></article>
            <article class="feature-card"><h2>Browser APIs</h2><p>Clipboard, notifications, file access, sharing, and battery information.</p><a href="#/browser-api">Launch Browser Lab</a></article>
            <article class="feature-card"><h2>WebGPU</h2><p>Run GPU compute shaders in supported browsers with graceful fallback.</p><a href="#/webgpu">Try WebGPU</a></article>
            <article class="feature-card"><h2>Three.js</h2><p>Native 3D rendering using Three.js modules and responsive scene controls.</p><a href="#/three">View 3D Scene</a></article>
            <article class="feature-card"><h2>Forms</h2><p>Accessible, validated forms using native browser controls.</p><a href="#/forms">Practice Forms</a></article>
            <article class="feature-card"><h2>Canvas</h2><p>Generative canvas drawing and visual effects with native API support.</p><a href="#/canvas">Try Canvas</a></article>
          </div>
        </section>
    '''),
    'dashboard.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Dashboard</h1><p>Live metrics, usage cards, and trend analytics for the app overview.</p></div>
          <div class="stats-grid">
            <article class="stat-card"><span>Visitors</span><strong id="stat-visitors">0</strong></article>
            <article class="stat-card"><span>Engagement</span><strong id="stat-engagement">0%</strong></article>
            <article class="stat-card"><span>Latency</span><strong id="stat-latency">0ms</strong></article>
            <article class="stat-card"><span>Errors</span><strong id="stat-errors">0</strong></article>
          </div>
          <div class="chart-panel"><div id="dashboard-chart"></div></div>
        </section>
    '''),
    'charts.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Charts</h1><p>Interactive charts rendered with ApexCharts and responsive analytics panels.</p></div>
          <div class="chart-panel"><div id="chart-container"></div></div>
        </section>
    '''),
    'forms.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Forms</h1><p>Validated form examples with immediate feedback and accessible controls.</p></div>
          <form id="forms-demo" class="form-panel">
            <label class="form-field"><span>Name</span><input type="text" id="name" placeholder="Your name" required /></label>
            <label class="form-field"><span>Email</span><input type="email" id="email" placeholder="you@example.com" required /></label>
            <label class="form-field"><span>Password</span><input type="password" id="password" placeholder="At least 8 characters" minlength="8" required /></label>
            <label class="form-field checkbox-field"><input type="checkbox" id="subscribe" /> <span>Subscribe to newsletter</span></label>
            <button type="submit">Submit</button>
            <div id="form-feedback" class="form-feedback"></div>
          </form>
        </section>
    '''),
    'tables.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Tables</h1><p>Sortable table data with client-side filtering and responsive layout.</p></div>
          <div class="table-panel">
            <div class="table-toolbar"><input id="table-filter" type="search" placeholder="Filter rows..." /></div>
            <div class="table-wrap"><table>
              <thead><tr><th data-key="name">Name</th><th data-key="role">Role</th><th data-key="status">Status</th></tr></thead>
              <tbody id="table-body"></tbody>
            </table></div>
          </div>
        </section>
    '''),
    'gallery.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Gallery</h1><p>Responsive image gallery with preview modal interactions.</p></div>
          <div class="gallery-grid" id="gallery-grid"></div>
          <dialog id="gallery-lightbox" class="gallery-lightbox"><img id="gallery-lightbox-img" alt="Expanded preview" /><p id="gallery-lightbox-caption"></p><button id="gallery-lightbox-close">Close</button></dialog>
        </section>
    '''),
    'media.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Media</h1><p>Native audio and video playback examples with responsive controls.</p></div>
          <div class="media-grid">
            <article class="media-card"><h2>Video player</h2><video id="demo-video" controls muted playsinline><source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />Your browser does not support video playback.</video></article>
            <article class="media-card"><h2>Audio player</h2><audio id="demo-audio" controls><source src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3" type="audio/mpeg" />Your browser does not support audio playback.</audio></article>
          </div>
        </section>
    '''),
    'maps.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Maps</h1><p>Geolocation-aware map utility with live location status.</p></div>
          <div class="map-card"><p id="map-status">Click below to resolve your current location.</p><button id="loc-btn">Get Location</button><pre id="location-output"></pre></div>
        </section>
    '''),
    'markdown.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Markdown</h1><p>Live Markdown editor with instant HTML preview.</p></div>
          <div class="markdown-grid">
            <textarea id="markdown-input" placeholder="Type markdown here..."># Welcome to Frontend Nexus\n\n- **Bold** text\n- *Italic* text\n- [Links](https://developer.mozilla.org)</textarea>
            <div id="markdown-preview" class="preview-pane"></div>
          </div>
        </section>
    '''),
    'pdf.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>PDF</h1><p>Open sample PDF documents in a new tab or download them locally.</p></div>
          <div class="pdf-card"><button id="pdf-open">Open Sample PDF</button><a id="pdf-download" class="pdf-link" href="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" target="_blank" rel="noopener">Download PDF</a></div>
        </section>
    '''),
    'upload.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Upload</h1><p>Drag-and-drop file upload with instant preview and file list.</p></div>
          <div class="upload-card">
            <div id="dropzone" class="dropzone">Drop files here or click to select.</div>
            <input id="upload-input" type="file" multiple hidden />
            <ul id="upload-list" class="upload-list"></ul>
          </div>
        </section>
    '''),
    'three.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Three.js</h1><p>Interactive 3D scene rendered with Three.js modules.</p></div>
          <div class="three-card"><div id="three-root" class="three-root"></div></div>
        </section>
    '''),
    'webgpu.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>WebGPU</h1><p>Modern GPU compute demo with fallback messaging for unsupported browsers.</p></div>
          <div class="webgpu-card">
            <div id="webgpu-status">Checking WebGPU support...</div>
            <button id="webgpu-button">Run GPU Demo</button>
            <pre id="webgpu-output" class="api-output"></pre>
            <div id="webgpu-fallback" hidden>WebGPU is not supported in this browser. Try Chrome or Safari 18+.</div>
          </div>
        </section>
    '''),
    'physics.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Physics</h1><p>Basic physics simulation rendered in a canvas element.</p></div>
          <div class="physics-card">
            <canvas id="physics-canvas" width="900" height="320"></canvas>
            <button id="physics-reset">Reset Simulation</button>
          </div>
        </section>
    '''),
    'canvas.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Canvas</h1><p>Generative 2D drawing with native canvas APIs and motion.</p></div>
          <div class="canvas-demo"><canvas id="painting-canvas" width="900" height="380"></canvas></div>
        </section>
    '''),
    'browser-api.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Browser API Lab</h1><p>Interactive Web API demos with platform capability detection.</p></div>
          <div id="browser-api-status" class="api-status">Ready</div>
          <div id="browser-api-content"></div>
        </section>
    '''),
    'ai.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>AI Playground</h1><p>TensorFlow.js MobileNet classification with WebGPU backend preference.</p></div>
          <div id="ai-status" class="api-status">Ready to load an AI model.</div>
          <div class="ai-grid">
            <div class="ai-panel">
              <img id="ai-sample-image" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" alt="Sample classification" />
              <button id="ai-load-model">Load MobileNet</button>
              <button id="ai-classify-image" disabled>Classify Sample Image</button>
            </div>
            <pre id="ai-output" class="ai-output"></pre>
          </div>
        </section>
    '''),
    'settings.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>Settings</h1><p>Theme and accent controls that persist across sessions.</p></div>
          <div class="settings-grid">
            <label class="form-field"><span>Theme</span><select id="theme-select"><option value="dark">Dark</option><option value="light">Light</option><option value="cyberpunk">Cyberpunk</option><option value="neumorphism">Neumorphism</option></select></label>
            <label class="form-field"><span>Accent</span><input id="accent-color" type="color" value="#38bdf8" /></label>
            <p class="settings-note">Theme choice is saved to local storage and applies immediately.</p>
          </div>
        </section>
    '''),
    'about.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>About</h1><p>Frontend Nexus demonstrates secure vanilla JavaScript architecture with modern browser APIs.</p></div>
          <div class="about-content">
            <p>This project highlights:</p>
            <ul>
              <li>PWA support with service worker caching</li>
              <li>Content Security Policy and integrity-aware library loading</li>
              <li>WebGPU, AI, Three.js, Canvas, and browser API labs</li>
            </ul>
            <p id="about-status"></p>
          </div>
        </section>
    '''),
    '404.html': textwrap.dedent('''
        <section class="page-shell" view-transition-name="page-content">
          <div class="page-header"><h1>404</h1><p>The requested page is not available.</p></div>
          <div class="about-content"><p>Use the sidebar to navigate back to a supported section.</p></div>
        </section>
    ''')
}

js_pages = {
    'about.js': textwrap.dedent('''
        export default class AboutPage {
          init() {
            const status = document.getElementById('about-status');
            if (status) {
              status.textContent = 'Loaded at ' + new Date().toLocaleTimeString();
            }
          }
          destroy() {}
        }
    '''),
    'dashboard.js': textwrap.dedent('''
        import { loadLibrary } from '../core/libraryLoader.js';

        export default class DashboardPage {
          constructor() {
            this.cardData = [
              { key: 'visitors', label: 'Visitors', value: 12852 },
              { key: 'engagement', label: 'Engagement', value: 72 },
              { key: 'latency', label: 'Latency', value: 92 },
              { key: 'errors', label: 'Errors', value: 4 }
            ];
          }

          init() {
            this.cardData.forEach(item => {
              const el = document.getElementById('stat-' + item.key);
              if (el) {
                el.textContent = item.key === 'engagement' ? item.value + '%' : item.value.toString();
              }
            });
            this.createChart();
          }

          async createChart() {
            try {
              await loadLibrary('apexcharts');
              const options = {
                chart: { type: 'area', height: 320, toolbar: { show: false } },
                series: [
                  { name: 'Active Users', data: [32, 45, 38, 56, 62, 74, 88] },
                  { name: 'Conversions', data: [12, 16, 14, 22, 30, 36, 42] }
                ],
                xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                stroke: { curve: 'smooth' },
                colors: ['#38bdf8', '#818cf8'],
                legend: { position: 'top' }
              };
              const chartRoot = document.getElementById('dashboard-chart');
              if (chartRoot) {
                chartRoot.innerHTML = '';
                const chart = new ApexCharts(chartRoot, options);
                chart.render();
                this.chart = chart;
              }
            } catch (error) {
              console.warn('Dashboard chart failed', error);
            }
          }

          destroy() {
            if (this.chart && typeof this.chart.destroy === 'function') {
              this.chart.destroy();
            }
          }
        }
    '''),
    'charts.js': textwrap.dedent('''
        import { loadLibrary } from '../core/libraryLoader.js';

        export default class ChartsPage {
          constructor() {
            this.chart = null;
          }

          init() {
            this.renderChart();
          }

          async renderChart() {
            try {
              await loadLibrary('apexcharts');
              const options = {
                chart: { type: 'bar', height: 360, toolbar: { show: false } },
                series: [{ name: 'Launches', data: [14, 18, 22, 19, 24, 28, 33] }],
                xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
                colors: ['#38bdf8'],
                plotOptions: { bar: { borderRadius: 12, horizontal: false } },
                dataLabels: { enabled: false }
              };
              const container = document.getElementById('chart-container');
              if (container) {
                const chart = new ApexCharts(container, options);
                chart.render();
                this.chart = chart;
              }
            } catch (error) {
              console.error('Chart initialization failed', error);
            }
          }

          destroy() {
            if (this.chart && typeof this.chart.destroy === 'function') {
              this.chart.destroy();
            }
          }
        }
    '''),
    'forms.js': textwrap.dedent('''
        export default class FormsPage {
          constructor() {
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          init() {
            this.form = document.getElementById('forms-demo');
            this.feedback = document.getElementById('form-feedback');
            if (this.form) {
              this.form.addEventListener('submit', this.handleSubmit);
            }
          }

          handleSubmit(event) {
            event.preventDefault();
            const name = this.form.querySelector('#name');
            const email = this.form.querySelector('#email');
            const password = this.form.querySelector('#password');
            if (!name.value.trim() || !email.value.includes('@') || password.value.length < 8) {
              this.setFeedback('Please enter valid name, email, and password.', 'danger');
              return;
            }
            this.setFeedback('Form submitted successfully!', 'success');
            this.form.reset();
          }

          setFeedback(message, status) {
            if (this.feedback) {
              this.feedback.textContent = message;
              this.feedback.className = 'form-feedback form-feedback-' + status;
            }
          }

          destroy() {
            if (this.form) {
              this.form.removeEventListener('submit', this.handleSubmit);
            }
          }
        }
    '''),
    'tables.js': textwrap.dedent('''
        export default class TablesPage {
          constructor() {
            this.rows = [
              { name: 'Ava Morgan', role: 'Designer', status: 'Active' },
              { name: 'Noah Kim', role: 'Developer', status: 'Paused' },
              { name: 'Mia Patel', role: 'Product', status: 'Active' },
              { name: 'Leo Santos', role: 'Marketing', status: 'Offline' }
            ];
            this.currentSort = 'name';
            this.handleFilter = this.handleFilter.bind(this);
          }

          init() {
            this.body = document.getElementById('table-body');
            this.filter = document.getElementById('table-filter');
            this.renderRows();
            if (this.filter) {
              this.filter.addEventListener('input', this.handleFilter);
            }
            this.addHeaderListeners();
          }

          renderRows(rows = this.rows) {
            if (!this.body) return;
            this.body.innerHTML = rows.map(row => `<tr><td>${row.name}</td><td>${row.role}</td><td>${row.status}</td></tr>`).join('');
          }

          handleFilter() {
            const query = this.filter.value.toLowerCase();
            this.renderRows(this.rows.filter(item => Object.values(item).some(value => value.toLowerCase().includes(query))));
          }

          addHeaderListeners() {
            document.querySelectorAll('[data-key]').forEach(cell => {
              cell.addEventListener('click', () => this.sortBy(cell.dataset.key));
            });
          }

          sortBy(key) {
            const direction = this.currentSort === key ? -1 : 1;
            this.rows.sort((a, b) => a[key].localeCompare(b[key]) * direction);
            this.currentSort = key;
            this.renderRows();
          }

          destroy() {
            if (this.filter) {
              this.filter.removeEventListener('input', this.handleFilter);
            }
          }
        }
    '''),
    'gallery.js': textwrap.dedent('''
        export default class GalleryPage {
          constructor() {
            this.handleItemClick = this.handleItemClick.bind(this);
            this.handleClose = this.handleClose.bind(this);
          }

          init() {
            this.grid = document.getElementById('gallery-grid');
            this.lightbox = document.getElementById('gallery-lightbox');
            this.lightboxImage = document.getElementById('gallery-lightbox-img');
            this.lightboxCaption = document.getElementById('gallery-lightbox-caption');
            this.closeButton = document.getElementById('gallery-lightbox-close');
            this.images = [
              { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', label: 'Architecture' },
              { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80', label: 'Nature' },
              { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', label: 'Studio' }
            ];
            this.renderGallery();
            if (this.grid) {
              this.grid.addEventListener('click', this.handleItemClick);
            }
            if (this.closeButton) {
              this.closeButton.addEventListener('click', this.handleClose);
            }
          }

          renderGallery() {
            if (!this.grid) return;
            this.grid.innerHTML = this.images.map(image => `<figure class="gallery-item" data-src="${image.src}" data-label="${image.label}"><img src="${image.src}" alt="${image.label}" /><figcaption>${image.label}</figcaption></figure>`).join('');
          }

          handleItemClick(event) {
            const item = event.target.closest('.gallery-item');
            if (!item) return;
            const src = item.dataset.src;
            const label = item.dataset.label;
            if (this.lightboxImage && this.lightboxCaption) {
              this.lightboxImage.src = src;
              this.lightboxCaption.textContent = label;
              this.lightbox.showModal();
            }
          }

          handleClose() {
            if (this.lightbox) {
              this.lightbox.close();
            }
          }

          destroy() {
            if (this.grid) {
              this.grid.removeEventListener('click', this.handleItemClick);
            }
            if (this.closeButton) {
              this.closeButton.removeEventListener('click', this.handleClose);
            }
          }
        }
    '''),
    'maps.js': textwrap.dedent('''
        export default class MapsPage {
          constructor() {
            this.handleLocate = this.handleLocate.bind(this);
          }

          init() {
            this.status = document.getElementById('map-status');
            this.output = document.getElementById('location-output');
            this.button = document.getElementById('loc-btn');
            if (this.button) {
              this.button.addEventListener('click', this.handleLocate);
            }
          }

          handleLocate() {
            if (!navigator.geolocation) {
              this.status.textContent = 'Geolocation is unavailable in this browser.';
              return;
            }
            this.status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(
              position => {
                this.status.textContent = 'Location found.';
                this.output.textContent = `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}\nAccuracy: ${position.coords.accuracy}m`;
              },
              error => {
                this.status.textContent = 'Unable to retrieve location.';
                this.output.textContent = error.message;
              }
            );
          }

          destroy() {
            if (this.button) {
              this.button.removeEventListener('click', this.handleLocate);
            }
          }
        }
    '''),
    'markdown.js': textwrap.dedent('''
        export default class MarkdownPage {
          constructor() {
            this.handleInput = this.handleInput.bind(this);
          }

          init() {
            this.input = document.getElementById('markdown-input');
            this.preview = document.getElementById('markdown-preview');
            if (this.input) {
              this.input.addEventListener('input', this.handleInput);
              this.handleInput();
            }
          }

          handleInput() {
            if (!this.preview || !this.input) return;
            const text = this.input.value || '';
            const html = text
              .replace(/^###\s*(.*$)/gim, '<h3>$1</h3>')
              .replace(/^##\s*(.*$)/gim, '<h2>$1</h2>')
              .replace(/^#\s*(.*$)/gim, '<h1>$1</h1>')
              .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/gim, '<em>$1</em>')
              .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
              .replace(/\n\n/g, '<p></p>')
              .replace(/\n/g, '<br />');
            this.preview.innerHTML = html;
          }

          destroy() {
            if (this.input) {
              this.input.removeEventListener('input', this.handleInput);
            }
          }
        }
    '''),
    'media.js': textwrap.dedent('''
        export default class MediaPage {
          constructor() {
            this.handlePlay = this.handlePlay.bind(this);
          }

          init() {
            this.video = document.getElementById('demo-video');
            this.audio = document.getElementById('demo-audio');
            if (this.video) {
              this.video.addEventListener('play', this.handlePlay);
            }
          }

          handlePlay() {
            console.log('Video started playing');
          }

          destroy() {
            if (this.video) {
              this.video.removeEventListener('play', this.handlePlay);
            }
          }
        }
    '''),
    'pdf.js': textwrap.dedent('''
        export default class PdfPage {
          init() {
            const openButton = document.getElementById('pdf-open');
            if (openButton) {
              openButton.addEventListener('click', () => {
                window.open('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', '_blank', 'noopener');
              });
            }
          }

          destroy() {}
        }
    '''),
    'physics.js': textwrap.dedent('''
        export default class PhysicsPage {
          constructor() {
            this.frame = null;
            this.state = { x: 80, y: 80, vx: 3, vy: 4, radius: 24 };
            this.handleReset = this.handleReset.bind(this);
          }

          init() {
            this.canvas = document.getElementById('physics-canvas');
            this.resetButton = document.getElementById('physics-reset');
            if (this.resetButton) {
              this.resetButton.addEventListener('click', this.handleReset);
            }
            this.update();
          }

          update() {
            if (!this.canvas) return;
            const ctx = this.canvas.getContext('2d');
            const { width, height } = this.canvas;
            this.state.x += this.state.vx;
            this.state.y += this.state.vy;
            if (this.state.x + this.state.radius > width || this.state.x - this.state.radius < 0) this.state.vx *= -1;
            if (this.state.y + this.state.radius > height || this.state.y - this.state.radius < 0) this.state.vy *= -1;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(this.state.x, this.state.y, this.state.radius, 0, Math.PI * 2);
            ctx.fill();
            this.frame = requestAnimationFrame(() => this.update());
          }

          handleReset() {
            this.state = { x: 80, y: 80, vx: 3, vy: 4, radius: 24 };
          }

          destroy() {
            if (this.frame) {
              cancelAnimationFrame(this.frame);
            }
            if (this.resetButton) {
              this.resetButton.removeEventListener('click', this.handleReset);
            }
          }
        }
    '''),
    'three.js': textwrap.dedent('''
        import * as THREE from 'three';

        export default class ThreePage {
          constructor() {
            this.animate = this.animate.bind(this);
          }

          init() {
            this.container = document.getElementById('three-root');
            if (!this.container) return;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / 420, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.container.clientWidth, 420);
            this.container.appendChild(this.renderer.domElement);
            const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
            const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(3, 4, 5);
            this.scene.add(light);
            this.camera.position.set(0, 0, 6);
            this.animate();
          }

          animate() {
            if (!this.renderer) return;
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.015;
            this.renderer.render(this.scene, this.camera);
            this.frame = requestAnimationFrame(this.animate);
          }

          destroy() {
            if (this.frame) cancelAnimationFrame(this.frame);
            if (this.renderer && this.renderer.domElement) {
              this.renderer.domElement.remove();
            }
          }
        }
    '''),
    'canvas.js': textwrap.dedent('''
        export default class CanvasPage {
          constructor() {
            this.frame = null;
            this.angle = 0;
            this.draw = this.draw.bind(this);
          }

          init() {
            this.canvas = document.getElementById('painting-canvas');
            if (this.canvas) {
              this.context = this.canvas.getContext('2d');
              this.draw();
            }
          }

          draw() {
            if (!this.context) return;
            const { width, height } = this.canvas;
            this.context.clearRect(0, 0, width, height);
            for (let i = 0; i < 18; i += 1) {
              const alpha = 0.05 + i * 0.05;
              this.context.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              this.context.beginPath();
              this.context.arc(width / 2, height / 2, 40 + i * 18, this.angle + i * 0.25, this.angle + Math.PI + i * 0.25);
              this.context.stroke();
            }
            this.angle += 0.02;
            this.frame = requestAnimationFrame(this.draw);
          }

          destroy() {
            if (this.frame) cancelAnimationFrame(this.frame);
          }
        }
    '''),
    'upload.js': textwrap.dedent('''
        export default class UploadPage {
          constructor() {
            this.handleFiles = this.handleFiles.bind(this);
            this.handleZoneClick = this.handleZoneClick.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
          }

          init() {
            this.dropzone = document.getElementById('dropzone');
            this.input = document.getElementById('upload-input');
            this.list = document.getElementById('upload-list');
            if (this.dropzone) {
              this.dropzone.addEventListener('click', this.handleZoneClick);
              this.dropzone.addEventListener('dragover', this.handleFiles);
              this.dropzone.addEventListener('drop', this.handleFiles);
            }
            if (this.input) {
              this.input.addEventListener('change', this.handleInputChange);
            }
          }

          handleZoneClick() {
            if (this.input) {
              this.input.click();
            }
          }

          handleFiles(event) {
            event.preventDefault();
            let files;
            if (event.dataTransfer) {
              files = event.dataTransfer.files;
            } else if (event.target && event.target.files) {
              files = event.target.files;
            }
            this.renderFiles(files);
          }

          handleInputChange(event) {
            this.renderFiles(event.target.files);
          }

          renderFiles(files) {
            if (!this.list) return;
            const items = Array.from(files || []).map(file => `<li>${file.name} (${Math.round(file.size / 1024)} KB)</li>`).join('');
            this.list.innerHTML = items || '<li>No files selected yet.</li>';
          }

          destroy() {
            if (this.dropzone) {
              this.dropzone.removeEventListener('click', this.handleZoneClick);
              this.dropzone.removeEventListener('dragover', this.handleFiles);
              this.dropzone.removeEventListener('drop', this.handleFiles);
            }
            if (this.input) {
              this.input.removeEventListener('change', this.handleInputChange);
            }
          }
        }
    '''),
    'settings.js': textwrap.dedent('''
        import { themeManager } from '../core/themeManager.js';

        export default class SettingsPage {
          constructor() {
            this.handleThemeChange = this.handleThemeChange.bind(this);
            this.handleAccentChange = this.handleAccentChange.bind(this);
          }

          init() {
            this.themeSelect = document.getElementById('theme-select');
            this.accentInput = document.getElementById('accent-color');
            if (this.themeSelect) {
              this.themeSelect.value = themeManager.getTheme();
              this.themeSelect.addEventListener('change', this.handleThemeChange);
            }
            if (this.accentInput) {
              const storedAccent = localStorage.getItem('accent-color');
              if (storedAccent) {
                this.accentInput.value = storedAccent;
                document.documentElement.style.setProperty('--accent', storedAccent);
              }
              this.accentInput.addEventListener('input', this.handleAccentChange);
            }
          }

          handleThemeChange(event) {
            themeManager.setTheme(event.target.value);
          }

          handleAccentChange(event) {
            document.documentElement.style.setProperty('--accent', event.target.value);
            localStorage.setItem('accent-color', event.target.value);
          }

          destroy() {
            if (this.themeSelect) {
              this.themeSelect.removeEventListener('change', this.handleThemeChange);
            }
            if (this.accentInput) {
              this.accentInput.removeEventListener('input', this.handleAccentChange);
            }
          }
        }
    ''')
}


def write_files():
    os.makedirs(html_dir, exist_ok=True)
    os.makedirs(js_dir, exist_ok=True)

    for filename, content in html_pages.items():
        path = os.path.join(html_dir, filename)
        with open(path, 'w', encoding='utf-8') as fd:
            fd.write(content.strip() + '\n')

    for filename, content in js_pages.items():
        path = os.path.join(js_dir, filename)
        with open(path, 'w', encoding='utf-8') as fd:
            fd.write(content.strip() + '\n')

    print('Updated HTML page templates and page scripts.')


if __name__ == '__main__':
    write_files()
