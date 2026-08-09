import { loadLibrary } from '../core/libraryLoader.js';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default class ChartsPage {
  constructor() { this._charts = []; }

  async init() {
    await loadLibrary('apexcharts');

    const theme = document.documentElement.dataset.theme || 'dark';
    const light = theme === 'light' || theme === 'neumorphism';
    const fg = light ? '#0f172a' : '#94a3b8';
    const base = {
      chart: { background: 'transparent', toolbar: { show: true }, height: 300 },
      theme: { mode: light ? 'light' : 'dark' },
      grid: { borderColor: light ? 'rgba(0,0,0,0.1)' : 'rgba(148,163,184,0.12)', strokeDashArray: 4 },
      tooltip: { theme: light ? 'light' : 'dark' },
      xaxis: { categories: months, labels: { style: { colors: fg } } },
      yaxis: { labels: { style: { colors: fg } } },
    };

    const defs = [
      {
        id: 'chart-line', type: 'line',
        series: [
          { name: 'Desktop', data: months.map(() => rnd(1000,9000)) },
          { name: 'Mobile',  data: months.map(() => rnd(800, 7000)) },
        ],
        extra: { stroke: { curve: 'smooth', width: 2.5 }, dataLabels: { enabled: false }, colors: ['#38bdf8','#818cf8'] },
      },
      {
        id: 'chart-area', type: 'area',
        series: [{ name: 'Sessions', data: months.map(() => rnd(3000,12000)) }],
        extra: { fill: { type: 'gradient', gradient: { opacityFrom: 0.5, opacityTo: 0.05 } }, stroke: { curve: 'smooth', width: 2 }, dataLabels: { enabled: false }, colors: ['#22c55e'] },
      },
      {
        id: 'chart-bar', type: 'bar',
        series: [
          { name: 'Revenue',  data: months.map(() => rnd(20000,80000)) },
          { name: 'Expenses', data: months.map(() => rnd(10000,40000)) },
        ],
        extra: { plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }, dataLabels: { enabled: false }, colors: ['#38bdf8','#f59e0b'] },
      },
      {
        id: 'chart-pie', type: 'pie',
        series: [35, 25, 20, 20],
        extra: { labels: ['Chrome','Firefox','Safari','Edge'], colors: ['#38bdf8','#818cf8','#22c55e','#f59e0b'], legend: { labels: { colors: fg } }, xaxis: undefined, yaxis: undefined },
      },
      {
        id: 'chart-donut', type: 'donut',
        series: [44, 27, 18, 11],
        extra: { labels: ['Organic','Social','Referral','Direct'], colors: ['#38bdf8','#818cf8','#22c55e','#ef4444'], legend: { labels: { colors: fg } }, xaxis: undefined, yaxis: undefined },
      },
      {
        id: 'chart-radar', type: 'radar',
        series: [
          { name: 'Series A', data: [80, 50, 30, 40, 100, 20] },
          { name: 'Series B', data: [20, 30, 40, 80, 20, 80] },
        ],
        extra: { xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun'], labels: { style: { colors: Array(6).fill(fg) } } }, yaxis: undefined, colors: ['#38bdf8','#f59e0b'] },
      },
      {
        id: 'chart-heatmap', type: 'heatmap',
        series: Array.from({length:7}, (_,i) => ({ name: `Week ${i+1}`, data: months.map(m => ({ x: m, y: rnd(0,100) })) })),
        extra: { dataLabels: { enabled: false }, colors: ['#38bdf8'], plotOptions: { heatmap: { shadeIntensity: 0.8 } } },
      },
      {
        id: 'chart-timeline', type: 'rangeBar',
        series: [{
          data: [
            { x: 'Design',     y: [new Date('2026-01-01').getTime(), new Date('2026-01-15').getTime()] },
            { x: 'Build',      y: [new Date('2026-01-12').getTime(), new Date('2026-02-20').getTime()] },
            { x: 'Test',       y: [new Date('2026-02-15').getTime(), new Date('2026-03-05').getTime()] },
            { x: 'Deploy',     y: [new Date('2026-03-01').getTime(), new Date('2026-03-15').getTime()] },
          ],
        }],
        extra: { plotOptions: { bar: { horizontal: true, barHeight: '50%', borderRadius: 4 } }, dataLabels: { enabled: false }, xaxis: { type: 'datetime', labels: { style: { colors: fg } } }, yaxis: { labels: { style: { colors: fg } } }, colors: ['#38bdf8'] },
      },
    ];

    for (const def of defs) {
      const el = document.getElementById(def.id);
      if (!el) continue;
      const opts = {
        ...base,
        ...def.extra,
        chart: { ...base.chart, type: def.type },
        series: def.series,
      };
      if (def.extra?.xaxis !== undefined) opts.xaxis = def.extra.xaxis;
      if (def.extra?.yaxis !== undefined) opts.yaxis = def.extra.yaxis;
      const c = new ApexCharts(el, opts);
      c.render();
      this._charts.push(c);
    }
  }

  destroy() {
    this._charts.forEach(c => { try { c.destroy(); } catch {} });
    this._charts = [];
  }
}
