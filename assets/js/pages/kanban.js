/* ─── Kanban Board Page Module (SortableJS) ─────────────────────────────── */
import { loadLibrary } from '../core/libraryLoader.js';
import { showNotification } from '../core/notificationManager.js';

const STORAGE_KEY = 'fn_kanban_tasks_v1';

const DEFAULT_TASKS = [
  { id: '1', title: 'Audit 27 Browser APIs', col: 'todo', tag: 'Core', priority: 'high' },
  { id: '2', title: 'Implement SortableJS Drag & Drop', col: 'progress', tag: 'UI', priority: 'high' },
  { id: '3', title: 'Verify PWA offline fallbacks', col: 'review', tag: 'PWA', priority: 'medium' },
  { id: '4', title: 'Setup 47 Libraries Registry', col: 'done', tag: 'Core', priority: 'low' },
];

export default class KanbanPage {
  constructor() {
    this.sortables = [];
    this.tasks = this.loadTasks();
    this._sortableLoaded = false;
  }

  async init() {
    this.renderTasks();
    await this.initSortable();

    const addBtn = document.getElementById('add-kanban-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.promptAddTask());
    }
  }

  loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_TASKS;
    } catch (e) {
      return DEFAULT_TASKS;
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.warn('[Kanban] Failed to save tasks:', e);
    }
  }

  renderTasks() {
    const columns = ['todo', 'progress', 'review', 'done'];
    columns.forEach(col => {
      const listEl = document.getElementById(`col-${col}`);
      const countEl = document.getElementById(`${col}-count`);
      if (!listEl) return;

      const colTasks = this.tasks.filter(t => t.col === col);
      if (countEl) countEl.textContent = colTasks.length;

      listEl.innerHTML = colTasks.map(task => `
        <div class="kanban-card" data-id="${task.id}" style="background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border); padding: 14px; cursor: grab; user-select: none;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <strong style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.4;">${task.title}</strong>
            <button class="delete-task-btn" data-id="${task.id}" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem; padding: 0 4px;" aria-label="Delete task">✕</button>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 12px; align-items: center;">
            <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); font-size: 0.75rem;">${task.tag}</span>
            <span class="badge" style="background: ${task.priority === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)'}; color: ${task.priority === 'high' ? '#ef4444' : 'var(--accent)'}; font-size: 0.75rem;">${task.priority}</span>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteTask(btn.dataset.id);
        });
      });
    });
  }

  async initSortable() {
    if (this._sortableLoaded) return;
    try {
      const Sortable = await loadLibrary('sortablejs');
      if (!Sortable) return;

      const columns = document.querySelectorAll('.kanban-list');
      columns.forEach(colEl => {
        const s = new Sortable(colEl, {
          group: 'kanban',
          animation: 180,
          ghostClass: 'sortable-ghost',
          onEnd: (evt) => {
            const taskId = evt.item.dataset.id;
            const newCol = evt.to.dataset.col;
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
              task.col = newCol;
              this.saveTasks();
              this.updateCounts();
              showNotification(`Moved task to ${newCol.toUpperCase()}`, 'info');
            }
          }
        });
        this.sortables.push(s);
      });
      this._sortableLoaded = true;
    } catch (err) {
      console.warn('[Kanban] SortableJS init failed:', err);
    }
  }

  updateCounts() {
    ['todo', 'progress', 'review', 'done'].forEach(col => {
      const countEl = document.getElementById(`${col}-count`);
      if (countEl) {
        countEl.textContent = this.tasks.filter(t => t.col === col).length;
      }
    });
  }

  promptAddTask() {
    const title = prompt('Enter Task Title:');
    if (!title || !title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      col: 'todo',
      tag: 'Task',
      priority: 'medium'
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();
    showNotification('New task created!', 'success');
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.renderTasks();
    showNotification('Task removed', 'warning');
  }

  destroy() {
    this.sortables.forEach(s => { if (s && typeof s.destroy === 'function') s.destroy(); });
    this.sortables = [];
    this._sortableLoaded = false;
  }
}
