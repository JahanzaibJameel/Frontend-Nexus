import { loadLibrary } from '../core/libraryLoader.js';

export default class PhysicsPage {
  constructor() {
    this._runner  = null;
    this._render  = null;
    this._engine  = null;
    this._handlers = [];
  }

  async init() {
    await loadLibrary('matterjs');
    this._build();
    this._bindControls();
  }

  _build() {
    const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;
    const canvas = document.getElementById('physics-canvas');
    if (!canvas) return;

    const W = canvas.offsetWidth || 800;
    const H = 400;
    canvas.width  = W;
    canvas.height = H;

    this._engine = Engine.create({ gravity: { y: 1 } });
    const world  = this._engine.world;

    this._render = Render.create({
      canvas,
      engine: this._engine,
      options: {
        width: W, height: H,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    // Walls
    const walls = [
      Bodies.rectangle(W / 2, H + 25, W, 50, { isStatic: true, render: { fillStyle: 'transparent' } }),
      Bodies.rectangle(-25,    H / 2, 50, H,  { isStatic: true, render: { fillStyle: 'transparent' } }),
      Bodies.rectangle(W + 25, H / 2, 50, H,  { isStatic: true, render: { fillStyle: 'transparent' } }),
    ];
    Composite.add(world, walls);

    // Initial balls
    this._addBalls(15);

    // Mouse constraint
    const mouse   = Mouse.create(canvas);
    const mc      = MouseConstraint.create(this._engine, { mouse, constraint: { stiffness: 0.2 } });
    Composite.add(world, mc);

    // Click to spawn ball
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hue = Math.random() * 360;
      const ball = Bodies.circle(x, y, 14 + Math.random() * 16, {
        restitution: 0.7,
        render: { fillStyle: `hsl(${hue}, 70%, 55%)` },
      });
      Composite.add(world, ball);
    };
    canvas.addEventListener('click', onClick);
    this._handlers.push({ el: canvas, evt: 'click', fn: onClick });

    Render.run(this._render);
    this._runner = Runner.create();
    Runner.run(this._runner, this._engine);
  }

  _addBalls(count) {
    if (!Matter || !this._engine) return;
    const { Bodies, Composite } = Matter;
    const canvas = document.getElementById('physics-canvas');
    const W = canvas?.offsetWidth || 800;
    for (let i = 0; i < count; i++) {
      const hue  = Math.random() * 360;
      const ball = Bodies.circle(
        40 + Math.random() * (W - 80),
        -20 - Math.random() * 200,
        14 + Math.random() * 18,
        { restitution: 0.6 + Math.random() * 0.3, render: { fillStyle: `hsl(${hue}, 70%, 55%)` } },
      );
      Composite.add(this._engine.world, ball);
    }
  }

  _bindControls() {
    this._on(document.getElementById('physics-add'), 'click', () => this._addBalls(8));
    this._on(document.getElementById('physics-clear'), 'click', () => {
      if (!Matter) return;
      const { Composite } = Matter;
      const bodies = Composite.allBodies(this._engine.world).filter(b => !b.isStatic);
      bodies.forEach(b => Composite.remove(this._engine.world, b));
    });
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    if (window.Matter) {
      if (this._runner)  Matter.Runner.stop(this._runner);
      if (this._render)  { Matter.Render.stop(this._render); }
      if (this._engine)  Matter.Engine.clear(this._engine);
    }
    this._runner = null; this._render = null; this._engine = null;
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
