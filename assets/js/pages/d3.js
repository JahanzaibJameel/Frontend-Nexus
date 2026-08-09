import { loadLibrary } from '../core/libraryLoader.js';
import { showNotification } from '../core/notificationManager.js';

export default class D3Page {
  constructor() { this._handlers = []; }

  async init() {
    try {
      const d3 = await loadLibrary('d3');
      if (!d3) { showNotification('D3.js failed to load.', 'warning'); return; }
      this._drawBar(d3);
      this._drawForce(d3);
      this._drawPie(d3);
      this._drawHierarchy(d3);
    } catch (e) {
      showNotification('D3.js init error: ' + e.message, 'danger');
    }
  }

  _drawBar(d3) {
    const svg = d3.select('#d3-bar');
    if (svg.empty()) return;
    const data = [40, 70, 55, 90, 65, 80];
    const w = svg.node()?.clientWidth || 600, h = 300;
    svg.attr('viewBox', `0 0 ${w} ${h}`);
    const x = d3.scaleBand().domain(data.map((_, i) => i)).range([40, w - 20]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 100]).range([h - 40, 20]);
    svg.append('g').selectAll('rect').data(data).join('rect')
      .attr('x', (_, i) => x(i)).attr('y', d => y(d)).attr('width', x.bandwidth()).attr('height', d => h - 40 - y(d))
      .attr('fill', 'var(--accent)').attr('rx', 4);
    svg.append('g').selectAll('text').data(data).join('text')
      .attr('x', (_, i) => x(i) + x.bandwidth() / 2).attr('y', d => y(d) - 8)
      .attr('text-anchor', 'middle').attr('fill', 'var(--text-secondary)').text(d => d);
  }

  _drawForce(d3) {
    const svg = d3.select('#d3-force');
    if (svg.empty()) return;
    const w = svg.node()?.clientWidth || 600, h = 300;
    svg.attr('viewBox', `0 0 ${w} ${h}`);
    const nodes = Array.from({ length: 25 }, () => ({ x: w / 2 + (Math.random() - 0.5) * 200, y: h / 2 + (Math.random() - 0.5) * 200 }));
    const sim = d3.forceSimulation(nodes).force('charge', d3.forceManyBody().strength(-60)).force('center', d3.forceCenter(w / 2, h / 2)).force('collide', d3.forceCollide(12));
    const node = svg.append('g').selectAll('circle').data(nodes).join('circle').attr('r', 6).attr('fill', 'var(--accent)').attr('opacity', 0.85);
    sim.on('tick', () => node.attr('cx', d => d.x).attr('cy', d => d.y));
  }

  _drawPie(d3) {
    const svg = d3.select('#d3-pie');
    if (svg.empty()) return;
    const data = [30, 50, 20, 40];
    const w = svg.node()?.clientWidth || 600, h = 300, r = Math.min(w, h) / 2 - 20;
    svg.attr('viewBox', `0 0 ${w} ${h}`);
    const color = d3.scaleOrdinal().domain(data).range(['var(--accent)', '#a855f7', '#10b981', '#f59e0b']);
    const pie = d3.pie().value(d => d);
    const arc = d3.arc().innerRadius(0).outerRadius(r);
    const g = svg.append('g').attr('transform', `translate(${w / 2},${h / 2})`);
    g.selectAll('path').data(pie(data)).join('path')
      .attr('d', arc).attr('fill', d => color(d.data)).attr('stroke', 'var(--bg-surface)').attr('stroke-width', 2);
  }

  _drawHierarchy(d3) {
    const svg = d3.select('#d3-hierarchy');
    if (svg.empty()) return;
    const w = svg.node()?.clientWidth || 600, h = 300;
    svg.attr('viewBox', `0 0 ${w} ${h}`);
    const root = { name: 'Root', children: [{ name: 'A', children: ['A1', 'A2'] }, { name: 'B', children: ['B1', 'B2', 'B3'] }, { name: 'C' }] };
    const tree = d3.tree().size([w - 80, h - 60]);
    const hierarchy = d3.hierarchy(root);
    tree(hierarchy);
    const g = svg.append('g').attr('transform', 'translate(40,20)');
    g.selectAll('line').data(hierarchy.links()).join('line')
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      .attr('stroke', 'var(--border)').attr('stroke-width', 1.5);
    g.selectAll('text').data(hierarchy.descendants()).join('text')
      .attr('x', d => d.x).attr('y', d => d.y)
      .attr('dy', '0.32em').attr('text-anchor', 'middle').attr('fill', 'var(--text-primary)').text(d => d.data.name);
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
