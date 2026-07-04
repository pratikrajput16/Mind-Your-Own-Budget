const PDFDocument = require("pdfkit");

const generateReport = (res, reportData) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="financial-report.pdf"',
  );

  doc.pipe(res);

  doc.fontSize(22).text("Mind Your Own Budget", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(18).text("Financial Report");

  doc.moveDown();

  doc.fontSize(14).text(`Total Expenses: ₹${reportData.dashboard.totalExpenses}`);

  doc.text(`Transactions: ${reportData.dashboard.totalTransactions}`);

  doc.text(`Average Expense: ₹${reportData.dashboard.averageExpense}`);

  doc.moveDown();

  doc.fontSize(16).text("Highest Expense");

  doc.text(
    `${reportData.dashboard.highestExpense.title} - ₹${reportData.dashboard.highestExpense.amount}`,
  );

  doc.moveDown();

  doc.fontSize(16).text("Lowest Expense");

  doc.text(
    `${reportData.dashboard.lowestExpense.title} - ₹${reportData.dashboard.lowestExpense.amount}`,
  );

  doc.moveDown();

  /* ---------- Paste HERE ---------- */

  doc.fontSize(16).text("Category Breakdown");

  reportData.dashboard.categoryBreakdown.forEach((item) => {
    doc.text(`${item.category} : ₹${item.total}`);
  });

  doc.moveDown();

  /* ---------- End of pasted code ---------- */

  doc.end();
};

module.exports = {
  generateReport,
};
