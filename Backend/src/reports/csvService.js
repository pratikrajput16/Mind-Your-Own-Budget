const { Parser } = require("json2csv");

const generateCSV = (res, expenses) => {

  const fields = [
    "title",
    "category",
    "amount",
    "paymentMethod",
    "date",
  ];

  const parser = new Parser({ fields });

  const csv = parser.parse(expenses);

  res.header("Content-Type", "text/csv");

  res.attachment("expenses-report.csv");

  return res.send(csv);
};

module.exports = {
  generateCSV,
};