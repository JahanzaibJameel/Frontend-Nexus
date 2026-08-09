const PEOPLE = [
  { name: 'Alice Johnson',   role: 'Frontend Dev',   dept: 'Engineering', salary: 92000, status: 'Active',   joined: '2022-03-14' },
  { name: 'Bob Martinez',    role: 'Backend Dev',    dept: 'Engineering', salary: 98000, status: 'Active',   joined: '2021-07-01' },
  { name: 'Carol White',     role: 'UX Designer',    dept: 'Design',      salary: 85000, status: 'Active',   joined: '2023-01-15' },
  { name: 'David Lee',       role: 'DevOps',         dept: 'Infra',       salary: 110000, status: 'Active',  joined: '2020-11-20' },
  { name: 'Eva Brown',       role: 'Product Manager',dept: 'Product',     salary: 105000, status: 'Active',  joined: '2021-05-09' },
  { name: 'Frank Garcia',    role: 'Data Scientist', dept: 'Analytics',   salary: 115000, status: 'Active',  joined: '2022-09-30' },
  { name: 'Grace Kim',       role: 'QA Engineer',    dept: 'Engineering', salary: 80000, status: 'Inactive', joined: '2023-02-22' },
  { name: 'Henry Taylor',    role: 'CTO',            dept: 'Leadership',  salary: 180000, status: 'Active',  joined: '2019-06-01' },
  { name: 'Iris Chen',       role: 'ML Engineer',    dept: 'AI',          salary: 125000, status: 'Active',  joined: '2022-12-01' },
  { name: 'James Wilson',    role: 'Full-Stack Dev',  dept: 'Engineering', salary: 96000, status: 'Active',  joined: '2023-04-10' },
  { name: 'Karen Scott',     role: 'HR Manager',     dept: 'People',      salary: 88000, status: 'Active',  joined: '2020-08-18' },
  { name: 'Liam Harris',     role: 'Security Eng',   dept: 'Infra',       salary: 122000, status: 'Active', joined: '2021-10-05' },
  { name: 'Mia Thompson',    role: 'Content Writer', dept: 'Marketing',   salary: 72000, status: 'Inactive', joined: '2023-06-01' },
  { name: 'Nathan Clark',    role: 'iOS Developer',  dept: 'Mobile',      salary: 105000, status: 'Active',  joined: '2022-02-14' },
  { name: 'Olivia Walker',   role: 'Android Dev',    dept: 'Mobile',      salary: 102000, status: 'Active',  joined: '2022-02-14' },
  { name: 'Paul Robinson',   role: 'Finance Analyst',dept: 'Finance',     salary: 90000, status: 'Active',   joined: '2021-03-28' },
  { name: 'Quinn Martinez',  role: 'Support Lead',   dept: 'Support',     salary: 68000, status: 'Active',   joined: '2023-07-12' },
  { name: 'Rachel Lewis',    role: 'Research Sci',   dept: 'R&D',         salary: 130000, status: 'Active',  joined: '2020-01-09' },
  { name: 'Sam Young',       role: 'Cloud Architect',dept: 'Infra',       salary: 145000, status: 'Active',  joined: '2019-11-15' },
  { name: 'Tanya Adams',     role: 'Scrum Master',   dept: 'Product',     salary: 95000, status: 'Active',   joined: '2022-05-20' },
];

const COLS = ['name','role','dept','salary','status','joined'];

export default class TablesPage {
  constructor() {
    this._filtered = [...PEOPLE];
    this._sortCol = null;
    this._sortDir = 1;
    this._page = 1;
    this._pageSize = 7;
    this._query = '';
    this._handlers = [];
  }

  init() {
    const searchEl = document.getElementById('table-search');
    const exportBtn = document.getElementById('table-export');
    this._on(searchEl, 'input', e => {
      this._query = e.target.value.toLowerCase();
      this._page = 1;
      this._filterAndRender();
    });
    this._on(exportBtn, 'click', () => this._exportCSV());
    this._on(document.getElementById('page-prev'), 'click', () => { if (this._page > 1) { this._page--; this._render(); } });
    this._on(document.getElementById('page-next'), 'click', () => {
      const max = Math.ceil(this._filtered.length / this._pageSize);
      if (this._page < max) { this._page++; this._render(); }
    });
    this._on(document.getElementById('page-size'), 'change', e => { this._pageSize = parseInt(e.target.value, 10); this._page = 1; this._render(); });
    this._filterAndRender();
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  _filterAndRender() {
    this._filtered = PEOPLE.filter(p =>
      COLS.some(c => String(p[c]).toLowerCase().includes(this._query))
    );
    if (this._sortCol) {
      this._filtered.sort((a, b) => {
        const va = a[this._sortCol], vb = b[this._sortCol];
        if (typeof va === 'number') return (va - vb) * this._sortDir;
        return String(va).localeCompare(String(vb)) * this._sortDir;
      });
    }
    this._render();
  }

  _render() {
    const thead = document.getElementById('table-head');
    const tbody = document.getElementById('table-body');
    const info  = document.getElementById('page-info');
    if (!thead || !tbody) return;

    thead.innerHTML = `<tr>${COLS.map(c => {
      const sorted = this._sortCol === c ? (this._sortDir === 1 ? 'asc' : 'desc') : '';
      const label  = c.charAt(0).toUpperCase() + c.slice(1);
      return `<th data-sort="${sorted}" data-col="${c}" tabindex="0" aria-sort="${sorted || 'none'}">${label}</th>`;
    }).join('')}</tr>`;

    thead.querySelectorAll('th').forEach(th => {
      this._on(th, 'click', () => this._sortBy(th.dataset.col));
      this._on(th, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._sortBy(th.dataset.col); } });
    });

    const start = (this._page - 1) * this._pageSize;
    const slice = this._filtered.slice(start, start + this._pageSize);
    tbody.innerHTML = slice.length ? slice.map(p => `<tr>
      <td>${p.name}</td>
      <td>${p.role}</td>
      <td>${p.dept}</td>
      <td>$${p.salary.toLocaleString()}</td>
      <td><span class="badge ${p.status === 'Active' ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
      <td>${p.joined}</td>
    </tr>`).join('') : `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted)">No results found.</td></tr>`;

    const total = this._filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / this._pageSize));
    if (info) info.textContent = `Page ${this._page} of ${totalPages}  (${total} records)`;
  }

  _sortBy(col) {
    if (this._sortCol === col) this._sortDir *= -1;
    else { this._sortCol = col; this._sortDir = 1; }
    this._filterAndRender();
  }

  _exportCSV() {
    const header = COLS.join(',');
    const rows = this._filtered.map(p => COLS.map(c => `"${p[c]}"`).join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'table-export.csv' });
    a.click();
    URL.revokeObjectURL(a.href);
  }

  destroy() {
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
  }
}
