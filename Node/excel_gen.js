const excel = require("excel4node");
const wb = new excel.Workbook();
const ws = wb.addWorksheet("Report");
// Add data to cell A1
const headingText = "K.J. Somaiya Institute of Applied Agricultural Research";

const bold_centered = {
  font: { bold: true, size: 22 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};
ws.row(1).setHeight(36);
ws.column(1).setWidth(6.5);
ws.column(2).setWidth(6.5);
ws.column(3).setWidth(8);
ws.cell(1, 1, 1, 10, true).string(headingText).style(bold_centered);
wb.write("output.xlsx", (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Excel file created successfully!");
  }
});

function topixel(value) {
  return value / 0.75;
}
