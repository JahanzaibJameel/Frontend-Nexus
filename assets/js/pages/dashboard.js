import { loadLibrary } from '../core/libraryLoader.js';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default class DashboardPage {
  constructor() {
    this._charts = [];
    this._interval = null;
  }

  async init() {
    await loadLibrary('apexcharts');
    this._animateCounters();
    this._buildCharts();
    this._startLiveData();
  }

  _animateCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
    });

    // Revenue counter
    const rev = document.getElementById('revenue-val');
    if (rev) {
      const target = 128540;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        rev.textContent = '$' + Math.floor(p * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else rev.textContent = '$' + target.toLocaleString();
      };
      requestAnimationFrame(step);
    }
  }

  _buildCharts() {
    const theme = document.documentElement.dataset.theme || 'dark';
    const light = theme === 'light' || theme === 'neumorphism';
    const fg = light ? '#0f172a' : '#94a3b8';

    const base = {
      chart: { background: 'transparent', toolbar: { show: false }, animations: { speed: 600 } },
      theme: { mode: light ? 'light' : 'dark' },
      grid: { borderColor: light ? 'rgba(0,0,0,0.1)' : 'rgba(148,163,184,0.12)', strokeDashArray: 4 },
      tooltip: { theme: light ? 'light' : 'dark' },
    };

    // Line chart
    const lineEl = document.getElementById('chart-line');
    if (lineEl && window.ApexCharts) {
      const series = [{
        name: 'Visitors',
        data: months.map(() => rnd(2000, 9000)),
      }];
      this._lineChart = new ApexCharts(lineEl, {
        ...base,
        series,
        chart: { ...base.chart, type: 'area', height: 220 },
        colors: ['#38bdf8'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05 } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2.5 },
        xaxis: { categories: months, labels: { style: { colors: fg } } },
        yaxis: { labels: { style: { colors: fg } } },
      });
      this._lineChart.render();
      this._charts.push(this._lineChart);
    }

    // Pie chart
    const pieEl = document.getElementById('chart-pie');
    if (pieEl && window.ApexCharts) {
      this._pieChart = new ApexCharts(pieEl, {
        ...base,
        series: [44, 27, 18, 11],
        chart: { ...base.chart, type: 'donut', height: 220 },
        labels: ['Organic', 'Social', 'Referral', 'Direct'],
        colors: ['#38bdf8','#818cf8','#22c55e','#f59e0b'],
        legend: { labels: { colors: fg } },
        dataLabels: { style: { colors: ['#fff'] } },
      });
      this._pieChart.render();
      this._charts.push(this._pieChart);
    }

    // Bar chart
    const barEl = document.getElementById('chart-bar');
    if (barEl && window.ApexCharts) {
      this._barChart = new ApexCharts(barEl, {
        ...base,
        series: [{ name: 'Revenue', data: months.map(() => rnd(20000, 120000)) }],
        chart: { ...base.chart, type: 'bar', height: 220 },
        colors: ['#818cf8'],
        dataLabels: { enabled: false },
        xaxis: { categories: months, labels: { style: { colors: fg } } },
        yaxis: { labels: { formatter: v => '$' + (v/1000).toFixed(0) + 'k', style: { colors: fg } } },
        plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
      });
      this._barChart.render();
      this._charts.push(this._barChart);
    }
  }

  _startLiveData() {
    this._interval = setInterval(() => {
      if (this._lineChart) {
        this._lineChart.updateSeries([{
          name: 'Visitors',
          data: months.map(() => rnd(2000, 9000)),
        }]);
      }
    }, 3000);
  }

  destroy() {
    clearInterval(this._interval);
    this._charts.forEach(c => { try { c.destroy(); } catch {} });
    this._charts = [];
  }
}
