/* ─── 27 Browser APIs Interactive Suite ─────────────────────────────────── */
import { showNotification } from '../core/notificationManager.js';

export default class BrowserApiPage {
  constructor() {
    this.activeTab = 'all';
    this.audioCtx = null;
    this.worker = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.cameraStream = null;
    this.screenStream = null;
    this.wakeLock = null;
    this.broadcastChannel = null;
    this.db = null;
    this._speechRec = null;
    this._mediaStream = null;
    this._observers = [];
    this._visibilityHandler = null;
  }

  async init() {
    this.container = document.getElementById('api-cards-container');
    this.tabs = document.querySelectorAll('.api-tab-btn');

    if (this.tabs) {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          this.tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.activeTab = tab.dataset.tab;
          this.renderCards();
        });
      });
    }

    await this.initIndexedDB();
    this.renderCards();
  }

  /* ── 1. IndexedDB Initialization ── */
  initIndexedDB() {
    return new Promise((resolve) => {
      const request = indexedDB.open('fn_notes_db', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        }
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };
      request.onerror = () => resolve();
    });
  }

  renderCards() {
    if (!this.container) return;

    const cards = [
      /* ── Storage & DB ── */
      {
        id: 'api-localstorage', tab: 'storage', title: '1. LocalStorage & SessionStorage',
        badge: 'Storage',
        desc: 'Read, set and persist key-value pairs across sessions.',
        html: `
          <div style="display: grid; gap: 8px;">
            <input type="text" id="ls-key" placeholder="Key (e.g. user_name)" style="padding:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);" />
            <input type="text" id="ls-val" placeholder="Value (e.g. Alex)" style="padding:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);" />
            <div style="display:flex;gap:8px;">
              <button class="btn btn-sm" id="ls-save-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Save</button>
              <button class="btn btn-sm" id="ls-read-btn" style="background:var(--bg-muted);color:var(--text-primary);">Read</button>
            </div>
            <div id="ls-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">Result: --</div>
          </div>
        `,
        action: () => {
          document.getElementById('ls-save-btn')?.addEventListener('click', () => {
            const k = document.getElementById('ls-key').value;
            const v = document.getElementById('ls-val').value;
            if (k) { localStorage.setItem(k, v); showNotification(`Saved ${k}`, 'success'); }
          });
          document.getElementById('ls-read-btn')?.addEventListener('click', () => {
            const k = document.getElementById('ls-key').value;
            const v = localStorage.getItem(k);
            document.getElementById('ls-output').textContent = `Result: ${v !== null ? v : 'Not Found'}`;
          });
        }
      },
      {
        id: 'api-idb', tab: 'storage', title: '2. IndexedDB (Offline Notes)',
        badge: 'Database',
        desc: 'Asynchronous transactional database for storing structured objects.',
        html: `
          <div style="display: grid; gap: 8px;">
            <input type="text" id="idb-note-input" placeholder="Enter offline note..." style="padding:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);" />
            <button class="btn btn-sm" id="idb-add-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">+ Save Note</button>
            <ul id="idb-notes-list" style="max-height:100px;overflow-y:auto;padding-left:18px;margin:4px 0;font-size:0.85rem;color:var(--text-secondary);"></ul>
          </div>
        `,
        action: () => {
          const loadNotes = () => {
            if (!this.db) return;
            const tx = this.db.transaction('notes', 'readonly');
            const store = tx.objectStore('notes');
            const req = store.getAll();
            req.onsuccess = () => {
              const list = document.getElementById('idb-notes-list');
              if (list) {
                list.innerHTML = req.result.map(n => `<li>${n.text}</li>`).join('') || '<li>No notes stored.</li>';
              }
            };
          };
          loadNotes();
          document.getElementById('idb-add-btn')?.addEventListener('click', () => {
            const inp = document.getElementById('idb-note-input');
            if (inp && inp.value.trim() && this.db) {
              const tx = this.db.transaction('notes', 'readwrite');
              tx.objectStore('notes').add({ text: inp.value.trim(), date: Date.now() });
              inp.value = '';
              loadNotes();
              showNotification('Note stored in IndexedDB', 'success');
            }
          });
        }
      },

      /* ── Speech & Media ── */
      {
        id: 'api-clipboard', tab: 'speech', title: '3. Clipboard API',
        badge: 'Clipboard',
        desc: 'Read and write text directly to system clipboard.',
        html: `
          <div style="display:flex;gap:8px;">
            <button class="btn btn-sm" id="clip-copy-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Copy Nexus Text</button>
            <button class="btn btn-sm" id="clip-paste-btn" style="background:var(--bg-muted);color:var(--text-primary);">Paste from Clipboard</button>
          </div>
          <div id="clip-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Clip Output: --</div>
        `,
        action: () => {
          document.getElementById('clip-copy-btn')?.addEventListener('click', async () => {
            await navigator.clipboard.writeText('Frontend Nexus 2026 Showcase');
            showNotification('Copied to clipboard!', 'success');
          });
          document.getElementById('clip-paste-btn')?.addEventListener('click', async () => {
            try {
              const txt = await navigator.clipboard.readText();
              document.getElementById('clip-output').textContent = `Clip Output: ${txt}`;
            } catch (e) {
              showNotification('Clipboard paste permission denied', 'warning');
            }
          });
        }
      },
      {
        id: 'api-notification', tab: 'speech', title: '4. Notification API',
        badge: 'System',
        desc: 'Display native desktop notifications outside browser window.',
        html: `
          <button class="btn btn-sm" id="notify-trigger-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Trigger Desktop Notification</button>
        `,
        action: () => {
          document.getElementById('notify-trigger-btn')?.addEventListener('click', async () => {
            if (!('Notification' in window)) return showNotification('Notifications not supported', 'warning');
            const perm = await Notification.requestPermission();
            if (perm === 'granted') {
              new Notification('Frontend Nexus Notification', { body: 'Native desktop notification triggered successfully!', icon: '/favicon.ico' });
            } else {
              showNotification(`Notification permission: ${perm}`, 'warning');
            }
          });
        }
      },
      {
        id: 'api-speech-rec', tab: 'speech', title: '5. Speech Recognition API',
        badge: 'Voice',
        desc: 'Convert spoken voice audio into live transcript text.',
        html: `
          <button class="btn btn-sm" id="speech-rec-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">🎙️ Start Voice Input</button>
          <div id="speech-rec-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Transcript: --</div>
        `,
        action: () => {
          document.getElementById('speech-rec-btn')?.addEventListener('click', () => {
            if (this._speechRec) {
              this._speechRec.abort();
              this._speechRec = null;
              showNotification('Speech recognition stopped.', 'info');
              return;
            }
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) return showNotification('Speech Recognition not supported in this browser', 'warning');
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            this._speechRec = rec;
            rec.onstart = () => showNotification('Listening... Speak now!', 'info');
            rec.onresult = (e) => {
              const text = e.results[0][0].transcript;
              document.getElementById('speech-rec-output').textContent = `Transcript: "${text}"`;
            };
            rec.onerror = (e) => showNotification(`Speech error: ${e.error}`, 'warning');
            rec.onend = () => { this._speechRec = null; };
            rec.start();
          });
        }
      },
      {
        id: 'api-speech-syn', tab: 'speech', title: '6. Speech Synthesis API',
        badge: 'Voice',
        desc: 'Text-to-speech engine with custom pitch and rate.',
        html: `
          <input type="text" id="tts-input" value="Welcome to Frontend Nexus showcase!" style="width:100%;padding:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);margin-bottom:8px;" />
          <button class="btn btn-sm" id="tts-speak-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">🔊 Speak Text</button>
        `,
        action: () => {
          document.getElementById('tts-speak-btn')?.addEventListener('click', () => {
            const val = document.getElementById('tts-input').value;
            if (val && 'speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance(val);
              window.speechSynthesis.speak(utter);
            }
          });
        }
      },
      {
        id: 'api-camera', tab: 'speech', title: '7. Camera & Mic MediaDevices',
        badge: 'Media',
        desc: 'Capture live video stream from device camera.',
        html: `
          <video id="cam-video" autoplay playsinline style="width:100%;height:140px;background:#000;border-radius:8px;object-fit:cover;margin-bottom:8px;"></video>
          <button class="btn btn-sm" id="cam-toggle-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Start Camera</button>
        `,
        action: () => {
          document.getElementById('cam-toggle-btn')?.addEventListener('click', async () => {
            const video = document.getElementById('cam-video');
            if (this.cameraStream) {
              this.cameraStream.getTracks().forEach(t => t.stop());
              this.cameraStream = null;
              if (video) video.srcObject = null;
              document.getElementById('cam-toggle-btn').textContent = 'Start Camera';
            } else {
              try {
                this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (video) video.srcObject = this.cameraStream;
                document.getElementById('cam-toggle-btn').textContent = 'Stop Camera';
              } catch (e) {
                showNotification('Camera access denied or unequipped', 'warning');
              }
            }
          });
        }
      },
      {
        id: 'api-media-recorder', tab: 'speech', title: '8. MediaRecorder API',
        badge: 'Audio',
        desc: 'Record microphone audio and play back recorded snippet.',
        html: `
          <div style="display:flex;gap:8px;margin-bottom:8px;">
            <button class="btn btn-sm" id="rec-start-btn" style="background:#ef4444;color:#fff;font-weight:600;">🔴 Rec Audio</button>
            <button class="btn btn-sm" id="rec-stop-btn" style="background:var(--bg-muted);color:var(--text-primary);" disabled>⏹ Stop</button>
          </div>
          <audio id="rec-audio" controls style="width:100%;height:36px;"></audio>
        `,
        action: () => {
          const startBtn = document.getElementById('rec-start-btn');
          const stopBtn = document.getElementById('rec-stop-btn');
          const audioEl = document.getElementById('rec-audio');

          startBtn?.addEventListener('click', async () => {
            if (this._mediaStream) {
              this._mediaStream.getTracks().forEach(t => t.stop());
              this._mediaStream = null;
            }
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              this._mediaStream = stream;
              this.mediaRecorder = new MediaRecorder(stream);
              this.audioChunks = [];
              this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data);
              this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
                audioEl.src = URL.createObjectURL(blob);
              };
              this.mediaRecorder.start();
              startBtn.disabled = true;
              stopBtn.disabled = false;
              showNotification('Recording audio...', 'info');
            } catch (e) {
              showNotification('Microphone access denied', 'warning');
            }
          });

          stopBtn?.addEventListener('click', () => {
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
              this.mediaRecorder.stop();
              startBtn.disabled = false;
              stopBtn.disabled = true;
              showNotification('Audio recording ready', 'success');
            }
          });
        }
      },
      {
        id: 'api-screen-capture', tab: 'speech', title: '9. Screen Capture API',
        badge: 'Display',
        desc: 'Capture live screen display contents via getDisplayMedia.',
        html: `
          <video id="screen-video" autoplay playsinline style="width:100%;height:140px;background:#000;border-radius:8px;object-fit:contain;margin-bottom:8px;"></video>
          <button class="btn btn-sm" id="screen-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Capture Screen</button>
        `,
        action: () => {
          document.getElementById('screen-btn')?.addEventListener('click', async () => {
            try {
              this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
              const video = document.getElementById('screen-video');
              if (video) video.srcObject = this.screenStream;
            } catch (e) {
              showNotification('Screen capture canceled', 'info');
            }
          });
        }
      },

      /* ── Device & Sensors ── */
      {
        id: 'api-geo', tab: 'device', title: '10. Geolocation API',
        badge: 'GPS',
        desc: 'Retrieve high-accuracy latitude and longitude coordinates.',
        html: `
          <button class="btn btn-sm" id="geo-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Get Location</button>
          <div id="geo-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Coordinates: --</div>
        `,
        action: () => {
          document.getElementById('geo-btn')?.addEventListener('click', () => {
            if (!('geolocation' in navigator)) return showNotification('Geolocation unavailable', 'warning');
            navigator.geolocation.getCurrentPosition(
              pos => {
                document.getElementById('geo-output').textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
              },
              err => showNotification(`Geo error: ${err.message}`, 'warning')
            );
          });
        }
      },
      {
        id: 'api-battery', tab: 'device', title: '11. Battery Status API',
        badge: 'Power',
        desc: 'Monitor device battery percentage and charging state.',
        html: `
          <button class="btn btn-sm" id="battery-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Check Battery</button>
          <div id="battery-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Status: --</div>
        `,
        action: () => {
          document.getElementById('battery-btn')?.addEventListener('click', async () => {
            if (!navigator.getBattery) return showNotification('Battery API unsupported', 'warning');
            const bat = await navigator.getBattery();
            document.getElementById('battery-output').textContent = `Level: ${Math.round(bat.level * 100)}% | Charging: ${bat.charging ? 'Yes ⚡' : 'No'}`;
          });
        }
      },
      {
        id: 'api-net-info', tab: 'device', title: '12. Network Information API',
        badge: 'Network',
        desc: 'Detect connection type, downlink speed and online status.',
        html: `
          <div id="net-output" style="font-size:0.85rem;color:var(--text-secondary);">Connection: --</div>
        `,
        action: () => {
          const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const out = document.getElementById('net-output');
          if (out) {
            out.textContent = `Online: ${navigator.onLine} | Type: ${conn ? conn.effectiveType : 'Standard'} | Speed: ${conn ? conn.downlink + ' Mbps' : 'N/A'}`;
          }
        }
      },
      {
        id: 'api-fs-access', tab: 'device', title: '13. File System Access API',
        badge: 'File System',
        desc: 'Open local files directly via showOpenFilePicker.',
        html: `
          <button class="btn btn-sm" id="fs-open-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Open File</button>
          <div id="fs-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">File Content: --</div>
        `,
        action: () => {
          document.getElementById('fs-open-btn')?.addEventListener('click', async () => {
            if (!window.showOpenFilePicker) return showNotification('FS Access API unsupported in browser', 'warning');
            try {
              const [handle] = await window.showOpenFilePicker();
              const file = await handle.getFile();
              const txt = await file.text();
              document.getElementById('fs-output').textContent = `Loaded ${file.name} (${file.size} bytes):\n${txt.slice(0, 100)}...`;
            } catch (e) {}
          });
        }
      },
      {
        id: 'api-web-share', tab: 'device', title: '14. Web Share API',
        badge: 'Share',
        desc: 'Invoke native OS sharing dialog with custom links.',
        html: `
          <button class="btn btn-sm" id="share-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Invoke Native Share</button>
        `,
        action: () => {
          document.getElementById('share-btn')?.addEventListener('click', async () => {
            if (!navigator.share) return showNotification('Web Share API unsupported', 'warning');
            try {
              await navigator.share({ title: 'Frontend Nexus', text: '47 Libraries & 27 Browser APIs', url: window.location.href });
            } catch (e) {}
          });
        }
      },
      {
        id: 'api-fullscreen', tab: 'device', title: '15. Fullscreen API',
        badge: 'Display',
        desc: 'Toggle application container into fullscreen presentation mode.',
        html: `
          <button class="btn btn-sm" id="fs-toggle-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Toggle Fullscreen Mode</button>
        `,
        action: () => {
          document.getElementById('fs-toggle-btn')?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          });
        }
      },

      /* ── Observers & Workers ── */
      {
        id: 'api-intersect-obs', tab: 'observers', title: '16. Intersection Observer',
        badge: 'Observer',
        desc: 'Detect element visibility within viewport boundaries efficiently.',
        html: `
          <div id="io-target" style="padding:16px;background:var(--bg-secondary);border-radius:8px;text-align:center;font-weight:600;color:var(--accent);">Target Box Visible</div>
        `,
        action: () => {
          const target = document.getElementById('io-target');
          if (!target) return;
          const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
              target.textContent = e.isIntersecting ? 'Target Box Visible ✅' : 'Out of View ❌';
            });
          });
          this._observers.push(obs);
          obs.observe(target);
        }
      },
      {
        id: 'api-resize-obs', tab: 'observers', title: '17. Resize Observer',
        badge: 'Observer',
        desc: 'Monitor target container element dimension changes.',
        html: `
          <div id="ro-target" style="padding:12px;background:var(--bg-secondary);border-radius:8px;font-size:0.85rem;color:var(--text-secondary);">Size: --</div>
        `,
        action: () => {
          const target = document.getElementById('ro-target');
          if (!target) return;
          const obs = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            target.textContent = `Dimensions: ${Math.round(width)}px × ${Math.round(height)}px`;
          });
          this._observers.push(obs);
          obs.observe(target);
        }
      },
      {
        id: 'api-mutation-obs', tab: 'observers', title: '18. Mutation Observer',
        badge: 'Observer',
        desc: 'Listen to DOM tree node mutations and attribute modifications.',
        html: `
          <button class="btn btn-sm" id="mo-trigger-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Mutate DOM</button>
          <div id="mo-target" style="margin-top:8px;font-size:0.85rem;color:var(--text-secondary);">Log: Waiting for mutation...</div>
        `,
        action: () => {
          const target = document.getElementById('mo-target');
          const btn = document.getElementById('mo-trigger-btn');
          if (!target || !btn) return;
          const obs = new MutationObserver(mutations => {
            target.textContent = `Mutation detected: ${mutations[0].type}`;
          });
          this._observers.push(obs);
          obs.observe(target, { childList: true, characterData: true, subtree: true });
          btn.addEventListener('click', () => { target.textContent = `Mutated at ${new Date().toLocaleTimeString()}`; });
        }
      },
      {
        id: 'api-visibility', tab: 'observers', title: '19. Page Visibility API',
        badge: 'Visibility',
        desc: 'Detect whether active browser tab is visible or minimized.',
        html: `
          <div id="vis-output" style="font-size:0.85rem;color:var(--text-secondary);">Tab State: Visible</div>
        `,
        action: () => {
          const out = document.getElementById('vis-output');
          const handleVis = () => {
            if (out) out.textContent = `Tab State: ${document.hidden ? 'Hidden 🙈' : 'Visible 👁️'}`;
          };
          this._visibilityHandler = handleVis;
          document.addEventListener('visibilitychange', handleVis);
        }
      },
      {
        id: 'api-web-worker', tab: 'observers', title: '20. Web Worker API',
        badge: 'Multithreading',
        desc: 'Calculate complex prime numbers on background CPU thread.',
        html: `
          <button class="btn btn-sm" id="worker-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Run Background Math</button>
          <div id="worker-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Worker Result: --</div>
        `,
        action: () => {
          document.getElementById('worker-btn')?.addEventListener('click', () => {
            const blob = new Blob([`
              self.onmessage = function() {
                let primes = [];
                for (let i = 2; i < 500000; i++) {
                  let isP = true;
                  for (let j = 2; j * j <= i; j++) { if (i % j === 0) { isP = false; break; } }
                  if (isP) primes.push(i);
                }
                self.postMessage(primes.length);
              }
            `], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            worker.onmessage = e => {
              document.getElementById('worker-output').textContent = `Found ${e.data} primes in background without blocking UI!`;
              worker.terminate();
            };
            worker.postMessage('start');
          });
        }
      },

      /* ── Audio & Hardware ── */
      {
        id: 'api-web-audio', tab: 'audio', title: '21. Web Audio API',
        badge: 'Audio Synth',
        desc: 'Synthesize custom frequency tones and sound effects.',
        html: `
          <div style="display:flex;gap:8px;">
            <button class="btn btn-sm" id="synth-c" style="background:var(--accent);color:#0f172a;font-weight:600;">Tone C (261Hz)</button>
            <button class="btn btn-sm" id="synth-e" style="background:var(--accent);color:#0f172a;font-weight:600;">Tone E (329Hz)</button>
            <button class="btn btn-sm" id="synth-g" style="background:var(--accent);color:#0f172a;font-weight:600;">Tone G (392Hz)</button>
          </div>
        `,
        action: () => {
          const playTone = (freq) => {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
          };
          document.getElementById('synth-c')?.addEventListener('click', () => playTone(261.63));
          document.getElementById('synth-e')?.addEventListener('click', () => playTone(329.63));
          document.getElementById('synth-g')?.addEventListener('click', () => playTone(392.00));
        }
      },
      {
        id: 'api-web-anim', tab: 'audio', title: '22. Web Animations API (WAAPI)',
        badge: 'Animation',
        desc: 'Animate DOM elements programmatically via JS animation objects.',
        html: `
          <div id="waapi-box" style="width:40px;height:40px;background:var(--accent);border-radius:8px;margin-bottom:8px;"></div>
          <button class="btn btn-sm" id="waapi-btn" style="background:var(--bg-muted);color:var(--text-primary);">Pulse Box</button>
        `,
        action: () => {
          document.getElementById('waapi-btn')?.addEventListener('click', () => {
            const box = document.getElementById('waapi-box');
            if (box) {
              box.animate([
                { transform: 'scale(1) rotate(0deg)' },
                { transform: 'scale(1.5) rotate(180deg)', background: '#a855f7' },
                { transform: 'scale(1) rotate(360deg)', background: 'var(--accent)' }
              ], { duration: 800, easing: 'ease-in-out' });
            }
          });
        }
      },
      {
        id: 'api-vibration', tab: 'audio', title: '23. Vibration API',
        badge: 'Haptic',
        desc: 'Trigger physical haptic vibration pulses on mobile hardware.',
        html: `
          <button class="btn btn-sm" id="vib-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Vibrate Device</button>
        `,
        action: () => {
          document.getElementById('vib-btn')?.addEventListener('click', () => {
            if (!navigator.vibrate) return showNotification('Vibration API unsupported on device', 'warning');
            navigator.vibrate([200, 100, 200]);
            showNotification('Vibrating device...', 'info');
          });
        }
      },
      {
        id: 'api-wakelock', tab: 'audio', title: '24. Screen Wake Lock API',
        badge: 'Screen',
        desc: 'Prevent device screen from turning off or dimming.',
        html: `
          <button class="btn btn-sm" id="wakelock-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Enable Wake Lock</button>
          <div id="wakelock-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">State: Disabled</div>
        `,
        action: () => {
          document.getElementById('wakelock-btn')?.addEventListener('click', async () => {
            if (!('wakeLock' in navigator)) return showNotification('Wake Lock API unsupported', 'warning');
            if (this.wakeLock) {
              await this.wakeLock.release();
              this.wakeLock = null;
              document.getElementById('wakelock-btn').textContent = 'Enable Wake Lock';
              document.getElementById('wakelock-output').textContent = 'State: Disabled';
            } else {
              try {
                this.wakeLock = await navigator.wakeLock.request('screen');
                document.getElementById('wakelock-btn').textContent = 'Release Wake Lock';
                document.getElementById('wakelock-output').textContent = 'State: Active 🔒';
              } catch (e) {}
            }
          });
        }
      },
      {
        id: 'api-broadcast', tab: 'audio', title: '25. Broadcast Channel API',
        badge: 'Cross-Tab',
        desc: 'Send real-time messages across open browser tabs.',
        html: `
          <input type="text" id="bc-msg-input" value="Hello Tab!" style="padding:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);width:100%;margin-bottom:8px;" />
          <button class="btn btn-sm" id="bc-send-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Broadcast to Tabs</button>
          <div id="bc-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Received: --</div>
        `,
        action: () => {
          this.broadcastChannel = new BroadcastChannel('fn_nexus_channel');
          this.broadcastChannel.onmessage = e => {
            const out = document.getElementById('bc-output');
            if (out) out.textContent = `Received: "${e.data}"`;
          };
          document.getElementById('bc-send-btn')?.addEventListener('click', () => {
            const inp = document.getElementById('bc-msg-input');
            if (inp && this.broadcastChannel) {
              this.broadcastChannel.postMessage(inp.value);
              showNotification('Broadcasted message!', 'info');
            }
          });
        }
      },
      {
        id: 'api-gamepad', tab: 'audio', title: '26. Gamepad API',
        badge: 'Controller',
        desc: 'Connect USB / Bluetooth gaming controllers.',
        html: `
          <button class="btn btn-sm" id="gamepad-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">Check Gamepads</button>
          <div id="gamepad-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Controller: --</div>
        `,
        action: () => {
          document.getElementById('gamepad-btn')?.addEventListener('click', () => {
            const pads = navigator.getGamepads ? navigator.getGamepads() : [];
            const connected = Array.from(pads).filter(Boolean);
            document.getElementById('gamepad-output').textContent = connected.length
              ? `Connected: ${connected[0].id}`
              : 'No gamepad detected. Press any button on controller.';
          });
        }
      },
      {
        id: 'api-eyedropper', tab: 'audio', title: '27. EyeDropper API',
        badge: 'Color Picker',
        desc: 'Sample pixel color directly from anywhere on screen.',
        html: `
          <button class="btn btn-sm" id="eyedrop-btn" style="background:var(--accent);color:#0f172a;font-weight:600;">🔍 Pick Screen Color</button>
          <div id="eyedrop-output" style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">Sampled Color: --</div>
        `,
        action: () => {
          document.getElementById('eyedrop-btn')?.addEventListener('click', async () => {
            if (!window.EyeDropper) return showNotification('EyeDropper API unsupported in browser', 'warning');
            try {
              const eye = new EyeDropper();
              const res = await eye.open();
              document.getElementById('eyedrop-output').textContent = `Sampled: ${res.sRGBHex}`;
            } catch (e) {}
          });
        }
      }
    ];

    const filtered = cards.filter(c => this.activeTab === 'all' || c.tab === this.activeTab);

    this.container.innerHTML = filtered.map(card => `
      <article class="api-card" style="background: var(--bg-surface); border-radius: 16px; border: 1px solid var(--border); padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">${card.title}</h3>
            <span class="badge" style="background: rgba(56,189,248,0.12); color: var(--accent); font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px;">${card.badge}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0 0 16px 0; line-height: 1.4;">${card.desc}</p>
        </div>
        <div style="padding-top: 12px; border-top: 1px solid var(--border);">
          ${card.html}
        </div>
      </article>
    `).join('');

    // Attach card event listeners
    filtered.forEach(card => card.action());
  }

  destroy() {
    if (this.cameraStream) this.cameraStream.getTracks().forEach(t => t.stop());
    if (this.screenStream) this.screenStream.getTracks().forEach(t => t.stop());
    if (this._mediaStream) this._mediaStream.getTracks().forEach(t => t.stop());
    if (this._speechRec) { try { this._speechRec.abort(); } catch {} this._speechRec = null; }
    if (this.wakeLock) this.wakeLock.release();
    if (this.broadcastChannel) this.broadcastChannel.close();
    if (this.audioCtx) { try { this.audioCtx.close(); } catch {} this.audioCtx = null; }
    if (this.worker) { this.worker.terminate(); this.worker = null; }
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = null;
    }
    this._observers.forEach(obs => { try { obs.disconnect(); } catch {} });
    this._observers = [];
    this.container = null;
  }
}
