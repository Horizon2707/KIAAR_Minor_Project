const excel = require("excel4node");
const wb = new excel.Workbook();
const ws = wb.addWorksheet("Report");
// Add data to cell A1
const headingText = "K.J. Somaiya Institute of Applied Agricultural Research";
const document_width = 121.8;

const heading = {
  font: { bold: true, size: 22 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};
const h2 = {
  font: { bold: true, size: 14 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};
const bottom_border = { border: { bottom: { style: "thick" } } };
const border_all = { border: { bottom: { style: "thick" } } };
//Page Width
ws.column(1).setWidth(7.4);
ws.column(2).setWidth(13.1);
ws.column(3).setWidth(13.1);

//Heading
ws.row(1).setHeight(36);
ws.cell(1, 1, 1, 10, true).string(headingText).style(heading);
//Taluka District
ws.row(2).setHeight(24);
ws.cell(2, 1, 2, 3, true)
  .string("Taluk: Rabakavi-Banahatti")
  .style(h2)
  .style(bottom_border);
ws.cell(2, 4, 2, 7, true)
  .string("Sameerwadi-587 316")
  .style(h2)
  .style(bottom_border);
ws.cell(2, 8, 2, 10, true)
  .string("Dt: Bagalkot")
  .style(h2)
  .style(bottom_border);
//Row 3
ws.row(3).setHeight(26);
//Name Farmer ID
ws.cell(4, 1, 4, 3, true).string("Farmer Name").style();

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
