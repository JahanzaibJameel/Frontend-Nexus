export default class ThreePage {
  constructor() {
    this._renderer = null;
    this._rafId    = null;
    this._cleanup  = [];
    this._handlers = [];
    this._ready    = false;
  }

  async init() {
    await this._loadThree();
    this._scene = 'cube';
    const sel = document.getElementById('three-scene');
    if (sel) {
      this._on(sel, 'change', () => { this._scene = sel.value; this._rebuild(); });
    }
    this._on(document.getElementById('three-reset-cam'), 'click', () => {
      if (this._controls) { this._controls.reset(); }
    });
    this._build();
  }

  async _loadThree() {
    if (this._ready) return;
    const THREE = await import('three');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    window.__THREE_MODULE__ = THREE;
    window.__ORBIT_MODULE__ = OrbitControls;
    this._ready = true;
  }

  _build() {
    const THREE   = window.__THREE_MODULE__;
    const Orbit   = window.__ORBIT_MODULE__;
    if (!THREE) return;

    const canvas  = document.getElementById('three-canvas');
    if (!canvas) return;

    this._disposeRenderer();

    const W = canvas.offsetWidth || 800, H = 460;

    this._renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this._renderer.setSize(W, H, false);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 4);
    const scene  = new THREE.Scene();

    if (Orbit) {
      this._controls = new Orbit(camera, canvas);
      this._controls.enableDamping = true;
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 8, 5);
    scene.add(dir);

    let mesh;
    if (this._scene === 'cube') {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5, 4, 4, 4),
        new THREE.MeshPhongMaterial({ color: 0x38bdf8, wireframe: false, shininess: 100 }),
      );
      scene.add(mesh);
    } else if (this._scene === 'wireframe') {
      mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 2),
        new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true }),
      );
      scene.add(mesh);
    } else if (this._scene === 'particles') {
      const count = 4000;
      const geo   = new THREE.BufferGeometry();
      const pos   = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 12;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      mesh = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.04 }));
      scene.add(mesh);
    } else if (this._scene === 'earth') {
      const textureLoader = new THREE.TextureLoader();
      const geo  = new THREE.SphereGeometry(1.5, 64, 64);
      const mat  = new THREE.MeshPhongMaterial({ color: 0x1a6fbf });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      textureLoader.load(
        'https://unpkg.com/three@0.169.0/examples/textures/planets/earth_atmos_2048.jpg',
        (tex) => { mat.map = tex; mat.needsUpdate = true; },
      );
    }

    const animate = () => {
      this._rafId = requestAnimationFrame(animate);
      if (mesh && this._scene !== 'particles') {
        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.006;
      } else if (mesh) {
        mesh.rotation.y += 0.001;
      }
      this._controls?.update();
      this._renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = canvas.offsetWidth;
      camera.aspect = w / H;
      camera.updateProjectionMatrix();
      this._renderer.setSize(w, H, false);
    };
    window.addEventListener('resize', onResize);
    this._cleanup.push(() => window.removeEventListener('resize', onResize));
  }

  _rebuild() {
    cancelAnimationFrame(this._rafId);
    this._cleanup.forEach(fn => fn());
    this._cleanup = [];
    this._build();
  }

  _disposeRenderer() {
    if (this._renderer) {
      this._renderer.dispose();
      this._renderer.forceContextLoss();
      this._renderer = null;
    }
    this._controls?.dispose();
    this._controls = null;
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    cancelAnimationFrame(this._rafId);
    this._disposeRenderer();
    this._cleanup.forEach(fn => fn());
    this._cleanup = [];
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
    this._ready = false;
  }
}
