// ==============================================================================
// AQUAFLOW PRO - EXCEL XLSX & CSV EXPORT ENGINE
// ==============================================================================

class ExcelExporter {
  static exportExcel(state, dates) {
    if (typeof XLSX === 'undefined') {
      ToastService.error('Excel exporter library not ready');
      return;
    }

    const calculatedDates = dates || DateEngine.calculateSchedule(state);
    const wsData = [
      [state.title || "Attendance Sheet"],
      [state.subtitle || ""],
      [state.batchName || ""],
      [], // Empty row
      ['Name', ...calculatedDates]
    ];

    // Student Names
    if (state.names) {
      state.names.forEach(name => {
        wsData.push([name, ...calculatedDates.map(() => '')]);
      });
    }

    // Extra Blank Rows
    for (let i = 0; i < (state.extraRows || 0); i++) {
      wsData.push(['', ...calculatedDates.map(() => '')]);
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set Column Widths (Name = 32, Dates = 14)
    const colWidths = [{ wch: 32 }];
    calculatedDates.forEach(() => colWidths.push({ wch: 14 }));
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet");

    XLSX.writeFile(wb, `${state.batchName || 'Attendance'}_Sheet.xlsx`);
    ToastService.success('Formatted Excel sheet exported successfully!');
  }

  static exportCSV(state, dates) {
    const calculatedDates = dates || DateEngine.calculateSchedule(state);
    let csv = ['"Name"', ...calculatedDates.map(d => `"${d}"`)].join(',') + '\n';
    
    if (state.names) {
      state.names.forEach(name => {
        const row = [`"${name.replace(/"/g, '""')}"`, ...calculatedDates.map(() => '""')];
        csv += row.join(',') + '\n';
      });
    }

    for (let i = 0; i < (state.extraRows || 0); i++) {
      const row = ['""', ...calculatedDates.map(() => '""')];
      csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${state.batchName || 'Attendance'}_Attendance.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    ToastService.success('CSV exported successfully!');
  }
}

window.ExcelExporter = ExcelExporter;
