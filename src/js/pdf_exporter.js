// ==============================================================================
// AQUAFLOW PRO - PURE VECTOR PDF GENERATOR ENGINE (STRICT 1-PAGE OUTPUT)
// ==============================================================================

class PDFExporter {
  static exportVectorPDF(state, dates) {
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

    const calculatedDates = dates || DateEngine.calculateSchedule(state);

    // 1. Draw Headers (Exact Helvetica Bold text matching reference PDF)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text(state.title || "Swimming attendance", 16, 22);

    doc.setFontSize(14.5);
    doc.text(state.subtitle || "", 16, 30);

    doc.setFontSize(15);
    doc.text(state.batchName || "", 16, 38);

    // 2. Prepare Table Data
    const headers = [['Name', ...calculatedDates]];
    const body = [];

    // Student Names
    if (state.names && state.names.length > 0) {
      state.names.forEach(name => {
        body.push([name, ...calculatedDates.map(() => '')]);
      });
    }

    // Extra Blank Rows
    for (let i = 0; i < (state.extraRows || 0); i++) {
      body.push(['', ...calculatedDates.map(() => '')]);
    }

    // 3. Define Column Widths & Alignments
    const nameColWidth = calculatedDates.length >= 5 ? 68 : 74;
    const remainingWidth = 178 - nameColWidth;
    const dateColWidth = calculatedDates.length > 0 ? (remainingWidth / calculatedDates.length) : 25;

    const columnStyles = {
      0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'normal' }
    };
    calculatedDates.forEach((_, idx) => {
      columnStyles[idx + 1] = { cellWidth: dateColWidth, halign: 'center' };
    });

    // 4. Calculate dynamic padding and font sizes to strictly guarantee 1 single page PDF
    const totalPdfRows = body.length;
    let pdfCellPaddingY = 3.5;
    let headFontSize = calculatedDates.length >= 5 ? 10 : 11;
    let bodyFontSize = 11;

    if (totalPdfRows > 0) {
      const mmPerRow = 213 / totalPdfRows;
      pdfCellPaddingY = Math.max(1.0, Math.min(7.0, (mmPerRow - 4.5) / 2));

      if (totalPdfRows > 24) {
        bodyFontSize = 9;
        headFontSize = 9.5;
      } else if (totalPdfRows > 18) {
        bodyFontSize = 10;
        headFontSize = 10;
      } else {
        bodyFontSize = 11;
        headFontSize = calculatedDates.length >= 5 ? 10.5 : 11.5;
      }
    }

    // 5. Invoke AutoTable safely across CJS / UMD module formats
    const autoTableFunc = doc.autoTable || (window.jspdf ? window.jspdf.autoTable : null) || (window.autoTable);

    if (typeof autoTableFunc === 'function') {
      autoTableFunc.call(doc, {
        startY: 42,
        head: headers,
        body: body,
        showHead: 'everyPage',
        pageBreak: 'avoid',
        margin: { left: 16, right: 16, top: 16, bottom: 12 },
        theme: 'plain',
        styles: {
          font: 'helvetica',
          fontSize: bodyFontSize,
          cellPadding: { top: pdfCellPaddingY, bottom: pdfCellPaddingY, left: 3, right: 3 },
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
          cellPadding: { top: 4, bottom: 4, left: 1.5, right: 1.5 }
        },
        columnStyles: columnStyles
      });
    } else {
      window.print();
      return;
    }

    doc.save(`${state.batchName || 'Attendance'}_Sheet.pdf`);
    ToastService.success('Vector PDF exported successfully!');
  }
}

window.PDFExporter = PDFExporter;
