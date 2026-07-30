// Helper: Ordinal number suffix (e.g. 1st, 2nd, 3rd, 4th, 11th, 21st)
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Helper: Month Abbreviations (used for clean compact headers)
const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Helper: Get all dates for a given day of the week in a month
function getDatesForDayOfWeek(year, monthIndex, dayOfWeek) {
  const dates = [];
  const date = new Date(year, monthIndex, 1);
  
  // Find first occurrence of dayOfWeek
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }
  
  // Collect all occurrences in the month
  while (date.getMonth() === monthIndex) {
    const dayNum = date.getDate();
    const monthAbbr = MONTH_ABBR[monthIndex];
    dates.push(`${getOrdinal(dayNum)} ${monthAbbr}`);
    date.setDate(date.getDate() + 7);
  }
  
  return dates;
}

// Toast Notification Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✅' : 'ℹ️';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// State Management & Main Application Controller
class AttendanceApp {
  constructor() {
    this.presets = this.loadStoredPresets();
    this.activePresetId = 'girls-batch-4';
    this.zoomScale = 1.0;
    this.searchQuery = '';
    this.currentTheme = localStorage.getItem('app_theme') || 'light';
    
    // Default Fallback State
    const defaultState = {
      title: 'Swimming attendance',
      subtitle: 'Time : 11:00am to 11:40am',
      batchName: 'Girls Batch 4',
      category: 'Girls', // 'Girls' | 'Boys' | 'Custom'
      month: 6, // July (0-indexed)
      year: 2026,
      dayOfWeek: 6, // 6 = Saturday
      useCustomDates: false,
      customDates: [],
      extraRows: 4,
      rowHeight: 52,
      names: []
    };

    // Auto-restore last edited state from localStorage if available
    const savedState = this.loadActiveState();
    this.state = savedState ? { ...defaultState, ...savedState } : defaultState;

    this.initElements();
    this.applyTheme(this.currentTheme);
    this.updateControlsFromState();
    this.bindEvents();
    this.renderPresets();
    this.updateApp();
    this.dismissSplash();
  }

  loadActiveState() {
    try {
      const saved = localStorage.getItem('attendance_active_state_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load active state from localStorage', e);
    }
    return null;
  }

  saveActiveState() {
    try {
      localStorage.setItem('attendance_active_state_v1', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save active state to localStorage', e);
    }
  }

  dismissSplash() {
    setTimeout(() => {
      const loader = document.getElementById('loading-overlay');
      if (loader) loader.classList.add('fade-out');
    }, 400);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);

    if (this.themeToggleIcon && this.themeToggleLabel) {
      if (theme === 'dark') {
        this.themeToggleIcon.textContent = '🌙';
        this.themeToggleLabel.textContent = 'Dark';
      } else {
        this.themeToggleIcon.textContent = '☀️';
        this.themeToggleLabel.textContent = 'Light';
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} mode`, 'info');
  }

  loadStoredPresets() {
    try {
      const stored = localStorage.getItem('attendance_presets_v2');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not load presets from localStorage', e);
    }
    return [...SAMPLE_PRESETS];
  }

  saveStoredPresets() {
    try {
      localStorage.setItem('attendance_presets_v2', JSON.stringify(this.presets));
    } catch (e) {
      console.warn('Could not save presets to localStorage', e);
    }
  }

  initElements() {
    // Inputs
    this.titleInput = document.getElementById('input-title');
    this.subtitleInput = document.getElementById('input-subtitle');
    this.batchInput = document.getElementById('input-batch');
    this.categoryTabs = document.querySelectorAll('.tab-btn');
    this.monthSelect = document.getElementById('select-month');
    this.yearInput = document.getElementById('input-year');
    this.dayOfWeekSelect = document.getElementById('select-day');
    this.extraRowsInput = document.getElementById('input-extra-rows');
    this.rowHeightInput = document.getElementById('input-row-height');
    this.rowHeightValue = document.getElementById('row-height-value');
    this.presetHeightBtns = document.querySelectorAll('.preset-height-btn');
    this.btnAutoFitPage = document.getElementById('btn-autofit-page');
    this.newStudentInput = document.getElementById('input-new-student');
    this.bulkNamesTextarea = document.getElementById('textarea-bulk-names');
    this.searchNamesInput = document.getElementById('input-search-names');

    // Theme Switcher Elements
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.themeToggleIcon = document.getElementById('theme-toggle-icon');
    this.themeToggleLabel = document.getElementById('theme-toggle-label');

    // Stats Elements
    this.statStudentsCount = document.getElementById('stat-students-count');
    this.statDatesCount = document.getElementById('stat-dates-count');
    this.statRowsCount = document.getElementById('stat-rows-count');

    // Zoom Controls
    this.btnZoomIn = document.getElementById('btn-zoom-in');
    this.btnZoomOut = document.getElementById('btn-zoom-out');
    this.btnZoomReset = document.getElementById('btn-zoom-reset');
    this.zoomLevelBadge = document.getElementById('zoom-level-badge');

    // Action Buttons
    this.btnAddStudent = document.getElementById('btn-add-student');
    this.btnBulkAdd = document.getElementById('btn-bulk-add');
    this.btnSortNames = document.getElementById('btn-sort-names');
    this.btnClearNames = document.getElementById('btn-clear-names');
    this.btnSavePreset = document.getElementById('btn-save-preset');
    this.btnExportJSON = document.getElementById('btn-export-json');
    this.btnImportJSON = document.getElementById('btn-import-json');
    this.fileImportInput = document.getElementById('file-import-json');
    this.btnExportPDF = document.getElementById('btn-export-pdf');
    this.btnPrintWindow = document.getElementById('btn-print-window');
    this.btnExportCSV = document.getElementById('btn-export-csv');

    // UI Containers
    this.presetListEl = document.getElementById('preset-list');
    this.studentTagsEl = document.getElementById('student-tags');

    // PDF Elements
    this.pdfDoc = document.getElementById('pdf-document');
    this.docTitle = document.getElementById('doc-title');
    this.docSubtitle = document.getElementById('doc-subtitle');
    this.docBatch = document.getElementById('doc-batch');
    this.docTableHeader = document.getElementById('doc-table-header');
    this.docTableBody = document.getElementById('doc-table-body');
  }

  bindEvents() {
    // Theme Switcher
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Header inputs - Auto-save on change
    this.titleInput.addEventListener('input', (e) => {
      this.state.title = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });
    this.subtitleInput.addEventListener('input', (e) => {
      this.state.subtitle = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });
    this.batchInput.addEventListener('input', (e) => {
      this.state.batchName = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });

    // Date controls - Auto-save on change
    this.monthSelect.addEventListener('change', (e) => {
      this.state.month = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.yearInput.addEventListener('change', (e) => {
      this.state.year = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.dayOfWeekSelect.addEventListener('change', (e) => {
      this.state.dayOfWeek = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.extraRowsInput.addEventListener('change', (e) => {
      this.state.extraRows = Math.max(0, parseInt(e.target.value, 10) || 0);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });

    // Row Height / Cell Spacing Slider
    if (this.rowHeightInput) {
      this.rowHeightInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 52;
        this.state.rowHeight = val;
        if (this.rowHeightValue) this.rowHeightValue.textContent = `${val}px`;
        document.documentElement.style.setProperty('--cell-row-height', `${val}px`);
        this.saveActiveState();
      });
    }

    // Quick Height Presets
    if (this.presetHeightBtns) {
      this.presetHeightBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const h = parseInt(btn.dataset.height, 10) || 52;
          this.state.rowHeight = h;
          if (this.rowHeightInput) this.rowHeightInput.value = h;
          if (this.rowHeightValue) this.rowHeightValue.textContent = `${h}px`;
          document.documentElement.style.setProperty('--cell-row-height', `${h}px`);
          this.saveActiveState();
          showToast(`Row height set to ${h}px`, 'info');
        });
      });
    }

    // Auto-Fit All Names to 1 Page Button
    if (this.btnAutoFitPage) {
      this.btnAutoFitPage.addEventListener('click', () => this.autoFitOnePage(true));
    }

    // Category Tabs (Girls / Boys / Custom)
    this.categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.dataset.category;
        this.categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.state.category = cat;
        this.saveActiveState();
        
        // Find matching preset or update header label
        const match = this.presets.find(p => p.category.toLowerCase() === cat.toLowerCase());
        if (match) {
          this.loadPreset(match.id);
        }
      });
    });

    // Add Single Student
    const addStudent = () => {
      const name = this.newStudentInput.value.trim();
      if (name) {
        this.state.names.push(name);
        this.newStudentInput.value = '';
        this.updateApp();
        showToast(`Added "${name}" to the list`, 'success');
      }
    };
    this.btnAddStudent.addEventListener('click', addStudent);
    this.newStudentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addStudent();
    });

    // Bulk Add Students
    this.btnBulkAdd.addEventListener('click', () => {
      const rawText = this.bulkNamesTextarea.value;
      if (!rawText.trim()) return;
      const parsed = rawText.split(/\r?\n|,/).map(s => s.trim()).filter(s => s.length > 0);
      if (parsed.length > 0) {
        this.state.names = [...this.state.names, ...parsed];
        this.bulkNamesTextarea.value = '';
        this.updateApp();
        showToast(`Added ${parsed.length} student names!`, 'success');
      }
    });

    // Search filter input
    this.searchNamesInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderStudentTags();
    });

    // Sort Names A-Z
    this.btnSortNames.addEventListener('click', () => {
      this.state.names.sort((a, b) => a.localeCompare(b));
      this.updateApp();
      showToast('Sorted student names alphabetically (A-Z)', 'info');
    });

    // Clear All Names
    this.btnClearNames.addEventListener('click', () => {
      if (this.state.names.length === 0) return;
      if (confirm('Are you sure you want to clear all student names?')) {
        this.state.names = [];
        this.updateApp();
        showToast('Cleared all student names', 'info');
      }
    });

    // Save Preset
    this.btnSavePreset.addEventListener('click', () => {
      const presetName = prompt('Enter a name for this preset:', `${this.state.batchName} Preset`);
      if (!presetName) return;

      const newId = 'preset-' + Date.now();
      const preset = {
        id: newId,
        name: presetName,
        category: this.state.category,
        title: this.state.title,
        subtitle: this.state.subtitle,
        batchName: this.state.batchName,
        month: this.state.month,
        year: this.state.year,
        dayOfWeek: this.state.dayOfWeek,
        extraRows: this.state.extraRows,
        names: [...this.state.names]
      };

      this.presets.push(preset);
      this.activePresetId = newId;
      this.saveStoredPresets();
      this.renderPresets();
      showToast(`Preset "${presetName}" saved!`, 'success');
    });

    // Export/Import JSON Presets
    this.btnExportJSON.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.presets, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "attendance_presets.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Presets exported to JSON file', 'success');
    });

    this.btnImportJSON.addEventListener('click', () => {
      this.fileImportInput.click();
    });

    this.fileImportInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target.result);
          if (Array.isArray(imported)) {
            this.presets = imported;
            this.saveStoredPresets();
            this.renderPresets();
            showToast('Presets restored successfully!', 'success');
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    });

    // Zoom Controls
    this.btnZoomIn.addEventListener('click', () => {
      this.zoomScale = Math.min(1.5, this.zoomScale + 0.1);
      this.applyZoom();
    });
    this.btnZoomOut.addEventListener('click', () => {
      this.zoomScale = Math.max(0.6, this.zoomScale - 0.1);
      this.applyZoom();
    });
    this.btnZoomReset.addEventListener('click', () => {
      this.zoomScale = 1.0;
      this.applyZoom();
    });

    // Export Actions
    this.btnExportPDF.addEventListener('click', () => this.exportVectorPDF());
    this.btnPrintWindow.addEventListener('click', () => window.print());
    this.btnExportCSV.addEventListener('click', () => this.exportCSV());
  }

  applyZoom() {
    const rounded = Math.round(this.zoomScale * 100);
    this.zoomLevelBadge.textContent = `${rounded}%`;
    this.pdfDoc.style.transform = `scale(${this.zoomScale})`;
  }

  getCurrentDates() {
    if (this.state.useCustomDates && this.state.customDates.length > 0) {
      return this.state.customDates;
    }
    return getDatesForDayOfWeek(this.state.year, this.state.month, this.state.dayOfWeek);
  }

  loadPreset(id) {
    const preset = this.presets.find(p => p.id === id);
    if (!preset) return;

    this.activePresetId = id;
    this.state.title = preset.title || 'Swimming attendance';
    this.state.subtitle = preset.subtitle || '';
    this.state.batchName = preset.batchName || preset.name;
    this.state.category = preset.category || 'Girls';
    this.state.month = preset.month !== undefined ? preset.month : 6;
    this.state.year = preset.year || 2026;
    this.state.dayOfWeek = preset.dayOfWeek !== undefined ? preset.dayOfWeek : 6;
    this.state.extraRows = preset.extraRows !== undefined ? preset.extraRows : 4;
    this.state.names = [...preset.names];

    this.updateControlsFromState();
    this.updateApp();
    showToast(`Loaded "${preset.name}"`, 'info');
  }

  deletePreset(id, e) {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this preset?')) return;
    this.presets = this.presets.filter(p => p.id !== id);
    this.saveStoredPresets();
    this.renderPresets();
    showToast('Preset deleted', 'info');
  }

  updateControlsFromState() {
    this.titleInput.value = this.state.title;
    this.subtitleInput.value = this.state.subtitle;
    this.batchInput.value = this.state.batchName;
    this.monthSelect.value = this.state.month;
    this.yearInput.value = this.state.year;
    this.dayOfWeekSelect.value = this.state.dayOfWeek;
    this.extraRowsInput.value = this.state.extraRows;

    const currentHeight = this.state.rowHeight || 52;
    if (this.rowHeightInput) this.rowHeightInput.value = currentHeight;
    if (this.rowHeightValue) this.rowHeightValue.textContent = `${currentHeight}px`;
    document.documentElement.style.setProperty('--cell-row-height', `${currentHeight}px`);

    this.categoryTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category.toLowerCase() === this.state.category.toLowerCase());
    });
  }

  renderPresets() {
    this.presetListEl.innerHTML = '';
    this.presets.forEach(p => {
      const item = document.createElement('div');
      item.className = `preset-item ${p.id === this.activePresetId ? 'active' : ''}`;
      
      const badgeClass = p.category === 'Girls' ? 'badge-girls' : 'badge-boys';

      item.innerHTML = `
        <div class="preset-info">
          <div class="preset-name">${p.name}</div>
          <div class="preset-meta"><span class="badge ${badgeClass}">${p.category}</span> • ${p.names.length} Students</div>
        </div>
        <button class="icon-btn btn-delete-preset" title="Delete Preset">✕</button>
      `;

      item.addEventListener('click', () => this.loadPreset(p.id));
      item.querySelector('.btn-delete-preset').addEventListener('click', (e) => this.deletePreset(p.id, e));

      this.presetListEl.appendChild(item);
    });
  }

  renderStudentTags() {
    this.studentTagsEl.innerHTML = '';
    const query = this.searchQuery;

    this.state.names.forEach((name, index) => {
      if (query && !name.toLowerCase().includes(query)) {
        return;
      }

      const tag = document.createElement('div');
      tag.className = 'student-tag';

      tag.innerHTML = `
        <input type="text" value="${name}" data-index="${index}">
        <div class="tag-actions">
          <button class="icon-btn move-btn btn-move-up" data-index="${index}" title="Move Up">▲</button>
          <button class="icon-btn move-btn btn-move-down" data-index="${index}" title="Move Down">▼</button>
          <button class="icon-btn btn-remove-name" data-index="${index}" title="Remove">✕</button>
        </div>
      `;

      const input = tag.querySelector('input');
      input.addEventListener('change', (e) => {
        this.state.names[index] = e.target.value;
        this.saveActiveState();
        this.renderPreview();
      });

      // Move Up
      tag.querySelector('.btn-move-up').addEventListener('click', () => {
        if (index > 0) {
          const temp = this.state.names[index];
          this.state.names[index] = this.state.names[index - 1];
          this.state.names[index - 1] = temp;
          this.updateApp();
        }
      });

      // Move Down
      tag.querySelector('.btn-move-down').addEventListener('click', () => {
        if (index < this.state.names.length - 1) {
          const temp = this.state.names[index];
          this.state.names[index] = this.state.names[index + 1];
          this.state.names[index + 1] = temp;
          this.updateApp();
        }
      });

      // Remove
      tag.querySelector('.btn-remove-name').addEventListener('click', () => {
        this.state.names.splice(index, 1);
        this.updateApp();
      });

      this.studentTagsEl.appendChild(tag);
    });
  }

  updateStats() {
    const dates = this.getCurrentDates();
    this.statStudentsCount.textContent = this.state.names.length;
    this.statDatesCount.textContent = dates.length;
    this.statRowsCount.textContent = this.state.extraRows;
  }

  renderPreview() {
    // Header
    this.docTitle.textContent = this.state.title;
    this.docSubtitle.textContent = this.state.subtitle;
    this.docBatch.textContent = this.state.batchName;

    // Get calculated dates
    const dates = this.getCurrentDates();

    // Table Header Row: Name | Date 1 | Date 2 | Date 3 | Date 4
    let headerHTML = '<th>Name</th>';
    dates.forEach(d => {
      headerHTML += `<th>${d}</th>`;
    });
    this.docTableHeader.innerHTML = headerHTML;

    // Table Rows (Student Names + Extra Blank Rows)
    let bodyHTML = '';
    
    // Existing Names
    this.state.names.forEach(name => {
      bodyHTML += '<tr>';
      bodyHTML += `<td>${name}</td>`;
      dates.forEach(() => {
        bodyHTML += '<td></td>';
      });
      bodyHTML += '</tr>';
    });

    // Extra empty rows
    for (let i = 0; i < this.state.extraRows; i++) {
      bodyHTML += '<tr>';
      bodyHTML += '<td>&nbsp;</td>';
      dates.forEach(() => {
        bodyHTML += '<td></td>';
      });
      bodyHTML += '</tr>';
    }

    this.docTableBody.innerHTML = bodyHTML;
  }

  updateApp() {
    this.saveActiveState();
    this.renderPresets();
    this.renderStudentTags();
    this.renderPreview();
    this.updateStats();
  }

  // Calculate exact row height so all student names fit on 1 single page block
  autoFitOnePage(showNotification = true) {
    const totalRows = (this.state.names ? this.state.names.length : 0) + (this.state.extraRows || 0);
    if (totalRows <= 0) return;

    // Available vertical space for table rows on 1 single A4 page (~820px)
    const availableHeight = 820;
    const targetHeight = Math.min(72, Math.max(28, Math.floor(availableHeight / totalRows)));

    this.state.rowHeight = targetHeight;
    if (this.rowHeightInput) this.rowHeightInput.value = targetHeight;
    if (this.rowHeightValue) this.rowHeightValue.textContent = `${targetHeight}px`;
    document.documentElement.style.setProperty('--cell-row-height', `${targetHeight}px`);
    this.saveActiveState();
    if (showNotification) {
      showToast(`Auto-fitted ${totalRows} rows to 1 page (${targetHeight}px/row)`, 'success');
    }
  }

  exportCSV() {
    const dates = this.getCurrentDates();
    let csv = ['"Name"', ...dates.map(d => `"${d}"`)].join(',') + '\n';
    
    this.state.names.forEach(name => {
      const row = [`"${name.replace(/"/g, '""')}"`, ...dates.map(() => '""')];
      csv += row.join(',') + '\n';
    });

    for (let i = 0; i < this.state.extraRows; i++) {
      const row = ['""', ...dates.map(() => '""')];
      csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.state.batchName}_Attendance.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('CSV exported successfully!', 'success');
  }

  // Pure Crisp Vector PDF Generation Engine using jsPDF + AutoTable
  exportVectorPDF() {
    const jsPDFLib = window.jspdf ? window.jspdf.jsPDF : (typeof jsPDF !== 'undefined' ? jsPDF : null);
    if (!jsPDFLib) {
      window.print();
      return;
    }

    const doc = new jsPDFLib({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const dates = this.getCurrentDates();

    // 1. Draw Headers (Exact Helvetica Bold text matching reference PDF)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text(this.state.title || "Swimming attendance", 16, 22);

    doc.setFontSize(14.5);
    doc.text(this.state.subtitle || "", 16, 30);

    doc.setFontSize(15);
    doc.text(this.state.batchName || "", 16, 38);

    // 2. Prepare Table Data
    const headers = [['Name', ...dates]];
    const body = [];

    // Student Names
    this.state.names.forEach(name => {
      body.push([name, ...dates.map(() => '')]);
    });

    // Extra Blank Rows
    for (let i = 0; i < this.state.extraRows; i++) {
      body.push(['', ...dates.map(() => '')]);
    }

    // 3. Define Column Widths & Alignments
    const nameColWidth = dates.length >= 5 ? 60 : 68;
    const remainingWidth = 178 - nameColWidth;
    const dateColWidth = dates.length > 0 ? (remainingWidth / dates.length) : 25;
    const headFontSize = dates.length >= 5 ? 10.5 : 12;

    const columnStyles = {
      0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'normal' }
    };
    dates.forEach((_, idx) => {
      columnStyles[idx + 1] = { cellWidth: dateColWidth, halign: 'center' };
    });

    // 4. Invoke AutoTable safely across CJS / UMD module formats
    const autoTableFunc = doc.autoTable || (window.jspdf ? window.jspdf.autoTable : null) || (window.autoTable);

    const pdfTopBottomPadding = Math.max(2.5, ((this.state.rowHeight || 52) - 16) / 4);

    if (typeof autoTableFunc === 'function') {
      autoTableFunc.call(doc, {
        startY: 44,
        head: headers,
        body: body,
        margin: { left: 16, right: 16, top: 16, bottom: 16 },
        theme: 'plain',
        styles: {
          font: 'helvetica',
          fontSize: 12,
          cellPadding: { top: pdfTopBottomPadding, bottom: pdfTopBottomPadding, left: 3, right: 3 },
          lineColor: [0, 0, 0],
          lineWidth: 0.25,
          textColor: [0, 0, 0],
          valign: 'middle',
          overflow: 'linebreak'
        },
        headStyles: {
          fontStyle: 'bold',
          fontSize: headFontSize,
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          lineWidth: 0.35,
          lineColor: [0, 0, 0],
          cellPadding: { top: 5, bottom: 5, left: 1.5, right: 1.5 }
        },
        columnStyles: columnStyles
      });
    } else {
      window.print();
      return;
    }

    doc.save(`${this.state.batchName}_Attendance.pdf`);
    showToast('Vector PDF exported successfully!', 'success');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AttendanceApp();
});
